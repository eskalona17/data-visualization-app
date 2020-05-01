// defaults
Chart.defaults.global.defaultFontColor = "#fff";
Chart.defaults.global.elements.line.borderWidth = 1;
Chart.defaults.global.elements.rectangle.borderWidth = 1;
Chart.defaults.scale.gridLines.color = "#444";
Chart.defaults.scale.ticks.display = false;

fetch("https://coasters-api.herokuapp.com/")
  .then((response) => response.json())
  .then((data) => printCharts(data));

function printCharts(coasters) {
  document.body.classList.add("running");
  compareRadioChart(coasters, "chart2");
  modelDoughnutChart(coasters, "chart4");
  heightRadarChart(coasters, "chart3");
  GForceBarsChart(coasters, "chart5");
  countriesRadarChart(coasters, "chart1");
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
    legend: {
      position: "right",
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
        borderColor: styles.color.solids[0],
        borderWidth: styles.color.alphas[1],
      },
    ],
  };

  const options = {
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

function GForceBarsChart(coasters, id) {
  const selectedCoasters = coasters.filter((eachCoaster) => eachCoaster.gForce);

  const data = {
    labels: selectedCoasters.map((eachCoaster) => eachCoaster.name),
    datasets: [
      {
        data: selectedCoasters.map((eachCoaster) => eachCoaster.gForce),
        backgroundColor: styles.color.alphas,
        borderColor: styles.color.solids,
      },
    ],
  };

  const options = {
    legend: {
      display: false,
    },
    scales: {
      yAxes: [
        {
          gridLines: {
            display: false,
          },
          ticks: {
            display: true,
          },
        },
      ],
    },
  };

  new Chart(id, {
    type: "bar",
    data,
    options,
  });
}

function countriesRadarChart(coasters, id) {
  const selectedCoasters = coasters.filter((eachCoaster) => eachCoaster.gForce);

  const data = {
    labels: selectedCoasters.map((eachCoaster) => eachCoaster.name),
    datasets: [
      {
        label: "Altura",
        data: selectedCoasters.map((eachCoaster) => eachCoaster.height),
        borderColor: styles.color.solids[0],
        backgroundColor: styles.color.alphas[0],
      },
      {
        label: "Longitud",
        data: selectedCoasters.map((eachCoaster) => eachCoaster.length),
        borderColor: styles.color.solids[1],
        backgroundColor: styles.color.alphas[1],
        hidden: true
      },
      {
        label: "Inversiones",
        data: selectedCoasters.map((eachCoaster) => eachCoaster.inversions),
        borderColor: styles.color.solids[2],
        backgroundColor: styles.color.alphas[2],
      },
      {
        label: "Velocidad",
        data: selectedCoasters.map((eachCoaster) => eachCoaster.speed),
        borderColor: styles.color.solids[3],
        backgroundColor: styles.color.alphas[3],
      },
      {
        label: "Fuerza G",
        data: selectedCoasters.map((eachCoaster) => eachCoaster.gForce),
        borderColor: styles.color.solids[4],
        backgroundColor: styles.color.alphas[4],
      },
    ],
  };

  const options = {
    legend: {
      position: 'left'
    }
  }

  new Chart(id, {
    type: "radar",
    data,
    options
  });
}
