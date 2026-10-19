// Dispara JS assim que o HTML foi parseado, sem esperar imagens.

document.addEventListener("DOMContentLoaded", function() {
    
    // popula valores iniciais nas tabelas

    adicionarLinha('tabHeaders', 'Content-Type', 'application/json');

    document.getElementById("btnAddParameter").addEventListener("click", function () {
        adicionarLinha('tabParameters', '', '')
    });
    document.getElementById("btnAddHeader").addEventListener("click", function () {
        adicionarLinha('tabHeaders', '', '')
    });


    // --- main content ---

    const btnRequest = document.getElementById("btnRequest");
    btnRequest.addEventListener("click", async function() {

        let url = encodeURI(document.getElementById("apiUrl").value.trim());
        document.getElementById("request").textContent = "";
        document.getElementById("response").textContent = "";

        // valida url
        if (url.length==0) {
            document.getElementById("response").textContent = "URL inválida!";
            return;
        }

        // formata parametros
        const method = document.getElementById("selMethod").value;
        const payloadText = document.getElementById("payload").value;
        let payloadObj = null;
        try {
            payloadObj = payloadText ? JSON.parse(payloadText) : null;
        } catch (e) {
            payloadObj = { erro: "Payload inválido, não é JSON válido." };
        }

        let headers = exportarJSON('tabHeaders');
        // configura o fetch
        const option = {
            method: method,
            headers: headers,
        }
        if (!['GET','HEAD'].includes(method)) {
            option["body"] = JSON.stringify(payloadText);
        }
        document.getElementById("request").textContent = `url=${url}\n` + JSON.stringify(option, null, 2);

        // do fetch
        console.log('fetch()', { url:url, option:option} )
        try {
            const overlay = document.getElementById("overlay");
            overlay.style.display = "flex";
            const resposta = await fetch(url, option);
            const dados = await resposta.json();
            document.getElementById("response").textContent = JSON.stringify(dados, null, 2);
        } catch(e) {
            document.getElementById("response").textContent = e;
        } finally {
            overlay.style.display = "none";
        }

    })

    // evento quando seleciona um novo metodo
    document.getElementById("selMethod").addEventListener("change", function() {
        const method = this.value;
        if (['GET','HEAD'].includes(method)) {
            document.getElementById("body").style.display = "none";
        } else {
            document.getElementById("body").style.display = "block";
        }
    });

    // --- overlay spinner ---

    const btn = document.getElementById("teste");
    const overlay = document.getElementById("overlay");

    btn.addEventListener("click", async () => {
        // Mostra overlay
        overlay.style.display = "flex";

        try {
            // Simula requisição (2 segundos)
            await new Promise(resolve => setTimeout(resolve, 2000));
        } catch (err) {
            alert("Erro na requisição!");
        } finally {

        // Esconde overlay
        overlay.style.display = "none";
        }
    });


    // --- input + dropdown customizado ---

    // Seleciona todos os dropdowns da página
    const dropdowns = document.querySelectorAll(".inputdropdown");

    dropdowns.forEach(drop => {
        const input = drop.querySelector("input");
        const arrow = drop.querySelector(".arrow");
        const menu = drop.querySelector(".dropdown");

        // Alterna visibilidade ao clicar na seta
        arrow.addEventListener("click", () => {
            menu.style.display = menu.style.display === "block" ? "none" : "block";
        });

        // Seleciona opção
        menu.querySelectorAll("div").forEach(item => {
            item.addEventListener("click", () => {
                input.value = item.textContent;
                menu.style.display = "none";
            });
        });
    });

    // Fecha qualquer dropdown se clicar fora
    document.addEventListener("click", (e) => {
        if (!e.target.closest(".inputdropdown")) {
            document.querySelectorAll(".dropdown").forEach(menu => {
                menu.style.display = "none";
            });
        }
    });


    // --- tabela chave/valor ---

    function adicionarLinha(tableId, novaChave, novoValor) {
        const tabela = document.getElementById(tableId).querySelector("tbody");
        const novaLinha = document.createElement("tr");

        const tdChave = document.createElement("td");
        const inputChave = document.createElement("input");
        inputChave.type = "text";
        inputChave.placeholder = "Chave";
        if (novaChave.length>0) inputChave.value = novaChave;
        tdChave.appendChild(inputChave);

        const tdValor = document.createElement("td");
        const inputValor = document.createElement("input");
        inputValor.type = "text";
        inputValor.placeholder = "Valor";
        if (novoValor.length>0) inputValor.value = novoValor;
        tdValor.appendChild(inputValor);

        const tdAcao = document.createElement("td");
        const btnMenos = document.createElement("button");
        btnMenos.textContent = "🗑️";
        btnMenos.onclick = () => {
            novaLinha.remove(); // remove a linha atual
        };
        tdAcao.appendChild(btnMenos);

        novaLinha.appendChild(tdChave);
        novaLinha.appendChild(tdValor);
        novaLinha.appendChild(tdAcao);
        tabela.appendChild(novaLinha);
    }

    function exportarJSON(tableId) {
        const linhas = document.querySelectorAll(`#${tableId} tbody tr`);
        const obj = {};
        linhas.forEach(linha => {
            const chave = linha.querySelector("td:nth-child(1) input").value.trim();
            const valor = linha.querySelector("td:nth-child(2) input").value.trim();
            if (chave) { // só inclui se tiver chave
                obj[chave] = valor;
            }
        })
        return obj;
    }

})
