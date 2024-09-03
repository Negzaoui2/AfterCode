import React from 'react';
import { useNavigate } from 'react-router-dom';
import { QRCode } from 'react-qrcode-logo';
import './FormulaireClient.css'; 
import { Button } from '@mui/material';

// Ajoutez un fichier CSS séparé pour organiser le style


function QRCodePage() {
    
    const navigate = useNavigate();
    const  qrData = 'https://after-code-7in5.vercel.app/form'; // Remplacez '192.168.x.x' par l'adresse IP locale de votre machine
    // Utilisation de l'URL de base de l'application

    

    const handleViewCustomers = () => {
        navigate('/customers');
      };
    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h1>Scan the QR Code</h1>
            <QRCode value={qrData} />
            <div style={{ marginTop: '20px' }}>
                
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={handleViewCustomers}
                    style={{ padding: '10px 20px', fontSize: '16px' }}
                >
                    View Customers
                </Button>
            </div>
        </div>
    );
}

export default QRCodePage;
