import Grid from "@mui/material/Grid";
import { Doughnut } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import {
  Chart,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

Chart.register(ArcElement, Tooltip, Legend);
Chart.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function Graphics() {
  const chartDataSet = {
    labels: ["Platino ", "VIP", "Normal"],
    datasets: [
      {
        data: [40, 40, 20],
        backgroundColor: ["#C58FC1", "#9772BA", "#555CB3"],
        hoverBackgroundColor: ["#C58FC1", "#9772BA", "#555CB3"],
      },
    ],
  };

  const barData = {
    labels: [
      "Opcion #1",
      "Opcion #2",
      "Opcion #3",
      "Opcion #4",
      "Opcion #1",
      "Opcion #2",
      "Opcion #3",
      "Opcion #4",
    ],
    datasets: [
      {
        label: "Pruebas",
        data: [98, 59, 20, 5, 80, 52, 12, 15],
        backgroundColor: [
          "rgba(173, 136, 241, 0.8)",
          "rgba(173, 136, 241, 1)",
          "rgba(173, 136, 241, 1)",
          "rgba(173, 136, 241, 1)",
          "rgba(173, 136, 241, 1)",
          "rgba(173, 136, 241, 1)",
          "rgba(173, 136, 241, 1)",
          "rgba(173, 136, 241, 1)",
        ],
        borderColor: [
          "rgba(173, 136, 241, 1)",
          "rgba(173, 136, 241, 1)",
          "rgba(173, 136, 241, 1)",
          "rgba(173, 136, 241, 1)",
          "rgba(173, 136, 241, 1)",
          "rgba(173, 136, 241, 1)",
          "rgba(173, 136, 241, 1)",
          "rgba(173, 136, 241, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <Grid container spacing={2} sx={{ marginTop: "4px" }}>
      <Grid item xs={12} md={9}>
        {/* Contenedor que mide 3/4 del ancho */}
        <Bar
          data={barData}
          height={200}
          options={{
            maintainAspectRatio: false, // Esto permite al contenedor ajustarse al tamaño disponible
          }}
        />
      </Grid>
      <Grid item xs={12} md={3}>
        {/* Contenedor que mide 1/4 del ancho */}
        <Doughnut
          data={chartDataSet}
          height={200}
          options={{
            cutout: "50%",
            maintainAspectRatio: false, // Esto permite al contenedor ajustarse al tamaño disponible
            plugins: {
              legend: { display: true, position: "bottom" },
              tooltip: { enabled: true, padding: 16 },
            },
          }}
        />
      </Grid>
    </Grid>
  );
}

export default Graphics;
