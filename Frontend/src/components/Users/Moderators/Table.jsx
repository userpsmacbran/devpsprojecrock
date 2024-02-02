/* eslint-disable react/prop-types */
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VerticalAlignCenterIcon from "@mui/icons-material/VerticalAlignCenter";
import IconButton from "@mui/material/IconButton";
import { useTranslation } from "react-i18next";
import React, { useEffect } from "react";

function TableComponent({
  handleToggleChange,
  moderators,
  loading,
  openDeleteModal,
  error,
  setModerators,
  openEditModalCompany,
}) {
  const { t } = useTranslation();
  const [orderBy, setOrderBy] = React.useState(""); // Estado para la columna por la cual se está ordenando
  const [order, setOrder] = React.useState("asc"); // Estado para la dirección del orden

  useEffect(() => {
    // Ordenar el array de companies
    const sortedCompanies = [...moderators].sort((a, b) => {
      if (order === "asc") {
        return a[orderBy] > b[orderBy] ? 1 : -1;
      } else {
        return a[orderBy] < b[orderBy] ? 1 : -1;
      }
    });
    setModerators(sortedCompanies);
  }, [orderBy, order, setModerators]);

  const handleSortIconClick = (column) => {
    const isAsc = orderBy === column && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(column);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead className="bg-gray-200">
          <TableRow>
            <TableCell>
              ID{" "}
              <VerticalAlignCenterIcon
                sx={{ fontSize: 12, cursor: "pointer" }}
                onClick={() => handleSortIconClick("id")}
              />
            </TableCell>
            <TableCell>
              {t("table_name")}
              <VerticalAlignCenterIcon
                sx={{ fontSize: 12, cursor: "pointer" }}
                onClick={() => handleSortIconClick("name")}
              />
            </TableCell>
            <TableCell>
              {t("table_email")}
              <VerticalAlignCenterIcon
                sx={{ fontSize: 12, cursor: "pointer" }}
                onClick={() => handleSortIconClick("email")}
              />
            </TableCell>
            <TableCell>
              {t("table_country")}
              <VerticalAlignCenterIcon
                sx={{ fontSize: 12, cursor: "pointer" }}
                onClick={() => handleSortIconClick("country")}
              />
            </TableCell>

            <TableCell>
              {t("table_state")}
              <VerticalAlignCenterIcon
                sx={{ fontSize: 12, cursor: "pointer" }}
                onClick={() => handleSortIconClick("state_User")}
              />
            </TableCell>
            <TableCell>
              {t("table_last_login")}
              <VerticalAlignCenterIcon
                sx={{ fontSize: 12, cursor: "pointer" }}
                onClick={() => {
                  console.log("Ordenar");
                }}
              />
            </TableCell>
            <TableCell> {t("table_actions")}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {moderators.length === 0 && !error ? (
            <TableRow>
              <TableCell colSpan={7} align="center">
                No hay registros
              </TableCell>
            </TableRow>
          ) : (
            moderators.map((company) => (
              <TableRow key={company.id}>
                <TableCell>{company.id}</TableCell>
                <TableCell>{company.name}</TableCell>
                <TableCell>{company.email}</TableCell>
                <TableCell>{company.country.name}</TableCell>
                <TableCell>
                  <Select
                    value={company.state_User}
                    onChange={(event) =>
                      handleToggleChange(company.id, event.target.value)
                    }
                    disabled={loading}
                  >
                    <MenuItem value={1}>Activo</MenuItem>
                    <MenuItem value={0}>Desactivado</MenuItem>
                    <MenuItem value={2}>Baneado</MenuItem>
                  </Select>
                </TableCell>
                <TableCell>28-05-2002</TableCell>
                <TableCell>
                  <IconButton onClick={() => openEditModalCompany(company)}>
                    <EditIcon className="text-blue-500" />
                  </IconButton>
                  <IconButton onClick={() => openDeleteModal(company)}>
                    <DeleteIcon className="text-red-500" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          )}
          {error && (
            <TableRow>
              <TableCell
                colSpan={7}
                align="center"
                sx={{ color: "red", fontSize: "18px", fontWeight: "bold" }}
              >
                {error}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TableComponent;
