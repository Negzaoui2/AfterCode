import React, { useState, useEffect } from "react";
import axios from "axios";
import { TextField, Button, Grid, Box, Stepper, Step, StepLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";

const steps = ["Informations générales", "Adresses"];

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

  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

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
      return ;
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

      navigate("/customers");
      localStorage.removeItem("formActive");
    } catch (error) {
      console.error(
        "Erreur lors de la soumission du formulaire:",
        error.response?.data || error.message
      );
      alert("Une erreur est survenue lors de la sauvegarde des informations.");
    }
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
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
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {activeStep === steps.length ? (
        <Box sx={{ mt: 2 }}>
          <Button onClick={handleReset}>Réinitialiser</Button>
        </Box>
      ) : (
        <form onSubmit={handleSubmit}>
          {activeStep === 0 && (
            <Box>
              <h2>Informations générales</h2>
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
              </Grid>
            </Box>
          )}

          {activeStep === 1 && (
            <Box>
              <h2>Adresses</h2>
              <Grid container spacing={2}>
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
              </Grid>
            </Box>
          )}

          <Box sx={{ mt: 2 }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
                            Précédent
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
            >
              {activeStep === steps.length - 1 ? "Soumettre" : "Suivant"}
            </Button>
          </Box>
        </form>
      )}
    </Box>
  );
};

export default FormulaireClient;

             
