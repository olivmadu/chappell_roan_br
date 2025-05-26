// discografia.js
document.addEventListener('DOMContentLoaded', function() {
  // ===== Menu mobile toggle =====
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu');
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
  });
  document.addEventListener('click', e => {
    if (!mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
      mobileMenu.classList.remove('active');
    }
  });

  // ===== Scroll suave para links internos =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const id = this.getAttribute('href');
      if (id !== '#') {
        const el = document.querySelector(id);
        if (el) {
          window.scrollTo({ top: el.offsetTop - 70, behavior: 'smooth' });
          mobileMenu.classList.remove('active');
        }
      }
    });
  });

  // ===== Newsletter =====
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', e => {
      e.preventDefault();
      const email = e.target.querySelector('input[type="email"]').value;
      alert(`Obrigado por se inscrever! Em breve novidades no e-mail: ${email}`);
      e.target.reset();
    });
  }

  // ===== EMBED SPOTIFY: Ouvir Álbum / Single =====
  document.querySelectorAll('.release-item .album-play').forEach(btn => {
    btn.addEventListener('click', function() {
      const item = this.closest('.release-item');
      const embedUrl = item.dataset.spotifyAlbum || item.dataset.spotifyTrack;
      const container = item.querySelector('.spotify-embed-container');
      container.innerHTML = '';
      const iframe = document.createElement('iframe');
      iframe.src = embedUrl + '?autoplay=1';
      iframe.width = '300';
      iframe.height = '80';
      iframe.frameBorder = '0';
      iframe.allow = 'autoplay; encrypted-media';
      iframe.allowTransparency = 'true';
      iframe.allowFullscreen = true;
      container.appendChild(iframe);
    });
  });

  // ===== EMBED SPOTIFY: play de cada faixa =====
  document.querySelectorAll('.track-item .track-play').forEach(btn => {
    btn.addEventListener('click', function() {
      const track = this.closest('.track-item');
      const embedUrl = track.dataset.spotifyTrack;
      let container = track.querySelector('.spotify-embed-container');
      if (!container) {
        container = document.createElement('div');
        container.className = 'spotify-embed-container';
        track.appendChild(container);
      }
      container.innerHTML = '';
      const iframe = document.createElement('iframe');
      iframe.src = embedUrl + '?autoplay=1';
      iframe.width = '300';
      iframe.height = '80';
      iframe.frameBorder = '0';
      iframe.allow = 'autoplay; encrypted-media';
      iframe.allowTransparency = 'true';
      iframe.allowFullscreen = true;
      container.appendChild(iframe);
    });
  });
});
