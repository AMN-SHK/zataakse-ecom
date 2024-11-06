import React from 'react';
import './ProductGrid.css';

const ProductGrid = ({ products }) => {
  return (
    <div className="products-grid">
      {products.map(product => (
        <div key={product.id} className="product-card">
          <div className="product-image">
            <img src={product.image} alt={product.name} />
            <div className="product-actions">
              <button className="action-button">
                <i className="fas fa-heart"></i>
              </button>
              <button className="action-button">
                <i className="fas fa-search"></i>
              </button>
              <button className="action-button">
                <i className="fas fa-shopping-cart"></i>
              </button>
            </div>
          </div>
          <div className="product-info">
            <p className="product-category">{product.category}</p>
            <h2 className="product-name">{product.name}</h2>
            <p className="product-price">${product.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;