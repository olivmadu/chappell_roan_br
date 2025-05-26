document.addEventListener('DOMContentLoaded', () => {
  // Menu móvel
  const btnToggle = document.querySelector('.mobile-menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu');
  btnToggle.addEventListener('click', () => mobileMenu.classList.toggle('active'));
  document.addEventListener('click', e => {
    if (!btnToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
      mobileMenu.classList.remove('active');
    }
  });

  // Carregar mais notícias
  const loadBtn = document.getElementById('loadMoreBtn');
  loadBtn.addEventListener('click', () => {
    document.querySelectorAll('.news-card.hidden').forEach(card => card.classList.remove('hidden'));
    loadBtn.style.display = 'none';
  });

  // Newsletter
  const formNews = document.getElementById('newsletter-form');
  formNews.addEventListener('submit', e => {
    e.preventDefault();
    const email = formNews.querySelector('input[type="email"]').value;
    alert(`Obrigado! Em breve novidades em ${email}`);
    formNews.reset();
  });
});
