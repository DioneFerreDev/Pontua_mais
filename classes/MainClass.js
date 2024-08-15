
class GenerateFetch {
    constructor(URL, prop = null, returnJson = null) {
        return this.fetch(URL, prop, returnJson)
    }

    fetch(URL, prop, returnJson) {
        if (prop === null) {
            return fetch(URL)
                .then(res => res.json())
                .then(obj => {
                    return obj
                })
                .catch(error => {
                    console.error('Erro ao fazer requisição:', error)
                    throw error;
                });
        } else {
            console.log(URL, prop)
            return fetch(URL, prop)
                .then(res => {
                    if (returnJson) {
                        console.log('Status da resposta:', res.status); return res.json()
                            .then(result => result)                            
                    } else {                        
                        return res.status                            
                    }
                })
                .catch(error => {
                    console.log(error);
                    throw error;
                })
        }
    }
}

class ReorganizarAlfabeticamente {

    constructor(items) {
        items.sort(function (a, b) {
            if (a.descricao === undefined) {
                if (a.marca > b.marca) {
                    return 1;
                }
                if (a.marca < b.marca) {
                    return -1;
                }
                return 0;
            } else {
                if (a.descricao > b.descricao) {
                    return 1;
                }
                if (a.descricao < b.descricao) {
                    return -1;
                }
                return 0;
            }
        })

        return items
    }

}

class confirmation {
    constructor(query) {
        this.result = this.ask(query)
    }
    ask(query) {
        return confirm(query)
    }
}
class resetarForm {
    constructor(formID) {
        let form = document.getElementById(formID);
        form.reset();
    }
}
class autoComplete {
    constructor(arr, idInput) {
        this.playSujestao(arr, idInput)
    }
    playSujestao(arr, idInput) {
        // Array com sugestões estáticas
        let sugestoes = arr.map(valor => valor)

        // Selecionar o input onde será aplicado o autocomplete        
        $('#' + idInput).autocomplete({
            source: sugestoes
        });
    }
}
class calendario {
    constructor() {
        this.timeNow();
    }
    timeNow() {
        const dataAtual = new Date();

        // Formatando a data e hora para o fuso horário do Brasil (GMT-3)
        const options = { timeZone: 'America/Sao_Paulo' };
        let dataHoraBrasil = dataAtual.toLocaleString('pt-BR', options);

        dataHoraBrasil = dataHoraBrasil.replace(/\,/g, "");

        this.time = dataHoraBrasil
    }
}
