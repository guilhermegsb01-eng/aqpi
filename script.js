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

// Links de "Ler resenha completa" agora funcionam normalmente
// Páginas individuais de resenha estão sendo criadas progressivamente

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
            // Animação para os números 1, 1, 2
            if (stats.length >= 3) {
                stats[0].innerHTML = '1';
                stats[1].innerHTML = '1';
                stats[2].innerHTML = '2';
            }
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

// Modal "Tenho esse Livro"
const modalOverlay = document.getElementById('modalTenhoLivro');
const modalClose = document.getElementById('modalClose');
const formTenhoLivro = document.getElementById('formTenhoLivro');
const botoesTenhoLivro = document.querySelectorAll('.btn-tenho-livro');

// Abrir modal ao clicar em "Tenho esse livro"
botoesTenhoLivro.forEach(botao => {
    botao.addEventListener('click', () => {
        const livro = botao.getAttribute('data-livro');
        const autor = botao.getAttribute('data-autor');
        
        document.getElementById('modalBookTitle').textContent = `${livro} - ${autor}`;
        document.getElementById('livroNome').value = `${livro} - ${autor}`;
        
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Previne scroll
    });
});

// Fechar modal
function fecharModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
    formTenhoLivro.reset();
}

modalClose.addEventListener('click', fecharModal);

modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        fecharModal();
    }
});

// Fechar modal com ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
        fecharModal();
    }
});

// Enviar formulário
formTenhoLivro.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const livro = document.getElementById('livroNome').value;
    const nome = document.getElementById('nomeUsuario').value;
    const email = document.getElementById('emailUsuario').value;
    const telefone = document.getElementById('telefoneUsuario').value;
    const observacoes = document.getElementById('observacoes').value;

try {
       const response = await fetch('https://formspree.io/f/movbrkaj', {
           method: 'POST',
           headers: {
               'Content-Type': 'application/json'
           },
           body: JSON.stringify({
               livro: livro,
               nome: nome,
               email: email,
               telefone: telefone,
               observacoes: observacoes
           })
       });
       
       if (response.ok) {
           alert('✅ Obrigado! Recebemos sua solicitação e entraremos em contato em breve!');
           fecharModal();
       } else {
           alert('❌ Erro ao enviar. Por favor, tente novamente.');
       }
   } catch (error) {
       alert('❌ Erro ao enviar. Por favor, tente novamente.');
   }
    
    // Aqui você pode integrar com um serviço de email
    // Por enquanto, vou simular o envio e mostrar instruções
    
    // OPÇÃO 1: Usar Formspree (gratuito)
    // Descomente as linhas abaixo e substitua movbrkaj pelo ID do Formspree
    /*
    try {
        const response = await fetch('https://formspree.io/f/movbrkaj', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                livro: livro,
                nome: nome,
                email: email,
                telefone: telefone,
                observacoes: observacoes
            })
        });
        
        if (response.ok) {
            alert('✅ Obrigado! Recebemos sua solicitação e entraremos em contato em breve!');
            fecharModal();
        } else {
            alert('❌ Erro ao enviar. Por favor, tente novamente.');
        }
    } catch (error) {
        alert('❌ Erro ao enviar. Por favor, tente novamente.');
    }
    */
    
    // OPÇÃO 2: Enviar por email (simulação)
    // Por enquanto, apenas mostra os dados no console e alert
    console.log('📨 Nova solicitação de livro:');
    console.log('Livro:', livro);
    console.log('Nome:', nome);
    console.log('Email:', email);
    console.log('Telefone:', telefone);
    console.log('Observações:', observacoes);
    
    // Criar mailto link para enviar por email
    const assunto = `AQPI - Tenho o livro: ${livro}`;
    const corpo = `
Nome: ${nome}
Email: ${email}
Telefone: ${telefone || 'Não informado'}
Livro: ${livro}
Observações: ${observacoes || 'Nenhuma'}
    `.trim();
    
    const mailtoLink = `mailto:contato@aqpi.com.br?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpo)}`;
    
    // Abre o cliente de email do usuário
    window.location.href = mailtoLink;
    
    alert('✅ Obrigado! Seu cliente de email será aberto para enviar os dados. Entraremos em contato em breve!');
    fecharModal();
});

// Botão Voltar ao Topo
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
