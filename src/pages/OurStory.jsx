import './OurStory.css';

export default function OurStory() {
  return (
    <main className="our-story">
      <section className="story-header">
        <div className="container">
          <h1>Our Story</h1>
          <p>From passion to your cup</p>
        </div>
      </section>

      <section className="story-content container">
        <div className="story-text">
          <h2>The Beginning</h2>
          <p>Rabuste Coffee was born from a simple passion: to create a space where coffee lovers could experience the art and science of specialty coffee. Founded in 2020, our café has grown into a beloved community hub for those who appreciate the journey from bean to cup.</p>
          
          <h2>Our Philosophy</h2>
          <p>We believe in excellence without pretension. Every coffee we serve is a result of careful sourcing, meticulous roasting, and precise brewing. Our baristas are trained to understand the nuances of each bean, ensuring that every shot pulled is a masterpiece.</p>
          
          <h2>Sustainability & Community</h2>
          <p>We're committed to sustainable practices and fair-trade relationships with our suppliers. By choosing Rabuste, you're supporting ethical coffee farming and contributing to a better future for coffee-producing communities worldwide.</p>
          
          <h2>The Coffee Way</h2>
          <p>At Rabuste, coffee isn't just a commodity—it's a lifestyle. We celebrate the craftsmanship, the community, and the simple joy of a perfectly made cup. Whether you're a coffee connoisseur or just discovering the world of specialty coffee, we invite you to join us on this journey.</p>
        </div>

        <div className="story-image">
          <img src="/WhatsApp_Image_2025-12-12_at_15.49.49_(1)_1766273477552.jpeg" alt="Our café" />
        </div>
      </section>

      <section className="values-section">
        <div className="container">
          <h2>Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <h3>Quality</h3>
              <p>Premium beans, expert preparation, perfect results</p>
            </div>
            <div className="value-card">
              <h3>Passion</h3>
              <p>We love what we do, and it shows in every cup</p>
            </div>
            <div className="value-card">
              <h3>Community</h3>
              <p>Creating spaces where people connect and belong</p>
            </div>
            <div className="value-card">
              <h3>Sustainability</h3>
              <p>Caring for our planet and coffee-farming communities</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
