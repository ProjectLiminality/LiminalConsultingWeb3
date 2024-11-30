class Carousel {
  constructor(containerId) {
    this.mediaFiles = [
      { src: 'media/CentralisedUnderstanding.gif', alt: 'Centralised Understanding' },
      { src: 'media/ClarityBehindComplexity.gif', alt: 'Clarity Behind Complexity' },
      { src: 'media/DecentralisingUnderstanding.gif', alt: 'Decentralising Understanding' }
    ];
    
    this.container = document.getElementById(containerId);
    this.createCarouselStructure();
    
    this.carousel = this.container.querySelector('.carousel');
    this.items = this.container.querySelectorAll('.carousel-item');
    this.prevButton = this.container.querySelector('.carousel-button.prev');
    this.nextButton = this.container.querySelector('.carousel-button.next');
    
    this.currentIndex = 0;
    this.totalItems = this.items.length;
    
    this.setupEventListeners();
    this.startAutoPlay();
  }

  createCarouselStructure() {
    const section = document.createElement('section');
    section.className = 'examples-section';
    
    const title = document.createElement('h2');
    title.textContent = 'Examples';
    
    const carouselContainer = document.createElement('div');
    carouselContainer.className = 'carousel-container';
    
    const prevButton = document.createElement('button');
    prevButton.className = 'carousel-button prev';
    prevButton.innerHTML = '&lt;';
    
    const nextButton = document.createElement('button');
    nextButton.className = 'carousel-button next';
    nextButton.innerHTML = '&gt;';
    
    const carousel = document.createElement('div');
    carousel.className = 'carousel';
    
    // Create carousel items
    this.mediaFiles.forEach(file => {
      const item = document.createElement('div');
      item.className = 'carousel-item';
      
      const img = document.createElement('img');
      img.src = file.src;
      img.alt = file.alt;
      
      item.appendChild(img);
      carousel.appendChild(item);
    });
    
    carouselContainer.appendChild(prevButton);
    carouselContainer.appendChild(carousel);
    carouselContainer.appendChild(nextButton);
    
    section.appendChild(title);
    section.appendChild(carouselContainer);
    
    this.container.appendChild(section);
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
  new Carousel('examples-container');
});
