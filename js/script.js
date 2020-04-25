fetch("https://coasters-api.herokuapp.com/")
  .then((response) => response.json())
  .then((data) => printCharts(data));

function printCharts(coasters) {
  document.body.classList.add("running");
  compareRadioChart(coasters, "chart2");
  modelDoughnutChart(coasters, "chart4");
  heightRadarChart(coasters, "chart3");
}

function compareRadioChart(coasters, id) {
  const data = {
    labels: ["EEUU", "UK", "España", "Japón", "China"],
    datasets: [
      {
        data: [
          coasters.filter(
            (eachCoaster) => eachCoaster.country === "United States"
          ).length,
          coasters.filter(
            (eachCoaster) => eachCoaster.country === "United Kingdom"
          ).length,
          coasters.filter((eachCoaster) => eachCoaster.country === "Spain")
            .length,
          coasters.filter((eachCoaster) => eachCoaster.country === "Japan")
            .length,
          coasters.filter((eachCoaster) => eachCoaster.country === "CHina")
            .length,
        ],
        borderWidth: 1,
        borderColor: styles.color.solids.map((eachColor) => eachColor),
        backgroundColor: styles.color.alphas.map((eachColor) => eachColor),
      },
    ],
  };

  const options = {
    scale: {
      gridLines: {
        color: "#444",
      },
      ticks: {
        display: false,
      },
    },
    legend: {
      position: "right",
      labels: {
        fontColor: "#fff",
      },
    },
  };
  new Chart(id, {
    type: "polarArea",
    data,
    options,
  });
}

function modelDoughnutChart(coasters, id) {
  const data = {
    labels: [
      "Propulsada",
      "Hiper montaña",
      "Giga monaña",
      "Inversión",
      "Sentado",
    ],
    datasets: [
      {
        data: [
          coasters.filter(
            (eachCoaster) => eachCoaster.model === "Acclerator Coaster"
          ).length,
          coasters.filter(
            (eachCoaster) => eachCoaster.model === "Hyper Coaster"
          ).length,
          coasters.filter((eachCoaster) => eachCoaster.model === "Giga Coaster")
            .length,
          coasters.filter(
            (eachCoaster) => eachCoaster.model === "Multi Inversion Coaster"
          ).length,
          coasters.filter(
            (eachCoaster) => eachCoaster.model === "Sitting Coaster"
          ).length,
        ],
        borderColor: styles.color.solids.map((eachColor) => eachColor),
        backgroundColor: styles.color.alphas.map((eachColor) => eachColor),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    legend: {
      position: "right",
      labels: {
        fontColor: "#fff",
      },
    },
  };
  new Chart(id, {
    type: "doughnut",
    data,
    options,
  });
}

function heightRadarChart(coasters, id) {
  const selectedCoasters = coasters.filter(
    (eachCoaster) => eachCoaster.height > 80
  );
  const data = {
    labels: selectedCoasters.map((eachCoaster) => eachCoaster.name),
    datasets: [
      {
        label: "Altura",
        data: selectedCoasters.map((eachCoaster) => eachCoaster.height),
      },
    ],
  };

  const options = {
    scale: {
      gridLines: {
        color: "#444",
      },
      pointLabels: {
        fontColor: '#fff'
      },
      ticks: {
        display: false,
      },
    },
    legend: {
      display: false,
    },
  };
  new Chart(id, {
    type: "radar",
    data,
    options,
  });
}
