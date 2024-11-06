const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
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
        <div className="product-category">{product.category}</div>
        <div className="product-name">{product.name}</div>
        <div className="product-price">${product.price}</div>
      </div>
    </div>
  );
};
