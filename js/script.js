document.addEventListener('DOMContentLoaded', function() {
    const menuButtons = document.querySelectorAll('.menu-button');

    menuButtons.forEach(button => {
        button.addEventListener('click', function() {
            const link = this.getAttribute('data-link');
            if (link) {
                window.location.href = link;
                // O podrías usar window.open(link, '_blank'); para abrir en una nueva pestaña
            } else {
                console.log('Enlace no definido para este botón.');
            }
        });
    });
});