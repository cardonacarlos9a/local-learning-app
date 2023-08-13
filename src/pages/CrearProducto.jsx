import { useState, useContext } from 'react';
import Header from '../components/shared/Header';
import {ProductContext}  from '../services/ProductContext.jsx'

const CrearProducto = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const { products, addProduct } = useContext(ProductContext)


  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newProduct = {
        name: name,
        description: description,
        price: price
    }
    addProduct(newProduct)
        //console.log(newProduct)
    // Reset form fields
    setName('');
    setDescription('');
    setPrice('');
  };

  return (
    <>
    <Header></Header>
    <h1>Creacion de Producto</h1>
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={handleNameChange}
        />
      </div>
      <div>
        <label htmlFor="description">Descript    ion:</label>
        <textarea
          id="description"
          value={description}
          onChange={handleDescriptionChange}
        />
      </div>
      <div>
        <label htmlFor="price">Price:</label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={handlePriceChange}
        />
      </div>
      <button type="submit">Create Product</button>
    </form>
    </> 
  );
};
export default CrearProducto; 
