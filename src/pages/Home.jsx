import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="text-center">
      <h1>Welcome to FakeStore 🛍</h1>
      <p>Your one-stop shop for testing React APIs!</p>
      <Button variant="primary" onClick={() => navigate("/products")}>
        View Products
      </Button>
    </div>
  );
}

export default Home;
