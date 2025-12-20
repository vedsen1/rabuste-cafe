import './Menu.css';

export default function Menu() {
  const coffeeItems = [
    { name: 'Espresso', description: 'Rich and bold', price: '$2.50' },
    { name: 'Americano', description: 'Classic espresso with hot water', price: '$3.00' },
    { name: 'Cappuccino', description: 'Espresso with steamed milk and foam', price: '$4.00' },
    { name: 'Latte', description: 'Smooth and creamy', price: '$4.00' },
    { name: 'Flat White', description: 'Espresso with velvety microfoam', price: '$4.50' },
    { name: 'Cortado', description: 'Equal parts espresso and milk', price: '$3.50' },
  ];

  const specialties = [
    { name: 'Vanilla Latte', description: 'Latte with vanilla infusion', price: '$4.50' },
    { name: 'Caramel Macchiato', description: 'Sweet caramel notes', price: '$5.00' },
    { name: 'Mocha', description: 'Chocolate and espresso blend', price: '$4.75' },
    { name: 'Cold Brew', description: 'Smooth cold coffee', price: '$3.50' },
  ];

  const pastries = [
    { name: 'Chocolate Cake', price: '$4.50' },
    { name: 'Croissant', price: '$3.50' },
    { name: 'Blueberry Muffin', price: '$3.75' },
    { name: 'Almond Biscotti', price: '$2.50' },
  ];

  return (
    <main className="menu">
      <section className="menu-header">
        <div className="container">
          <h1>Our Menu</h1>
          <p>Carefully crafted beverages and delicious pastries</p>
        </div>
      </section>

      <section className="menu-section container">
        <h2>Coffee & Espresso</h2>
        <div className="menu-items">
          {coffeeItems.map((item, idx) => (
            <div key={idx} className="menu-item">
              <div className="item-header">
                <h3>{item.name}</h3>
                <span className="price">{item.price}</span>
              </div>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="menu-section container">
        <h2>Specialty Drinks</h2>
        <div className="menu-items">
          {specialties.map((item, idx) => (
            <div key={idx} className="menu-item">
              <div className="item-header">
                <h3>{item.name}</h3>
                <span className="price">{item.price}</span>
              </div>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="menu-section container">
        <h2>Fresh Pastries</h2>
        <div className="menu-items">
          {pastries.map((item, idx) => (
            <div key={idx} className="menu-item">
              <div className="item-header">
                <h3>{item.name}</h3>
                <span className="price">{item.price}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
