import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaBox, FaHome } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="bg-dark text-white vh-100 p-3" style={{ width: 220 }}>
      <h4 className="text-white mb-4">Quartz Shop</h4>
      <Nav className="flex-column">
        <Nav.Link as={Link} to="/admin/dashboard" className="text-white">
          <FaHome /> Dashboard
        </Nav.Link>
        <Nav.Link as={Link} to="/admin/products" className="text-white">
          <FaBox /> Products
        </Nav.Link>
      </Nav>
    </div>
  );
};

export default Sidebar;
