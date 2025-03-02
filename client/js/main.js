async function main() {
    try {
        const response = await fetch("http://localhost:3000/vaga");
        const data = await response.json();
        if (data.success) {
            const vagaLista = document.getElementById("vaga-lista");
            const setores = {};

            data.data.forEach(item => {
                if (!setores[item.setor]) {
                    setores[item.setor] = [];
                }
                setores[item.setor].push(item);
            });

            for (const setor in setores) {
                const setorHeader = document.createElement("h3");
                setorHeader.className = "col-12 mt-4 setor-header";
                setorHeader.textContent = `Setor ${setor}`;
                vagaLista.appendChild(setorHeader);

                setores[setor].forEach(item => {
                    const dataHoraEntrada = new Date(item.dataHoraEntrada);
                    const dataHoraEntradaFormatada = `${dataHoraEntrada.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })}, ${dataHoraEntrada.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`;
                    item.dataHoraEntrada = dataHoraEntradaFormatada === 'Invalid Date' ? '-' : dataHoraEntradaFormatada;

                    const card = document.createElement("div");
                    card.className = "col-md-4 mb-4";
                    card.innerHTML = `
                        <div class="card">
                            <div class="card-header d-flex justify-content-between align-items-center">
                                <div class="d-flex align-items-center gap-2">
                                    <span>Vaga ${item.setor}${item.numeracao < 10 ? '0' : ''}${item.numeracao}</span>
                                    ${item.eVagaEspecial ? '<span class="badge badge-especial">Especial</span>' : ''}
                                </div>
                                <i class="fas fa-history" onclick="verHistorico(${item.idVaga})" style="cursor: pointer;"></i>
                            </div>
                            <div class="card-body">
                                ${item.placa ? `
                                    <p class="linha-card"><span><i class="fas fa-car"></i> Placa:</span> ${item.placa}</p>
                                    <p class="linha-card"><span><i class="fas fa-industry"></i> Marca:</span> ${item.marca}</p>
                                    <p class="linha-card"><span><i class="fas fa-car-side"></i> Modelo:</span> ${item.modelo}</p>
                                    <p class="linha-card"><span><i class="fas fa-palette"></i> Cor:</span> ${item.cor}</p>
                                    <p class="linha-card"><span><i class="fas fa-clock"></i> Entrada:</span> ${item.dataHoraEntrada}</p>
                                    <div class="d-flex justify-content-between gap-2">
                                        <button class="btn btn-secondary flex-fill" onclick="editarCarro(${item.idCarro})">Editar Carro</button>
                                        <button class="btn btn-danger flex-fill" onclick="confirmarRemocao(${item.idCarro})">Remover Carro</button>
                                    </div>
                                ` : `<h5 class="vaga-disponivel">Vaga Disponível</h5>
                                <h6 class="vaga-disponivel-texto">Esta vaga está disponível para o cadastro de um carro.</h6>
                                <button class="btn btn-primary btn-full-width bot-cadastrar-carro" data-bs-toggle="modal" data-bs-target="#cadastroCarroModal" onclick="setVagaId(${item.idVaga}, 'Vaga ${item.setor}${item.numeracao < 10 ? '0' : ''}${item.numeracao}')">Cadastrar Carro</button>`}
                            </div>
                        </div>`;
                    vagaLista.appendChild(card);
                });
            }
        }
    } catch (err) {
        alert("Erro ao buscar os carros.");
    }

    const dataEntrada = document.getElementById('dataEntrada');
    const dataEntradaIcon = document.getElementById('dataEntradaIcon');
    const horaEntrada = document.getElementById('horaEntrada');

    const picker = new Pikaday({
        field: dataEntrada,
        format: 'DD/MM/YYYY',
        i18n: {
            previousMonth: 'Mês Anterior',
            nextMonth: 'Próximo Mês',
            months: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
            weekdays: ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'],
            weekdaysShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
        },
        defaultDate: new Date(),
        setDefaultDate: true,
        toString(date, format) {
            const dia = (`0${date.getDate()}`).slice(-2);
            const mes = (`0${date.getMonth() + 1}`).slice(-2);
            const ano = date.getFullYear();
            return `${dia}/${mes}/${ano}`;
        }
    });

    dataEntradaIcon.addEventListener('click', () => {
        picker.show();
    });

    horaEntrada.value = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    horaEntrada.addEventListener('input', () => {
        horaEntrada.value = horaEntrada.value.replace(/[^0-9:]/g, '').replace(/(\..*)\./g, '$1');
        if (horaEntrada.value.length === 2 && !horaEntrada.value.includes(':')) {
            horaEntrada.value += ':';
        }
    });
}

main();

function setVagaId(idVaga, vagaLabel) {
    reiniciarFormularioModal();
    document.getElementById('idVaga').value = idVaga;
    document.getElementById('btnCadastrar').textContent = `Cadastrar - ${vagaLabel}`;
}

let idCarroParaRemover;

function confirmarRemocao(idCarro) {
    idCarroParaRemover = idCarro;
    const confirmacaoRemocaoModal = new bootstrap.Modal(document.getElementById('confirmacaoRemocaoModal'));
    confirmacaoRemocaoModal.show();
}

document.getElementById('btnConfirmarRemocao').addEventListener('click', async function() {
    try {
        const response = await fetch(`http://localhost:3000/carro/retirar/${idCarroParaRemover}`, {
            method: 'PUT'
        });
        const data = await response.json();
        if (data.success) {
            location.reload();
        } else {
            alert('Erro ao retirar carro da vaga.');
        }
    } catch (err) {
        alert('Erro ao retirar carro da vaga.');
    }
});

document.getElementById('cadastroCarroForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const idCarro = document.getElementById('idCarro').value;
    const idVaga = document.getElementById('idVaga').value;
    const placa = document.getElementById('placa').value;
    const marca = document.getElementById('marca').value;
    const modelo = document.getElementById('modelo').value;
    const cor = document.getElementById('cor').value;
    const dataEntrada = document.getElementById('dataEntrada').value;
    const horaEntrada = document.getElementById('horaEntrada').value;

    if (!validarHorario(horaEntrada)) {
        alert('Por favor, insira um horário válido.');
        return;
    }

    const [dia, mes, ano] = dataEntrada.split('/');
    const dataHoraEntrada = `${ano}-${mes}-${dia} ${horaEntrada}:00`;

    try {
        const method = idCarro ? 'PUT' : 'POST';
        const url = 'http://localhost:3000/carro';
        const body = idCarro ? { placa, marca, modelo, cor, dataHoraEntrada, idVaga, idCarro } : { placa, marca, modelo, cor, dataHoraEntrada, idVaga };
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        const data = await response.json();
        if (data.success) {
            location.reload();
        } else {
            alert(idCarro ? 'Erro ao atualizar carro.' : 'Erro ao cadastrar carro.');
        }
    } catch (err) {
        alert(idCarro ? 'Erro ao atualizar carro.' : 'Erro ao cadastrar carro.');
    }
});

async function editarCarro(idCarro) {
    try {
        const response = await fetch(`http://localhost:3000/carro/${idCarro}`);
        const data = await response.json();
        if (data.success) {
            const carro = data.data;
            const dataHoraEntrada = new Date(carro.dataHoraEntrada);
            const dia = (`0${dataHoraEntrada.getDate()}`).slice(-2);
            const mes = (`0${dataHoraEntrada.getMonth() + 1}`).slice(-2);
            const ano = dataHoraEntrada.getFullYear();
            const dataEntradaFormatada = `${dia}/${mes}/${ano}`;
            const horas = (`0${dataHoraEntrada.getHours()}`).slice(-2);
            const minutos = (`0${dataHoraEntrada.getMinutes()}`).slice(-2);
            const horaEntradaFormatada = `${horas}:${minutos}`;

            document.getElementById('placa').value = carro.placa;
            document.getElementById('marca').value = carro.marca;
            document.getElementById('modelo').value = carro.modelo;
            document.getElementById('cor').value = carro.cor;
            document.getElementById('dataEntrada').value = dataEntradaFormatada;
            document.getElementById('horaEntrada').value = horaEntradaFormatada;
            document.getElementById('idVaga').value = carro.idVaga;
            document.getElementById('idCarro').value = carro.idCarro;
            document.getElementById('cadastroCarroModalTitulo').textContent = 'Edição de Carro';
            document.getElementById('cadastroCarroModalDescricao').textContent = 'Edite o veículo no estacionamento, preenchendo o formulário abaixo com as informações necessárias.';
            document.getElementById('btnCadastrar').textContent = 'Atualizar';
            const cadastroCarroModal = new bootstrap.Modal(document.getElementById('cadastroCarroModal'));
            cadastroCarroModal.show();
        }
    } catch (err) {
        alert('Erro ao buscar carro.');
    }
}

async function verHistoricoGeral() {
    try {
        const response = await fetch('http://localhost:3000/carro');
        const data = await response.json();
        const historicoGeralTabela = document.getElementById('historicoGeralTabela');
        historicoGeralTabela.innerHTML = '';

        if (data.success && data.data.length > 0) {
            data.data.forEach(carro => {
                const dataHoraEntrada = new Date(carro.dataHoraEntrada);
                const dataHoraSaida = carro.dataHoraSaida ? new Date(carro.dataHoraSaida) : null;

                const entradaFormatada = `${dataHoraEntrada.toLocaleDateString('pt-BR')} ${dataHoraEntrada.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`;
                const saidaFormatada = dataHoraSaida ? `${dataHoraSaida.toLocaleDateString('pt-BR')} ${dataHoraSaida.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}` : '-';
                const vagaFormatada = `${carro.setor}${carro.numeracao < 10 ? '0' : ''}${carro.numeracao}`;

                const linha = `
                    <tr>
                        <td>${vagaFormatada}</td>
                        <td>${carro.placa}</td>
                        <td>${carro.marca}</td>
                        <td>${carro.modelo}</td>
                        <td>${carro.cor}</td>
                        <td>${entradaFormatada}</td>
                        <td>${saidaFormatada}</td>
                    </tr>
                `;
                historicoGeralTabela.innerHTML += linha;
            });
        } else {
            historicoGeralTabela.innerHTML = '<tr><td colspan="7" class="text-center">Nenhum histórico encontrado.</td></tr>';
        }

        const historicoGeralModal = new bootstrap.Modal(document.getElementById('historicoGeralModal'));
        historicoGeralModal.show();
    } catch (err) {
        alert('Erro ao buscar histórico geral.');
    }
}

async function verHistorico(idVaga) {
    try {
        const response = await fetch(`http://localhost:3000/carro/vaga/${idVaga}`);
        const data = await response.json();
        const historicoVagaTabela = document.getElementById('historicoVagaTabela');
        historicoVagaTabela.innerHTML = '';

        if (data.success && data.data.length > 0) {
            data.data.forEach(carro => {
                const dataHoraEntrada = new Date(carro.dataHoraEntrada);
                const dataHoraSaida = carro.dataHoraSaida ? new Date(carro.dataHoraSaida) : null;

                const entradaFormatada = `${dataHoraEntrada.toLocaleDateString('pt-BR')} ${dataHoraEntrada.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`;
                const saidaFormatada = dataHoraSaida ? `${dataHoraSaida.toLocaleDateString('pt-BR')} ${dataHoraSaida.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}` : '-';

                const linha = `
                    <tr>
                        <td>${carro.placa}</td>
                        <td>${carro.marca}</td>
                        <td>${carro.modelo}</td>
                        <td>${carro.cor}</td>
                        <td>${entradaFormatada}</td>
                        <td>${saidaFormatada}</td>
                    </tr>
                `;
                historicoVagaTabela.innerHTML += linha;
            });
        } else {
            historicoVagaTabela.innerHTML = '<tr><td colspan="6" class="text-center">Nenhum histórico encontrado para esta vaga.</td></tr>';
        }

        const historicoVagaModal = new bootstrap.Modal(document.getElementById('historicoVagaModal'));
        historicoVagaModal.show();
    } catch (err) {
        alert('Erro ao buscar histórico da vaga:');
    }
}

function reiniciarFormularioModal() {
    document.getElementById('cadastroCarroForm').reset();
    document.getElementById('idCarro').value = '';
    document.getElementById('cadastroCarroModalTitulo').textContent = 'Cadastro de Carro';
    document.getElementById('cadastroCarroModalDescricao').textContent = 'Cadastre o veículo no estacionamento, preenchendo o formulário abaixo com as informações necessárias.';
    document.getElementById('btnCadastrar').textContent = 'Cadastrar';

    const agora = new Date();
    const dia = (`0${agora.getDate()}`).slice(-2);
    const mes = (`0${agora.getMonth() + 1}`).slice(-2);
    const ano = agora.getFullYear();
    const dataAtual = `${dia}/${mes}/${ano}`;
    const horas = (`0${agora.getHours()}`).slice(-2);
    const minutos = (`0${agora.getMinutes()}`).slice(-2);
    const horarioAtual = `${horas}:${minutos}`;

    document.getElementById('dataEntrada').value = dataAtual;
    document.getElementById('horaEntrada').value = horarioAtual;
}

function validarHorario(horario) {
    const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    return regex.test(horario);
}

document.getElementById('horaEntrada').addEventListener('input', function() {
    this.value = this.value.replace(/[^0-9:]/g, '').replace(/(\..*)\./g, '$1');
    if (this.value.length === 2 && !this.value.includes(':')) {
        this.value += ':';
    }
    if (this.value.length > 5) {
        this.value = this.value.slice(0, 5);
    }
});