
const totalViews = document.querySelector('.views-value');


const menuToggle = document.getElementById('menuToggle');
const topbarNav = document.querySelector('.topbar-nav');
const sidebar = document.querySelector('.sidebar-dashboard');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        topbarNav.classList.toggle('active');
        if (sidebar) {
            sidebar.classList.toggle('active');
        }
    });
}

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!menuToggle.contains(e.target) && !topbarNav.contains(e.target)) {
        menuToggle.classList.remove('active');
        topbarNav.classList.remove('active');
        if (sidebar) {
            sidebar.classList.remove('active');
        }
    }
});

async function loadTotalViews() {
    try {
        const url = `/api/total-views`;
        const response = await fetch(url);
        const data = await response.json();
        
        if (totalViews) {
            totalViews.textContent = data.total;
        }
    } catch (error) {
        console.error('Error loading total views:', error);
    }
}

async function loadChart() {
try {
    const url = `/api/view-data`;
    const response = await fetch(url);
    let data = await response.json();

    

    if (!data || data.length === 0) {
        console.warn('No data received');
        return;
    }

    
    data.sort((a, b) => new Date(a.view_date) - new Date(b.view_date));

    
    const labels = data.map(row => {
        const date = new Date(row.view_date);
        return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    });

    const counts = data.map(row => row.view_count);

    const ctx = document.getElementById('viewChart').getContext('2d');
    
   
    if (window.myChart) { window.myChart.destroy(); }

    window.myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{ 
                label: 'Live Daily Views', 
                data: counts,
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.1)', 
                borderWidth: 3,
                tension: 0.4,       
                fill: true,        
                pointRadius: 5,
                pointHoverRadius: 8,
                pointBackgroundColor: 'rgb(75, 192, 192)',
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: true }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: 'rgba(200, 200, 200, 0.1)' }
                },
                x: {
                    grid: { display: false }
                }
            }
        }
    });
} catch (error) {
    console.error('Error loading chart:', error);
}
}

loadChart();
loadTotalViews();
