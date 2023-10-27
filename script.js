// localizacao

$.getJSON( "https://myip.wtf/json", function(localizacao) {
    var localizacao = localizacao['YourFuckingLocation'];
    var regiao = localizacao.replace(", Brazil", "");
    $("#client_name_end").html("Frete Grátis para  <b><i>" + regiao + "</i></b> e <b>Região</b> 🚚");
    $("#custom_address").html("<b>" + regiao + " e Região</b>");
});

// galeria de imagens

const imagens = ["./assets/media/prod01.avif", "./assets/media/prod02.avif", "./assets/media/prod03.avif", "./assets/media/prod04.avif", "./assets/media/prod05.avif", "./assets/media/prod06.avif", "./assets/media/prod04.avif"];
let imagemAtual = 0;
let touchStartX = 0;
let touchEndX = 0;

function atualizarImagem() {
    document.getElementById("minha-imagem").src = imagens[imagemAtual];
}

function trocarImagem(indice) {
    imagemAtual = indice;
    atualizarImagem();
    atualizarIndicadores();
}

function atualizarIndicadores() {
    const indicadores = document.querySelectorAll(".indicador");
    indicadores.forEach((indicador, indice) => {
        if (indice === imagemAtual) {
            indicador.classList.add("ativo");
        } else {
            indicador.classList.remove("ativo");
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const imagem = document.getElementById("minha-imagem");
    imagem.addEventListener("click", () => proximaImagem());

    const indicadoresContainer = document.querySelector(".indicadores");
    imagens.forEach((imagem, indice) => {
        const indicador = document.createElement("div");
        indicador.className = "indicador";
        indicador.addEventListener("click", () => trocarImagem(indice));
        indicadoresContainer.appendChild(indicador);
    });

    const indicadores = document.querySelectorAll(".indicador");
    if (indicadores.length > 0) {
        indicadores[0].classList.add("ativo");
    }

    atualizarImagem();
});


function proximaImagem() {
    imagemAtual = (imagemAtual + 1) % imagens.length;
    atualizarImagem();
    atualizarIndicadores();
}

function imagemAnterior() {
    imagemAtual = (imagemAtual - 1 + imagens.length) % imagens.length;
    atualizarImagem();
    atualizarIndicadores();
}

function touchStart(event) {
    touchStartX = event.changedTouches[0].clientX;
}

function touchMove(event) {
    touchEndX = event.changedTouches[0].clientX;
}

function touchEnd() {
    const touchDiff = touchStartX - touchEndX;
    if (touchDiff > 50) {
        // Arrastou da direita para a esquerda (avançar)
        proximaImagem();
    } else if (touchDiff < -50) {
        // Arrastou da esquerda para a direita (voltar)
        imagemAnterior();
    }
}

const imagemElement = document.getElementById("minha-imagem");
imagemElement.addEventListener("touchstart", touchStart);
imagemElement.addEventListener("touchmove", touchMove);
imagemElement.addEventListener("touchend", touchEnd);

// baixou X %

var messages = ["Aproveite 🔥", "Baixou 61%"];
var currentMessageIndex = 0;

function updatePricedownText() {
    $(".price-down").text(messages[currentMessageIndex]);
    currentMessageIndex = (currentMessageIndex + 1) % messages.length;
}

setInterval(updatePricedownText, 2000);

// contagem regressiva

function atualizarContagemRegressiva() {
    var spanContagemRegressiva = document.querySelector(".timer");
    var tempoTotalSegundos = 2200;

    var tempoRestanteArmazenado = localStorage.getItem("tempoRestante");

    if (tempoRestanteArmazenado !== null) {
        tempoTotalSegundos = parseInt(tempoRestanteArmazenado, 10);
    }

    var atualizar = function () {
        var minutos = Math.floor(tempoTotalSegundos / 60);
        var segundos = tempoTotalSegundos % 60;
        spanContagemRegressiva.textContent = minutos.toString().padStart(2, '0') + 'm:' + segundos.toString().padStart(2, '0') + 's';

        if (tempoTotalSegundos === 0) {
            clearInterval(intervalId);
        } else {
            tempoTotalSegundos--;
            localStorage.setItem("tempoRestante", tempoTotalSegundos.toString());
        }
    };

    var intervalId = setInterval(atualizar, 1000);
    atualizar();
}