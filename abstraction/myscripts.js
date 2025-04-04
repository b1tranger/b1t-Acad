let currentZoom = 1;
    const iframe = document.querySelector('.iframe-4');

    function zoomIn() {
        currentZoom += 0.1;
        updateZoom();
    }

    function zoomOut() {
        if (currentZoom > 0.5) {
            currentZoom -= 0.1;
            updateZoom();
        }
    }

    function resetZoom() {
        currentZoom = 1;
        updateZoom();
    }

    function updateZoom() {
        iframe.style.transform = `scale(${currentZoom})`;