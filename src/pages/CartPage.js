/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import toast from "react-hot-toast";
import "../styles/CartStyles.css";

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
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

  // get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/braintree/token`
      );
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getToken();
  }, [auth?.token]);

  // handle payments
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/braintree/payment`,
        {
          nonce,
          cart,
        }
      );
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully");
    } catch (error) {
      console.log(error);
      setLoading(false);
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

            {/* Payment */}
            <div className="payment-box">
              {!clientToken || !auth?.token || !cart?.length ? null : (
                <>
                  <DropIn
                    options={{
                      authorization: clientToken,
                      paypal: { flow: "vault" },
                    }}
                    onInstance={(instance) => setInstance(instance)}
                  />

                  <button
                    className="primary-btn"
                    onClick={handlePayment}
                    disabled={loading || !instance || !auth?.user?.address}
                  >
                    {loading ? "Processing..." : "Make Payment"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
