document.addEventListener("DOMContentLoaded", function() { // Ensure DOM is fully loaded before executing the script
    let count = 0;
    const button = document.getElementById('clickButton');
    const displayCount = document.getElementById('clickCount');

    if (button && displayCount) { // Ensure elements exist before adding event listeners
        button.addEventListener('click', function() {
            count++;
            displayCount.textContent = count;
        });
    }
});
