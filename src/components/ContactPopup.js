import React, { useEffect, useState } from "react";
import { FaWhatsapp, FaEnvelope, FaTimes, FaPhone } from "react-icons/fa";

const BottomLeftPopup = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const closed = sessionStorage.getItem("popupClosed");
    if (!closed) setShow(true);
  }, []);

  const handleClose = () => {
    setShow(false);
    sessionStorage.setItem("popupClosed", "true");
  };

  if (!show) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        left: "20px",
        background: "linear-gradient(135deg, #FFD700, #FFA500)",
        color: "#111",
        padding: "20px 18px",
        borderRadius: "16px",
        boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
        maxWidth: "300px",
        zIndex: 1000,
        animation: "slideIn 0.5s ease-out",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Close Button */}
      <button
        onClick={handleClose}
        style={{
          position: "absolute",
          top: "8px",
          right: "8px",
          background: "transparent",
          border: "none",
          color: "#111",
          fontSize: "16px",
          cursor: "pointer",
          transition: "transform 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.2)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        <FaTimes />
      </button>

      <h5 style={{ margin: 0, marginBottom: "10px", fontWeight: "bold" }}>
        Contact Us
      </h5>

      <p
        style={{
          margin: "6px 0",
          display: "flex",
          alignItems: "center",
          gap: "6px",
        }}
      >
        <FaPhone />
        <a
          href="tel:+919664650340"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          +91 96646 50340
        </a>
      </p>

      <p
        style={{
          margin: "6px 0",
          display: "flex",
          alignItems: "center",
          gap: "6px",
        }}
      >
        <FaWhatsapp color="#25D366" />{" "}
        <a
          href="https://wa.me/917984950340"
          target="_blank"
          rel="noreferrer"
          style={{
            color: "#111",
            textDecoration: "none",
            fontWeight: "500",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#006400")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#111")}
        >
          WhatsApp Chat
        </a>
      </p>

      <p
        style={{
          margin: "6px 0",
          display: "flex",
          alignItems: "center",
          gap: "6px",
        }}
      >
        <FaEnvelope />{" "}
        <p style={{ margin: 0, color: "#ccc" }}>
          <a
            href="mailto:info@blackburnenterprise.com"
            style={{ color: "#000000", textDecoration: "none" }}
          >
            info@blackburnenterprise.com
          </a>
        </p>
      </p>

      {/* Slide-in Animation */}
      <style>
        {`
          @keyframes slideIn {
            0% { transform: translateX(-150%); opacity: 0; }
            100% { transform: translateX(0); opacity: 1; }
          }
        `}
      </style>
    </div>
  );
};

export default BottomLeftPopup;
