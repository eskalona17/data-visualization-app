fetch("https://coasters-api.herokuapp.com/")
  .then((response) => response.json())
  .then((data) => printCharts(data));

function printCharts(coasters) {
  document.body.classList.add("running");
  compareRadioChart();
}

function compareRadioChart() {
  const data = {
    labels: ["uno", "dos", "tres", "cuatro"],
    datasets: [
      {
        data: [6, 22, 9, 18],
        borderWidth: 1,
        borderColor: styles.color.solids.map(eachColor => eachColor),
        backgroundColor: styles.color.alphas.map(eachColor => eachColor)
      },
    ],
  };

  const options = {
      scale: {
          gridLines: {
              color: '#444'
          },
          ticks: {
              display: false
          }
      },
      legend: {
          position: 'right',
          labels: {
              fontColor: '#fff'
          }
      }
  }
  new Chart("chart2", {
    type: "polarArea",
    data,
    options
  });
}
