/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
import React, { useState } from "react";
import Layout from "./../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import "../styles/CartStyles.css";

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      console.log(error);
    }
  };

  // remove cart item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  // handle COD order
  const handleCODOrder = async () => {
    try {
      setLoading(true);
      await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/order-cod`,
        { cart },
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Order placed successfully (Cash on Delivery)");
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Failed to place order");
    }
  };

  return (
    <Layout>
      <div className="cart-container" style={{ marginTop: "100px" }}>
        <header className="cart-header">
          <h1>{!auth?.user ? "Hello Guest" : `Hello ${auth?.user?.name}`}</h1>
          <p>
            {cart?.length
              ? `You have ${cart.length} item(s) in your cart ${
                  auth?.token ? "" : "— please login to checkout!"
                }`
              : "Your Cart is Empty"}
          </p>
        </header>

        <div className="cart-grid">
          {/* cart items */}
          <div className="cart-items">
            {cart?.map((p) => (
              <div className="cart-card" key={p._id}>
                <img
                  src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                  alt={p.name}
                />
                <div className="cart-info">
                  <h3>{p.name}</h3>
                  <p>{p.category.name}</p>
                  <span className="price">₹{p.price}</span>
                </div>
                <button
                  className="remove-btn"
                  onClick={() => removeCartItem(p._id)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          {/* summary + checkout */}
          <div className="cart-summary">
            <h2>Cart Summary</h2>
            <p>
              Total: <strong>{totalPrice()}</strong>
            </p>

            {auth?.user?.address ? (
              <div className="address-box">
                <h4>Current Address</h4>
                <p>{auth?.user?.address}</p>
                <button
                  className="secondary-btn"
                  onClick={() => navigate("/dashboard/user/profile")}
                >
                  Update Address
                </button>
              </div>
            ) : (
              <div className="address-box">
                {auth?.token ? (
                  <button
                    className="secondary-btn"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Add Address
                  </button>
                ) : (
                  <button
                    className="secondary-btn"
                    onClick={() =>
                      navigate("/login", {
                        state: "/cart",
                      })
                    }
                  >
                    Login to Checkout
                  </button>
                )}
              </div>
            )}

            {/* COD Order Button */}
            <div className="payment-box">
              {auth?.token && cart?.length ? (
                <button
                  className="primary-btn"
                  onClick={handleCODOrder}
                  disabled={loading || !auth?.user?.address}
                >
                  {loading ? "Placing Order..." : "Place Order (COD)"}
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
