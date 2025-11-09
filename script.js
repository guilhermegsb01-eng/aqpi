// Aguarda o carregamento completo da página
document.addEventListener('DOMContentLoaded', function() {
    
    const botao = document.getElementById('btnClick');
    const mensagem = document.getElementById('mensagem');
    let cliques = 0;

    // Array com mensagens diferentes
    const mensagens = [
        '👏 Parabéns! Você clicou no botão!',
        '🎉 Mais um clique! Você está aprendendo!',
        '⭐ Continue assim! Você está indo bem!',
        '🚀 Incrível! O JavaScript está funcionando!',
        '💪 Você é demais! Continue praticando!',
        '🎯 Perfeito! Agora você sabe usar eventos!',
        '✨ Fantástico! Sua jornada começou!'
    ];

    botao.addEventListener('click', function() {
        cliques++;
        
        // Seleciona uma mensagem aleatória ou pela ordem dos cliques
        const indice = cliques > mensagens.length ? 
                      Math.floor(Math.random() * mensagens.length) : 
                      cliques - 1;
        
        mensagem.textContent = mensagens[indice];
        mensagem.style.opacity = '0';
        
        // Animação de fade in
        setTimeout(() => {
            mensagem.style.transition = 'opacity 0.5s ease';
            mensagem.style.opacity = '1';
        }, 10);
        
        // Adiciona contador após a 3ª vez
        if (cliques > 3) {
            mensagem.textContent += ` (${cliques} cliques no total)`;
        }
    });

    // Efeito de boas-vindas
    console.log('🎉 Site carregado com sucesso!');
    console.log('👨‍💻 Bem-vindo ao seu primeiro projeto web!');
});
