
let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

function atualizar() {
    let lista = document.getElementById("lista");
    lista.innerHTML = "";

    let pendentes = 0;
    let concluidas = 0;

    tarefas.forEach(function(tarefa, i) {
        let item = document.createElement("li");

        let texto = document.createElement("span");
        texto.textContent = tarefa.nome;

        if (tarefa.concluida) {
            texto.className = "concluida";
            concluidas++;
        } else {
            pendentes++;
        }

        let concluir = document.createElement("button");
        concluir.textContent = "Concluir";

        concluir.onclick = function() {
            tarefas[i].concluida = !tarefas[i].concluida;
            salvar();
        };

        let excluir = document.createElement("button");
        excluir.textContent = "Excluir";

        excluir.onclick = function() {
            tarefas.splice(i, 1);
            salvar();
        };

        item.appendChild(texto);
        item.appendChild(concluir);
        item.appendChild(excluir);

        lista.appendChild(item);
    });

    document.getElementById("total").textContent = tarefas.length;
    document.getElementById("pendentes").textContent = pendentes;
    document.getElementById("concluidas").textContent = concluidas;
}

function adicionar() {
    let campo = document.getElementById("tarefa");

    if (campo.value.trim() == "") {
        alert("Digite uma tarefa!");
        return;
    }

    tarefas.push({
        nome: campo.value,
        concluida: false
    });

    campo.value = "";
    salvar();
}

function salvar() {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
    atualizar();
}

atualizar();
