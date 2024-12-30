// Ensure the DOM is fully loaded before adding event listeners
document.addEventListener("DOMContentLoaded", function () {
  const menuButton = document.getElementById("menu-button");
  const closeButton = document.getElementById("close-button");
  const sidebar = document.getElementById("sidebar");
  const backdrop = document.getElementById("backdrop");

  // Open sidebar when menu button is clicked
  menuButton.addEventListener("click", function (event) {
    event.stopPropagation(); // Prevent the event from bubbling up
    sidebar.classList.remove("-translate-x-full");
    backdrop.classList.remove("hidden");
  });

  // Close sidebar when close button is clicked
  closeButton.addEventListener("click", function (event) {
    event.stopPropagation(); // Prevent the event from bubbling up
    sidebar.classList.add("-translate-x-full");
    backdrop.classList.add("hidden");
  });

  // Close sidebar when clicking outside the sidebar
  document.addEventListener("click", function (event) {
    if (!sidebar.contains(event.target) && !menuButton.contains(event.target)) {
      sidebar.classList.add("-translate-x-full");
      backdrop.classList.add("hidden");
    }
  });

  // Prevent click event from closing the sidebar when clicked inside the sidebar
  sidebar.addEventListener("click", function (event) {
    event.stopPropagation(); // Prevent the event from bubbling up
  });

  // Prevent click event from closing the sidebar when clicking on the menu button
  menuButton.addEventListener("click", function (event) {
    event.stopPropagation(); // Prevent the event from bubbling up
  });
});




  // Function to toggle the visibility of the menu
  function toggleMenu() {
    const menu = document.getElementById('menu');
    menu.classList.toggle('hidden');
  }

  // Close the menu if the user clicks outside
  document.addEventListener('click', function(event) {
    const menu = document.getElementById('menu');
    const profileMenu = document.getElementById('profile-menu');
    if (!profileMenu.contains(event.target)) {
      menu.classList.add('hidden');
    }
  });






 

function showContent(contentId) {
// Hide all content sections
document.getElementById('dashboard').style.display = 'none';
document.getElementById('courses').style.display = 'none';

// Show the selected content section
document.getElementById(contentId).style.display = 'block';

// Save the current content view in localStorage
localStorage.setItem('selectedContent', contentId);

// Highlight the corresponding button
const activeButton = document.querySelector(`button[data-content="${contentId}"]`);
setActiveButton(activeButton);
}

// Function to set the active button
const setActiveButton = (activeButton) => {
// Handle desktop buttons
const desktopButtons = document.querySelectorAll('nav button');
desktopButtons.forEach((button) => {
  button.classList.remove('bg-[#A4123F]', 'text-white');
  button.classList.add('text-gray-600', 'hover:bg-gray-100');
  button.removeAttribute('data-active');
});

// Handle mobile buttons
const mobileButtons = document.querySelectorAll('.mobile-nav-button');
mobileButtons.forEach((button) => {
  button.classList.remove('bg-[#A4123F]/5', 'text-[#A4123F]');
  button.classList.add('text-gray-500', 'hover:bg-gray-50');
});

// Add active styles to the clicked button for both desktop and mobile
if (activeButton) {
  activeButton.classList.add('bg-[#A4123F]', 'text-white');
  activeButton.classList.remove('text-gray-600', 'hover:bg-gray-100');
  activeButton.setAttribute('data-active', 'true');

  // For mobile, add specific styles
  if (activeButton.classList.contains('mobile-nav-button')) {
    activeButton.classList.add('bg-[#A4123F]/5', 'text-[#A4123F]');
    activeButton.classList.remove('text-gray-500', 'hover:bg-gray-50');
  }
}
};

// On page load, show the saved section if any, or default to Dashboard
window.onload = function () {
const savedContent = localStorage.getItem('selectedContent') || 'dashboard';
showContent(savedContent);
};






document.addEventListener('DOMContentLoaded', function() {
  const dayViewBtn = document.getElementById('dayViewBtn');
  const monthViewBtn = document.getElementById('monthViewBtn');
  const dayView = document.getElementById('dayView');
  const monthView = document.getElementById('monthView');
  const dayViewTitle = document.getElementById('dayViewTitle');
  const monthViewTitle = document.getElementById('monthViewTitle');
  const calendarGrid = document.getElementById('calendarGrid');
  const prevMonthBtn = document.getElementById('prevMonthBtn');
  const nextMonthBtn = document.getElementById('nextMonthBtn');

  let currentDate = new Date();

  // Update Month and Day views based on current date
  function updateCalendar() {
    // Set month view title
    monthViewTitle.innerText = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

    // Generate the days for the month view
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const totalDaysInMonth = lastDayOfMonth.getDate();
    const startingDayOfWeek = firstDayOfMonth.getDay();

    // Clear previous calendar days
    calendarGrid.innerHTML = '';

    // Create empty cells for the days before the 1st of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      const emptyCell = document.createElement('div');
      emptyCell.classList.add('h-full', 'p-1');
      calendarGrid.appendChild(emptyCell);
    }

    // Create day cells
    for (let day = 1; day <= totalDaysInMonth; day++) {
      const dayCell = document.createElement('div');
      dayCell.classList.add('h-full', 'p-1', 'border', 'border-gray-100', 'hover:border-[#A4123F]/20', 'cursor-pointer');
      dayCell.innerHTML = `<div class="h-full p-1 text-sm text-gray-600">${day}</div>`;
      
      // Highlight today's date in the calendar
      if (day === currentDate.getDate() && currentDate.getMonth() === new Date().getMonth() && currentDate.getFullYear() === new Date().getFullYear()) {
        dayCell.classList.add('bg-[#A4123F]/10');
      }

      dayCell.addEventListener('click', function() {
        dayView.classList.remove('hidden');
        monthView.classList.add('hidden');
        dayViewTitle.innerText = `Schedule for ${new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toLocaleDateString()}`;
      });
      calendarGrid.appendChild(dayCell);
    }
  }

  // Default state: show Day View with today's date and highlight the Day button
  dayView.classList.remove('hidden');
  monthView.classList.add('hidden');
  dayViewBtn.classList.add('bg-white', 'text-[#A4123F]');
  monthViewBtn.classList.remove('bg-white', 'text-[#A4123F]');
  dayViewTitle.innerText = `Schedule for ${currentDate.toLocaleDateString()}`;

  // Switch to Day View
  dayViewBtn.addEventListener('click', function() {
    dayView.classList.remove('hidden');
    monthView.classList.add('hidden');
    dayViewBtn.classList.add('bg-white', 'text-[#A4123F]');
    monthViewBtn.classList.remove('bg-white', 'text-[#A4123F]');
  });

  // Switch to Month View
  monthViewBtn.addEventListener('click', function() {
    monthView.classList.remove('hidden');
    dayView.classList.add('hidden');
    monthViewBtn.classList.add('bg-white', 'text-[#A4123F]');
    dayViewBtn.classList.remove('bg-white', 'text-[#A4123F]');
    updateCalendar(); // Update calendar view when switching to Month view
  });

  // Handle navigation through months
  prevMonthBtn.addEventListener('click', function() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    updateCalendar(); // Update calendar when going to previous month
  });

  nextMonthBtn.addEventListener('click', function() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    updateCalendar(); // Update calendar when going to next month
  });

  // Initial calendar rendering
  updateCalendar();
});



 // Simulate a loading delay and then show the homepage
 window.addEventListener('load', () => {
  setTimeout(() => {
    // Hide the loading screen and show the homepage content
    document.getElementById('loading-screen').classList.add('hidden');
    document.getElementById('homepage').classList.remove('hidden');
  }, 2000); // Adjust the delay as needed
});
