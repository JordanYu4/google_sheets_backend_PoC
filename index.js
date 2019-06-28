const createBarChart = function (ctx, dataArray) {
  return new Chart(ctx, {
    // The type of chart we want to create
    type: "bar",

    //  The data for our dataset
    data: {
      labels: ["Brothers", "Sisters"],
      datasets: [
        {
          label: "Total chapters read",
          data: dataArray,
          backgroundColor: ["#37A2EB", "#FF3363"],
          borderColor: ["#37A2EB", "#FF3363"],
          borderWidth: 1
        }
      ]
    },

    // Config options
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      },
      legend: {
        display: false
      },
      layout: {
        padding: {
          top: 20,
          bottom: 50,
          left: 50,
          right: 50
        }
      }
    }
  });
}

// Create your google sheet API url at sheety.co
const apiUrl = "https://api.sheety.co/c39d3942-f01f-42b7-b22d-2723464732c8";

let prevBrotherTotal = 0;
let currBrotherTotal = 0;
let prevSisterTotal = 0;
let currSisterTotal = 0;

function statsChanged() {
  console.log('checking stats');
  return currBrotherTotal !== prevBrotherTotal
    || currSisterTotal !== prevSisterTotal;
}

// Accessing the data will depend on how you format your spreadsheet
async function getStats () {
  let stats = await axios.get(apiUrl)
  console.log(stats);
  prevBrotherTotal = currBrotherTotal;
  prevSisterTotal = currSisterTotal;

  currBrotherTotal = stats.data[0].brothers;
  currSisterTotal = stats.data[0].sisters;
  console.log(currBrotherTotal, currSisterTotal);
  return;
}

window.onload = function() {
  const ctx = document.getElementById("myChart").getContext("2d");

  const readingChart = createBarChart(ctx, [currBrotherTotal, currSisterTotal]);

  function updateChart() {
    readingChart.data.datasets[0].data = [currBrotherTotal, currSisterTotal];
    readingChart.update();
  }
  
  async function render() {
    await getStats();
    if (statsChanged()) updateChart();
  }
  
  render();
  setInterval(render, 5000);
}