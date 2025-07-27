import React from "react";
import { Card, Button } from "react-bootstrap";
import { FaStar, FaShoppingCart } from "react-icons/fa";

const ProductCard = ({ product, onClick }) => {
  return (
    <Card
      style={{
        width: "18rem",
        border: "1px solid #eaeaea",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
      }}
      className="mb-4"
      onClick={onClick}
    >
      {/* Image Section */}
      <div
        style={{
          background: "#f8f9fa",
          height: "180px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Card.Img
          src={product.imageUrlCloudinary}
          alt={product.name}
          style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }}
        />
      </div>

      {/* Card Body */}
      <Card.Body className="p-3">
        {/* Price */}
        <div className="d-flex align-items-center mb-2">
          <h5 className="mb-0 fw-bold text-dark">${product.price}</h5>
          {product.originalPrice && (
            <small className="text-muted text-decoration-line-through ms-2">
              ${product.originalPrice}
            </small>
          )}
        </div>

        {/* Product Name */}
        <Card.Title className="fs-6 mb-1 text-truncate" title={product.name}>
          {product.name}
        </Card.Title>

        {/* Category or Specs */}
        <Card.Text className="text-muted small mb-3">
          {product.description || ""}
        </Card.Text>

        {/* Footer: Rating, Sold & Cart */}
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <div
              className="d-flex align-items-center px-2 py-1 rounded"
              style={{ background: "#fff3cd", fontSize: "14px" }}
            >
              <FaStar color="#ffc107" className="me-1" />
              <span>{product.rating || "4.8"}</span>
            </div>
            <span className="text-muted small ms-3">
              Sold {product.sold || 50}
            </span>
          </div>
          <Button
            variant="warning"
            className="rounded-circle  border-0"
            style={{ background: "#ff8c00" }}
            onClick={onClick}
          >
            <FaShoppingCart color="#fff" />
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
