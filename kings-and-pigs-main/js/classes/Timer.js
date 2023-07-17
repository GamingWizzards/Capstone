// Get the timer display element
let timerDisplay = document.getElementById('timerDisplay');

// Initialize a startTime with null value
let startTime = null;

// Function to format the time in minutes and seconds
function formatTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

// Update the timer display
function updateTimer() {
    if(startTime !== null) { // only update if the timer has started
        let elapsed = Date.now() - startTime;
        timerDisplay.innerText = `Time: ${formatTime(elapsed)}`;
    }
}

// Event listener for keydown events
document.addEventListener('keydown', (event) => {
    // Check if the key hit was 'a', 's', 'w', or 'd'
    if(['a', 's', 'w', 'd'].includes(event.key.toLowerCase())) {
        // If the timer has not started yet, start it
        if(startTime === null) {
            startTime = Date.now();
            // Start updating the timer every second
            setInterval(updateTimer, 1000);
        }
    }
});
