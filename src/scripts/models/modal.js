class Modal{
    static postModal(tag){
        console.log(tag)
        const body      = document.querySelector("body")

        const divBackground = document.createElement("div")
        
        const divModal  = document.createElement("div")

        const divUser   = document.createElement("div")
        const userImg   = document.createElement("img")
        const userName  = document.createElement("h2")
        const spanWork  = document.createElement("span")

        const tituloH2  = document.createElement("h2")
        const descPost  = document.createElement("p")

        const btnClose  = document.createElement("button")

        divBackground.classList = "divModalBG"
        divModal.classList  = "divModal"
        divUser.classList   = "divUserModal"
        userImg.classList   = "imageUser"
        spanWork.classList  = "workUser"
        userName.classList  = "userName"

        
        userImg.src         = tag.children[0].children[0].src
        userName.innerText  = tag.children[0].children[1].innerText
        spanWork.innerText  = tag.children[0].children[2].innerText

        tituloH2.innerText  = tag.children[1].children[0].innerText
        descPost.innerText  = tag.children[1].children[1].innerText

        btnClose.innerText  = "X"
        
        btnClose.addEventListener("click", (event) =>{
            divBackground.remove()
        })

        divUser.append(userImg, userName, spanWork)
        divModal.append(divUser, tituloH2, descPost, btnClose)
        divBackground.append(divModal)

        body.append(divBackground)
        

        console.log(tag.children)
    }
}

export default Modal