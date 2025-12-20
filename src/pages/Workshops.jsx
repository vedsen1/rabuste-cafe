import './Workshops.css';

export default function Workshops() {
  const workshops = [
    {
      title: 'Espresso Basics',
      date: 'Every Saturday 10:00 AM',
      duration: '2 hours',
      price: '$35',
      description: 'Learn the fundamentals of espresso extraction and technique'
    },
    {
      title: 'Latte Art Mastery',
      date: 'Wednesdays 6:00 PM',
      duration: '1.5 hours',
      price: '$40',
      description: 'Master the art of creating beautiful patterns in your coffee'
    },
    {
      title: 'Coffee Tasting Experience',
      date: 'Sundays 2:00 PM',
      duration: '2.5 hours',
      price: '$50',
      description: 'Explore flavors and origins from around the world'
    },
    {
      title: 'Home Brewing Techniques',
      date: 'Fridays 5:00 PM',
      duration: '2 hours',
      price: '$30',
      description: 'Perfect your brew at home with expert guidance'
    },
  ];

  return (
    <main className="workshops">
      <section className="workshops-header">
        <div className="container">
          <h1>Coffee Workshops</h1>
          <p>Master the art of coffee craft</p>
        </div>
      </section>

      <section className="workshops-section container">
        <h2>Upcoming Workshops</h2>
        <div className="workshops-grid">
          {workshops.map((workshop, idx) => (
            <div key={idx} className="workshop-card">
              <h3>{workshop.title}</h3>
              <div className="workshop-details">
                <p><strong>📅</strong> {workshop.date}</p>
                <p><strong>⏱️</strong> {workshop.duration}</p>
                <p><strong>💰</strong> {workshop.price}</p>
              </div>
              <p className="description">{workshop.description}</p>
              <button className="enroll-btn">Enroll Now</button>
            </div>
          ))}
        </div>
      </section>

      <section className="why-workshops container">
        <h2>Why Join Our Workshops?</h2>
        <div className="reasons">
          <div className="reason">
            <h4>Expert Guidance</h4>
            <p>Learn from experienced baristas with years of expertise</p>
          </div>
          <div className="reason">
            <h4>Hands-On Experience</h4>
            <p>Get to practice with our professional equipment</p>
          </div>
          <div className="reason">
            <h4>Community</h4>
            <p>Meet fellow coffee enthusiasts and build connections</p>
          </div>
          <div className="reason">
            <h4>Certificate</h4>
            <p>Receive a completion certificate for your portfolio</p>
          </div>
        </div>
      </section>
    </main>
  );
}
