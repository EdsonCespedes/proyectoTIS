import React from 'react';
import './styles/Spinner.css'; // O donde estén tus estilos

const FullScreenSpinner = () => {
    return (
        <div className="fullscreen-spinner-container">
            <div className="spinner"></div>
        </div>
    );
};

export default FullScreenSpinner;
