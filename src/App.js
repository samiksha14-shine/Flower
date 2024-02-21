import React, { useState } from 'react';
import { Container, Row, Button, Card } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';

const initialPictures = [
  { id: 1, name: 'Rose', price: 100, image: '/images/rose.jpg' },
  { id: 2, name: 'Sunflower', price: 150, image: '/images/sunflower.jpg' },
  { id: 3, name: 'Hibiscus', price: 200, image: '/images/hibiscus.jpg' },
];

function App() {
  const [mainPictures, setMainPictures] = useState(initialPictures);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const addToCart = (picture) => {
    setCart([picture]);
    setMainPictures(mainPictures.filter((p) => p.id !== picture.id));
    setSelectedItem(picture.id);
  };

  const isButtonDisabled = (picture) => {
    return selectedItem && selectedItem !== picture.id;
  };

  const getTotalAmount = () => {
    return cart.reduce((total, picture) => total + picture.price, 0);
  };

  const goBack = () => {
    setShowCart(false);
  };

  const handleCheckout = () => {
    alert('Checkout process initiated. Total amount: $' + getTotalAmount());
  };

  const removeFromCart = (id) => {
    const removedItem = cart.find((p) => p.id === id);
    setCart(cart.filter((p) => p.id !== id));
    const index = mainPictures.findIndex((p) => p.id > removedItem.id);
    setMainPictures([...mainPictures.slice(0, index), removedItem, ...mainPictures.slice(index)]);
  };

  return (
    <div>
      <div style={{ background: 'palevioletred', height: '25%', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', paddingLeft: '30px' }}>
        <h1 style={{ fontSize: '5rem', color: 'mistyrose', fontFamily: 'cursive', marginRight: '20px' }}>{showCart ? 'Cart' : 'Flowers'}</h1>
        <div style={{ position: 'absolute', top: '70px', right: '20px', color: 'mistyrose', fontSize: '3rem' }}>
          <div onClick={() => setShowCart(!showCart)} style={{ cursor: 'pointer', marginBottom: '20px' }}>
            <FaShoppingCart size={70} />
            {cart.length > 0 && <span className="cart-counter">{cart.length}</span>}
          </div>
        </div>
      </div>
      <Container style={{ marginTop: '20px', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' }}>
        {showCart && (
          <div>
            {cart.length === 0 ? (
              <>
                <h1 style={{ color: 'white', fontWeight: 'bold', fontSize: '3rem' }}>Your cart is empty!</h1>
                <Button onClick={goBack} style={{ backgroundColor: 'palevioletred', color: 'white', fontWeight: 'bold', fontSize: '1.2rem', padding: '10px 20px', borderRadius: '4px', border: '2px solid white', marginTop: '20px' }}>Back</Button>
              </>
            ) : (
              cart.map((picture) => (
                <Card key={picture.id} style={{ marginBottom: '1rem' }}>
                  <Card.Img 
                    variant="top" 
                    src={picture.image} 
                    style={{ 
                      width: '200px', 
                      height: '200px', 
                      objectFit: 'cover', 
                      border: '2px solid palevioletred', 
                      borderRadius: '4px' 
                    }} 
                  />
                  <Card.Body>
                    <Card.Title style={{ color: 'palevioletred', fontWeight: 'bold', fontSize: '1.2rem' }}>{picture.name}</Card.Title>
                    <Card.Text style={{ color: 'palevioletred', fontWeight: 'bold', fontSize: '1rem' }}>Price: ${picture.price}</Card.Text>
                    <Button variant="danger" onClick={() => removeFromCart(picture.id)} style={{ backgroundColor: 'palevioletred', color: 'white', fontWeight: 'bold', fontSize: '1.2rem', padding: '10px 20px', borderRadius: '4px', border: '2px solid white' }}>Remove</Button>
                  </Card.Body>
                </Card>
              ))
            )}
            {cart.length > 0 && (
              <>
                <h4>Total Amount: ${getTotalAmount()}</h4>
                <Button onClick={handleCheckout} style={{ backgroundColor: 'palevioletred', color: 'white', fontWeight: 'bold', fontSize: '1.2rem', padding: '10px 20px', borderRadius: '4px', border: '2px solid white' }}>Checkout</Button>
                <Button onClick={goBack} style={{ backgroundColor: 'palevioletred', color: 'white', fontWeight: 'bold', fontSize: '1.2rem', padding: '10px 20px', borderRadius: '4px', border: '2px solid white', marginTop: '10px', marginLeft: '10px' }}>Back</Button>
              </>
            )}
          </div>
        )}
        {!showCart && (
          mainPictures.map((picture) => (
            <Card key={picture.id} style={{ marginBottom: '1rem' }}>
              <Card.Img 
                variant="top" 
                src={picture.image} 
                style={{ 
                  width: '200px', 
                  height: '200px', 
                  objectFit: 'cover', 
                  border: '2px solid palevioletred', 
                  borderRadius: '4px' 
                }} 
              />
              <Card.Body>
                <Card.Title style={{ color: 'palevioletred', fontWeight: 'bold', fontSize: '1.2rem' }}>{picture.name}</Card.Title>
                <Card.Text style={{ color: 'palevioletred', fontWeight: 'bold', fontSize: '1rem' }}>Price: ${picture.price}</Card.Text>
                <Button 
                  onClick={() => addToCart(picture)} 
                  disabled={isButtonDisabled(picture)} // Disable button if another item is already selected
                  style={{ 
                    backgroundColor: 'palevioletred', 
                    color: 'white', 
                    fontWeight: 'bold', 
                    fontSize: '1.2rem', 
                    padding: '10px 20px', 
                    borderRadius: '4px', 
                    border: '2px solid white' 
                  }}
                >
                  Buy
                </Button>
              </Card.Body>
            </Card>
          ))
        )}
      </Container>
    </div>
  );
}

export default App;
