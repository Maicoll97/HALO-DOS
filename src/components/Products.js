import React, { useState, useEffect } from 'react';
import '../styles/products.css';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { MdImage, MdDescription, MdAttachMoney } from 'react-icons/md';

function Products() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ image: '', description: '', price: '' });
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    const validProducts = storedProducts.filter(product => product && product.image && product.description && product.price);
    setProducts(validProducts);
  }, []);

  const handleAddProduct = () => {
    if (!newProduct.image || !newProduct.description || !newProduct.price) {
      alert('Please fill in all fields.');
      return;
    }

    const updatedProducts = [...products];
    if (editIndex !== null) {
      updatedProducts[editIndex] = newProduct;
      setEditIndex(null);
    } else {
      updatedProducts.push(newProduct);
    }

    const validProducts = updatedProducts.filter(product => product && product.image && product.description && product.price);
    localStorage.setItem('products', JSON.stringify(validProducts));
    setProducts(validProducts);
    setNewProduct({ image: '', description: '', price: '' });
  };

  const handleEditProduct = (index) => {
    setNewProduct(products[index]);
    setEditIndex(index);
  };

  const handleDeleteProduct = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    const validProducts = updatedProducts.filter(product => product && product.image && product.description && product.price);
    setProducts(validProducts);
    localStorage.setItem('products', JSON.stringify(validProducts));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  return (
    <div className="products-container">
      <h2>Product Management</h2>
      
      <div className="product-form">
        <div className="form-group">
          <MdImage className="form-icon" />
          <input
            type="text"
            name="image"
            value={newProduct.image}
            onChange={handleChange}
            placeholder="Image URL"
          />
        </div>
        <div className="form-group">
          <MdDescription className="form-icon" />
          <input
            type="text"
            name="description"
            value={newProduct.description}
            onChange={handleChange}
            placeholder="Description"
          />
        </div>
        <div className="form-group">
          <MdAttachMoney className="form-icon" />
          <input
            type="number"
            name="price"
            value={newProduct.price}
            onChange={handleChange}
            placeholder="Price"
          />
        </div>
        <button onClick={handleAddProduct} className="add-button">
          {editIndex !== null ? 'Update Product' : 'Add Product'} <FaPlus />
        </button>
      </div>

      <div className="products-list">
        {products.map((product, index) => (
          product ? (
            <div className="product-card" key={index}>
              <img src={product.image} alt={`Product ${index}`} className="product-image" />
              <div className="product-info">
                <p className="description"><MdDescription /> {product.description}</p>
                <p className="price"><MdAttachMoney /> ${product.price}</p>
                <div className="product-actions">
                  <button className="edit-btn" onClick={() => handleEditProduct(index)}><FaEdit /> Edit</button>
                  <button className="delete-btn" onClick={() => handleDeleteProduct(index)}><FaTrash /> Delete</button>
                </div>
              </div>
            </div>
          ) : null
        ))}
      </div>
    </div>
  );
}

export default Products;
