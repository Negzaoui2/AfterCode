import React from 'react';
import { useNavigate } from 'react-router-dom';
import { QRCode } from 'react-qrcode-logo';
import './FormulaireClient.css'; // Ajoutez un fichier CSS séparé pour organiser le style


function QRCodePage() {
    const navigate = useNavigate();
    const  qrData = 'https://after-code-7in5.vercel.app/form'; // Remplacez '192.168.x.x' par l'adresse IP locale de votre machine
    // Utilisation de l'URL de base de l'application

    const handleClick = () => {
        navigate('/form');
    };

    return (
        <div>
            <h1>Scan the QR Code</h1>
            <QRCode value={qrData} /> {/* Génération du QR code avec l'URL du formulaire */}
            <button onClick={handleClick}>Proceed to Form</button>
        </div>
    );
}

export default QRCodePage;
