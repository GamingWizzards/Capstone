// // Your game logic goes here...

// // Function to scroll the credits upwards
// function scrollCredits() {
//     const credits = document.getElementById('credits');
//     let position = 100;
//     const speed = 1;

//     const scrollInterval = setInterval(() => {
//         position -= speed;
//         credits.style.top = position + '%';

//         // Stop scrolling when credits are out of the visible area
//         if (position < -150) { // Adjust the value as needed based on the number of credits lines
//             clearInterval(scrollInterval);
//             showPressTab();
//         }
//     }, 10);
// }

// // Function to display the "Press Tab to end credit scene" message
// function showPressTab() {
//     const pressTab = document.getElementById('press-tab');
//     pressTab.style.display = 'block';
// }

// // Call the scrollCredits function when the page is fully loaded
// window.addEventListener('load', () => {
//     scrollCredits();
// });

// // Listen for the Tab key press to end the credit scene
// document.addEventListener('keydown', (event) => {
//     if (event.keyCode === 9) { // Tab key code is 9
//         // Perform any actions needed when the credit scene ends
//         // For example, return to the main menu or start the game again
//     }
// });
