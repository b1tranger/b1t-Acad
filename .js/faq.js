document.querySelectorAll('.faq-icon').forEach(icon => {
  icon.addEventListener('click', function () {
      const section = this.closest('.section');
      const faqBox = section.querySelector('.faq-box');
      const faqs = section.getAttribute('data-faq').split('|');
      faqBox.innerHTML = faqs.map(faq => ` ${faq}`).join('<br>');
      faqBox.style.display = (faqBox.style.display === 'block') ? 'none' : 'block';
  });
});