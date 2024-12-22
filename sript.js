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






// Initial view setup: Default to Day View and current month
let currentView = 'day';  // Start with the Day View
let currentMonthIndex = new Date().getMonth();  // Current month (0-11)
let currentYear = new Date().getFullYear();  // Current year

// Function to toggle between views
function toggleView(view) {
  const dayButton = document.getElementById('dayViewButton');
  const monthButton = document.getElementById('monthViewButton');
  
  // Toggle button styles
  if (view === 'day') {
    dayButton.classList.add('bg-white', 'text-[#A4123F]', 'shadow-sm');
    dayButton.classList.remove('text-gray-600');
    monthButton.classList.remove('bg-white', 'text-[#A4123F]', 'shadow-sm');
    monthButton.classList.add('text-gray-600');
    currentView = 'day';
    showDayView();  // Show the Day View
  } else {
    monthButton.classList.add('bg-white', 'text-[#A4123F]', 'shadow-sm');
    monthButton.classList.remove('text-gray-600');
    dayButton.classList.remove('bg-white', 'text-[#A4123F]', 'shadow-sm');
    dayButton.classList.add('text-gray-600');
    currentView = 'month';
    showMonthView();  // Show the Month View
  }
}

// Function to display the Day View with Schedule
function showDayView(selectedDay = null) {
  const calendarContainer = document.getElementById('calendarContainer');
  const today = new Date();
  const dayName = today.toLocaleString('default', { weekday: 'long' });
  const month = today.toLocaleString('default', { month: 'long' });
  const year = today.getFullYear();
  
  // If a specific day is selected, update the day and month
  const day = selectedDay || today.getDate();

  // Simulating class schedule data for the selected day (can be replaced with real data)
  const classSchedule = [
    { time: "9:00 AM - 10:00 AM", subject: "Professional Communication" },
    { time: "10:30 AM - 11:30 AM", subject: "Operating System" },
    { time: "12:00 PM - 1:00 PM", subject: "Foundation of maths" },
  ];

  // Inject Day View content with schedule
  let scheduleHTML = classSchedule.length > 0
    ? classSchedule.map(item => `
        <div class="flex justify-between py-2 border-b border-gray-200">
          <span class="text-gray-700">${item.time}</span>
          <span class="text-gray-800 font-medium">${item.subject}</span>
        </div>
      `).join('')
    : `<div class="text-center py-12 text-gray-500 bg-gray-50 rounded-lg">No classes scheduled for today.</div>`;

  calendarContainer.innerHTML = `
    <div class="space-y-5">
      <div class="flex items-center gap-2 bg-[#A4123F]/5 px-4 py-2 rounded-lg">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clock w-5 h-5 text-[#A4123F]">
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
        <h3 class="font-medium text-[#A4123F]">Schedule for ${dayName}, ${month} ${day}, ${year}</h3>
      </div>
      <div class="py-4 px-6 bg-white rounded-lg shadow-sm">
        ${scheduleHTML}
      </div>
    </div>
  `;
}

// Function to display the Month View with clickable days and navigation arrows
function showMonthView() {
  const calendarContainer = document.getElementById('calendarContainer');

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const month = monthNames[currentMonthIndex];  // Current month name
  const year = currentYear;  // Current year
  
  // Generate the month view
  let daysInMonth = new Date(year, currentMonthIndex + 1, 0).getDate();  // Get the number of days in the current month
  let firstDay = new Date(year, currentMonthIndex, 1).getDay();  // Get the first day of the month

  let monthHTML = `
    <div class="flex items-center justify-center gap-4 mb-4">
      <!-- Left Arrow Button -->
      <button class="text-2xl text-[#A4123F]" onclick="changeMonth(-1)">
        ←
      </button>
      <div class="text-center text-xl font-medium text-[#A4123F] py-2 px-4 border-2 border-[#A4123F] rounded-full">
        ${month} ${year}
      </div>
      <!-- Right Arrow Button -->
      <button class="text-2xl text-[#A4123F]" onclick="changeMonth(1)">
        →
      </button>
    </div>
    <div class="grid grid-cols-7 gap-2 mt-4">
  `;

  // Add the days of the week (Sun, Mon, etc.)
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  daysOfWeek.forEach(day => {
    monthHTML += `<div class="text-sm text-gray-600">${day}</div>`;
  });

  // Empty cells before the first day of the month
  for (let i = 0; i < firstDay; i++) {
    monthHTML += `<div></div>`;
  }

  // Add the days of the month with clickable day elements
  for (let day = 1; day <= daysInMonth; day++) {
    monthHTML += `
      <div class="text-center py-2 rounded-md text-gray-700 hover:bg-[#A4123F]/10 cursor-pointer" onclick="showDayView(${day})">
        ${day}
      </div>
    `;
  }

  monthHTML += `</div>`;

  calendarContainer.innerHTML = monthHTML;
}

// Function to change the month
function changeMonth(direction) {
  currentMonthIndex += direction;

  // If currentMonthIndex goes out of bounds, adjust it
  if (currentMonthIndex < 0) {
    currentMonthIndex = 11;
    currentYear--;
  } else if (currentMonthIndex > 11) {
    currentMonthIndex = 0;
    currentYear++;
  }

  // Update the month view after changing the month
  showMonthView();
}

// Initial load: Show Day View by default
showDayView();

