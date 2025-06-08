
 
document.querySelectorAll('.work-popup, .work-link').forEach(el => {
    el.addEventListener('click', function () {
        const modalImg = document.getElementById('modalImage');
        const modalTitle = document.getElementById('modalTitle');
        const modalDesc = document.getElementById('modalDescription');

        modalImg.src = this.dataset.img || '';
        modalTitle.textContent = this.dataset.title || '';
        modalDesc.textContent = this.dataset.description || '';
    });
});
 
  window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 100;
      const sectionId = current.getAttribute('id');
      const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLink.classList.add('active');
      } else {
        navLink.classList.remove('active');
      }
    });
  });

function animateCount(el, target, duration) {
    const isEmergency = el.classList.contains('emergency');
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const value = Math.floor(progress * target);

      
        el.innerText = isEmergency ? value : `${value.toLocaleString()}+`;

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
           
            if (isEmergency) {
                el.innerText = '24/7';
            }
        }
    }

    requestAnimationFrame(update);
}

 
let hasAnimated = false;
const statsSection = document.querySelector('.stats-bar');

const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !hasAnimated) {
        hasAnimated = true;
        document.querySelectorAll('.stat-number').forEach(el => {
            const target = parseInt(el.getAttribute('data-target'));
            animateCount(el, target, 1500);
        });
    }
}, { threshold: 0.5 });

observer.observe(statsSection);
 


