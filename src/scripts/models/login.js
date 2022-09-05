import request from "./request.js"
class Login {
    static buttonsHeader(){
        const btnLoginPage      = document.getElementById("btnLoginPage")
        const btnRegisterPage   = document.getElementById("btnRegisterPage")
        console.log(btnLoginPage, btnRegisterPage)
        btnLoginPage.addEventListener("click", (event) =>{
            event.preventDefault()
            window.location.assign("../../index.html")
        })
        btnRegisterPage.addEventListener("click", (event) =>{
            event.preventDefault()
            window.location.assign("./src/pages/cadastro.html")
        })
    }

    static inputsLogin(){
        const inputEmail    = document.getElementById("emailLogin")
        const inputSenha    = document.getElementById("senhaLogin")
        const btnLogin      = document.getElementById("btnLogin")
        const btnIrCadastro = document.getElementById("irPgCadastrar")

        btnLogin.addEventListener("click", (event) =>{
            event.preventDefault()
            
            const body = {
                    email: inputEmail.value, 
                    password: inputSenha.value,
            }
            request.loginRequest(body)
        })

        btnIrCadastro.addEventListener("click", (event) =>{
            event.preventDefault()
            console.log(event)
            window.location.assign("./src/pages/cadastro.html")
        })
    }
}

export default Login