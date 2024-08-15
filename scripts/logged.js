document.addEventListener("DOMContentLoaded", () =>{
    managerFunction()
});


function managerFunction(){
    $('#password').mask('ZZZZZ*0', {
        translation: {
            'Z': {
                pattern: /[A-Za-z]/,
                optional: true
            },
            '*': {
                pattern: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
                optional: true
            },
            '0': {
                pattern: /\d/,
                optional: true
            }
        }
    });
}