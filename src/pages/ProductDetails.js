import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import "../styles/ProductDetailsStyles.css";

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [cart, setCart] = useCart();

  useEffect(() => {
    if (params?.slug) getProduct();
    // eslint-disable-next-line
  }, [params?.slug]);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `https://backend-bbe-teal.vercel.app/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `https://backend-bbe-teal.vercel.app/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  // calculate discount percentage
  const calculateDiscount = () => {
    if (product?.mrp && product?.price) {
      const discount = ((product.mrp - product.price) / product.mrp) * 100;
      return Math.round(discount);
    }
    return 0;
  };

  return (
    <Layout>
      {/* Top Row: Image + Info */}
      <div className="product-container">
        <div className="product-image">
          <img
            src={`https://backend-bbe-teal.vercel.app/api/v1/product/product-photo/${product._id}`}
            alt={product.name}
          />
        </div>

        <div className="product-info">
          <h1>{product.name}</h1>

          {/* Price Section */}
          <div className="price-section">
            <span className="selling-price">
              ₹{" "}
              {product?.price?.toLocaleString("en-IN", {
                maximumFractionDigits: 2,
              })}
            </span>
            {product?.mrp && (
              <span className="mrp">
                M.R.P.: <del>₹{product?.mrp?.toLocaleString("en-IN")}</del>
              </span>
            )}
            {product?.mrp && (
              <span className="discount">{calculateDiscount()}% Off</span>
            )}
            <p className="tax-info">Inc. of all taxes</p>
          </div>

          <p className="product-category">
            Category: {product?.category?.name}
          </p>

          <button
            className="btn-modern btn-add"
            onClick={() => {
              setCart([...cart, product]);
              localStorage.setItem("cart", JSON.stringify([...cart, product]));
              toast.success("Item Added to cart");
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Description Full Width */}
      <div className="description-container">
        <h4>
          <i className="fas fa-info-circle"></i> Description
        </h4>
        <p>{product.description}</p>
      </div>

      {/* Similar Products */}
      <div className="similar-products">
        <h4>Similar Products</h4>
        {relatedProducts.length < 1 && <p>No Similar Products found</p>}
        <div className="similar-grid">
          {relatedProducts?.map((p) => (
            <div className="similar-card" key={p._id}>
              <img
                src={`https://backend-bbe-teal.vercel.app/api/v1/product/product-photo/${p._id}`}
                alt={p.name}
              />
              <h5>{p.name}</h5>
              <p className="product-price">₹ {p.price}</p>
              <button
                className="btn-modern btn-view"
                onClick={() => navigate(`/product/${p.slug}`)}
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
