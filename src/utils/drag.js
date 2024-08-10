export function enableDragging(element, onDrag, onDragEnd) {
    let isDragging = false;
    let startX, startY;
  
    element.addEventListener('mousedown', startDragging);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', stopDragging);
  
    function startDragging(e) {
      isDragging = true;
      startX = e.clientX;
      startY = e.clientY;
    }
  
    function drag(e) {
      if (!isDragging) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      onDrag(dx, dy);
    }
  
    function stopDragging() {
      if (isDragging) {
        isDragging = false;
        onDragEnd();
      }
    }
  
    return () => {
      element.removeEventListener('mousedown', startDragging);
      document.removeEventListener('mousemove', drag);
      document.removeEventListener('mouseup', stopDragging);
    };
  }