/* script.js - Avtomatik Karusel Funksiyasi Qo'shildi */

document.addEventListener('DOMContentLoaded', () => {
    
    const carousel = document.querySelector('.image-carousel');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const imageItems = document.querySelectorAll('.image-item');

    if (carousel && prevBtn && nextBtn && imageItems.length > 0) {
        
        // --- Karusel O'lchamlarini Hisoblash ---
        const scrollAmount = imageItems[0].clientWidth + 20; // Rasm kengligi + CSSdagi gap: 20px
        const totalItems = imageItems.length;
        let currentItem = 0; // Hozirgi rasm indeksi

        // --- Avtomatik Aylanish Sozlamalari ---
        const AUTOPLAY_INTERVAL = 3000; // 3 soniyada bir aylanadi (millisekundlarda)
        let autoplayInterval; 

        // Rasmga o'tish funksiyasi
        const scrollToNextItem = () => {
            currentItem++;
            
            // Agar oxiriga yetib kelsa, birinchi rasmga qaytaramiz (loop)
            if (currentItem >= totalItems) {
                currentItem = 0;
                // Boshiga tez o'tkazish, chunki scroll to'satdan bo'lishi kerak
                carousel.scrollTo({
                    left: 0,
                    behavior: 'instant' 
                });
                return; 
            }
            
            // Keyingi rasmga silliq o'tish
            carousel.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        };
        
        // Avtomatik aylanishni boshlash
        const startAutoplay = () => {
            autoplayInterval = setInterval(scrollToNextItem, AUTOPLAY_INTERVAL);
        };
        
        // Avtomatik aylanishni to'xtatish (masalan, foydalanuvchi tugmani bossa)
        const stopAutoplay = () => {
            clearInterval(autoplayInterval);
        };

        // --- Tugmalarni Boshqarish ---
        
        const handleManualScroll = (direction) => {
            stopAutoplay(); // Foydalanuvchi aralashganda to'xtatish
            
            if (direction === 'next') {
                 carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            } else if (direction === 'prev') {
                 carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            }
            
            // Tugmani bosishdan keyin ma'lum bir vaqtdan so'ng yana boshlash (ixtiyoriy)
            setTimeout(startAutoplay, 2000); // 2 soniyadan keyin qayta boshlash
        };
        
        // Keyingi tugmasi
        nextBtn.addEventListener('click', () => {
            handleManualScroll('next');
        });

        // Avvalgi tugmasi
        prevBtn.addEventListener('click', () => {
            handleManualScroll('prev');
        });

        // --- Karuselga Mouse bilan kelsa to'xtatish (UX uchun) ---
        carousel.addEventListener('mouseenter', stopAutoplay);
        carousel.addEventListener('mouseleave', startAutoplay);


        // --- Boshlash ---
        startAutoplay();
        
        // Hozirgi elementni scroll bo'yicha yangilash (agar user qo'lda sursa)
        carousel.addEventListener('scroll', () => {
            // Qaysi element ko'rinib turganini aniqlash
            currentItem = Math.round(carousel.scrollLeft / scrollAmount);
        });

    }
    
    // ... (Video va Telefon funksiyalari avvalgidek qoladi) ...

    const videoIcon = document.querySelector('.video-icon');
    if (videoIcon) {
        videoIcon.addEventListener('click', () => {
            alert("Video namoyishini boshlash uchun funksiya.");
        });
    }
});
