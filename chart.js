function renderStats(i) {
    const ctx = document.getElementById('myChart');
    let justBaseStatValues = [];
    
    for (let index = 0; index < allPokemonStatsValue[i].length; index++) {
        justBaseStatValues.push(allPokemonStatsValue[i][index]['base_stat']);
    }
    
    new Chart(ctx, {
        type: 'polarArea',
        data: {
            labels: ['hp', 'attack', 'defense', 'special-attack', 'special-defense', 'speed'],
            datasets: [{
                label: 'Stats',
                data: justBaseStatValues,
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