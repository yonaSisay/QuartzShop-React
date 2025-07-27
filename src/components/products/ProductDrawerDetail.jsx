import React from "react";
import { Offcanvas, Button, Image, Row, Col } from "react-bootstrap";

const ProductDrawerDetail = ({ product, show, onHide }) => {
  if (!product) return null;

  return (
    <Offcanvas show={show} onHide={onHide} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Product Details</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Row className="mb-3">
          <Col xs={12} className="text-center">
            {product.imageUrlCloudinary ? (
              <Image src={product.imageUrlCloudinary} alt={product.name} fluid style={{ maxHeight: 200, objectFit: 'cover' }} />
            ) : (
              <div style={{ height: 200, background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span>No Image</span>
              </div>
            )}
          </Col>
        </Row>
        <h5>{product.name}</h5>
        <p className="text-muted mb-1">${product.price}</p>
        <p><strong>Category:</strong> {product.category || '-'}</p>
        <p><strong>Status:</strong> {product.status || '-'}</p>
        <p><strong>Description:</strong><br />{product.description}</p>
        <div className="d-flex justify-content-end mt-4">
          <Button variant="secondary" onClick={onHide}>Close</Button>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default ProductDrawerDetail; 