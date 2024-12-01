class Carousel {
  constructor(containerId) {
    this.mediaFiles = [
      { src: 'media/examples/CentralizationDecentralizationCycle.gif', alt: 'Centralization Decentralization Cycle' },
      { src: 'media/examples/ComplicatedVsComplex.png', alt: 'Complicated Vs Complex' },
      { src: 'media/examples/FourthTurningPendulum.gif', alt: 'Fourth Turning Pendulum' },
      { src: 'media/examples/ManMachineNature.gif', alt: 'Man Machine Nature' },
      { src: 'media/examples/NoosphereAndBiosphere.gif', alt: 'Noosphere And Biosphere' },
      { src: 'media/examples/StoryMediatesRelationship.mp4', alt: 'Story Mediates Relationship' },
      { src: 'media/examples/StoryOfEmergence.gif', alt: 'Story Of Emergence' },
      { src: 'media/examples/Synergy.gif', alt: 'Synergy' },
      { src: 'media/examples/TaylorExpansion.gif', alt: 'Taylor Expansion' },
      { src: 'media/examples/TheGardenAndTheMachine_fps30.0.mp4', alt: 'The Garden And The Machine' },
      { src: 'media/examples/TheSpiral.gif', alt: 'The Spiral' }
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
      
      const mediaContainer = document.createElement('div');
      mediaContainer.className = 'media-container';
      
      const img = document.createElement('img');
      img.src = file.src;
      img.alt = file.alt;
      
      const title = document.createElement('p');
      title.className = 'media-title';
      title.textContent = file.alt;
      
      mediaContainer.appendChild(img);
      mediaContainer.appendChild(title);
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
    const offset = -(this.currentIndex * 33.33 + 33.33);
    this.carousel.style.transform = `translateX(${offset}%)`;
    
    // Update opacity classes
    this.items.forEach((item, index) => {
      item.classList.remove('active');
    });
    this.items[this.currentIndex].classList.add('active');
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

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new Carousel('examples-container');
});
