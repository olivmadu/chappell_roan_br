document.addEventListener('DOMContentLoaded', function() {
    // Menu mobile toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');

    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
    });

    // Fechar menu ao clicar fora
    document.addEventListener('click', function(event) {
        if (!mobileMenuBtn.contains(event.target) && !mobileMenu.contains(event.target)) {
            mobileMenu.classList.remove('active');
        }
    });

    // Animação de scroll suave para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
                
                // Fechar menu mobile se estiver aberto
                mobileMenu.classList.remove('active');
            }
        });
    });

    // Formulário de newsletter
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            // Simulação de envio (aqui você adicionaria o código real para enviar o email)
            alert(`Obrigado por se inscrever! Em breve você receberá novidades no email: ${email}`);
            this.reset();
        });
    }

    // Efeito de carregamento de imagens com fade-in
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';
        
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        // Para imagens que já estão em cache
        if (img.complete) {
            img.style.opacity = '1';
        }
    });

    // Efeito de parallax no hero
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            if (scrollPosition < 600) {
                const heroImage = hero.querySelector('.hero-image img');
                heroImage.style.transform = `translateY(${scrollPosition * 0.3}px)`;
            }
        });
    }

    // Simulação de player de música
    const playButtons = document.querySelectorAll('.play-button');
    playButtons.forEach(button => {
        button.addEventListener('click', function() {
            const musicTitle = this.closest('.music-card').querySelector('h3').textContent;
            alert(`Reproduzindo: ${musicTitle}`);
        });
    });

    // Efeito de estrelas piscando no hero
    function createStars() {
        const hero = document.querySelector('.hero');
        if (!hero) return;
        
        for (let i = 0; i < 20; i++) {
            const star = document.createElement('div');
            star.classList.add('star');
            star.style.position = 'absolute';
            star.style.width = '2px';
            star.style.height = '2px';
            star.style.backgroundColor = 'white';
            star.style.borderRadius = '50%';
            star.style.top = `${Math.random() * 100}%`;
            star.style.left = `${Math.random() * 100}%`;
            star.style.opacity = Math.random();
            star.style.animation = `starTwinkle ${2 + Math.random() * 3}s infinite alternate`;
            
            hero.appendChild(star);
        }
    }
    
    createStars();
    
      // ---- TABS SPOTIFY / YOUTUBE ----
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanes   = document.querySelectorAll('.tab-pane');
  const spotifyEmbed = document.getElementById('spotifyMainEmbed');
  const spotifyURL = 'https://open.spotify.com/embed/track/5xHgo5JN0wfsV41HnRaos5?autoplay=1'; // The Giver :contentReference[oaicite:0]{index=0}
  const youtubeContainer = document.getElementById('youtubeContainer');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      // ativa aba
      tabButtons.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      // mostra conteúdo
      tabPanes.forEach(p => p.classList.remove('active'));
      document.getElementById(this.dataset.tab + '-tab').classList.add('active');

      // se for a aba Spotify, injeta o iframe com autoplay
      if (this.dataset.tab === 'spotify') {
        spotifyEmbed.src = spotifyURL;
      }
    });
  });

  // ---- YOUTUBE EMBED ON CLICK ----
  youtubeContainer.querySelector('.play-overlay').addEventListener('click', function() {
    youtubeContainer.innerHTML = `
<iframe width="560" height="315" src="https://www.youtube.com/embed/1A_VcCMurdg?si=nAVboDadvLU39egI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    `;
  });

  // ---- MÚSICAS EM DESTAQUE: EMBED DINÂMICO ----
  document.querySelectorAll('.music-card .play-button').forEach(btn => {
    btn.addEventListener('click', function() {
      const card = this.closest('.music-card');
      const embedUrl = card.dataset.spotifyEmbed + '?autoplay=1';
      // remove player anterior, se houver
      const prev = card.querySelector('.spotify-embed');
      if (prev) prev.remove();
      // cria container e injeta iframe
      const cont = document.createElement('div');
      cont.className = 'spotify-embed';
      cont.innerHTML = `
        <iframe
          src="${embedUrl}"
          width="300" height="80"
          frameborder="0"
          allow="autoplay; encrypted-media"
          allowtransparency="true"
          allowfullscreen
        ></iframe>
      `;
      card.appendChild(cont);
    });
  });
});
