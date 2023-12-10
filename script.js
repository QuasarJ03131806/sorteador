function enviar(name, quantidadePremios, inicio, fim) {
  let SHeaders = new Headers();
  SHeaders.append("Content-Type", "application/json");

  let raw = JSON.stringify({
    //nome, numSorteo, numInit, numEnd
    nome: name,
    numSorteo: quantidadePremios,
    numInit: inicio,
    numEnd: fim,
  });

  let requestOptions = {
    method: "POST",
    headers: SHeaders,
    body: raw,
    redirect: "follow",
  };
  return fetch("http://localhost:3000/api/sorteo", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      return result;
    })
    .catch((error) => console.log("error", error));
}

function sortear() {
  var name = document.getElementById("organizador").value;
  var quantidadePremios = parseInt(
    document.getElementById("quantidadePremios").value
  );
  var inicio = parseInt(document.getElementById("inicio").value);
  var fim = parseInt(document.getElementById("fim").value);
  var resultadosDiv = document.getElementById("resultados");

  if (!isNaN(inicio) && !isNaN(fim) && inicio < fim && quantidadePremios > 0) {
    enviar(name, quantidadePremios, inicio, fim).then(async (dados) => {
      document.getElementById("printNome").innerHTML = await `<h1>${name}<h1>`;
      resultadosDiv.innerHTML = await "";
      resultadosDiv.style.color = await "#FFF";
      for (let i = 0; i < dados.sorteio.length; i++) {
        resultadosDiv.innerHTML +=
          "<p>Prêmio " + (i + 1) + ": " + dados.sorteio[i] + "</p>";
      }
    });
  } else {
    resultadosDiv.innerHTML = "Por favor, insira números válidos.";
    resultadosDiv.style.color = "#FF0000";
  }
}

function dataHora() {
  let dataHoraAtual = new Date();
  let dataHoraString = dataHoraAtual.toLocaleString();

  return "Data e Hora do Sorteio: " + dataHoraString;
}
