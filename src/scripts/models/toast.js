class Toast {
    static toastErro (erro){
    Toastify({
        text: erro,
        duration: 3000,
        close: true,
        gravity: "top",
        position: "center", 
        stopOnFocus: true, 
        style: {
        background: "linear-gradient(to right, #4263EB, #4263EB)",
        },
  }).showToast();
    }
}
export default Toast