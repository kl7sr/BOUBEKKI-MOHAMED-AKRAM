// Video Player Dialog
const dialog = document.getElementById('player');
if (dialog) {
    const frame = dialog.querySelector('.frame');

    document.querySelectorAll('.work').forEach((btn) => {
        btn.addEventListener('click', () => {
            const url = btn.dataset.video || '';
            frame.innerHTML = '';

            if (!url || url.startsWith('[')) {
                const msg = document.createElement('p');
                msg.textContent = 'Video coming soon.';
                frame.appendChild(msg);
            } else if (/\.(mp4|webm)(\?|$)/i.test(url)) {
                const video = document.createElement('video');
                video.src = url;
                video.controls = true;
                video.autoplay = true;
                video.playsInline = true;
                frame.appendChild(video);
            } else {
                const iframe = document.createElement('iframe');
                iframe.src = url;
                iframe.title = btn.dataset.title || 'Video';
                iframe.allow = 'autoplay; fullscreen; picture-in-picture';
                iframe.allowFullscreen = true;
                frame.appendChild(iframe);
            }

            dialog.showModal();
        });
    });

    // Stop playback and clear the player when it closes
    dialog.addEventListener('close', () => { frame.innerHTML = ''; });
    dialog.addEventListener('click', (e) => { if (e.target === dialog) dialog.close(); });
}

// Timeline Navigation on Desktop (Arrow buttons + smooth scroll)
const timelineViewport = document.getElementById('timeline-viewport');
const prevBtn = document.querySelector('.tl-prev');
const nextBtn = document.querySelector('.tl-next');

if (timelineViewport && prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
        timelineViewport.scrollBy({ left: -360, behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', () => {
        timelineViewport.scrollBy({ left: 360, behavior: 'smooth' });
    });

    // Optional drag-to-scroll for desktop timeline
    let isDown = false;
    let startX;
    let scrollLeft;

    timelineViewport.addEventListener('mousedown', (e) => {
        if (window.innerWidth < 900) return;
        isDown = true;
        startX = e.pageX - timelineViewport.offsetLeft;
        scrollLeft = timelineViewport.scrollLeft;
        timelineViewport.style.cursor = 'grabbing';
    });

    window.addEventListener('mouseup', () => {
        isDown = false;
        if (timelineViewport) timelineViewport.style.cursor = '';
    });

    timelineViewport.addEventListener('mousemove', (e) => {
        if (!isDown || window.innerWidth < 900) return;
        e.preventDefault();
        const x = e.pageX - timelineViewport.offsetLeft;
        const walk = (x - startX) * 1.5;
        timelineViewport.scrollLeft = scrollLeft - walk;
    });
}

// WhatsApp Contact Form Integration (+213 775 60 76 10)
const WHATSAPP_PHONE = '213775607610';
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const nameInput = document.getElementById('c-name');
        const emailInput = document.getElementById('c-email');
        const serviceSelect = document.getElementById('c-service');
        const messageInput = document.getElementById('c-message');

        const name = nameInput ? nameInput.value.trim() : '';
        const email = emailInput ? emailInput.value.trim() : '';
        const service = serviceSelect && serviceSelect.selectedIndex > 0
            ? serviceSelect.options[serviceSelect.selectedIndex].text
            : '';
        const message = messageInput ? messageInput.value.trim() : '';

        // Build formatted message for WhatsApp
        let text = `Hello Akram,\nI'm reaching out through your portfolio website.\n\n`;
        if (name) text += `*Name:* ${name}\n`;
        if (email) text += `*Email:* ${email}\n`;
        if (service) text += `*Project:* ${service}\n`;
        if (message) text += `\n*Message:*\n${message}\n`;

        const waUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(text)}`;

        // Open WhatsApp in a new tab / application
        window.open(waUrl, '_blank', 'noopener,noreferrer');

        const submitBtn = contactForm.querySelector('.btn-submit span');
        if (submitBtn) {
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Opening WhatsApp...';
            setTimeout(() => {
                submitBtn.textContent = originalText;
            }, 3000);
        }
    });
}
