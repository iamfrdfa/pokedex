function renderStats() {
    const ctx = document.getElementById('myChart');
    
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                borderWidth: 1
            }]
        },
        responsive: true,
        plugins: {
            legend: { display: false, },
        },
        indexAxis: 'y',
        scales: {
            y: {
                ticks: {
                    font: {
                        size: 12,
                        family: "'Open Sans', sans-serif"
                    },
                },
                grid: { display: false },
                beginAtZero: true,
            },
            x: {
                ticks: {
                    font: {
                        size: 12
                    },
                    stepSize: 40
                },
                grid: { display: false },
                beginAtZero: true,
                stepValue: 10
            },
        }
    });
}