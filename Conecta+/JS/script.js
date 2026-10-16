
let servicos = [
    { nome: "Suporte técnico", categoria: "Tecnologia" },
    { nome: "Instalação de programas", categoria: "Tecnologia" },
    { nome: "Emissão de documentos", categoria: "Documentos" },
    { nome: "Solicitação de documentos", categoria: "Documentos" },
    { nome: "Manutenção de equipamentos", categoria: "Manutenção" }
];

let solicitacoes = JSON.parse(localStorage.getItem("solicitacoes")) || [];

function salvar() {
    localStorage.setItem("solicitacoes", JSON.stringify(solicitacoes));
}

// CATÁLOGO DE SERVIÇOS

function mostrarServicos() {
    let catalogo = document.getElementById("catalogo");

    if (!catalogo) return;

    catalogo.innerHTML = "";

    let busca = document.getElementById("busca").value.toLowerCase();
    let categoria = document.getElementById("categoria").value;

    servicos.forEach(function(servico) {
        if (
            servico.nome.toLowerCase().includes(busca) &&
            (categoria == "Todas" || servico.categoria == categoria)
        ) {
            catalogo.innerHTML += `
                <div class="card">
                    <h3>${servico.nome}</h3>
                    <p>Categoria: ${servico.categoria}</p>
                    <a href="solicitacao.html">Solicitar serviço</a>
                </div>
            `;
        }
    });
}

if (document.getElementById("catalogo")) {
    document.getElementById("busca").addEventListener("input", mostrarServicos);
    document.getElementById("categoria").addEventListener("change", mostrarServicos);
    mostrarServicos();
}

// CADASTRO DE SOLICITAÇÕES

let form = document.getElementById("formSolicitacao");

if (form) {
    form.addEventListener("submit", function(event) {
        event.preventDefault();

        let servico = document.getElementById("servico").value;
        let descricao = document.getElementById("descricao").value.trim();

        if (servico == "" || descricao == "") {
            document.getElementById("mensagem").textContent =
                "Preencha todos os campos.";
            return;
        }

        let novaSolicitacao = {
            protocolo: Date.now(),
            data: new Date().toLocaleDateString("pt-BR"),
            servico: servico,
            descricao: descricao,
            status: "Pendente"
        };

        solicitacoes.push(novaSolicitacao);
        salvar();

        document.getElementById("mensagem").textContent =
            "Solicitação cadastrada! Protocolo: " + novaSolicitacao.protocolo;

        form.reset();
    });
}

// PAINEL DE SOLICITAÇÕES

function mostrarSolicitacoes() {
    let painel = document.getElementById("solicitacoes");

    if (!painel) return;

    painel.innerHTML = "";

    let filtro = document.getElementById("filtroStatus").value;

    let encontradas = solicitacoes.filter(function(s) {
        return filtro == "Todas" || s.status == filtro;
    });

    if (encontradas.length == 0) {
        painel.innerHTML = "<p>Nenhuma solicitação encontrada.</p>";
    }

    encontradas.forEach(function(s) {
        painel.innerHTML += `
            <div class="solicitacao">
                <h3>${s.servico}</h3>
                <p><strong>Protocolo:</strong> ${s.protocolo}</p>
                <p><strong>Data:</strong> ${s.data}</p>
                <p><strong>Descrição:</strong> ${s.descricao}</p>
                <p><strong>Status:</strong> ${s.status}</p>

                <label>Atualizar status:</label>
                <select onchange="mudarStatus(${s.protocolo}, this.value)">
                    <option value="Pendente" ${s.status == "Pendente" ? "selected" : ""}>Pendente</option>
                    <option value="Em andamento" ${s.status == "Em andamento" ? "selected" : ""}>Em andamento</option>
                    <option value="Concluída" ${s.status == "Concluída" ? "selected" : ""}>Concluída</option>
                </select>
            </div>
        `;
    });
}

function mudarStatus(protocolo, novoStatus) {
    solicitacoes.forEach(function(s) {
        if (s.protocolo == protocolo) {
            s.status = novoStatus;
        }
    });

    salvar();
    mostrarSolicitacoes();
}

if (document.getElementById("filtroStatus")) {
    document.getElementById("filtroStatus").addEventListener("change", mostrarSolicitacoes);
    mostrarSolicitacoes();
}
