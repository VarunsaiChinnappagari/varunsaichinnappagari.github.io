(() => {
  const intro = document.getElementById('intro');
  const video = document.getElementById('introVideo');
  const site = document.getElementById('site');
  const skip = document.getElementById('skipIntro');
  let finished = false;
  const enter = () => {
    if (finished) return;
    window.scrollTo({top:0,left:0,behavior:'instant'});
    finished = true;
    document.body.classList.remove('intro-lock');
    site.classList.add('entered');
    setTimeout(() => intro.classList.add('done'), 650);
  };
  video.addEventListener('ended', enter);
  skip.addEventListener('click', () => { video.pause(); enter(); });
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  window.scrollTo(0, 0);
  setTimeout(() => { if (!finished && video.readyState >= 2) video.play().catch(() => {}); }, 100);

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('in-view'); observer.unobserve(entry.target); } });
  }, {threshold: .12});
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  const form = document.getElementById('contactForm');
  const note = document.getElementById('formNote');
  form.addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(form);
    const subject = encodeURIComponent(`Portfolio enquiry from ${data.get('name')}`);
    const body = encodeURIComponent(`Name: ${data.get('name')}\nEmail: ${data.get('email')}\n\n${data.get('message')}`);
    window.location.href = `mailto:varunsaichinnappagari@gmail.com?subject=${subject}&body=${body}`;
    note.textContent = 'Opening your email client…';
  });
})();
