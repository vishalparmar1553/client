import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [sortOption, setSortOption] = useState("newToOld");

  // get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product`
      );
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  // lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);

  // handle sorting
  const sortedProducts = [...products].sort((a, b) => {
    switch (sortOption) {
      case "oldToNew":
        return new Date(a.createdAt) - new Date(b.createdAt);
      case "newToOld":
        return new Date(b.createdAt) - new Date(a.createdAt);
      case "aToZ":
        return a.name.localeCompare(b.name);
      case "zToA":
        return b.name.localeCompare(a.name);
      case "lowToHigh":
        return a.price - b.price;
      case "highToLow":
        return b.price - a.price;
      default:
        return 0;
    }
  });

  return (
    <Layout>
      <div className="row dashboard">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h1 className="text-center">All Products List</h1>
            <select
              className="form-select w-auto"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="newToOld">New to Old</option>
              <option value="oldToNew">Old to New</option>
              <option value="aToZ">A to Z</option>
              <option value="zToA">Z to A</option>
              <option value="lowToHigh">Price: Low to High</option>
              <option value="highToLow">Price: High to Low</option>
            </select>
          </div>

          <div className="d-flex flex-wrap justify-content-start">
            {sortedProducts?.map((p) => (
              <Link
                key={p._id}
                to={`/dashboard/admin/product/${p.slug}`}
                className="product-link text-decoration-none"
                style={{ marginBottom: "20px" }}
              >
                <div
                  className="card m-2 shadow-sm h-100"
                  style={{
                    width: "18rem",
                    minHeight: "380px",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: "10px",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.03)";
                    e.currentTarget.style.boxShadow =
                      "0 6px 20px rgba(0,0,0,0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow =
                      "0 2px 6px rgba(0,0,0,0.1)";
                  }}
                >
                  <img
                    src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                    style={{
                      height: "200px",
                      objectFit: "contain",
                      padding: "10px",
                    }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h6
                      className="card-title fw-bold"
                      style={{ minHeight: "50px" }}
                    >
                      {p.name.length > 60
                        ? p.name.substring(0, 60) + "..."
                        : p.name}
                    </h6>
                    <p className="text-muted small mb-1">{p.category?.name}</p>
                    <div className="mt-auto">
                      <p className="card-text fw-bold text-success">
                        ₹{p.price}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
