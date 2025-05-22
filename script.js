document.addEventListener('DOMContentLoaded', () => {
    // Efeito de carregamento inicial
    document.body.classList.add('loaded');

    // 1. Efeito Typed.js (para a página inicial)
    if (document.getElementById("animated-title")) {
        new Typed("#animated-title", {
            strings: [
                "Active Directory", 
                "ITSM e SLAs",
                "Virtualização",
                "Segurança Cibernética",
                "Backup & Recovery",
                "PowerShell",
                "Monitoramento Zabbix"
            ],
            typeSpeed: 80,
            backSpeed: 40,
            loop: true,
            showCursor: true,
            cursorChar: '|'
        });
    }

    // 2. Carrossel de Experiências (página experiências.html)
    const initCarousel = () => {
        const carousel = document.querySelector('.experience-carousel');
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        
        if (!carousel || !prevBtn || !nextBtn) return;

        const cards = document.querySelectorAll('.experience-card');
        let currentIndex = 0;
        const cardWidth = cards[0].offsetWidth + 20; // Largura do card + gap

        const updateCarousel = () => {
            carousel.scrollTo({
                left: currentIndex * cardWidth,
                behavior: 'smooth'
            });
        };

        // Controles do carrossel
        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
        });

        nextBtn.addEventListener('click', () => {
            if (currentIndex < cards.length - 1) {
                currentIndex++;
                updateCarousel();
            }
        });

        // Controle por toque (mobile)
        let startX;
        carousel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });

        carousel.addEventListener('touchend', (e) => {
            const endX = e.changedTouches[0].clientX;
            const diff = startX - endX;
            
            if (diff > 50 && currentIndex < cards.length - 1) {
                currentIndex++;
                updateCarousel();
            } else if (diff < -50 && currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
        });
    };
    initCarousel();

    // 3. Terminal interativo (todas as páginas)
    if (document.getElementById("terminal-command")) {
        const terminal = document.getElementById('terminal');
        const commandElement = document.getElementById('terminal-command');
        const cursor = document.querySelector('.terminal .cursor');
        
        const commands = [
            "inventario -listar servidores",
            "itil --status processos",
            "seguranca --scan vulnerabilidades",
            "rede --testar latencia",
            "backup --verificar ultimo",
            "powershell Get-ADUser -Filter *",
            "zabbix --monitorar host=servidor01"
        ];
        
        let cmdIndex = 0;
        let isTyping = false;
        
        function typeCommand() {
            if (isTyping) return;
            
            isTyping = true;
            terminal.classList.add('typing');
            cursor.style.opacity = '1';
            
            const cmd = commands[cmdIndex];
            let i = 0;
            
            commandElement.textContent = '';
            
            const typeInterval = setInterval(() => {
                commandElement.textContent += cmd[i];
                i++;
                
                if (i >= cmd.length) {
                    clearInterval(typeInterval);
                    setTimeout(() => {
                        isTyping = false;
                        terminal.classList.remove('typing');
                        cmdIndex = (cmdIndex + 1) % commands.length;
                        setTimeout(typeCommand, 1000);
                    }, 2000);
                }
            }, Math.random() * 50 + 50);
        }
        
        setTimeout(typeCommand, 1500);
    }

    // 4. Efeito neon para títulos principais
    const h1 = document.querySelector('h1');
    if (h1) {
        setInterval(() => {
            h1.style.textShadow = `0 0 5px #00FF00, 0 0 10px ${Math.random() > 0.5 ? '#00FF00' : '#00FFFF'}`;
        }, 1000);
    }

    // 5. Transição suave entre páginas (apenas para navegação principal)
    document.querySelectorAll('.main-navigation .nav-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Verifica se é um link válido (não âncora ou javascript:void)
            if (btn.href && !btn.href.includes('#') && !btn.href.includes('javascript:')) {
                e.preventDefault();
                document.body.classList.remove('loaded');
                setTimeout(() => {
                    window.location.href = btn.href;
                }, 500);
            }
        });
    });

    // 6. Debug (opcional)
    console.log('Script carregado com sucesso');
});