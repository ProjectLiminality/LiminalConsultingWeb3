class Carousel {
  constructor(container) {
    this.container = container;
    this.carousel = container.querySelector('.carousel');
    this.items = container.querySelectorAll('.carousel-item');
    this.prevButton = container.querySelector('.carousel-button.prev');
    this.nextButton = container.querySelector('.carousel-button.next');
    
    this.currentIndex = 0;
    this.totalItems = this.items.length;
    
    this.setupEventListeners();
    this.startAutoPlay();
  }

  setupEventListeners() {
    this.prevButton.addEventListener('click', () => this.prev());
    this.nextButton.addEventListener('click', () => this.next());
  }

  updateCarousel() {
    const offset = -this.currentIndex * 100;
    this.carousel.style.transform = `translateX(${offset}%)`;
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.totalItems;
    this.updateCarousel();
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.totalItems) % this.totalItems;
    this.updateCarousel();
  }

  startAutoPlay() {
    setInterval(() => this.next(), 5000); // Change slide every 5 seconds
  }
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const carouselContainer = document.querySelector('.carousel-container');
  if (carouselContainer) {
    new Carousel(carouselContainer);
  }
});
