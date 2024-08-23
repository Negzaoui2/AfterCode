import React, { useState, useEffect } from "react";
import axios from "axios";
import { TextField, Button, Grid, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";


const FormulaireClient = () => {
  const [formData, setFormData] = useState({
    name: "",
    group_Client: "",
    password: "",
    type_Client: "",
    email: "",
    Num_Téléphone: "",
    Devise: "TND",
    Pays: "Tunisia",
    Région: "Tunisia",
    Etat: "",
    Ville: "",
    Code_Postal: "",
    Adresse: "",
    Données_valides_jusquà: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const navigate = useNavigate();

  useEffect(() => {
    const isFormActive = localStorage.getItem("formActive");
    if (isFormActive) {
      alert("Le formulaire est déjà ouvert dans un autre onglet.");
      navigate("/");
    } else {
      localStorage.setItem("formActive", "true");

      const handleUnload = () => {
        localStorage.removeItem("formActive");
      };

      window.addEventListener("beforeunload", handleUnload);
      return () => {
        window.removeEventListener("beforeunload", handleUnload);
        localStorage.removeItem("formActive");
      };
    }
  }, [navigate]);

  const validateDate = (dateString) => {
    const today = new Date().toISOString().split('T')[0];
    return dateString > today;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateDate(formData.Données_valides_jusquà)) {
      alert("La date doit être supérieure à la date d'aujourd'hui.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/customers",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Réponse du serveur:", response.data);
      alert("Les informations ont été sauvegardées avec succès!");

      setFormData({
        name: "",
        group_Client: "Clients VIP STRASS",
        password: "",
        type_Client: "Individuel",
        email: "",
        Num_Téléphone: "",
        Devise: "TND",
        Pays: "Tunisia",
        Région: "Tunisia",
        Etat: "",
        Ville: "",
        Code_Postal: "",
        Adresse: "",
        Données_valides_jusquà: "",
      });

      navigate("/form");
      localStorage.removeItem("formActive");
    } catch (error) {
      console.error(
        "Erreur lors de la soumission du formulaire:",
        error.response?.data || error.message
      );
      alert("Une erreur est survenue lors de la sauvegarde des informations.");
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 600,
        margin: "auto",
        padding: 3,
        backgroundColor: "#fff",
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <form className="formulaire-client" onSubmit={handleSubmit}>
        <h2 className="form-title">Informations générales</h2>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Nom"
              variant="outlined"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>

         

          <Grid item xs={12}>
            <TextField
              label="Groupe Client"
              variant="outlined"
              name="group_Client"
              value={formData.group_Client}
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Mot de passe"
              variant="outlined"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Type de Client"
              variant="outlined"
              name="type_Client"
              value={formData.type_Client}
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Email"
              variant="outlined"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Num. Téléphone"
              variant="outlined"
              type="tel"
              name="Num_Téléphone"
              value={formData.Num_Téléphone}
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Devise"
              variant="outlined"
              name="Devise"
              value={formData.Devise}
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <h2 className="form-title">Adresses</h2>
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Pays"
              variant="outlined"
              name="Pays"
              value={formData.Pays}
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Région"
              variant="outlined"
              name="Région"
              value={formData.Région}
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Etat"
              variant="outlined"
              name="Etat"
              value={formData.Etat}
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Ville"
              variant="outlined"
              name="Ville"
              value={formData.Ville}
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Code Postal"
              variant="outlined"
              name="Code_Postal"
              value={formData.Code_Postal}
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Adresse"
              variant="outlined"
              name="Adresse"
              value={formData.Adresse}
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Données valables jusqu'à"
              variant="outlined"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              name="Données_valides_jusquà"
              value={formData.Données_valides_jusquà}
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>

          { /* <Grid   item xs={12}>
            <Autocomplete
             disablePortal
             id="combo-box-demo"
             options={preferredLanguages}
             sx={{ width: 300 }}
             renderInput={(params) => <TextField {...params} label="Langue preferée  " />}
            />
          </Grid >  */}

          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit" fullWidth>
              Sauvegarder
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};
// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top

export default FormulaireClient;
