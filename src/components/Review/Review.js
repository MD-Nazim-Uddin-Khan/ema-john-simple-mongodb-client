import React, { useEffect, useState } from 'react';
// import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import happyImage from '../../images/giphy.gif'
import { useHistory } from 'react-router-dom';

const Review = () => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);

        fetch('https://stark-caverns-01518.herokuapp.com/productsByKeys',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productKeys)
        })
        .then(res => res.json())
        .then(data => setCart(data))
    }, [])

    const removeProduct = (productKey) => {
        const newCard = cart.filter(pd => pd.key !== productKey)
        setCart(newCard);
        removeFromDatabaseCart(productKey);
    }

    const [orderPlaced, setOrderPlace] = useState(false);

    const history = useHistory();

    const handleProceedCheckout = () => {
        history.push('/shipment');
        
    }

    let thankyou;
    if(orderPlaced){
        thankyou = <img src={happyImage} alt=""/>
    }

    return (
        <div className="twin-container">
            <div className="product-container">
            {
                cart.map(pd => 
                <ReviewItem 
                    key={pd.key} 
                    product={pd}
                    removeProduct={removeProduct}
                    >
                </ReviewItem>)
            }

            {thankyou}
            
            </div>
            <div className="cart-container">
                <Cart cart1={cart}>
                    <button onClick={handleProceedCheckout} className="main-btn">Proceed Checkout</button>
                </Cart>
            </div>
        </div>

    );
};

export default Review;