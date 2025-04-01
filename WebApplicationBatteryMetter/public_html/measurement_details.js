document.addEventListener('DOMContentLoaded', () => {
    const measurement = JSON.parse(localStorage.getItem('selectedMeasurement'));
    console.log('Selected Measurement:', measurement);
    if (!measurement) {
        console.error('No measurement data found');
        window.location.href = 'history.html';
        return;
    }

    const ctx = document.getElementById('measurementChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: measurement.values.map((_, index) => `${index + 1}`),
            datasets: [{
                label: 'Measurement Value [mAh]',
                data: measurement.values,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            maintainAspectRatio: false,
            responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Time [s]',
                        color: '#ffffff'
                    },
                    ticks: {
                        color: '#ffffff'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Value [mAh]',
                        color: '#ffffff'
                    },
                    beginAtZero: true,
                    ticks: {
                        color: '#ffffff'
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: '#ffffff'
                    }
                },
                zoom: {
                    pan: {
                        enabled: true,
                        mode: 'x',
                        onPanComplete: () => console.log('Panning completed'),
                    },
                    zoom: {
                        wheel: {
                            enabled: true
                        },
                        pinch: {
                            enabled: true
                        },
                        mode: 'x',
                        onZoomComplete: () => console.log('Zooming completed'),
                    }
                }
            }
        }
    });
});
