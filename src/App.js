import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase/config";
import Navbar from "./components/Navbar/Navbar";
import ProductGrid from "./components/ProductGrid/ProductGrid";
import FilterPanel from "./components/FilterPanel/FilterPanel";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("mostPopular");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const productsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsData);
        setFilteredProducts(productsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = (searchTerm) => {
    if (!searchTerm.trim()) {
      setFilteredProducts(products);
      return;
    }

    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleFilters = ({ categories, brands, priceRange, availability }) => {
    let filtered = products;

    if (categories.length > 0) {
      filtered = filtered.filter((product) =>
        categories.includes(product.category)
      );
    }

    if (brands.length > 0) {
      filtered = filtered.filter((product) => brands.includes(product.brand));
    }

    filtered = filtered.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    if (availability.length > 0) {
      filtered = filtered.filter(
        (product) =>
          (availability.includes("inStock") && product.availability) ||
          (availability.includes("outOfStock") && !product.availability)
      );
    }

    setFilteredProducts(filtered);
  };

  const sortProducts = (products, sortType) => {
    switch (sortType) {
      case "mostPopular":
        return [...products].sort((a, b) => b.rating - a.rating);
      case "latest":
        return [...products].sort(
          (a, b) => new Date(b.dateAdded) - new Date(a.dateAdded)
        );
      case "priceLowToHigh":
        return [...products].sort((a, b) => a.price - b.price);
      case "priceHighToLow":
        return [...products].sort((a, b) => b.price - a.price);
      default:
        return products;
    }
  };

  const handleSort = (sortType) => {
    setSortBy(sortType);
    setFilteredProducts(sortProducts(filteredProducts, sortType));
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const toggleMobileFilter = () => {
    setIsMobileFilterOpen(!isMobileFilterOpen);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="App">
      <Navbar onSearch={handleSearch} />
      <div className="content-wrapper">
        {/* Mobile Filter Button */}
        <button className="mobile-filter-btn" onClick={toggleMobileFilter}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22 3H2L10 12.46V19L14 21V12.46L22 3Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Filters
        </button>

        <aside className={`sidebar ${isMobileFilterOpen ? "mobile-open" : ""}`}>
          <div className="mobile-filter-header">
            <h2>Filters</h2>
            <button className="close-filter" onClick={toggleMobileFilter}>
              <i className="fas fa-times"></i>
            </button>
          </div>
          <FilterPanel onFilterChange={handleFilters} />
        </aside>
        <main className="main-content">
          <div className="products-header">
            <p className="products-count">
              Showing <span>{currentProducts.length}</span> of{" "}
              <span>{filteredProducts.length}</span> Products
            </p>
            <div className="sort-container">
              <label>Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => handleSort(e.target.value)}
              >
                <option value="mostPopular">Most Popular</option>
                <option value="latest">Latest</option>
                <option value="priceLowToHigh">Price: low to high</option>
                <option value="priceHighToLow">Price: high to low</option>
              </select>
            </div>
          </div>
          <ProductGrid products={currentProducts} />
          <div className="pagination">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                className={`page-button ${
                  currentPage === i + 1 ? "active" : ""
                }`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
