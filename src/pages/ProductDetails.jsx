import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Card, Button, Spinner, Alert } from "react-bootstrap";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load product");
        setLoading(false);
      });
  }, [id]);

  const handleDelete = () => {
    fetch(`https://fakestoreapi.com/products/${id}`, { method: "DELETE" })
      .then(() => {
        alert("Product deleted (not permanent with FakeStore API)");
        navigate("/products");
      });
  };

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Card>
      <Card.Img
        variant="top"
        src={product.image}
        style={{ height: "300px", objectFit: "contain" }}
      />
      <Card.Body>
        <Card.Title>{product.title}</Card.Title>
        <Card.Text>{product.description}</Card.Text>
        <Card.Text><strong>Category:</strong> {product.category}</Card.Text>
        <Card.Text><strong>Price:</strong> ${product.price}</Card.Text>

        <Button as={Link} to={`/edit-product/${id}`} variant="warning" className="me-2">
          Edit
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      </Card.Body>
    </Card>
  );
}

export default ProductDetails;
