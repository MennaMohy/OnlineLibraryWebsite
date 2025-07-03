// Infinite carousel for borrowed and favorite books rows
function setupInfiniteCarousel(rowSelector) {
    const row = document.querySelector(rowSelector);
    if (!row) return;
    const container = row.parentElement; // #box
    const cards = Array.from(row.children);
    if (cards.length <= 1) return; // No need for carousel

    // Duplicate cards for seamless looping
    cards.forEach(card => {
        const clone = card.cloneNode(true);
        clone.classList.add('carousel-clone');
        row.appendChild(clone);
    });

    let scrollAmount = 0;
    const cardWidth = cards[0].offsetWidth + 32; // 32px gap
    const visibleWidth = container.offsetWidth - 60; // 60px for padding
    const totalCards = cards.length;
    // Loop distance: only the width of 2 extra cards beyond the visible area
    const loopDistance = visibleWidth + cardWidth * 2;
    let isPaused = false;

    function animate() {
        if (!isPaused) {
            scrollAmount += 1; // Speed: 1px per frame
            if (scrollAmount >= loopDistance) {
                scrollAmount = 0;
            }
            row.style.transform = `translateX(-${scrollAmount}px)`;
        }
        requestAnimationFrame(animate);
    }

    row.addEventListener('mouseenter', () => { isPaused = true; });
    row.addEventListener('mouseleave', () => { isPaused = false; });

    animate();
}

document.addEventListener('DOMContentLoaded', function() {
    setupInfiniteCarousel('#bookResults.book-row-scroll');
    setupInfiniteCarousel('#favoriteBooksResults.book-row-scroll');
}); 