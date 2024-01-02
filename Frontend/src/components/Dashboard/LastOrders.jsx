import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import { useTranslation } from "react-i18next";
function LastOrders() {
  const { t } = useTranslation();

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
    <>
      <h2 className="text-xl font-bold mt-3 mb-2">
        {t("dashboard_last_orders")}
      </h2>
      <Box
        className="flex items-center"
        sx={{ display: "flex", flexDirection: "column" }}
      >
        <TableContainer className="max-w-xs lg:max-w-full">
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
                  <TableCell sx={{ textAlign: "center" }}>
                    {row.order}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {row.client}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {row.amount}
                  </TableCell>
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
      </Box>
    </>
  );
}

export default LastOrders;
