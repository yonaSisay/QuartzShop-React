import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import ProductForm from "../../components/products/ProductForm";
import ProductDetailModal from "../../components/products/ProductDetailModal";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, deleteProductThunk } from "../../store/productSlice";
import { FaTrash, FaEdit, FaPlus, FaDownload } from "react-icons/fa";

const ProductManagement = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showFormModal, setShowFormModal] = useState(false);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete?")) return;
    try {
      await dispatch(deleteProductThunk(id)).unwrap();
    } catch {
      // Optionally show a toast here
    }
  };

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout title="Manage Products">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <input
          type="text"
          placeholder="Search products..."
          className="w-50"
          style={{
            border: "none",
            background: "#f6f7fa",
            boxShadow: "none",
            borderRadius: "8px",
            paddingLeft: "16px",
            height: "40px"
          }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="d-flex gap-2">
          <button className="btn btn-success d-flex align-items-center" onClick={() => setShowFormModal(true)}>
            <FaPlus className="me-2" />
            New Item
          </button>
          <button className="btn btn-danger d-flex align-items-center">
            <FaDownload className="me-2" />
            Export DB
          </button>
        </div>


      </div>

      <div
        className="p-3"
        style={{
          borderRadius: "16px",
        }}
      >
        <table
          className="table table-hover align-middle text-center"
          style={{
            borderRadius: "12px",
            overflow: "hidden",
            background: "transparent",
            marginBottom: 0,
          }}
        >
          <thead style={{ background: "#ffffff" }}>
            <tr>
              <th style={{ border: "none" }}>NAME</th>
              <th style={{ border: "none" }}>IMAGE</th>
              <th style={{ border: "none" }}>PRICE</th>
              <th style={{ border: "none" }}>CATEGORY</th>
              <th style={{ border: "none" }}>STATUS</th>
              <th style={{ border: "none" }}>EDIT</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((product) => (
              <tr key={product.id}>
                <td className="fw-semibold">{product.name}</td>
                <td>
                  <img
                    src={product.imageUrlCloudinary}
                    alt={product.name}
                    style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "8px" }}
                  />
                </td>
                <td>${product.price}</td>
                <td>{product.category || "N/A"}</td>
                <td>
                  <span className={`badge ${product.status === "active" ? "bg-success" : "bg-secondary"}`}>
                    {product.status?.toUpperCase() || "UNKNOWN"}
                  </span>
                </td>
                <td>
                  <button
                    className="btn btn-teal btn-sm me-2"
                    title="Edit"
                    onClick={() => setSelectedProduct(product)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    title="Delete"
                    onClick={() => handleDelete(product.id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onHide={() => setSelectedProduct(null)}
        />
      )}

      {showFormModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New Product</h5>
                <button type="button" className="btn-close" onClick={() => setShowFormModal(false)}></button>
              </div>
              <div className="modal-body">
                <ProductForm />
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default ProductManagement;
