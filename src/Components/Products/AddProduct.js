import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Grid,
  Box,
  Paper,
  Typography,
  Divider,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/system";

const Input = styled("input")({
  display: "none",
});

const AddProduct = () => {
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    image: null, // Change to null initially
    price: "",
    stock: "",
  });

  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      // Check if files are selected
      if (files && files[0]) {
        const file = files[0];
        setProductData((prevData) => ({
          ...prevData,
          [name]: file,
        }));
        // Create image preview
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
      }
    } else {
      setProductData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const validate = () => {
    let tempErrors = {};
    tempErrors.name = productData.name ? "" : "Le nom est requis.";
    tempErrors.price =
      productData.price && productData.price > 0
        ? ""
        : "Le prix doit être supérieur à 0.";
    tempErrors.stock =
      productData.stock && productData.stock >= 0
        ? ""
        : "Le stock ne peut pas être négatif.";
    return tempErrors;
  };

  const isValid = (errors) => {
    return Object.values(errors).every((x) => x === "");
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
  
    if (isValid(validationErrors)) {
      setLoading(true);
      try {
        const formData = new FormData();
        formData.append("name", productData.name);
        formData.append("description", productData.description);
        formData.append("price", productData.price);
        formData.append("stock", productData.stock);
        if (productData.image) {
          formData.append("image", productData.image); // Ajoutez le fichier image directement
        }
  
        const response = await axios.post(
          "http://localhost:8000/api/products",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("Produit ajouté:", response.data);
        alert("Produit ajouté avec succès!");
  
        setProductData({
          name: "",
          description: "",
          image: null,
          price: "",
          stock: "",
        });
        setImagePreview("");
      } catch (error) {
        console.error("Erreur lors de l'ajout du produit:", error.response ? error.response.data : error.message);
        alert("Une erreur est survenue lors de l'ajout du produit.");
      } finally {
        setLoading(false);
      }
    }
  };
  
  
  return (
    <Box
      sx={{
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
        py: 5,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          maxWidth: 700,
          mx: "auto",
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Ajouter un Nouveau Produit
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Nom du produit */}
            <Grid item xs={12}>
              <TextField
                label="Nom du produit"
                variant="outlined"
                name="name"
                value={productData.name}
                onChange={handleChange}
                required
                fullWidth
                error={!!errors.name}
                helperText={errors.name}
              />
            </Grid>

            {/* Description */}
            <Grid item xs={12}>
              <TextField
                label="Description"
                variant="outlined"
                name="description"
                value={productData.description}
                onChange={handleChange}
                fullWidth
                multiline
                rows={4}
              />
            </Grid>

            {/* Image URL */}
            <Grid item xs={12} sm={8}>
              <TextField
                variant="outlined"
                type="file"
                name="image"
                onChange={handleChange}
                fullWidth
              />
            </Grid>

            {/* Aperçu de l'image */}
            <Grid item xs={12} sm={4}>
              {imagePreview ? (
                <Box
                  component="img"
                  src={imagePreview}
                  alt="Aperçu du produit"
                  sx={{
                    width: "100%",
                    height: 120,
                    objectFit: "cover",
                    borderRadius: 1,
                    border: "1px solid #ccc",
                  }}
                />
              ) : (
                <Box
                  sx={{
                    width: "100%",
                    height: 120,
                    backgroundColor: "#e0e0e0",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 1,
                    border: "1px solid #ccc",
                    color: "#757575",
                  }}
                >
                  Aperçu de l'image
                </Box>
              )}
            </Grid>

            {/* Prix */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Prix (TND)"
                variant="outlined"
                type="number"
                name="price"
                value={productData.price}
                onChange={handleChange}
                required
                fullWidth
                error={!!errors.price}
                helperText={errors.price}
                inputProps={{ step: "0.01", min: "0" }}
              />
            </Grid>

            {/* Stock */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Stock"
                variant="outlined"
                type="number"
                name="stock"
                value={productData.stock}
                onChange={handleChange}
                required
                fullWidth
                error={!!errors.stock}
                helperText={errors.stock}
                inputProps={{ min: "0" }}
              />
            </Grid>

            {/* Bouton Ajouter */}
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                size="large"
                disabled={loading}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Ajouter le produit"
                )}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default AddProduct;
