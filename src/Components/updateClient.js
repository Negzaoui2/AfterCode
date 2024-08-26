import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { TextField, Button, Paper, Typography, Box } from "@mui/material";

const UpdateCustomer = () => {
  const { id } = useParams(); // Récupère l'ID du client à partir des paramètres de l'URL
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    Num_Téléphone: "",
    Etat: "",
  });
  const navigate = useNavigate(); // Remplace useHistory par useNavigate

  useEffect(() => {
    // Fonction pour récupérer les détails du client en fonction de l'ID
    const fetchCustomer = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/customer/${id}`
        );
        console.log("Données du client récupérées :", response.data); // Affiche les données récupérées
        setCustomer(response.data); // Pré-remplit les champs avec les données du client
      } catch (error) {
        console.error(
          "Erreur lors de la récupération du client :",
          error.response?.data || error.message
        );
      }
    };

    fetchCustomer();
  }, [id]);

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`http://localhost:8000/api/customers/${id}`, customer);
      console.log("Client mis à jour avec succès");
      navigate("/customers"); // Redirige vers la liste des clients après la mise à jour
    } catch (error) {
      console.error(
        "Erreur lors de la mise à jour du client :",
        error.response?.data || error.message
      );
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCustomer((prevCustomer) => ({
      ...prevCustomer,
      [name]: value,
    }));
  };
  const handleClick = () => {
    navigate("/customers");
  };

  return (
    <Paper
      style={{
        marginTop: "20px",
        padding: "16px",
        backgroundColor: "#ffffff",
        boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
      }}
    >
      <Typography
        variant="h6"
        style={{ marginBottom: "16px", fontWeight: "bold" }}
      >
        Mettre à jour le client
      </Typography>
      <form onSubmit={handleUpdate}>
        <TextField
          label="Nom"
          variant="outlined"
          fullWidth
          name="name"
          value={customer.name}
          onChange={handleChange}
          style={{ marginBottom: "16px" }}
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          name="email"
          value={customer.email}
          onChange={handleChange}
          style={{ marginBottom: "16px" }}
        />
        <TextField
          label="Num_Téléphone"
          variant="outlined"
          fullWidth
          name="Num_Téléphone"
          value={customer.Num_Téléphone}
          onChange={handleChange}
          style={{ marginBottom: "16px" }}
        />
        <TextField
          label="Etat"
          variant="outlined"
          fullWidth
          name="Etat"
          value={customer.Etat}
          onChange={handleChange}
          style={{ marginBottom: "16px" }}
        />
        <Box sx={{ display: "flex", gap: "8px" }}>
          {" "}
          {/* Adjust gap as needed */}
          <Button variant="contained" color="primary" type="submit">
            Mettre à jour
          </Button>
          <Button variant="contained" color="primary" onClick={handleClick}>
            Retour à la liste
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default UpdateCustomer;
