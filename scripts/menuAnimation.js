document.addEventListener("DOMContentLoaded", () => {   
    let largura = window.innerWidth;    
    // if(largura <= 768) menu();
    menu();

    onResize();
});





function onResize() {
    window.addEventListener('resize', () => {                  
        let largura =  window.innerWidth;
        if(largura <= 768) menu();

    });
}

function menu() {    
    const barMobile = document.getElementById("bar-mobile");
    let headerMobile = document.querySelector(".header-mobile");
    let altFinal = headerMobile.clientHeight;
    let alt = barMobile.clientHeight;
    
    headerMobile.style.height = `${alt}px`
    clickSandwich(altFinal);
}
function clickSandwich(altFinal) {

    let menu = document.getElementById("menu-mobile");
    menu.addEventListener("click", () => {
        toogBar(altFinal);
    })
}
function toogBar(altFinalPar) {
    const barMobile = document.getElementById("bar-mobile");
    let headerMobile = document.querySelector(".header-mobile");
    let altFinal = headerMobile.clientHeight;
    let alt = barMobile.clientHeight;

    console.log(altFinalPar, altFinal)
    if (altFinalPar > altFinal) {
        let id = setInterval(frame, 1);
        function frame() {
            if (alt == altFinalPar) {
                clearInterval(id);
            } else {
                alt += 5;
                if (alt > altFinalPar) alt = altFinalPar
                headerMobile.style.height = `${alt}px`;
            }
        }
    } else {
        let id = setInterval(frame, 1);
        alt = barMobile.clientHeight;
        function frame() {            
            if (altFinal == alt) {
                clearInterval(id);
            } else {
                altFinal -= 5;
                if (altFinal < alt) altFinal = alt
                headerMobile.style.height = `${altFinal}px`;
            }
        }
    }


}