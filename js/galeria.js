document.addEventListener('DOMContentLoaded', () => {
  // Menu Mobile
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu');
  menuBtn.addEventListener('click', () => mobileMenu.classList.toggle('active'));
  document.addEventListener('click', e => {
    if (!menuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
      mobileMenu.classList.remove('active');
    }
  });

  // Filtro de Categorias
  const filterBtns = document.querySelectorAll('.filter-btn');
  const items = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.dataset.filter;
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      items.forEach(item => {
        if (cat === 'all' || item.dataset.category === cat) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // Newsletter
  const newsletterForm = document.getElementById('newsletter-form');
  newsletterForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = newsletterForm.querySelector('input').value;
    alert(`Obrigado por se inscrever! Novidades para: ${email}`);
    newsletterForm.reset();
  });
});
