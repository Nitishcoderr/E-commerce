import React from 'react';
import { BsMouse2Fill } from "react-icons/bs";
import './Home.css'
import Product from './Product';

const product = {
    name:"Shirt",
    images:[{url:'https://freepngimg.com/thumb/dress_shirt/12-2-dress-shirt-free-download-png.png'}],
    price:1200,
    _id:'niti'
}

const Home = () => {
  return (
    <>
      <div className="banner">
        <p>Welcome to Ecommerce</p>
        <h1>FIND AMAZING PRODUCTS BELOW</h1>
        <a href="#container">
          <button>
            Scroll <BsMouse2Fill />
          </button>
        </a>
      </div>
      <h2 className='homeHeading'>Featured Products</h2>
      <div className="container" id="container">
            <Product product={product}/>
            <Product product={product}/>
            <Product product={product}/>
            <Product product={product}/>
            <Product product={product}/>
            <Product product={product}/>
            <Product product={product}/>
            <Product product={product}/>
          </div>

    </>
  );
};

export default Home;
