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
