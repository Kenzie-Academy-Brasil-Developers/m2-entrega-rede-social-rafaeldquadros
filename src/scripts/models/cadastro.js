import request from "./request.js"
class Cadastro{
    static buttonsHeaderC(){
        const btnLoginPage      = document.getElementById("btnLoginPage")
        const btnRegisterPage   = document.getElementById("btnRegisterPage")
        console.log(btnLoginPage, btnRegisterPage)
        btnLoginPage.addEventListener("click", (event) =>{
            event.preventDefault()
            window.location.assign("../../index.html")
        })
        btnRegisterPage.addEventListener("click", (event) =>{
            event.preventDefault()
            window.location.assign("../pages/cadastro.html")
        })
    }
    static criandoCadastro(){
        const inputName     = document.getElementById("inputNameC")
        const inputEmail    = document.getElementById("inputEmailC")
        const inputSenha    = document.getElementById("inputSenhaC")
        const inputWork     = document.getElementById("inputWorkC")
        const inputImg      = document.getElementById("inputImgC")
        const btnRegister   = document.getElementById("btnRegister")
        const btnPgLogin    = document.getElementById("btnIrPgLogin")

        btnRegister.addEventListener("click", (event) => {
            event.preventDefault()

            let body = {
                username: inputName.value,
                email: inputEmail.value, 
                password: inputSenha.value,
                work_at: inputWork.value,
                image: inputImg.value,
            }
            request.cadastroRequest(body)
        })

        btnPgLogin.addEventListener("click", (event) =>{
            event.preventDefault()
            window.location.assign("../../../index.html")
        })
    }
}
Cadastro.criandoCadastro()
Cadastro.buttonsHeaderC()