document.addEventListener("DOMContentLoaded", () => {
    // 1. Criar e adicionar dinamicamente o botão 'Voltar ao Topo'
    const backToTopBtn = document.createElement("button");
    backToTopBtn.id = "back-to-top";
    backToTopBtn.innerHTML = "▲";
    backToTopBtn.title = "Voltar ao topo";
    document.body.appendChild(backToTopBtn);

    // Exibir/ocultar o botão conforme a rolagem da página
    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            backToTopBtn.style.display = "block";
        } else {
            backToTopBtn.style.display = "none";
        }
    });

    // Ação de rolagem ao clicar no botão
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
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 150) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${current}`) {
                link.style.backgroundColor = "#4682b4";
            } else {
                link.style.backgroundColor = "transparent";
            }
        });
    });
});