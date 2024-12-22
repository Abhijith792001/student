 // Ensure the DOM is fully loaded before adding event listeners
 document.addEventListener('DOMContentLoaded', function() {
  const menuButton = document.getElementById('menu-button');
  const closeButton = document.getElementById('close-button');
  const sidebar = document.getElementById('sidebar');
  const backdrop = document.getElementById('backdrop');

  // Open sidebar when menu button is clicked
  menuButton.addEventListener('click', function(event) {
    event.stopPropagation(); // Prevent the event from bubbling up
    sidebar.classList.remove('-translate-x-full');
    backdrop.classList.remove('hidden');
  });

  // Close sidebar when close button is clicked
  closeButton.addEventListener('click', function(event) {
    event.stopPropagation(); // Prevent the event from bubbling up
    sidebar.classList.add('-translate-x-full');
    backdrop.classList.add('hidden');
  });

  // Close sidebar when clicking outside the sidebar
  document.addEventListener('click', function(event) {
    if (!sidebar.contains(event.target) && !menuButton.contains(event.target)) {
      sidebar.classList.add('-translate-x-full');
      backdrop.classList.add('hidden');
    }
  });

  // Prevent click event from closing the sidebar when clicked inside the sidebar
  sidebar.addEventListener('click', function(event) {
    event.stopPropagation(); // Prevent the event from bubbling up
  });

  // Prevent click event from closing the sidebar when clicking on the menu button
  menuButton.addEventListener('click', function(event) {
    event.stopPropagation(); // Prevent the event from bubbling up
  });
});