import React, { useState } from 'react';
import './FormulaireClient.css'; // Ajoutez un fichier CSS séparé pour organiser le style

const FormulaireClient = () => {
  const [formData, setFormData] = useState({
    nom: '',
    groupeClient: 'Clients VIP STRASS',
    typeClient: 'Individuel',
    email: '',
    telephone: '',
    devise: 'TND',
    pays: 'Tunisia',
    region: 'Tunisia',
    etat: '',
    ville: '',
    codePostal: '',
    adresse: '',
    dateValidite: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formulaire soumis:', formData);
    // Ajouter ici le code pour envoyer les données au serveur
    alert('Les informations ont été sauvegardées avec succès!');

  };

  return (
    <form className="formulaire-client" onSubmit={handleSubmit}>
      <h2 className="form-title">Informations générales</h2>
      
      <div className="form-group">
        <label>Nom:</label>
        <input type="text" name="nom" value={formData.nom} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label>Groupe Client:</label>
        <input type="text" name="groupeClient" value={formData.groupeClient} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label>Type de Client:</label>
        <input type="text" name="typeClient" value={formData.typeClient} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label>Num. Téléphone:</label>
        <input type="tel" name="telephone" value={formData.telephone} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label>Devise:</label>
        <input type="text" name="devise" value={formData.devise} onChange={handleChange} required />
      </div>

      <h2 className="form-title">Adresses</h2>

      <div className="form-group">
        <label>Pays:</label>
        <input type="text" name="pays" value={formData.pays} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label>Région:</label>
        <input type="text" name="region" value={formData.region} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label>Etat:</label>
        <input type="text" name="etat" value={formData.etat} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Ville:</label>
        <input type="text" name="ville" value={formData.ville} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Code Postal:</label>
        <input type="text" name="codePostal" value={formData.codePostal} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Adresse:</label>
        <input type="text" name="adresse" value={formData.adresse} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Données valables jusqu'à:</label>
        <input type="date" name="dateValidite" value={formData.dateValidite} onChange={handleChange} />
      </div>

      <button className="form-button" type="submit">Sauvegarder</button>
    </form>
  );
};

export default FormulaireClient;
