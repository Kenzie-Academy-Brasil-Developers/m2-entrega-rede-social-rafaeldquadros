import dashboard from "./models/dashboard.js"
import request from "./models/request.js"
import modal  from "./models/modal.js"
import toast from "./models/toast.js"

toast.toastErro("Login realizado com sucesso!")

dashboard.verificationToken()
dashboard.logout ()
dashboard.objPost()

request.dadosUser()
request.posts()
request.sugestUsers()

