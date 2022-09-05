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
        background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
  }).showToast();
    }
}
export default Toast