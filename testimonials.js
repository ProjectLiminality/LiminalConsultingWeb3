class TestimonialsCarousel {
  constructor(containerId) {
    this.mediaFiles = [
      { src: 'media/testimonials/TestimonialDavid.png', alt: 'Testimonial 1' },
      { src: 'media/testimonials/TestimonialDavid.png', alt: 'Testimonial 2' },
      { src: 'media/testimonials/TestimonialDavid.png', alt: 'Testimonial 3' }
      // Add more testimonials as needed
    ];
    
    this.container = document.getElementById(containerId);
    this.createCarouselStructure();
    
    this.carousel = this.container.querySelector('.testimonials-carousel');
    this.items = this.container.querySelectorAll('.testimonials-carousel-item');
    this.prevButton = this.container.querySelector('.testimonials-carousel-button.prev');
    this.nextButton = this.container.querySelector('.testimonials-carousel-button.next');
    
    this.currentIndex = 0;
    this.totalItems = this.items.length;
    
    this.setupEventListeners();
    this.startAutoPlay();
  }

  createCarouselStructure() {
    const section = document.createElement('section');
    section.className = 'testimonials-section';
    
    const title = document.createElement('h2');
    title.textContent = 'Testimonials';
    
    const carouselContainer = document.createElement('div');
    carouselContainer.className = 'testimonials-carousel-container';
    
    const prevButton = document.createElement('button');
    prevButton.className = 'testimonials-carousel-button prev';
    prevButton.innerHTML = '&lt;';
    
    const nextButton = document.createElement('button');
    nextButton.className = 'testimonials-carousel-button next';
    nextButton.innerHTML = '&gt;';
    
    const carousel = document.createElement('div');
    carousel.className = 'testimonials-carousel';
    
    // Create carousel items
    this.mediaFiles.forEach(file => {
      const item = document.createElement('div');
      item.className = 'testimonials-carousel-item';
      
      const mediaContainer = document.createElement('div');
      mediaContainer.className = 'testimonials-media-container';
      
      const img = document.createElement('img');
      img.src = file.src;
      img.alt = file.alt;
      
      mediaContainer.appendChild(img);
      item.appendChild(mediaContainer);
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
    const offset = -(this.currentIndex * 33.33);
    this.carousel.style.transform = `translateX(${offset}%)`;
    
    // Reset all items
    this.items.forEach((item) => {
      item.classList.remove('active', 'prev', 'next');
      item.style.transform = 'scale(0.5)';
      item.style.opacity = '0.5';
    });
    
    // Set active item
    const activeIndex = (this.currentIndex + 1) % this.totalItems;
    this.items[activeIndex].classList.add('active');
    this.items[activeIndex].style.transform = 'scale(1)';
    this.items[activeIndex].style.opacity = '1';
    
    // Set prev item
    const prevIndex = activeIndex === 0 ? this.totalItems - 1 : activeIndex - 1;
    this.items[prevIndex].classList.add('prev');
    
    // Set next item
    const nextIndex = (activeIndex + 1) % this.totalItems;
    this.items[nextIndex].classList.add('next');
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
    setInterval(() => this.next(), 10000); // Change slide every 10 seconds
  }
}

// Initialize testimonials carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new TestimonialsCarousel('testimonials-container');
});
