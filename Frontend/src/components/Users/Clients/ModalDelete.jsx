/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import api from "../../../api/api";

function ModalDelete({ onClose, selectedCompany, onUserDeleted }) {
  const handleDelete = async () => {
    try {
      // Realiza la llamada a la API para eliminar el usuario
      await api.delete(`/user/${selectedCompany.id}`);

      // Cierra el modal después de la eliminación exitosa
      onUserDeleted(selectedCompany.id);
      onClose();
    } catch (error) {
      // Manejar errores, por ejemplo, mostrar un mensaje al usuario
      console.error("Error deleting user:", error);
    }
  };

  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 500,
        bgcolor: "white",
        boxShadow: 0,
        p: 4,
      }}
    >
      <Typography
        variant="h6"
        component="div"
        sx={{ color: "#555CB3", fontWeight: "bold" }}
      >
        Delete Company Profile
      </Typography>

      <Typography sx={{ mt: 2 }}>
        Are you sure you want to delete the user {selectedCompany.name}?
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Button
          onClick={onClose}
          sx={{
            bgcolor: "#00BF63",
            color: "white",
            fontWeight: "bold",
            borderRadius: "50px",
            px: 4,
            mr: 2,
            "&:hover": {
              bgcolor: "#00BF63",
            },
          }}
        >
          Cancel
        </Button>

        <Button
          onClick={handleDelete}
          sx={{
            bgcolor: "#FF4444",
            color: "white",
            fontWeight: "bold",
            borderRadius: "50px",
            px: 4,
            "&:hover": {
              bgcolor: "#FF4444",
            },
          }}
        >
          Yes, I'm sure
        </Button>
      </Box>
    </Box>
  );
}

export default ModalDelete;
