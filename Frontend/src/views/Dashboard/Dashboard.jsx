import React from "react";
import { useEffect } from "react";
import { useAuth } from "../../auth/AuthProvider";
import { useTranslation } from "react-i18next";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const Dashboard = () => {
  const { t } = useTranslation();

  const auth = useAuth();
  useEffect(() => {
    auth.checkTokenExpiration();
  }, []);

  const cards = [
    { title: "Sales", amount: "$56.100" },
    { title: "Clients", amount: "346.600" },
    { title: "Companies", amount: "60.000" },
    { title: "Videos", amount: "2.000.000" },
  ];

  const tableData = [
    {
      order: "PSR1012",
      client: "Planet Burger",
      amount: "200",
      status: "PENDIENTE",
      date: "19/12/2023",
    },
    {
      order: "PSR1011",
      client: "Chilli's",
      amount: "300",
      status: "COMPLETADO",
      date: "19/12/2023",
    },
    {
      order: "PSR1010",
      client: "Dominos Pizza",
      amount: "600",
      status: "RECHAZADO",
      date: "19/12/2023",
    },
    {
      order: "PSR1009",
      client: "Rosso Bar",
      amount: "300",
      status: "COMPLETADO",
      date: "19/12/2023",
    },
  ];

  return (
    <section className="text-3xl ">
      <h2 className="font-bold text-[#555CB3]">
        {t("dashboard_welcome")} Andy Scott!
      </h2>
      <Grid container spacing={2}>
        {cards.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card>
              <CardContent sx={{ textAlign: "left" }}>
                <Avatar sx={{ marginY: "10px" }}>
                  <MonetizationOnIcon />
                </Avatar>
                <Typography variant="h6" color="gray">
                  {t(`dashboard_${card.title.toLowerCase()}`)}
                </Typography>
                <Typography variant="h5" color="black">
                  {card.amount}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {/* Dos contenedores debajo de las tarjetas */}
      <Grid container spacing={2} sx={{ marginTop: "16px" }}>
        <Grid item xs={12} md={9}>
          {/* Contenedor que mide 3/4 del ancho */}
          <div style={{ backgroundColor: "lightgray", height: "200px" }}>
            Grafica Barras
          </div>
        </Grid>
        <Grid item xs={12} md={3}>
          {/* Contenedor que mide 1/4 del ancho */}
          <div style={{ backgroundColor: "lightgray", height: "200px" }}>
            Grafica Torta{" "}
          </div>
        </Grid>
      </Grid>
      {/* Contenedor de la tabla */}
      <TableContainer style={{ marginTop: "16px" }}>
        <h2 className="text-xl font-bold">{t("dashboard_last_orders")}</h2>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#EFF0F2" }}>
              <TableCell sx={{ textAlign: "center" }}>
                {t("dashboard_table_order").toUpperCase()}
              </TableCell>
              <TableCell sx={{ textAlign: "center" }}>
                {" "}
                {t("dashboard_table_client").toUpperCase()}
              </TableCell>
              <TableCell sx={{ textAlign: "center" }}>
                {" "}
                {t("dashboard_table_amount").toUpperCase()}
              </TableCell>
              <TableCell sx={{ textAlign: "center" }}>
                {" "}
                {t("dashboard_table_state").toUpperCase()}
              </TableCell>
              <TableCell sx={{ textAlign: "center" }}>
                {" "}
                {t("dashboard_table_date").toUpperCase()}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row) => (
              <TableRow key={row.order}>
                <TableCell sx={{ textAlign: "center" }}>{row.order}</TableCell>
                <TableCell sx={{ textAlign: "center" }}>{row.client}</TableCell>
                <TableCell sx={{ textAlign: "center" }}>{row.amount}</TableCell>
                <TableCell
                  sx={{
                    textAlign: "center",
                    color:
                      row.status === "PENDIENTE"
                        ? "#FFC700"
                        : row.status === "COMPLETADO"
                        ? "#00BF63"
                        : row.status === "RECHAZADO"
                        ? "#CB001C"
                        : "inherit",
                    fontWeight: "bold",
                  }}
                >
                  {row.status}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>{row.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </section>
  );
};

export default Dashboard;
