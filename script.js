// Menu Mobile Toggle
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animar o botão do menu
    const spans = menuToggle.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translateY(10px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Fechar menu ao clicar em um link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = menuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Navegação suave com destaque
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });

    // Header com sombra ao rolar
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Filtros de Trocas
const filterButtons = document.querySelectorAll('.filter-btn');
const trocaCards = document.querySelectorAll('.troca-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active de todos os botões
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Adiciona active no botão clicado
        button.classList.add('active');
        
        const filterValue = button.textContent.toLowerCase();
        
        // Filtra os cards
        trocaCards.forEach(card => {
            const categoria = card.querySelector('.resenha-categoria');
            if (filterValue === 'todos') {
                card.style.display = 'block';
                // Animação de entrada
                card.style.animation = 'fadeInUp 0.5s ease';
            } else if (categoria && categoria.textContent.toLowerCase() === filterValue) {
                card.style.display = 'block';
                card.style.animation = 'fadeInUp 0.5s ease';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Formulário de Contato
const contatoForm = document.querySelector('.contato-form');
if (contatoForm) {
    contatoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Pegar valores do formulário
        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const assunto = document.getElementById('assunto').value;
        const mensagem = document.getElementById('mensagem').value;
        
        // Simular envio
        alert(`Obrigado, ${nome}! Sua mensagem foi enviada com sucesso. Entraremos em contato em breve através do email: ${email}`);
        
        // Limpar formulário
        contatoForm.reset();
    });
}

// Newsletter Form
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input').value;
        alert(`Obrigado por se inscrever! Você receberá nossas resenhas semanais em: ${email}`);
        newsletterForm.reset();
    });
}

// Animação de entrada para cards ao scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observar todos os cards
const allCards = document.querySelectorAll('.resenha-card, .troca-card, .funciona-card, .valor');
allCards.forEach(card => {
    card.style.opacity = '0';
    observer.observe(card);
});

// Botões de "Propor Troca"
const propoeTrocaBtns = document.querySelectorAll('.troca-card .btn-small:not(.btn-disabled)');
propoeTrocaBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const card = btn.closest('.troca-card');
        const titulo = card.querySelector('.troca-titulo').textContent;
        const usuario = card.querySelector('.usuario-nome').textContent;
        
        alert(`Você está propondo uma troca para "${titulo}".\n\n${usuario}\n\nEm breve teremos o sistema de mensagens implementado!`);
    });
});

// Links de "Ler resenha completa"
const resenhaLinks = document.querySelectorAll('.resenha-link');
resenhaLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const card = link.closest('.resenha-card');
        const titulo = card.querySelector('.resenha-titulo').textContent;
        
        alert(`Carregando resenha completa de "${titulo}"...\n\nEm breve teremos páginas individuais para cada resenha!`);
    });
});

// Smooth scroll para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Ignora # vazio
        if (href === '#' || href === '#home') {
            if (href === '#home') {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
            return;
        }
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Contador animado para stats no hero
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.innerHTML = value + '+';
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Iniciar contadores quando a hero section estiver visível
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const stats = document.querySelectorAll('.stat h3');
            animateValue(stats[0], 0, 500, 2000);
            animateValue(stats[1], 0, 1200, 2000);
            animateValue(stats[2], 0, 3000, 2000);
            heroObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroSection = document.querySelector('.hero');
if (heroSection) {
    heroObserver.observe(heroSection);
}

console.log('🎉 AQPI - Site carregado com sucesso!');
console.log('📚 Conectando leitores a livros que transformam vidas.');
