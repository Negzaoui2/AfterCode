import React, { useState } from 'react';
import axios from 'axios';
import './FormulaireClient.css';
import { useNavigate } from 'react-router-dom';

const FormulaireClient = () => {
  const [formData, setFormData] = useState({
    name: "",
    group_Client: "Clients VIP STRASS",
    password: "", // Ajout du champ password ici
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
    Données_valides_jusquà: "", // Utilisation de la clé correcte pour la date de validité
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
       // Redirection après soumission réussie
       // eslint-disable-next-line no-undef
       navigate('/form'); // Remplace '/success' par la route souhaitée
    } catch (error) {
      console.error(
        "Erreur lors de la soumission du formulaire:",
        error.response?.data || error.message
      );
      alert("Une erreur est survenue lors de la sauvegarde des informations.");
    }
  };

  return (
    <form className="formulaire-client" onSubmit={handleSubmit}>
      <h2 className="form-title">Informations générales</h2>
      
      <div className="form-group">
        <label>Nom:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label>Groupe Client:</label>
        <input type="text" name="group_Client" value={formData.group_Client} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label>Mot de passe:</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label>Type de Client:</label>
        <input type="text" name="type_Client" value={formData.type_Client} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label>Num. Téléphone:</label>
        <input type="tel" name="Num_Téléphone" value={formData.Num_Téléphone} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label>Devise:</label>
        <input type="text" name="Devise" value={formData.Devise} onChange={handleChange} required />
      </div>

      <h2 className="form-title">Adresses</h2>

      <div className="form-group">
        <label>Pays:</label>
        <input type="text" name="Pays" value={formData.Pays} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label>Région:</label>
        <input type="text" name="Région" value={formData.Région} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label>Etat:</label>
        <input type="text" name="Etat" value={formData.Etat} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Ville:</label>
        <input type="text" name="Ville" value={formData.Ville} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Code Postal:</label>
        <input type="text" name="Code_Postal" value={formData.Code_Postal} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Adresse:</label>
        <input type="text" name="Adresse" value={formData.Adresse} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Données valables jusqu'à:</label>
        <input type="date" name="Données_valides_jusquà" value={formData.Données_valides_jusquà} onChange={handleChange} />
      </div>

      <button className="form-button" type="submit">Sauvegarder</button>
    </form>
  );
};

export default FormulaireClient;
