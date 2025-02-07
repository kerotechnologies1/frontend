new DataTable('#ride');
new DataTable('#approvedDriver');
new DataTable('#unApprovedDriver');
new DataTable('#riders');


// Function to check if the user is authenticated
// Function to check authentication
function checkAuth() {
  const token = getCookie('token'); 
  if (!token) {
    window.location.href = 'login.html';
  }
}


function getCookie(name) {
  const nameEQ = name + "=";
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].trim();
    if (cookie.indexOf(nameEQ) === 0) {
      return decodeURIComponent(cookie.substring(nameEQ.length));
    }
  }
  return null;
}


document.addEventListener('DOMContentLoaded', () => {
  checkAuth(); 
});


// Logout script
document.querySelector('a[href="#logout.html"]').addEventListener('click', () => {
  function deleteCookie(name) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }
  deleteCookie('token');
  localStorage.clear();
  window.location.href = 'login.html';
});


// Chart.js Income and Payout Chart
const ctx = document.getElementById('incomePayoutChart').getContext('2d');

// Gradients for Income and Payout
const gradientIncome = ctx.createLinearGradient(0, 0, 0, 400);
gradientIncome.addColorStop(0, 'rgba(187, 147, 72, 0.4)'); // Adjusted for #BB9348
gradientIncome.addColorStop(1, 'rgba(187, 147, 72, 0)');

const gradientPayout = ctx.createLinearGradient(0, 0, 0, 400);
gradientPayout.addColorStop(0, 'rgba(87, 85, 77, 0.4)'); // Adjusted for #57554D
gradientPayout.addColorStop(1, 'rgba(87, 85, 77, 0)');

// Chart Data and Configuration
const incomePayoutChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Income',
        data: [15000, 20000, 30000, 45000, 120000, 80000, 100000, 125000, 90000, 110000, 140000, 150000],
        borderColor: '#BB9348', // Gold-like color
        backgroundColor: gradientIncome,
        borderWidth: 1.5, // Make the line thinner
        tension: 0.4,
        pointRadius: 3, // Smaller dots
        pointBackgroundColor: '#BB9348',
        fill: true,
      },
      {
        label: 'Payout',
        data: [10000, 15000, 20000, 25000, 84000, 60000, 70000, 90000, 80000, 95000, 120000, 130000],
        borderColor: '#57554D', // Dark color
        backgroundColor: gradientPayout,
        borderWidth: 1.5, // Make the line thinner
        tension: 0.4,
        pointRadius: 3, // Smaller dots
        pointBackgroundColor: '#57554D',
        fill: true,
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      tooltip: {
        enabled: true,
        mode: 'nearest',
        callbacks: {
          label: (context) => `₦${context.raw.toLocaleString()}`,
        },
      },
      legend: {
        position: 'top', // Try moving to middle
        align: 'center', // Center align
        labels: {
          color: '#333',
          font: {
            size: 12,
          },
        },
      },
    },
    
    scales: {
      x: {
        grid: {
          color: 'rgba(200, 200, 200, 0.2)',
        },
        ticks: {
          color: '#555',
          font: {
            size: 12,
          },
        },
      },
      y: {
        grid: {
          color: 'rgba(200, 200, 200, 0.2)',
        },
        ticks: {
          color: '#555',
          font: {
            size: 12,
          },
          callback: (value) => `₦${value / 1000}k`,
        },
        min: 0, // Define minimum value
        max: 150000, // Define maximum value
      },
    },
  },
});


new DataTable('#members');
new DataTable('#viewMemberTable');
new DataTable('#viewDueTable');
new DataTable('#viewDuePayerTable');
new DataTable('#payoutTable');
new DataTable('#receivedTable');
