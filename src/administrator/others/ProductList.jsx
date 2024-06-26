import React, { useState } from 'react';

const ProductList2 = () => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Product 1', price: 10 },
    { id: 2, name: 'Product 2', price: 20 },
    { id: 3, name: 'Product 3', price: 30 }
  ]);

  const [formData, setFormData] = useState({ id: null, name: '', price: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddProduct = () => {
    if (formData.name && formData.price) {
      const newProduct = {
        id: Math.floor(Math.random() * 1000) + 1,
        name: formData.name,
        price: Number(formData.price)
      };
      setProducts([...products, newProduct]);
      setFormData({ id: null, name: '', price: '' });
      closeModal();
    }
  };

  const handleEditProduct = (product) => {
    setFormData(product);
    openModal();
  };

  const handleUpdateProduct = () => {
    if (formData.name && formData.price) {
      setProducts(products.map(p => (p.id === formData.id ? formData : p)));
      setFormData({ id: null, name: '', price: '' });
      closeModal();
    }
  };

  const handleDeleteConfirmation = (product) => {
    setIsDeleteConfirmationOpen(true);
    setProductToDelete(product);
  };

  const handleDeleteProduct = () => {
    if (productToDelete) {
      setProducts(products.filter(product => product.id !== productToDelete.id));
      setIsDeleteConfirmationOpen(false);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openDeleteConfirmation = () => {
    setIsDeleteConfirmationOpen(true);
  };

  const closeDeleteConfirmation = () => {
    setIsDeleteConfirmationOpen(false);
  };

  return (
    <div className="container mx-auto mt-4">
      <h1 className="text-2xl font-bold mb-4">Product List</h1>
      <input
        type="text"
        placeholder="Search..."
        className="border border-gray-300 p-2 mb-4"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Price</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
          ).map(product => (
            <tr key={product.id}>
              <td className="border px-4 py-2">{product.id}</td>
              <td className="border px-4 py-2">{product.name}</td>
              <td className="border px-4 py-2">${product.price.toFixed(2)}</td>
              <td className="border px-4 py-2">
                <button onClick={() => handleEditProduct(product)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded">Edit</button>
                <button onClick={() => handleDeleteConfirmation(product)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 w-1/2 animate-slide-in">
            <h2 className="text-xl font-bold mb-4">Add/Edit Product</h2>
            <input
              type="text"
              placeholder="Name"
              name="name"
              className="border border-gray-300 p-2 mb-2 w-full"
              value={formData.name}
              onChange={handleChange}
            />
            <input
              type="number"
              placeholder="Price"
              name="price"
              className="border border-gray-300 p-2 mb-2 w-full"
              value={formData.price}
              onChange={handleChange}
            />
            {formData.id ?
              <button onClick={handleUpdateProduct} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mr-2 rounded">Update</button> :
              <button onClick={handleAddProduct} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mr-2 rounded">Add</button>
            }
            <button onClick={closeModal} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Cancel</button>
          </div>
        </div>
      )}

      {isDeleteConfirmationOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 w-1/4 animate-slide-in">
            <h2 className="text-xl font-bold mb-4">Are you sure you want to delete?</h2>
            <div className="flex justify-end">
              <button onClick={handleDeleteProduct} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mr-2 rounded">Delete</button>
              <button onClick={closeDeleteConfirmation} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Cancel</button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-4">
        <button onClick={openModal} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add Product</button>
      </div>
    </div>
  );
};

export default ProductList2;
