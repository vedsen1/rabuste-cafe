import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Rabuste Coffee</h3>
            <p>The Coffee Way</p>
            <p className="tagline">Premium craft coffee & experiences</p>
          </div>
          <div className="footer-section">
            <h4>Hours</h4>
            <p>Monday - Friday: 7AM - 8PM</p>
            <p>Saturday: 9AM - 10PM</p>
            <p>Sunday: 10AM - 6PM</p>
          </div>
          <div className="footer-section">
            <h4>Contact</h4>
            <p>Email: hello@rabuste.com</p>
            <p>Phone: (555) 123-4567</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 Rabuste Coffee. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
