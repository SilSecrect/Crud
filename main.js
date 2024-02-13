"use strict";
// função abrir o modal

const openModal = () =>
  document.getElementById("modal").classList.add("active");

const closeModal = () => {
  document.getElementById("modal").classList.remove("active");
  clearfields(); // toda vez que fechar, limpa os campos do input
};

document
  .getElementById("cadastrarCliente")
  .addEventListener("click", openModal);

document.getElementById("modalClose").addEventListener("click", closeModal);

// função acima abrir o modal.

//capturar os butões de editar e excluir
const editeClient = (index) => {
  const client = readCliente()[index]
  client.index = index
  fillFilds(client)
  openModal()
}

const fillFilds = (client) => {
  document.getElementById("nome").value = client.nome;
  document.getElementById("email").value = client.email;
  document.getElementById("celular").value = client.celular;
  document.getElementById("cep").value = client.cep;
  document.getElementById("uf").value = client.uf;
  document.getElementById("cidade").value = client.cidade;
  document.getElementById("bairro").value = client.bairro;
  document.getElementById("rua").value = client.rua;
  document.getElementById("numero").value = client.numero;
  document.getElementById("nome").dataset.index = client.index
}

const editDelet = (event) => {
  if (event.target.type == "button") {
    const [action, index] = event.target.id.split("-");
    if (action == "editar") {
      editeClient(index)
    } else {
      const client = readCliente()[index] 
      const response = confirm (`Deseja excluir o cliente ${client.nome}`)
      if(response){
        deletar(index)
        updateTable()
      }
    }
  }
};

document.querySelector("#tablebody").addEventListener("click", editDelet);

// comeca o crud //

//nossa array de teste

// const temClient = {
//   nome: "nicolnas da Silva",
//   email: "esthersilvaesilva@gmail.com",
//   celular: "00-00000-0000",
//   uf: "Sc",
//   cidade: "Florianopolis",
//   bairro: "pantanal",
//   rua: "jose felix mouro",
//   numero: "225",
// };
// acima nossa array de teste

// criando função de entrada
const getLocalStorage = () =>
  JSON.parse(localStorage.getItem("db_cliente")) ?? [];
const setLocalStorage = (db_clients) =>
  localStorage.setItem("db_cliente", JSON.stringify(db_clients));

// ler os cliente do local storege
const readCliente = () => getLocalStorage();

// crud create esta pronta.
const createCliente = (cliente) => {
  const db_clients = getLocalStorage();
  db_clients.push(cliente);
  setLocalStorage(db_clients);
};

// updade dos dados cliente
const updateClient = (index, cliente) => {
  const db_cliente = readCliente();
  db_cliente[index] = cliente;
  setLocalStorage(db_cliente);
};
// delete cliente
const deletar = (index) => {
  const db_cliente = readCliente();
  db_cliente.splice(index, 1);
  setLocalStorage(db_cliente);
};

//Vamos vincular ao layaout

const camposValidos = () => {
  return document.getElementById("form").reportValidity();
};

// closeModal, condição para limpar, após cadastrar!
const clearfields = () => {
  document.getElementById("nome").value = "";
  document.getElementById("email").value = "";
  document.getElementById("celular").value = "";
  document.getElementById("cep").value = "";
  document.getElementById("uf").value = "";
  document.getElementById("cidade").value = "";
  document.getElementById("bairro").value = "";
  document.getElementById("rua").value = "";
  document.getElementById("numero").value = "";
};

// funcão para pegar as input do cadastro!
const salvarCliente = () => {
  if (camposValidos()) {
    const client = {
      nome: document.getElementById("nome").value,
      email: document.getElementById("email").value,
      celular: document.getElementById("celular").value,
      cep: document.getElementById("cep").value,
      uf: document.getElementById("uf").value,
      cidade: document.getElementById("cidade").value,
      bairro: document.getElementById("bairro").value,
      rua: document.getElementById("rua").value,
      numero: document.getElementById("numero").value,
    };

    const index = document.getElementById('nome').dataset.index
        if(index == 'new'){
          createCliente(client);
          updateTable();
          clearfields();
          closeModal();
            
        }else{
            updateClient(index, client)
            updateTable()
            closeModal()
        }
  }
};

// criação da tabela.
const createRow = (client , index) => {
  const newRow = document.createElement("tr");
  newRow.innerHTML = `
      <td><strong>Nome - </strong>${client.nome}</td>
      <td><strong>Email - </strong> ${client.email}</td>
      <td><strong>Celular - </strong> ${client.celular}</td> 
      <td><strong>CEP - </strong> ${client.cep}</td>
      <td><strong>UF - </strong> ${client.uf}</td>
      <td><strong>Cidade - </strong> ${client.cidade}</td>
      <td><strong>Bairro - </strong> ${client.bairro}</td>
      <td><strong>Endereço - </strong> ${client.rua}</td>
      <td><strong>Nº - </strong> ${client.numero}</td>
      <td>
      <button type="button" class="button green" id='editar-${index}'>Editar</button>
      <button type="button" class="button red" id='excluir-${index}'>Excluir</button>
      </td>`;

  document.querySelector("#tablebody").appendChild(newRow);
};

const clearTable = () => {
  const rows = document.querySelectorAll("#tablebody tr");
  rows.forEach((row) => row.parentNode.removeChild(row));
};

const updateTable = () => {
  const db_cliente = readCliente();
  clearTable();
  db_cliente.forEach(createRow);
};

updateTable();

document.getElementById("salvar").addEventListener("click", salvarCliente);
document.getElementById("cancelar").addEventListener("click", closeModal);
