document.addEventListener("DOMContentLoaded", () => {
    carregarDados();

    const formCadastro = document.getElementById("form-cadastro");
    const formAgendamento = document.getElementById("form-agendamento");
    const filtroPaciente = document.getElementById("filtro-paciente");

    if (formCadastro) {
        formCadastro.addEventListener("submit", (e) => {
            e.preventDefault();

            const nome = formCadastro.querySelector('input[name="nome"]').value;
            const especialidade = formCadastro.querySelector('input[name="especialidade"]').value;
            const membros = formCadastro.querySelector('input[name="membros"]').value;
            const lider = formCadastro.querySelector('input[name="lider"]').value;

            const medicos = JSON.parse(localStorage.getItem("medicos")) || [];
            medicos.push({ nome, especialidade, membros, lider });
            localStorage.setItem("medicos", JSON.stringify(medicos));

            alert("Equipe cadastrada com sucesso!");
            formCadastro.reset();
        });
    }

    if (formAgendamento) {
        formAgendamento.addEventListener("submit", (e) => {
            e.preventDefault();

            const paciente = formAgendamento.querySelector('input[name="paciente"]').value;
            const medico = formAgendamento.querySelector('select[name="medico"]').value;
            const data = formAgendamento.querySelector('input[name="data"]').value;

            const consultas = JSON.parse(localStorage.getItem("consultas")) || [];
            consultas.push({ paciente, medico, data, problema: "" }); // Adiciona problema vazio inicialmente
            localStorage.setItem("consultas", JSON.stringify(consultas));

            alert("Agendamento realizado com sucesso!");
            formAgendamento.reset();
        });
    }

    if (filtroPaciente) {
        filtroPaciente.addEventListener("input", (e) => {
            const valorFiltro = e.target.value.toLowerCase();
            filtrarProntuarios(valorFiltro);
        });
    }
});

// Carregar médicos no dropdown e exibir prontuário
function carregarDados() {
    const medicoSelect = document.getElementById("medico");

    if (medicoSelect) {
        medicoSelect.innerHTML = '<option value="">Selecione um médico</option>';

        medicos.forEach((medico) => {
            const option = document.createElement("option");
            option.value = medico.nome;
            option.textContent = `${medico.nome} - ${medico.especialidade}`;
            medicoSelect.appendChild(option);
        });
    }

    exibirProntuarios();
}

// Exibir prontuários na tabela
function exibirProntuarios(filtro = "") {
    const tabelaProntuarios = document.getElementById("tabela-prontuarios");
    if (tabelaProntuarios) {
        const tbody = tabelaProntuarios.querySelector("tbody");
        const consultas = JSON.parse(localStorage.getItem("consultas")) || [];

        tbody.innerHTML = ""; // Limpa a tabela antes de preenchê-la
        consultas
            .filter((consulta) =>
                consulta.paciente.toLowerCase().includes(filtro) // Aplica o filtro
            )
            .forEach((consulta, index) => {
                const tr = document.createElement("tr");

                tr.innerHTML = `
                    <td>${consulta.paciente}</td>
                    <td>${consulta.medico}</td>
                    <td>${consulta.data}</td>
                    <td>
                        <textarea data-index="${index}" class="campo-problema">${consulta.problema}</textarea>
                    </td>
                    <td>
                        <button data-index="${index}" class="btn-salvar">Salvar</button>
                        <button data-index="${index}" class="btn-excluir">Excluir</button>
                    </td>
                `;

                tbody.appendChild(tr);
            });

        // Adicionar eventos para os botões de salvar e excluir
        tbody.querySelectorAll(".btn-salvar").forEach((button) => {
            button.addEventListener("click", (e) => {
                const index = e.target.getAttribute("data-index");
                const textarea = document.querySelector(`textarea[data-index="${index}"]`);
                salvarProblema(index, textarea.value);
            });
        });

        tbody.querySelectorAll(".btn-excluir").forEach((button) => {
            button.addEventListener("click", (e) => {
                const index = e.target.getAttribute("data-index");
                excluirAgendamento(index);
            });
        });
    }
}

// Salvar o problema no localStorage
function salvarProblema(index, problema) {
    const consultas = JSON.parse(localStorage.getItem("consultas")) || [];
    consultas[index].problema = problema;
    localStorage.setItem("consultas", JSON.stringify(consultas));
    alert("Problema salvo com sucesso!");
}

// Excluir um agendamento do localStorage
function excluirAgendamento(index) {
    const consultas = JSON.parse(localStorage.getItem("consultas")) || [];
    consultas.splice(index, 1); // Remove o agendamento da lista
    localStorage.setItem("consultas", JSON.stringify(consultas));
    alert("Agendamento excluído com sucesso!");
    exibirProntuarios(); // Atualiza a tabela
}

// Filtrar prontuários pelo nome do paciente
function filtrarProntuarios(valorFiltro) {
    exibirProntuarios(valorFiltro);
}

// Gerar campos para médicos de acordo com o número de membros// Gerar campos para médicos de acordo com o número de membros
document.getElementById("membros").addEventListener("input", () => {
    const numMembros = document.getElementById("membros").value;
    const membrosLista = document.getElementById("membros-lista");
    membrosLista.innerHTML = ""; // Limpar os campos anteriores

    if (numMembros > 0) {
        for (let i = 1; i <= numMembros; i++) {
            const div = document.createElement("div");
            div.classList.add("campo-membro");

            const label = document.createElement("label");
            label.setAttribute("for", `medico${i}`);
            label.textContent = `Médico ${i}`;

            const select = document.createElement("select");
            select.name = `medico${i}`;
            select.id = `medico${i}`;

            // Preencher a lista de médicos cadastrados
            medicos.forEach((medico) => {
                const option = document.createElement("option");
                option.value = medico.id;
                option.textContent = `${medico.nome} - ${medico.especialidade}`;
                select.appendChild(option);
            });

            div.appendChild(label);
            div.appendChild(select);

            membrosLista.appendChild(div);
        }
    }
});