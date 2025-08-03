document.addEventListener('DOMContentLoaded', function () {
    const carousel = document.querySelector('.hero__carousel');
    const track = carousel.querySelector('.hero__carousel-track');
    // Hentikan eksekusi jika elemen carousel tidak ditemukan
    if (!track) {
        return;
    }

    const slides = Array.from(track.children);
    const nextButton = carousel.querySelector('.hero__btn--right');
    const prevButton = carousel.querySelector('.hero__btn--left');
    const heroTitle = carousel.querySelector('.hero__text h1');
    const heroParagraph = carousel.querySelector('.hero__text p');

    const slideData = [
        {
            imageUrl: 'Promo 1.png',
            title: 'Menangkan undian hadiah menarik! Trip to Japan!',
            description: 'Periode pengundian: 27 November 20204 - 3 desember 2024.'
        },
        {
            imageUrl: 'Promo 2.png',
            title: 'Kualitas Flash SALE!',
            description: 'Mid-Month Special Sale! Flash Sale mulai dari RP 10.000'
        },
        {
            imageUrl: 'Promo 3.png',
            title: 'PROMO 12.12',
            description: 'Periode promo: 6 - 13 Desember 2024'
        }
    ];

    let currentIndex = 0;
    let slideWidth = 0;

    const updateSlideContent = (index) => {
        const currentSlideData = slideData[(index + slides.length) % slides.length]; // Handle looping
        slides.forEach((slide, i) => {
            slide.style.backgroundImage = `url('${currentSlideData.imageUrl}')`;
            if (i === 0) { // Hanya update teks pada slide pertama (yang terlihat)
                heroTitle.textContent = currentSlideData.title;
                heroParagraph.textContent = currentSlideData.description;
            }
        });
    };

    const moveToSlide = (targetIndex) => {
        // Koreksi jika targetIndex keluar dari batas (looping)
        const newIndex = (targetIndex + slides.length) % slides.length;
        const amountToMove = newIndex * slideWidth;
        track.style.transform = `translateX(-${amountToMove}px)`;
        currentIndex = newIndex;
        updateSlideContent(currentIndex);
    };

    const setupCarousel = () => {
        slideWidth = slides.length > 0 ? slides.reduce((sum, slide) => sum + slide.offsetWidth, 0) / slides.length : 0;
        if (slides.length > 0) {
            slides.forEach(slide => slide.style.width = `${slideWidth}px`);
        }
        moveToSlide(currentIndex); // Tampilkan slide pertama saat setup
    };

    // --- EVENT LISTENERS ---

    nextButton.addEventListener('click', () => {
        moveToSlide(currentIndex + 1);
    });

    prevButton.addEventListener('click', () => {
        moveToSlide(currentIndex - 1);
    });

    setInterval(() => {
        moveToSlide(currentIndex + 1);
    }, 5000);

    window.addEventListener('resize', setupCarousel);

    setupCarousel();
});
