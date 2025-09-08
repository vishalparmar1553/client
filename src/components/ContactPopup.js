import React, { useEffect, useState } from "react";
import {
  FaWhatsapp,
  FaEnvelope,
  FaTimes,
  FaPhone,
  FaHeadset,
} from "react-icons/fa";

const BottomLeftPopup = () => {
  const [show, setShow] = useState(false);
  const [showHelpBtn, setShowHelpBtn] = useState(false);

  useEffect(() => {
    // Open initially
    setShow(true);

    // Auto close after 10s
    const timer = setTimeout(() => {
      handleClose();
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setShow(false);
    setShowHelpBtn(true); // show help button after close
  };

  const handleOpen = () => {
    setShow(true);
    setShowHelpBtn(false); // hide help button when popup opens
  };

  return (
    <>
      {show && (
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
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.2)")
            }
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
            <span style={{ margin: 0, color: "#000" }}>
              <a
                href="mailto:info@blackburnenterprise.com"
                style={{ color: "#000000", textDecoration: "none" }}
              >
                info@blackburnenterprise.com
              </a>
            </span>
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
      )}

      {/* Floating Help Button */}
      {showHelpBtn && !show && (
        <button
          onClick={handleOpen}
          style={{
            position: "fixed",
            bottom: "20px",
            left: "20px",
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #FFD700, #FFA500)",
            color: "#111",
            border: "none",
            boxShadow: "0 6px 15px rgba(0,0,0,0.3)",
            cursor: "pointer",
            zIndex: 1000,
            fontSize: "22px",
          }}
        >
          <FaHeadset />
        </button>
      )}
    </>
  );
};

export default BottomLeftPopup;
