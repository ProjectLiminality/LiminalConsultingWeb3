class TestimonialsCarousel {
  constructor(containerId) {
    const originalFiles = [
      { src: 'media/testimonials/TestimonialMichel.png', alt: 'Testimonial Michel', link: 'https://p2pfoundation.net' },
      { src: 'media/testimonials/TestimonialZak.png', alt: 'Testimonial Zak', link: 'https://consilienceproject.org' },
      { src: 'media/testimonials/TestimonialJeremy.png', alt: 'Testimonial Jeremy', link: 'https://www.liberatingstructures.com' },
      { src: 'media/testimonials/TestimonialJames.png', alt: 'Testimonial James', link: 'https://www.weco.io' },
      { src: 'media/testimonials/TestimonialJeff.png', alt: 'Testimonial Jeff', link: 'https://mycofi.art' },
      { src: 'media/testimonials/TestimonialMichel.png', alt: 'Testimonial Michel', link: 'https://p2pfoundation.net' },
      { src: 'media/testimonials/TestimonialZak.png', alt: 'Testimonial Zak', link: 'https://consilienceproject.org' },
      { src: 'media/testimonials/TestimonialJeremy.png', alt: 'Testimonial Jeremy', link: 'https://www.liberatingstructures.com' },
      { src: 'media/testimonials/TestimonialJames.png', alt: 'Testimonial James', link: 'https://www.weco.io' },
      { src: 'media/testimonials/TestimonialJeff.png', alt: 'Testimonial Jeff', link: 'https://mycofi.art' },
      // Add more testimonials as needed
    ];
    
    // Append first two items to the end
    this.mediaFiles = [...originalFiles, originalFiles[0], originalFiles[1]];
    
    this.container = document.getElementById(containerId);
    this.createCarouselStructure();
    
    this.carousel = this.container.querySelector('.testimonials-carousel');
    this.items = this.container.querySelectorAll('.testimonials-carousel-item');
    this.prevButton = this.container.querySelector('.testimonials-carousel-button.prev');
    this.nextButton = this.container.querySelector('.testimonials-carousel-button.next');
    
    this.currentIndex = 0;
    this.totalItems = this.items.length;
    
    this.setupEventListeners();
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
      
      if (file.link) {
        const link = document.createElement('a');
        link.href = file.link;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        
        const img = document.createElement('img');
        img.src = file.src;
        img.alt = file.alt;
        
        link.appendChild(img);
        mediaContainer.appendChild(link);
      } else {
        const img = document.createElement('img');
        img.src = file.src;
        img.alt = file.alt;
        mediaContainer.appendChild(img);
      }
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
    // Auto-play disabled
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
    
    // Set active item (shifted two positions right)
    const activeIndex = (this.currentIndex + 1) % this.totalItems;
    this.items[activeIndex].classList.add('active');
    this.items[activeIndex].style.transform = 'scale(1.2)';
    this.items[activeIndex].style.opacity = '1';
    
    // Enable/disable click events based on active state
    this.items.forEach((item, index) => {
      const link = item.querySelector('a');
      if (link) {
        if (index === activeIndex) {
          link.style.pointerEvents = 'auto';
          link.style.cursor = 'pointer';
        } else {
          link.style.pointerEvents = 'none';
          link.style.cursor = 'default';
        }
      }
    });
    
    // Set prev item
    const prevIndex = activeIndex === 0 ? this.totalItems - 1 : activeIndex - 1;
    this.items[prevIndex].classList.add('prev');
    
    // Set next item
    const nextIndex = (activeIndex + 1) % this.totalItems;
    this.items[nextIndex].classList.add('next');
  }

  next() {
    // If we're at the third-to-last item (which is the last original item)
    if (this.currentIndex === this.totalItems - 3) {
      // Jump back to the beginning
      this.currentIndex = 0;
    } else {
      this.currentIndex = (this.currentIndex + 1) % this.totalItems;
    }
    this.updateCarousel();
  }

  prev() {
    if (this.currentIndex === 0) {
      // Jump to the last original item
      this.currentIndex = this.totalItems - 3;
    } else {
      this.currentIndex = (this.currentIndex - 1 + this.totalItems) % this.totalItems;
    }
    this.updateCarousel();
  }

  // Auto-play disabled
}

// Initialize testimonials carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const testimonials = new TestimonialsCarousel('testimonials-container');
  // Trigger initial update
  testimonials.updateCarousel();
});
