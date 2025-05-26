document.addEventListener('DOMContentLoaded', () => {
  // Toggle menu mobile
  const btn = document.querySelector('.mobile-menu-btn');
  const menu = document.querySelector('.mobile-menu');
  btn.addEventListener('click', () => menu.classList.toggle('active'));
  document.addEventListener('click', e => {
    if (!btn.contains(e.target) && !menu.contains(e.target)) {
      menu.classList.remove('active');
    }
  });

  // Newsletter form
  const form = document.getElementById('newsletter-form');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const email = form.querySelector('input[type="email"]').value;
      alert(`Obrigado por se inscrever! Novidades em breve em ${email}`);
      form.reset();
    });
  }
});
