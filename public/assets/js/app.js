fetch("http://localhost:3000/producoes")
    .then(response => {
        return response.json();
    })
    .then(dados => {
        const pagina = window.location.pathname;

        if (pagina.includes("index.html") || pagina === "/") {
            let carrossel = [
                document.querySelector("#\\30.carousel-item"),
                document.querySelector("#\\31.carousel-item"),
                document.querySelector("#\\32.carousel-item")
            ];

            let cards = [
                document.querySelector("#\\33.card"),
                document.querySelector("#\\34.card"),
                document.querySelector("#\\35.card"),
                document.querySelector("#\\36.card"),
                document.querySelector("#\\37.card"),
                document.querySelector("#\\38.card"),
                document.querySelector("#\\39.card"),
                document.querySelector("#\\31 0.card"),
                document.querySelector("#\\31 1.card")
            ];

            for (i = 0; i < carrossel.length; i++) {
                let producao = dados.find(function (e) { return e.id == i });

                carrossel[i].innerHTML = '<a href="detalhe.html?id=' + i + '"><img src="' + producao["thumbnail"] + '" class="d-block w-100" alt="..."><div class="carousel-caption"><h5>' + producao["titulo"] + '</h5><p class="d-none d-sm-inline">' + producao["lancamento"] + ' - ' + producao["resumo-elenco"] + '</p></div></a>';
            }

            for (i = 0; i < cards.length; i++) {
                let producao = dados.find(function (e) { return e.id == i + carrossel.length });

                cards[i].innerHTML = '<a href="detalhe.html?id=' + (i + carrossel.length) + '" class="text-decoration-none"><img src="' + producao["thumbnail"] + '" class="card-img-top" alt="..."><div class="card-body"><h5 class="card-title text-dark">' + producao["titulo"] + '</h5><p class="card-text text-dark">' + producao["lancamento"] + ' - ' + producao["genero"] + ' - Dirigido por ' + producao["diretor"] + '</p></div></a>';
            }
        } else if (pagina.includes("detalhe.html")) {

            let blocoInformacoes = document.querySelector(".section");

            let params = new URLSearchParams(window.location.search);
            let id = Number(params.get("id"));
            let obra = dados.find(function (e) { return e["id"] == id });

            blocoInformacoes.innerHTML = '<div class="container-cartaz"><img src="' + obra["cartaz"] + '"></div><div class="informacoes"><h1 class="text-light">Informações Geral</h1><ul class="text-light list-unstyled"><li><h3>' + obra["titulo"] + '</h3></li><li><div class="sinopse">' + obra["sinopse"] + '</div></li><li><i><strong>' + obra["genero"] + '</strong></i></li><li>Lançamento: <strong>' + obra["lancamento"] + '</strong></li><li>Direção: <strong>' + obra["diretor"] + '</strong></li><li>Elenco: <strong>' + obra["resumo-elenco"] + '</strong></li><li><strong>' + obra["premios-indicacoes"] + '</strong></li></ul></div>';

            for (i = 0; i < obra["imagens"].length; i++) {
                let fotos = document.querySelector(`#\\3${i}`);
                fotos.innerHTML = '<div class="card"><img src="' + obra["imagens"][i]["imagem"] + '" class="card-img-top" alt="..."><div class="card-body"><h5 class="card-title fs-6">' + obra["imagens"][i]["titulo"] + '</div></div>'
            }
        }

    });