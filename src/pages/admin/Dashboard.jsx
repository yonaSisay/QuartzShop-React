import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import DashboardLayout from "../../components/layout/DashboardLayout";
import ProductCard from "../../components/products/ProductCard";
import ProductDrawerDetail from "../../components/products/ProductDrawerDetail";
import { FaFilter } from "react-icons/fa";
import { fetchProducts } from "../../store/productSlice";

const ITEMS_PER_PAGE = 8;
const CATEGORIES = ["Laptop", "Desktop", "Mobile", "Accessories"];

const Dashboard = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [drawerProduct, setDrawerProduct] = useState(null);
  const [drawerShow, setDrawerShow] = useState(false);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category ? product.category === category : true;
      return matchesSearch && matchesCategory;
    });
  }, [products, search, category]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE));
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <DashboardLayout title="Dashboard">
      <div className="container py-3">
        {/* Search and Filter Row */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          {/* Search Bar */}
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
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
          {/* Filter Dropdown */}
          <div className="d-flex align-items-center">
            
            <select
              className="form-select"
              style={{ width: 180 }}
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="">All Categories</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* Product Grid */}
        <div className="row">
          {paginatedProducts.map((product) => (
            <div className="col-md-3 mb-4" key={product.id}>
              <ProductCard product={product} onClick={() => { setDrawerProduct(product); setDrawerShow(true); }} />
            </div>
          ))}
        </div>
        {/* Centered Pagination */}
        <nav className="mt-4">
          <ul className="pagination justify-content-center">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <li
                key={page}
                className={`page-item ${page === currentPage ? "active" : ""}`}
                style={{ margin: '0 4px' }}
              >
                <button className="page-link" onClick={() => handlePageChange(page)}>
                  {page}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      {/* Product Detail Drawer */}
      <ProductDrawerDetail
        product={drawerProduct}
        show={drawerShow}
        onHide={() => setDrawerShow(false)}
      />
    </DashboardLayout>
  );
};

export default Dashboard;
