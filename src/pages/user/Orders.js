/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/orders`
      );
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <Layout title={"Your Orders"}>
      <div className="container-fluid py-4 px-3 dashboard">
        <div className="row">
          {/* Sidebar */}
          <div className="col-md-3 mb-4">
            <UserMenu />
          </div>

          {/* Orders Section */}
          <div className="col-md-9">
            <h2 className="text-center mb-4 fw-bold">My Orders</h2>

            {orders?.map((o, i) => (
              <div
                className="order-card mb-4 p-3 rounded shadow-sm border bg-white"
                key={o._id}
              >
                {/* Order Info */}
                <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                  <h5 className="mb-0">Order #{i + 1}</h5>
                  <span
                    className={`badge px-3 py-2 rounded-pill ${
                      o?.status === "Delivered"
                        ? "bg-success"
                        : o?.status === "Processing"
                        ? "bg-warning text-dark"
                        : "bg-secondary"
                    }`}
                  >
                    {o?.status}
                  </span>
                </div>

                <div className="table-responsive">
                  <table className="table table-borderless mb-0">
                    <tbody>
                      <tr>
                        <td className="fw-semibold">Buyer:</td>
                        <td>{o?.buyer?.name}</td>
                        <td className="fw-semibold">Date:</td>
                        <td>{moment(o?.createAt).format("DD MMM YYYY")}</td>
                      </tr>
                      <tr>
                        <td className="fw-semibold">Payment:</td>
                        <td>
                          <span className="badge bg-info text-dark">
                            {o?.payment?.method}
                          </span>
                        </td>
                        <td className="fw-semibold">Items:</td>
                        <td>{o?.products?.length}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Product List */}
                <hr />
                <div className="row g-3">
                  {o?.products?.map((p) => (
                    <div className="col-md-6 col-lg-4" key={p._id}>
                      <div className="card h-100 border-0 shadow-sm product-card">
                        <img
                          src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                          className="card-img-top rounded-top"
                          alt={p.name}
                          style={{ height: "180px", objectFit: "cover" }}
                        />
                        <div className="card-body">
                          <h6 className="fw-bold">{p.name}</h6>
                          <p className="text-muted small mb-2">
                            {p.category.name}{" "}
                          </p>
                          <p className="mb-0 fw-semibold text-primary">
                            ₹ {p.price}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {orders?.length === 0 && (
              <div className="text-center py-5 text-muted">
                <h5>No orders yet!</h5>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Extra Modern Styles */}
      <style>{`
        .order-card:hover {
          transform: translateY(-3px);
          transition: 0.3s ease-in-out;
        }
        .product-card:hover {
          transform: scale(1.02);
          transition: 0.3s ease-in-out;
        }
      `}</style>
    </Layout>
  );
};

export default Orders;
