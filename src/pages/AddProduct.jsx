import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";

function AddProduct() {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    category: ""
  });
  const [message, setMessage] = useState("");

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    fetch("https://fakestoreapi.com/products", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" }
    })
      .then(res => res.json())
      .then(() => setMessage("Product created successfully (not permanent)."));
  };

  return (
    <div>
      <h2>Add Product</h2>
      {message && <Alert variant="success">{message}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control name="title" onChange={handleChange} required />
        </Form.Group>.
        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control type="number" name="price" onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" name="description" onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Control name="category" onChange={handleChange} required />
        </Form.Group>
        <Button type="submit" variant="primary">Add Product</Button>
      </Form>
    </div>
  );
}

export default AddProduct;
