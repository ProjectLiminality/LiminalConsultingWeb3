// Handle video controls on hover
document.addEventListener('DOMContentLoaded', () => {
  const videos = document.querySelectorAll('.media-container video');
  
  videos.forEach(video => {
    video.addEventListener('mouseover', () => {
      video.controls = true;
    });
    
    video.addEventListener('mouseout', () => {
      video.controls = false;
    });
    
    video.addEventListener('pause', () => {
      video.style.objectFit = 'cover';
    });
  });
});
