
// sistema com api viacep //

const limparForm = () => {
    document.getElementById("rua").value = "";
    document.getElementById("bairro").value = "";
    document.getElementById("cidade").value = "";
    document.getElementById("uf").value = "";
  };
  
  const prenncherForm = (endereco) => {
    document.getElementById("rua").value = endereco.logradouro;
    document.getElementById("cidade").value = endereco.localidade;
    document.getElementById("bairro").value = endereco.bairro;
    document.getElementById("uf").value = endereco.uf;
  };
  
  const cepValido = (cep) => cep.length == 8 && /^[0-9]+$/;
  
  const pesquisarCep = async () => {
    limparForm();
    const cep = document.getElementById("cep").value;
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    if (cepValido(cep)) {
      // fetch(url).then(response => response.json()).then(console.log)
      //Utilizei metodos de atribuição
  
      const dados = await fetch(url);
      const endereco = await dados.json();
  
      if (endereco.hasOwnProperty("erro")) {
        document.getElementById("uf").value = "CEP não encontrado!";
      } else {
        prenncherForm(endereco);
      }
    } else {
      document.getElementById("uf").value = "CEP Incorreto!";
    }
  };
  document.getElementById("cep").addEventListener("focusout", pesquisarCep);
  