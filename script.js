const key = "suakey;
const openCageKey = "suakey"; 

function colocarNaTela(dados, estado, pais) {
    console.log(dados);

    document.querySelector(".cidade").innerHTML = "Tempo em " + dados.name;
    document.querySelector(".estado").textContent = estado;
    document.querySelector(".pais").textContent = pais;
    document.querySelector(".temp").innerHTML = Math.floor(dados.main.temp) + "°C";
    document.querySelector(".texto-previsao").innerHTML = dados.weather[0].description;
    document.querySelector(".umidade").innerHTML = "Umidade: " + dados.main.humidity + "%";
    document.querySelector(".icone").src = "https://openweathermap.org/img/wn/" + dados.weather[0].icon + ".png";

    document.querySelector(".botao-favorito").setAttribute("onclick", `adicionarFavorito('${dados.name}, ${estado}, ${pais}')`);
}

async function buscarEstadoEPais(lat, lon, dados) {
    try {
        let resposta = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${openCageKey}&language=pt`);
        let geodados = await resposta.json();

        if (geodados.results.length > 0) {
            let componentes = geodados.results[0].components;
            let estado = componentes.state || "Desconhecido";
            let pais = componentes.country || "Desconhecido";

            colocarNaTela(dados, estado, pais);
        } else {
            colocarNaTela(dados, "Desconhecido", "Desconhecido");
        }
    } catch (error) {
        console.error("Erro ao buscar estado e país:", error);
        colocarNaTela(dados, "Erro ao carregar", "Erro ao carregar");
    }
}

async function buscarCidade(cidade) {
    let resposta = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${key}&lang=pt_br&units=metric`);
    let dados = await resposta.json();

    if (dados.cod === 200) {
        buscarEstadoEPais(dados.coord.lat, dados.coord.lon, dados);
    } else {
        alert("Cidade não encontrada! Verifique a grafia.");
    }
}

function cliqueiNoBotao() {
    let cidade = document.querySelector(".input-cidade").value.trim();
    if (cidade) {
        buscarCidade(cidade);
    } else {
        alert("Digite uma cidade!");
    }
}

function adicionarFavorito(cidade) {
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

    if (!favoritos.includes(cidade)) {
        favoritos.push(cidade);
        localStorage.setItem("favoritos", JSON.stringify(favoritos));
        atualizarListaFavoritos();
    } else {
        alert("Essa cidade já está nos favoritos!");
    }
}

function removerFavorito(cidade) {
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    favoritos = favoritos.filter(item => item !== cidade);
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
    atualizarListaFavoritos();
}

function atualizarListaFavoritos() {
    let lista = document.querySelector(".lista-favoritos");
    lista.innerHTML = "";

    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

    favoritos.forEach(cidade => {
        let li = document.createElement("li");
        li.innerHTML = `${cidade} <button class="remover-favorito" onclick="removerFavorito('${cidade}')">X</button>`;
        li.onclick = () => buscarCidade(cidade.split(",")[0]);
        lista.appendChild(li);
    });
}

document.addEventListener("DOMContentLoaded", atualizarListaFavoritos);
