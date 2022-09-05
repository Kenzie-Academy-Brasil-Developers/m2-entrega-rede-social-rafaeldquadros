import dashboard from "./dashboard.js"
import toast from "./toast.js"
class Request {
    static async loginRequest(obj){
        console.log(obj)
        await fetch("https://m2-rede-social.herokuapp.com/api/users/login/",{
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify(obj)
        })
        .then((res) => res.json())
        .then((res) => {
            console.log(res)
            if(res.token !== undefined){
                localStorage.setItem("KenzieToken", res.token)
                localStorage.setItem("KenzieUser",res.user_uuid)
                window.location.assign("./src/pages/dashboard.html")
            }else{
                toast.toastErro("Login ou senha invalido!")
            }
        })
        .catch((res) => console.log(res))
    }
    static async cadastroRequest(obj){
        await fetch("https://m2-rede-social.herokuapp.com/api/users/", {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify(obj)
        })
        .then((res) => res.json())
        .then((res) => {
            window.location.assign("../../../index.html")
        })
        .catch((res) => console.log(res))
    }
    static async dadosUser(){
        const userId = localStorage.getItem("KenzieUser")
        const token  = localStorage.getItem("KenzieToken")
    
        await fetch(`https://m2-rede-social.herokuapp.com/api/users/${userId}/`,{
            method: "GET",
            headers:{
                "Content-Type": "application/json", 
                Authorization: `Token ${token}`
            },
        })
        .then((res) => res.json())
        .then((res) => dashboard.loggedUser(res))
        .catch((res) => console.log(res))
    }
    static async posts(){
        const userId = localStorage.KenzieUser
        const token  = localStorage.KenzieToken
        await fetch("https://m2-rede-social.herokuapp.com/api/posts/?limit=10&offset=284", {
            method: "GET",
            headers:{
                "Content-Type": "application/json", 
                Authorization: `Token ${token}`
            },
        })
        .then((res) => res.json())
        .then((res) => {
            fetch(`https://m2-rede-social.herokuapp.com/api/posts/?limit=10&offset=${res.count -9}`,{
                method: "GET",
                headers:{
                    "Content-Type": "application/json", 
                    Authorization: `Token ${token}`
                },
            })
            .then((res) => res.json())
            .then((res) => dashboard.renderPosts(res.results))
        })
    }
    static async createPost(obj){
        const token  = localStorage.KenzieToken
        await fetch("https://m2-rede-social.herokuapp.com/api/posts/", {
            method: "POST",
            headers:{
                "Content-Type": "application/json", 
                Authorization: `Token ${token}`
            },
            body:JSON.stringify(obj)
        })
        .then((res) => res.json())
        .then(Request.posts())
        .catch((res) => console.log(res))
    }

    static async sugestUsers(){

        
        const token  = localStorage.KenzieToken

        await fetch(`https://m2-rede-social.herokuapp.com/api/users/`, {
            method: "GET",
            headers:{
                "Content-Type": "application/json", 
                Authorization: `Token ${token}`
            },
        })
    
        .then((res) => res.json())
        
        .then((res) =>{
        const userSug = res.results
        dashboard.userSugested(userSug)})
    }
    static async likePost(id){
        const token  = localStorage.KenzieToken
        await fetch("https://m2-rede-social.herokuapp.com/api/likes/",{
            method: "POST",
            headers:{
                "Content-Type": "application/json", 
                Authorization: `Token ${token}`
            },
            body:JSON.stringify(id)
        })
        .then((res) => res.json())
        // .then((res) =>console.log(res))
        .then((res) => Request.posts()) 
    }
    static async unlikePost(id){
        const token  = localStorage.KenzieToken
        await fetch(`https://m2-rede-social.herokuapp.com/api/likes/${id}/`,{
            method: "DELETE",
            headers:{
                Authorization: `Token ${token}`
            },
        })
        .then(Request.posts())
        .catch((res)=> console.log(res))
    }

    static async followUser (obj){
        const token  = localStorage.KenzieToken
        await fetch("https://m2-rede-social.herokuapp.com/api/users/follow/",{
            method: "POST",
            headers:{
                "Content-Type": "application/json", 
                Authorization: `Token ${token}`
            },
            body:JSON.stringify(obj)
        })
        .then((res) => res.json())
        .then(Request.sugestUsers())
    }

    static async unfollowUser(id){
        const token  = localStorage.KenzieToken
        await fetch(`https://m2-rede-social.herokuapp.com/api/users/unfollow/${id}/`,{
            method: "DELETE",
            headers:{
                Authorization: `Token ${token}`
            },
        })
        .then(Request.sugestUsers())
    }
}

export default Request