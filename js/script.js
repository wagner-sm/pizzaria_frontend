document.addEventListener('DOMContentLoaded', function() {
    // Menu Overlay
    const openMenuBtn = document.getElementById('open-menu-btn');
    const menuOverlay = document.getElementById('menu-overlay');
    const closeMenuBtn = document.getElementById('close-menu-btn');

    if (openMenuBtn && menuOverlay && closeMenuBtn) {
        openMenuBtn.addEventListener('click', function() {
            menuOverlay.classList.add('visible');
        });

        closeMenuBtn.addEventListener('click', function() {
            menuOverlay.classList.remove('visible');
        });

        menuOverlay.addEventListener('click', function(event) {
            if (event.target === menuOverlay) {
                menuOverlay.classList.remove('visible');
            }
        });
    }

    // Contact Form Submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const formData = {
                fullName: document.getElementById('full-name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                reason: document.getElementById('reason').value
            };

            // Enviar dados para o backend
            fetch('http://localhost:5000/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(data => {
                if (data.message) {
                    alert(data.message);
                    contactForm.reset();
                } else if (data.error) {
                    alert('Erro: ' + data.error);
                }
            })
            .catch(error => {
                console.error('Erro:', error);
                alert('Erro ao enviar mensagem. Tente novamente.');
            });
        });
    }

    // Abrir formulário de contato em nova aba
    const openContactBtn = document.getElementById('open-contact-btn');
    if (openContactBtn) {
        openContactBtn.addEventListener('click', function() {
            window.open('contato.html', '_blank');
        });
    }
});