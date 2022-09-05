import request from "./request.js"
import modal from "./modal.js"
class Dashboard{
    static verificationToken(){
        if(!localStorage.KenzieToken){
            window.location.assign("../../../index.html")
        }
    }
    static logout (){
        const btnLogout = document.getElementById("btnLogout")

        btnLogout.addEventListener("click", (event) =>{
            event.preventDefault()
            localStorage.clear()
            window.location.assign("../../../index.html")
        })
    }
    static loggedUser(obj){
        const secUser   = document.getElementById("user")

        const userImg   = document.createElement("img")
        const userName  = document.createElement("h2")
        const pFollowers= document.createElement("p")
        const spanWork  = document.createElement("span")

        userImg.classList   = "imageUser"
        spanWork.classList  = "workUser"
        userName.classList  = "userName"
        pFollowers.classList= "userFollowers"

        userImg.src             = obj.image
        userName.innerText      = obj.username
        pFollowers.innerText    = ` ${obj.followers.length} Seguidores`
        spanWork.innerText      = obj.work_at

        secUser.append(userImg, userName, pFollowers, spanWork)
    }
    static renderPosts(arr){

        const ulPosts = document.getElementById("listPosts")
        ulPosts.innerHTML = ""
        arr.reverse() 
        
        arr.forEach((element) => {
            const li = document.createElement("li")

            const divUser   = document.createElement("div")
            const userImg   = document.createElement("img")
            const userName  = document.createElement("h2")
            const spanWork  = document.createElement("span")
            
            const divPost   = document.createElement("div")
            const tituloH2  = document.createElement("h2")
            const descPost  = document.createElement("p")

            const divBtns   = document.createElement("div")
            const btnOpen   = document.createElement("button")
            const numLikes  = document.createElement("p")
            const heart     = document.createElement("button")
            const heartRed  = document.createElement("img")
            const heartBlack= document.createElement("img")

            userImg.classList   = "imageUser"
            spanWork.classList  = "workUser"
            userName.classList  = "userName"

            divUser.classList   = "divUser"
            divPost.classList   = "divPost"
            divBtns.classList   = "divBtns"

            btnOpen.classList   = "buttonsGeneralBlack"
            heart.classList     = "heartBtn"

            userImg.src        = element.author.image
            userImg.alt        = "Image perfil"
            userName.innerText = element.author.username
            spanWork.innerText = element.author.work_at

            tituloH2.innerText = element.title
            descPost.innerText = element.description
            numLikes.innerText = element.likes.length

            btnOpen.innerText  = "Abrir post"
            heartRed.src       = "../assets/heartRed.png"
            heartBlack.src     = "../assets/heartBlack.png"

            btnOpen.id         = "btnOpen"
            heart.id           = element.uuid
            li.id              = "unLiked"

            heart.append(heartBlack)
            
            btnOpen.addEventListener("click", (event) => {
                event.preventDefault()
                modal.postModal(btnOpen.parentElement.parentElement)
            })

            element.likes.forEach((like) => {
                if(localStorage.KenzieUser == like.user.uuid ){
                    heart.innerHTML = ""
                    heart.append(heartRed)
                    li.id = like.uuid
                }
            })

            heart.addEventListener("click", (event)=>{
                event.preventDefault()
                if(li.id == "unLiked"){
                    const postId = {
                        post_uuid: heart.id
                       
                    }

                    heart.innerHTML = ""
                    heart.append(heartRed)

                    request.likePost(postId) 
                }else {

                    heart.innerHTML = ""
                    heart.append(heartBlack)

                    request.unlikePost(li.id)
                    li.id = "unLiked"
                }
                    
            })


            divBtns.append(btnOpen, heart, numLikes)
            divUser.append(userImg,userName,spanWork)
            divPost.append(tituloH2, descPost)
            li.append(divUser, divPost, divBtns)

            ulPosts.append(li)
        })
    }
    static objPost(){
        const titlePost   = document.getElementById("titlePost")
        const descPost    = document.getElementById("descPost")
        const btnSendPost = document.getElementById("sendPost")

        btnSendPost.addEventListener("click", (event) => {
            event.preventDefault()

            const body ={
                title: titlePost.value,
                description: descPost.value
            }
            request.createPost(body)
            
        })
        
    }
    static userSugested(arr){
        const ulSugested = document.getElementById("listSugestions")
        console.log(arr)
        ulSugested.innerHTML=""
        arr.forEach(element => {
            const li        = document.createElement("li")
        
            const userImg   = document.createElement("img")
            const userName  = document.createElement("h2")
            const spanWork  = document.createElement("span")
            const btnFollow = document.createElement("button")
            
            userImg.classList   = "imageUser"
            spanWork.classList  = "workUser"
            userName.classList  = "userName"
            btnFollow.classList = "buttonsGeneralWhite"


            userImg.src         = element.image
            userImg.alt         = "Imagem perfil"
            userName.innerText  = element.username
            spanWork.innerText  = element.work_at
            btnFollow.innerText = "Seguir"
            li.id               = "unFollow"

            element.followers.forEach(follower => {
                if(follower.followers_users_id.uuid == localStorage.KenzieUser){
                    
                    btnFollow.classList = "buttonsGeneralBlue"
                    li.id = follower.uuid
                    btnFollow.innerText ="Seguindo"
                    
                }
            })

            btnFollow.addEventListener("click", (event) =>{
                if(li.id == "unFollow"){
                    const uuidUser = {
                        following_users_uuid: element.uuid
                    }
                    request.followUser(uuidUser)
                    btnFollow.classList = "buttonsGeneralBlue"
                    btnFollow.innerText ="Seguindo"
                }else{
                    request.unfollowUser(li.id)
                    li.id = "unFollow"
                    btnFollow.classList = "buttonsGeneralWhite"
                    btnFollow.innerText = "Seguir"
                }
            })
    
            li.append(userImg, userName, spanWork, btnFollow)
            ulSugested.append(li)
        });
    }
}



export default Dashboard