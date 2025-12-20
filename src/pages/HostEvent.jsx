import { useState } from 'react';
import './HostEvent.css';

export default function HostEvent() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    guests: '',
    eventType: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your inquiry! We will contact you soon.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      date: '',
      guests: '',
      eventType: '',
      message: ''
    });
  };

  return (
    <main className="host-event">
      <section className="event-header">
        <div className="container">
          <h1>Host Your Event</h1>
          <p>Celebrate in our beautiful café space</p>
        </div>
      </section>

      <section className="event-info container">
        <div className="info-grid">
          <div className="info-card">
            <h3>Private Events</h3>
            <p>Perfect for birthdays, anniversaries, and intimate gatherings. Our cozy space can accommodate up to 50 guests.</p>
          </div>
          <div className="info-card">
            <h3>Corporate Meetings</h3>
            <p>Impress your clients with our professional setting and premium coffee service. Free WiFi and AV equipment available.</p>
          </div>
          <div className="info-card">
            <h3>Custom Catering</h3>
            <p>Curated coffee menus, pastries, and snacks tailored to your event needs. Let us create the perfect experience.</p>
          </div>
        </div>
      </section>

      <section className="booking-section container">
        <h2>Request a Booking</h2>
        <form className="booking-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="date">Preferred Date</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="guests">Number of Guests</label>
              <input
                type="number"
                id="guests"
                name="guests"
                min="1"
                max="50"
                value={formData.guests}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="eventType">Event Type</label>
            <select
              id="eventType"
              name="eventType"
              value={formData.eventType}
              onChange={handleChange}
              required
            >
              <option value="">Select an event type</option>
              <option value="birthday">Birthday Party</option>
              <option value="corporate">Corporate Meeting</option>
              <option value="anniversary">Anniversary</option>
              <option value="wedding">Wedding Celebration</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="message">Additional Details</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us more about your event..."
              rows="5"
            ></textarea>
          </div>

          <button type="submit" className="submit-btn">Request Booking</button>
        </form>
      </section>

      <section className="faq-section container">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-items">
          <div className="faq-item">
            <h4>What's the capacity of your event space?</h4>
            <p>Our café can comfortably accommodate up to 50 guests. We can work with you on custom arrangements.</p>
          </div>
          <div className="faq-item">
            <h4>Do you provide catering?</h4>
            <p>Yes! We offer custom coffee service, pastries, and snack platters. Ask about our event packages.</p>
          </div>
          <div className="faq-item">
            <h4>Is there a rental fee?</h4>
            <p>Rental fees depend on the date, time, and services. Contact us for a personalized quote.</p>
          </div>
          <div className="faq-item">
            <h4>How far in advance should I book?</h4>
            <p>We recommend booking at least 2 weeks in advance. For large events, 4 weeks is ideal.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
