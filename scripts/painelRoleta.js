function printarPainelRoleta(e) {
    let contents = document.querySelectorAll(".contents-logged");
    contents.forEach(content => content.style.display = "none");
    document.querySelector(".roleta-content").style.display = "block";

    document.querySelectorAll("li").forEach(el => el.classList.remove("choose"))
    document.getElementById("roleta").classList.add("choose")

    const height = window.innerHeight;
    const descHeight = document.querySelector(".wrap-form-select-produto").clientHeight;
    const ul = document.querySelector(".roleta-content");
    ul.style.height = `${height - descHeight}px`;
    // puxar os produtos e adicionar na lista
    adicionarListaProdutos();
    buscarMathProdutos();
    drawRoleta();
}
async function adicionarListaProdutos(isMatch = null) {
    let ul = document.getElementById("ul-list-roleta");
    if (isMatch === null) {
        try {
            let produtos = await puxarProdutos();
            produtos.sort((a, b) => a.produtoDescricao.localeCompare(b.produtoDescricao, 'pt'))
            const list = produtos.map(produto =>
                `<li roleta=${produto.isRoleta} id=${produto.sku} descricao=${produto.produtoDescricao}>${produto.produtoDescricao}</li>`
            ).join('');
            ul.innerHTML = list;
            touchListRoleta(produtos);
        } catch (error) { console.log(error) }
    } else {
        let produtos = isMatch;
        produtos.sort((a, b) => a.produtoDescricao.localeCompare(b.produtoDescricao, 'pt'))
        const list = produtos.map(produto =>
            `<li roleta=${produto.isRoleta} id=${produto.sku} descricao=${produto.produtoDescricao}>${produto.produtoDescricao}</li>`
        ).join('');
        ul.innerHTML = list;
        touchListRoleta(produtos);
    }


}
function touchListRoleta(produtos) {
    const listRoleta = document.querySelectorAll(".ul-list-roleta");
    listRoleta.forEach(list => {
        list.addEventListener("click", e => {
            const sku = e.target.id;
            const descricao = e.target.innerHTML
            const produto = produtos.filter(pr => pr.sku === sku && pr.produtoDescricao === descricao)[0]
            produtoSelected = produto;
            const inputProduto = document.getElementById("select-produto");
            inputProduto.value = produto.produtoDescricao;
            btnOnOff()
        })
    })
}
async function actionBtnOnOff() {
    const btn = document.querySelector(".btn-circle");

    btn.addEventListener("click", async e => {
        if (produtoSelected === null) return
        let produto = produtoSelected;
        let isRoleta = produto.isRoleta;

        if (!isRoleta) {
            const onOff = document.querySelector(".on-off");
            e.target.style.left = "100%"
            e.target.style.transform = "translate(-100%,0)";
            e.target.style.background = "radial-gradient(circle, #4be352, #0f6313)";
            e.target.style.border = "1px solid #052e06"
            onOff.style.background = "radial-gradient(circle, #4be352, #0f6313)";
            onOff.style.border = "1px solid #052e06";
        } else {
            const onOff = document.querySelector(".on-off");
            e.target.style.left = "0"
            e.target.style.transform = "translate(0,0)";
            e.target.style.background = "radial-gradient(circle, white, #494f57)";
            e.target.style.border = "1px solid #052e06"
            onOff.style.background = "radial-gradient(circle, white, #494f57)";
            onOff.style.border = "1px solid #052e06";
        }
        isRoleta = !isRoleta
        produtoSelected.isRoleta = isRoleta;
        console.log(`fazer o contrário dessa operação ${isRoleta}`)
        await atualizarRoleta()
    })
}
async function btnOnOff() {
    let produto = produtoSelected;
    let isRoleta = produto.isRoleta;
    const btn = document.querySelector(".btn-circle");

    console.log(isRoleta)
    if (!isRoleta) { // é true ent, retirar da roleta, passar para false e atualizar  
        const onOff = document.querySelector(".on-off");
        btn.style.left = "0"
        btn.style.transform = "translate(0,0)";
        btn.style.background = "radial-gradient(circle, white, #494f57)";
        btn.style.border = "1px solid #052e06"
        onOff.style.background = "radial-gradient(circle, white, #494f57)";
        onOff.style.border = "1px solid #052e06";
    } else {
        const onOff = document.querySelector(".on-off");
        btn.style.left = "100%"
        btn.style.transform = "translate(-100%,0)";
        btn.style.background = "radial-gradient(circle, #4be352, #0f6313)";
        btn.style.border = "1px solid #052e06"
        onOff.style.background = "radial-gradient(circle, #4be352, #0f6313)";
        onOff.style.border = "1px solid #052e06";
    }
}
async function atualizarRoleta() {
    let produto = produtoSelected;
    let isRoleta = produto.isRoleta;
    const produtoAtualizado =
    {
        sku: produto.sku,
        produtoDescricao: produto.produtoDescricao,
        data: new calendario().time,
        pontos: produto.pontos,
        isRoleta
    }
    console.log(produto)
    console.log(produtoAtualizado)
    const URL_ATUALIZAR_PRODUTO = "https://bwa45br1c7.execute-api.us-east-1.amazonaws.com/v1/ProdutoPontos/Update";
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(produtoAtualizado)
    }
    try {
        await new GenerateFetch(URL_ATUALIZAR_PRODUTO, options);
        restorePainel()
    } catch (error) { console.log(error) }
}
function restorePainel() {
    const btn = document.querySelector(".btn-circle");
    const onOff = document.querySelector(".on-off");
    btn.style.left = "0"
    btn.style.transform = "translate(0,0)";
    btn.style.background = "radial-gradient(circle, white, #494f57)";
    btn.style.border = "1px solid #052e06"
    onOff.style.background = "radial-gradient(circle, white, #494f57)";
    onOff.style.border = "1px solid #052e06";
    produtoSelected = null;
    new resetarForm("select-produto-roleta");
    printarPainelRoleta()
}
function buscarMathProdutos() {
    document.getElementById("select-produto").addEventListener("keyup", e => {
        const match = e.target.value;
        const newList = arrProdutos.filter(produto => produto.produtoDescricao.toLowerCase().includes(match.toLowerCase()));
        console.log(newList);
        adicionarListaProdutos(newList)
    })
}