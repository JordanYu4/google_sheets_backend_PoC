// Create your google sheet API url at sheety.co
const apiUrl = "https://api.sheety.co/c39d3942-f01f-42b7-b22d-2723464732c8";

let brotherTotal = 0;
let sisterTotal = 0;

// Accessing the data will depend on how you format your spreadsheet
async function getStats () {
  let stats = await axios.get(apiUrl)
  console.log(stats);
  brotherTotal = stats.data[0].brothers;
  sisterTotal = stats.data[0].sisters;

    // .then((response) => {
    //   console.log(response);
    //   brotherTotal = response.data[0].brothers
    //   sisterTotal = response.data[0].sisters
    // });
}

async function renderChart () {
  const ctx = document.getElementById("myChart").getContext("2d");
  
  await getStats();
  console.log('brothers', brotherTotal);
  console.log('sisters', sisterTotal);

  const chart = new Chart(ctx, {
    // The type of chart we want to create
    type: "bar",

    //  The data for our dataset
    data: {
      labels: ["Brothers", "Sisters"],
      datasets: [
        {
          label: "Bible reading progress",
          data: [brotherTotal, sisterTotal],
          backgroundColor: ["#37A2EB", "rgb(244, 99, 132)"],
          borderColor: ["#37A2EB", "rgb(255, 99, 132)"],
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
      layout: {
        paddding: 0
      }
    }
  });

  return chart;
}

window.onload = function() {
  
  renderChart();
}