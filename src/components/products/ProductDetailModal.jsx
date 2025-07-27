import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { updateProductThunk } from "../../store/productSlice";
import { toast } from "react-toastify";

const ProductDetailModal = ({ product, onHide }) => {
  const [form, setForm] = useState(product);
  const [editing, setEditing] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      await dispatch(updateProductThunk({ id: product.id, data: form })).unwrap();
      toast.success("Product updated");
      setEditing(false);
    } catch {
      toast.error("Update failed");
    }
  };

  const CATEGORIES = ["Laptop", "Desktop", "Mobile", "Accessories"];
  const STATUSES = ["Active", "Inactive", "Out of Stock"];

  return (
    <Modal show onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Product Detail</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              name="name"
              value={form.name}
              disabled={!editing}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mt-2">
            <Form.Label>Price</Form.Label>
            <Form.Control
              name="price"
              value={form.price}
              disabled={!editing}
              onChange={handleChange}
              type="number"
            />
          </Form.Group>
          <Form.Group className="mt-2">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={form.description}
              disabled={!editing}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mt-2">
            <Form.Label>Category</Form.Label>
            <Form.Select
              name="category"
              value={form.category || ""}
              disabled={!editing}
              onChange={handleChange}
            >
              <option value="">Select Category</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mt-2">
            <Form.Label>Status</Form.Label>
            <Form.Select
              name="status"
              value={form.status || ""}
              disabled={!editing}
              onChange={handleChange}
            >
              <option value="">Select Status</option>
              {STATUSES.map((status) => (
                <option key={status} value={status}>{status}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        {editing ? (
          <Button variant="success" onClick={handleUpdate}>
            Save Changes
          </Button>
        ) : (
          <Button variant="primary" onClick={() => setEditing(true)}>
            Edit
          </Button>
        )}
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductDetailModal;
