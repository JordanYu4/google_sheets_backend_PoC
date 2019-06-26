window.onload = function() {
  const ctx = document.getElementById('myChart').getContext('2d');

  const chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',

    //  The data for our dataset
    data: {
      labels: ['Brothers', 'Sisters'],
      datasets: [{
        label: 'Bible reading progress',
        data: [5, 10],
        backgroundColor: [
          'rgb(244, 99, 132)',
          'rgb(244, 99, 132)',
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 99, 132)',
        ],
        borderWidth: 1
      }]
    },

    // Config options
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      },
      layout: {
        paddding: 0
      }
    }
  })
}