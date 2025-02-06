class Carousel {
  constructor(containerId) {
    const originalFiles = [
      { src: 'media/examples/CentralizationDecentralizationCycle.gif', alt: 'Centralization Decentralization Cycle', link: 'https://github.com/InterfaceGuy/CentralizationDecentralizationCycle' },
      { src: 'media/examples/ComplicatedVsComplex.png', alt: 'Complicated Vs Complex', link: 'https://projectliminality.github.io/ComplicatedVsComplex/' },
      { src: 'media/examples/FourthTurningPendulum.gif', alt: 'Fourth Turning Pendulum', link: 'https://github.com/InterfaceGuy/FourthTurning' },
      { src: 'media/examples/ManMachineNature.gif', alt: 'Man Machine Nature', link: 'https://github.com/InterfaceGuy/ManMachineNature' },
      { src: 'media/examples/NoosphereAndBiosphere.gif', alt: 'Noosphere And Biosphere', link: 'https://github.com/InterfaceGuy/NoosphereAndBiosphere' },
      { src: 'media/examples/StoryMediatesRelationship.mp4', alt: 'Story Mediates Relationship', link: 'https://github.com/InterfaceGuy/StoryMediatesRelationship' },
      { src: 'media/examples/StoryOfEmergence.gif', alt: 'Story Of Emergence', link: 'https://github.com/InterfaceGuy/StoryOfEmergence' },
      { src: 'media/examples/Synergy.gif', alt: 'Synergy', link: 'https://github.com/InterfaceGuy/Synergy' },
      { src: 'media/examples/TaylorExpansion.gif', alt: 'Taylor Expansion', link: 'https://github.com/InterfaceGuy/TaylorExpansion' },
      { src: 'media/examples/TheGardenAndTheMachine.mp4', alt: 'The Garden And The Machine' , link: 'https://github.com/ProjectLiminality/TheGardenAndTheMachine' },
      { src: 'media/examples/TheSpiral.gif', alt: 'The Spiral', link: 'https://github.com/InterfaceGuy/TheSpiral' }
    ];
    
    // Append first two items to the end
    this.mediaFiles = [...originalFiles, originalFiles[0], originalFiles[1]];
    
    this.container = document.getElementById(containerId);
    this.createCarouselStructure();
    
    this.carousel = this.container.querySelector('.carousel');
    this.items = this.container.querySelectorAll('.carousel-item');
    this.prevButton = this.container.querySelector('.carousel-button.prev');
    this.nextButton = this.container.querySelector('.carousel-button.next');
    
    this.currentIndex = 0;
    this.totalItems = this.items.length;
    
    this.setupEventListeners();
  }

  createCarouselStructure() {
    const section = document.createElement('section');
    section.className = 'examples-section';
    
    const title = document.createElement('h2');
    title.textContent = 'More Ideas Brought To Life';
    
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
      
      const title = document.createElement('p');
      title.className = 'media-title';
      title.textContent = file.alt;
      
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
    // Auto-play disabled
  }

  updateCarousel() {
    const offset = -(this.currentIndex * 33.33);  // Removed the extra offset
    this.carousel.style.transform = `translateX(${offset}%)`;
    
    // Reset all items
    this.items.forEach((item) => {
      item.classList.remove('active', 'prev', 'next');
      item.style.transform = 'scale(0.5)';
      item.style.opacity = '0.5';
    });
    
    // Set active item (shifted two positions right)
    const activeIndex = (this.currentIndex + 1) % this.totalItems;
    const activeItem = this.items[activeIndex];
    activeItem.classList.add('active');
    activeItem.style.transform = 'scale(1)';
    activeItem.style.opacity = '1';
    
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

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const carousel = new Carousel('examples-container');
  // Trigger initial update
  carousel.updateCarousel();
});
