import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Form, Button, Alert, Spinner } from "react-bootstrap";

function EditProduct() {
  const { id } = useParams();
  const [formData, setFormData] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setFormData(data);
        setLoading(false);
      });
  }, [id]);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    fetch(`https://fakestoreapi.com/products/${id}`, {
      method: "PUT",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" }
    })
      .then(res => res.json())
      .then(() => setMessage("Product updated successfully (not permanent)."));
  };

  if (loading) return <Spinner animation="border" />;

  return (
    <div>
      <h2>Edit Product</h2>
      {message && <Alert variant="success">{message}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control name="title" value={formData.title} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control type="number" name="price" value={formData.price} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" name="description" value={formData.description} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Control name="category" value={formData.category} onChange={handleChange} />
        </Form.Group>
        <Button type="submit" variant="warning">Update Product</Button>
      </Form>
    </div>
  );
}

export default EditProduct;
