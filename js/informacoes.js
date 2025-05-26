document.addEventListener('DOMContentLoaded', () => {
  // --- Mobile menu toggle ---
  const btn = document.querySelector('.mobile-menu-btn'),
        menu = document.querySelector('.mobile-menu');
  btn.addEventListener('click', ()=> menu.classList.toggle('active'));
  document.addEventListener('click', e=>{
    if(!btn.contains(e.target) && !menu.contains(e.target)) menu.classList.remove('active');
  });

  // --- Smooth scroll interno ---
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', e=>{
      e.preventDefault();
      const tgt = document.querySelector(a.getAttribute('href'));
      if(!tgt) return;
      window.scrollTo({ top: tgt.offsetTop - 70, behavior:'smooth' });
      menu.classList.remove('active');
    });
  });

document.querySelectorAll('.accordion-header').forEach(header => {
  header.addEventListener('click', () => {
    const item = header.parentElement;
    // se já está ativo, fecha; senão, abre e fecha os irmãos
    if (item.classList.contains('active')) {
      item.classList.remove('active');
    } else {
      // fecha todos
      document.querySelectorAll('.accordion-item.active').forEach(openItem => {
        openItem.classList.remove('active');
      });
      // abre somente o clicado
      item.classList.add('active');
    }
  });
});

  // --- Testimonials slider ---
  let idx = 0;
  const slides = document.querySelectorAll('.slide'),
        total = slides.length;
  document.querySelector('.slide-btn.next').addEventListener('click', ()=>{
    idx = (idx+1) % total;
    refreshSlider();
  });
  document.querySelector('.slide-btn.prev').addEventListener('click', ()=>{
    idx = (idx-1+total) % total;
    refreshSlider();
  });
  function refreshSlider(){
    const container = document.querySelector('.slides');
    container.style.transform = `translateX(-${idx * 100}%)`;
  }

  // --- Voltar ao Topo ---
  const toTop = document.getElementById('toTop');
  window.addEventListener('scroll', ()=>{
    toTop.style.display = window.scrollY > 300 ? 'block' : 'none';
  });
  toTop.addEventListener('click', ()=> window.scrollTo({ top:0, behavior:'smooth' }));

  // --- Newsletter Form ---
  const form = document.getElementById('newsletter-form');
  form && form.addEventListener('submit', e=>{
    e.preventDefault();
    alert(`Obrigado! Você receberá novidades em breve.`);
    form.reset();
  });
});
