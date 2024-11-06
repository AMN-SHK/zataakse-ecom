import { useState } from "react";
import "./FilterPanel.css";

const FilterPanel = ({ onFilterChange }) => {
  const [priceRange, setPriceRange] = useState([0, 1500]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [availability, setAvailability] = useState([]);

  const categories = [
    "Furniture",
    "Lighting",
    "Decoration",
    "Bedding",
    "Bath & Shower",
    "Curtains",
    "Toys",
  ];

  const brands = ["Poliform", "Roche Bobois", "Edra", "Kartell"];

  const handleCategoryChange = (category) => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];

    setSelectedCategories(updatedCategories);
    onFilterChange({
      categories: updatedCategories,
      brands: selectedBrands,
      priceRange,
      availability,
    });
  };

  const handleBrandChange = (brand) => {
    const updatedBrands = selectedBrands.includes(brand)
      ? selectedBrands.filter((b) => b !== brand)
      : [...selectedBrands, brand];

    setSelectedBrands(updatedBrands);
    onFilterChange({
      categories: selectedCategories,
      brands: updatedBrands,
      priceRange,
      availability,
    });
  };

  const handlePriceChange = (e) => {
    const value = parseInt(e.target.value);
    setPriceRange([0, value]);
    onFilterChange({
      categories: selectedCategories,
      brands: selectedBrands,
      priceRange: [0, value],
      availability,
    });
  };

  const handleAvailabilityChange = (status) => {
    const updatedAvailability = availability.includes(status)
      ? availability.filter((a) => a !== status)
      : [...availability, status];

    setAvailability(updatedAvailability);
    onFilterChange({
      categories: selectedCategories,
      brands: selectedBrands,
      priceRange,
      availability: updatedAvailability,
    });
  };

  const CustomCheckbox = ({ checked, onChange, label }) => (
    <label className="checkbox-label">
      <div className={`custom-checkbox ${checked ? "checked" : ""}`} />
      <input type="checkbox" checked={checked} onChange={onChange} />
      {label}
    </label>
  );

  return (
    <div className="filter-panel">
      <div className="filter-section">
        <h3>CATEGORIES</h3>
        {categories.map((category) => (
          <CustomCheckbox
            key={category}
            checked={selectedCategories.includes(category)}
            onChange={() => handleCategoryChange(category)}
            label={category}
          />
        ))}
      </div>

      <div className="filter-section">
        <h3>PRICE</h3>
        <div className="price-range">
          <span>
            Price Range: ${priceRange[0]} - ${priceRange[1]}
          </span>
          <input
            type="range"
            min="0"
            max="1500"
            value={priceRange[1]}
            onChange={handlePriceChange}
            className="price-slider"
            style={{
              background: `linear-gradient(to right, #e67e22 ${
                (priceRange[1] / 1500) * 100
              }%, #ddd ${(priceRange[1] / 1500) * 100}%)`,
            }}
          />
          <div className="price-range-values">
            <span>$0</span>
            <span>$1500</span>
          </div>
        </div>
      </div>

      <div className="filter-section">
        <h3>BRANDS</h3>
        {brands.map((brand) => (
          <CustomCheckbox
            key={brand}
            checked={selectedBrands.includes(brand)}
            onChange={() => handleBrandChange(brand)}
            label={brand}
          />
        ))}
      </div>

      <div className="filter-section">
        <h3>AVAILABILITY</h3>
        <CustomCheckbox
          checked={availability.includes("inStock")}
          onChange={() => handleAvailabilityChange("inStock")}
          label="On Stock"
        />
        <CustomCheckbox
          checked={availability.includes("outOfStock")}
          onChange={() => handleAvailabilityChange("outOfStock")}
          label="Out of Stock"
        />
      </div>
    </div>
  );
};

export default FilterPanel;
