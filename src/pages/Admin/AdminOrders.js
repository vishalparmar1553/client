/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import moment from "moment";
import { Select, Tag, Card } from "antd";
const { Option } = Select;

const AdminOrders = () => {
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancel",
  ]);
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/all-orders`
      );
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handleChange = async (orderId, value) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_API}/api/v1/auth/order-status/${orderId}`,
        { status: value }
      );
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"All Orders Data"}>
      <div className="row dashboard">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9 modern-orders">
          <h2 className="page-title">📦 All Orders</h2>

          {orders?.map((o, i) => (
            <Card
              key={o._id}
              className="order-card"
              bordered={false}
              hoverable
              style={{ marginBottom: "20px" }}
            >
              <div className="order-header">
                <div>
                  <span className="order-id">Order #{i + 1}</span>
                  <Tag color={o?.payment.success ? "green" : "red"}>
                    {o?.payment?.method}
                  </Tag>
                </div>
                <span className="order-date">
                  {moment(o?.createdAt).fromNow()}
                </span>
              </div>

              <div className="order-info">
                <p>
                  <strong>Buyer:</strong> {o?.buyer?.name}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <Select
                    bordered={false}
                    onChange={(value) => handleChange(o._id, value)}
                    defaultValue={o?.status}
                    style={{ minWidth: 150 }}
                  >
                    {status.map((s, i) => (
                      <Option key={i} value={s}>
                        {s}
                      </Option>
                    ))}
                  </Select>
                </p>
                <p>
                  <strong>Items:</strong> {o?.products?.length}
                </p>
              </div>

              <div className="products-list">
                {o?.products?.map((p) => (
                  <Card key={p._id} className="product-card" hoverable>
                    <div className="d-flex align-items-center">
                      <img
                        src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                        alt={p.name}
                        className="product-img"
                      />
                      <div className="product-details">
                        <h6>{p.name}</h6>
                        <p className="price">₹ {p.price}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Internal Modern CSS */}
      <style>{`
        .modern-orders {
          padding: 20px;
        }
        .page-title {
          font-size: 22px;
          font-weight: 600;
          margin-bottom: 20px;
        }
        .order-card {
          border-radius: 12px !important;
          box-shadow: 0 4px 10px rgba(0,0,0,0.08);
          padding: 15px;
        }
        .order-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }
        .order-id {
          font-weight: 600;
          font-size: 16px;
          margin-right: 10px;
        }
        .order-date {
          color: #888;
          font-size: 14px;
        }
        .order-info {
          margin-bottom: 15px;
        }
        .products-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 15px;
        }
        .product-card {
          border-radius: 10px !important;
          background: #fafafa;
        }
        .product-img {
          width: 80px;
          height: 80px;
          border-radius: 10px;
          object-fit: cover;
          margin-right: 15px;
        }
        .product-details h6 {
          margin: 0;
          font-size: 15px;
          font-weight: 600;
        }
        .product-details p {
          margin: 2px 0;
          color: #666;
          font-size: 13px;
        }
        .product-details .price {
          font-weight: bold;
          color: #1890ff;
        }
      `}</style>
    </Layout>
  );
};

export default AdminOrders;
