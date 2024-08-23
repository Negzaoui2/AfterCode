import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ClientsList = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Appeler l'API pour récupérer la liste des clients
    const fetchClients = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/customers');
        setClients(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors du chargement des clients:', error);
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  if (loading) {
    return <p>Chargement...</p>;
  }

  return (
    <div>
      <h2>Liste des clients</h2>
      {clients.length > 0 ? (
        <ul>
          {clients.map((client) => (
            <li key={client.id}>{client.nom} - {client.email}</li>
          ))}
        </ul>
      ) : (
        <p>Aucun client trouvé.</p>
      )}
    </div>
  );
};

export default ClientsList;
