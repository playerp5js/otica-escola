document.addEventListener("DOMContentLoaded", () => {
    // 1. Botão 'Voltar ao Topo'
    const backToTopBtn = document.createElement("button");
    backToTopBtn.id = "back-to-top";
    backToTopBtn.innerHTML = "▲";
    backToTopBtn.title = "Voltar ao topo";
    document.body.appendChild(backToTopBtn);

    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            backToTopBtn.style.display = "block";
        } else {
            backToTopBtn.style.display = "none";
        }
    });

    backToTopBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    // 2. Destacar link ativo no menu durante a rolagem
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("nav a");

    window.addEventListener("scroll", () => {
        let current = "";
        
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 150) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            if (link.getAttribute("href") === `#${current}`) {
                link.style.backgroundColor = "#4682b4";
            } else {
                link.style.backgroundColor = "transparent";
            }
        });
    });

    // 3. Sistema de Galeria de GIFs com Paginação (Máximo 5 por página)
    const gifs = [
        { url: "https://i.imgflip.com/b0e8bc.gif", titulo: "Pratica 0" },
        { url: "", titulo: "Pratica 1" },
        { url: "", titulo: "Pratica 2" },
        { url: "", titulo: "Pratica 3" },
        { url: "", titulo: "Pratica 4" },
        { url: "", titulo: "Pratica 5" },
        { url: "", titulo: "Pratica 6" }
    ];

    const gifsPorPagina = 5;
    let paginaAtual = 1;

    const gifGrid = document.getElementById("gifGrid");
    const btnPrev = document.getElementById("btnPrev");
    const btnNext = document.getElementById("btnNext");
    const pageInfo = document.getElementById("pageInfo");

    function renderizarGifs() {
        gifGrid.innerHTML = "";
        
        const inicio = (paginaAtual - 1) * gifsPorPagina;
        const fim = inicio + gifsPorPagina;
        const gifsExibidos = gifs.slice(inicio, fim);

        gifsExibidos.forEach((item) => {
            const card = document.createElement("div");
            card.className = "gif-card";
            card.innerHTML = `
                <img src="${item.url}" alt="${item.titulo}">
                <p>${item.titulo}</p>
            `;
            gifGrid.appendChild(card);
        });

        const totalPaginas = Math.ceil(gifs.length / gifsPorPagina) || 1;
        pageInfo.textContent = `Página ${paginaAtual} de ${totalPaginas}`;
        
        btnPrev.disabled = paginaAtual === 1;
        btnNext.disabled = paginaAtual === totalPaginas;
    }

    btnPrev.addEventListener("click", () => {
        if (paginaAtual > 1) {
            paginaAtual--;
            renderizarGifs();
        }
    });

    btnNext.addEventListener("click", () => {
        const totalPaginas = Math.ceil(gifs.length / gifsPorPagina);
        if (paginaAtual < totalPaginas) {
            paginaAtual++;
            renderizarGifs();
        }
    });

    // Carrega a galeria inicial
    renderizarGifs();
});