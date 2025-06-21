// ContactSection.jsx
import './styles/nosotros.css';

const Nosotros = () => {
  return (
    <section className="contact-section">
      <div className="contact-wrapper">
      <h2>Contáctanos</h2>
      <p>
        Para nosotros es un placer atenderte. Te ofrecemos diferentes medios para responder a cada una de tus solicitudes de la manera que más te convenga.
      </p>
      <p className="nota">
        <strong>Nota:</strong> Responderemos todas sus preguntas a la brevedad posible.
      </p>

      <div className="contact-cards">
        <div className="card">
          <h3>Facebook</h3>
          <img src="https://cdn-icons-png.flaticon.com/512/145/145802.png" alt="Facebook" className="icon" />
          <p><strong>Visitanos en nuestra pagina de facebook:</strong>  <a href="https://www.facebook.com/UmssBolOficial">UmssBolOficia</a></p>
        </div>

        <div className="card">
          <h3>Correo y Teléfonos</h3>
          <img src="https://cdn-icons-png.flaticon.com/512/732/732200.png" alt="Email" className="icon" />
          <p><strong>Correo electrónico:</strong> <a href="mailto:TWD@gmail.com">TWD@gmail.com</a></p>
          <p><strong>Teléfono:</strong> (591)4332651</p>
          <p><strong>Celular/Whatsapp:</strong> 65733104 📲</p>
        </div>

        <div className="card">
          <h3>Direcciones</h3>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5h_o_VnSyR5KtRxrl_pHDw2yud1yPfvPLCQ&s" alt="FCPN" className="icon" />
          <p><strong>OH SANSI</strong></p>
          <p>Av. Oquendo y Sucre (UMSS) 📍</p>
          <p><strong>Pag. Web:</strong> <a href="https://www.umss.edu.bo/" target="_blank" rel="noopener noreferrer">umss.edu.bo</a></p>
        </div>
      </div>
      </div>
    </section>
  );
};

export default Nosotros;
