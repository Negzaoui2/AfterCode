import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { TextField, Button, Paper, Typography, CircularProgress } from "@mui/material";

const UpdateCustomer = () => {
  const { id } = useParams(); // Récupère l'ID du client à partir des paramètres de l'URL
  const [customer, setCustomer] = useState({ name: "", email: "", Num_Téléphone: "", Etat: "" });
  const [loading, setLoading] = useState(true); // État pour le chargement
  const navigate = useNavigate(); // Remplace useHistory par useNavigate

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/customer/${id}`);
        console.log("Données du client récupérées :", response.data); // Affiche les données récupérées

        // Assurez-vous que les données sont définies et les champs correspondent
        if (response.data) {
          setCustomer(response.data); // Pré-remplit les champs avec les données du client
        } else {
          console.error("Les données du client ne sont pas dans le format attendu");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération du client :", error.response?.data || error.message);
      } finally {
        setLoading(false); // Indique que le chargement est terminé
      }
    };

    fetchCustomer();
  }, [id]);

  const handleUpdate = async (event) => {
    event.preventDefault();
    console.log("Données envoyées pour mise à jour :", customer); // Ajoutez cette ligne pour vérifier les données
    try {
      await axios.put(`http://localhost:8000/api/customers/${id}`, customer);
      console.log("Client mis à jour avec succès");
      navigate("/customers");
    } catch (error) {
      console.error("Erreur lors de la mise à jour du client :", error.response?.data || error.message);
    }
  };
  

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCustomer((prevCustomer) => ({
      ...prevCustomer,
      [name]: value,
    }));
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
      <Typography variant="h6" style={{ marginBottom: "16px", fontWeight: "bold" }}>
        Mettre à jour le client
      </Typography>
      {loading ? (
        <div style={{ textAlign: "center", padding: "20px" }}>
          <CircularProgress />
          <Typography variant="body1" style={{ marginTop: "10px" }}>
            Chargement des données...
          </Typography>
        </div>
      ) : (
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
          <Button
            variant="contained"
            color="primary"
            type="submit"
            style={{ marginRight: "8px" }}
          >
            Mettre à jour
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate("/customers")}
          >
            Retour à la liste
          </Button>
        </form>
      )}
    </Paper>
  );
};

export default UpdateCustomer;
