document.addEventListener("DOMContentLoaded", function () {
    const walletAddress = document.getElementById("wallet");
    const copyButton = document.querySelector(".copy-btn");
    const timerElement = document.getElementById("counting-timer");
    const slides = document.querySelectorAll(".slide");
    const nextButton = document.getElementById("nextSlide");
    const prevButton = document.getElementById("prevSlide");
    let currentSlide = 0;

    // Copy wallet address to clipboard
    copyButton.addEventListener("click", function () {
        navigator.clipboard.writeText(walletAddress.textContent)
            .then(() => { alert("Wallet address copied!"); })
            .catch(err => { console.error("Error copying text: ", err); });
    });

    // Presale timer (counting up)
    function startCountingTimer(startDate) {
        function updateTimer() {
            const now = new Date();
            const elapsedTime = Math.floor((now - startDate) / 1000);
            const days = Math.floor(elapsedTime / 86400);
            const hours = Math.floor((elapsedTime % 86400) / 3600);
            const minutes = Math.floor((elapsedTime % 3600) / 60);
            const seconds = elapsedTime % 60;

            timerElement.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        }

        setInterval(updateTimer, 1000);
        updateTimer();
    }

    const presaleStartDate = new Date("2025-02-09T00:00:00Z");
    startCountingTimer(presaleStartDate);

    // Fixed Slider Functionality
    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove("active");
            if (i === index) {
                slide.classList.add("active");
            }
        });
    }

    nextButton.addEventListener("click", () => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    });

    prevButton.addEventListener("click", () => {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    });

    // Ensure the first slide is visible when page loads
    showSlide(currentSlide);
});
