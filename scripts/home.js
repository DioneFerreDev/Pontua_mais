document.addEventListener("DOMContentLoaded", () => {
    playHome();
});



function playHome() {
    maskMoney()
    login();
   
}
function maskMoney(){
    $('#box-pontos').mask("#.##0,00", {reverse: true});
}
function login() {
    const login = document.getElementById("login");
    const entrar = document.getElementById("entrar");


    // voltar aqui para inserir no home
    // login.addEventListener("click", () => {
    //     let overlay = document.getElementById("overlay");
    //     overlay.style.display = "flex";
    // })
    // const circleX = document.querySelector(".circle-x");

    // circleX.addEventListener("click", () => {
    //     let overlay = document.getElementById("overlay");
    //     overlay.style.display = "none";
    // })

    entrar.addEventListener("click", async e => {
        e.preventDefault();
        const user = document.getElementById("user").value;
        const password = document.getElementById("password").value;

        try {
            const URL = `https://bwa45br1c7.execute-api.us-east-1.amazonaws.com/v1/UserLogin/${user},${password}`;
            const admin = await new GenerateFetch(URL);
            const pannel = document.querySelector(".message-pannel");

            if (admin.status === 404) {
                pannel.innerHTML = "Admin não encontrado";
                pannel.style.opacity = 1;
            } else if (admin.status === 400) {
                pannel.innerHTML = "Um ou mais campos não preenchido(s)!";
                pannel.style.opacity = 1
            } else {
                console.log("fazer o redirecionamento")
                // fazer aqui o token do do admin tipo localstorage
                // provisoriamente com localstorage, mas conversar para fazer com jwt
                localStorage.setItem("admin", true);
                localStorage.setItem("user", admin.user)


                window.location.href = "./pages/admin.html";
            }

        } catch (error) { console.log(error) }

    })
}
async function enviarValor() {

    try {
        const URL_PONTOS = `https://bwa45br1c7.execute-api.us-east-1.amazonaws.com/v1/Cliente/PontosTemp?pontos=54`;
        new GenerateFetch()
    } catch (error) { console.log(error) }

    const valor = 123; // Valor a ser enviado dinamicamente

    // Cria ou conecta ao canal chamado 'meuCanal'
    const channel = new BroadcastChannel('meuCanal');

    // Envia o valor pelo canal
    channel.postMessage(valor);

}
function teste() {
    let horarios = [
        { data: "10/07/2024 10:35:38" },
        { data: "30/12/2023 00:50:55" },
        { data: "05/12/2024 18:28:25" },
        { data: "10/07/2024 10:42:38" }
    ];

    // Função para converter a string de data em objeto Date
    function parseDate(str) {
        var parts = str.split(/[\s/:]/);
        // new Date(ano, mes-1, dia, hora, minuto, segundo)
        return new Date(parts[2], parts[1] - 1, parts[0], parts[3], parts[4], parts[5]);
    }

    // Ordenando o array por data mais recente para a mais antiga
    horarios.sort(function (a, b) {
        var dateA = parseDate(a.data);
        var dateB = parseDate(b.data);
        if (dateA > dateB) return -1;
        if (dateA < dateB) return 1;
        return 0;
    });

    // console.log(horarios);

    let times = [
        { data: "10/07/2024 10:35:38" },
        { data: "30/12/2023 00:50" },
        { data: "05/12/2024 18:28:25" },
        { data: "10/07/2024 10:42:38" }
    ];        
    function parseDates(str) {
        const parts = str.split(/[\s/:]/);
        // ano, mês -1, dia, hora,minuto, segundo
        if (parts.length === 6)
            return new Date(parts[2], parts[1] - 1, parts[0], parts[3], parts[4], parts[5]);
        return new Date(parts[2], parts[1] - 1, parts[0], parts[3], parts[4]);
    }
    times.sort((a, b) => {
        const dateA = parseDates(a.data)
        const dateB = parseDates(b.data)

        return dateB - dateA
    });
}