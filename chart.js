function renderStats() {
    /*let ctx = document.getElementById('myChart');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['HP', 'Attack', 'Defense', /!*'Special Attack', 'Special Defense',*!/ 'Speed'],
            datasets: [{
                barPercentage: 0.5,
                categoryPercentage: 1,
                // data: data,
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    /!*
                    * 'rgb(54, 162, 235)',
                    'rgb(165, 22, 224)'
                    * *!/
                ],
                borderRadius: 16,
                barThickness: 'flex'
            }]
        },
        options: {
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
        }
    });*/
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