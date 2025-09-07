import React from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaFacebook, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      style={{
        background: "#111",
        color: "#fff",
        padding: "40px 20px 20px",
        marginTop: "40px",
      }}
    >
      <div className="container">
        <div className="row text-center text-md-start">
          {/* Page Links */}
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold mb-3">Quick Links</h5>
            <ul style={{ listStyle: "none", padding: 0, lineHeight: "2" }}>
              <li>
                <Link
                  to="/about"
                  style={{ color: "#ccc", textDecoration: "none" }}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  style={{ color: "#ccc", textDecoration: "none" }}
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/policy"
                  style={{ color: "#ccc", textDecoration: "none" }}
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold mb-3">Contact Us</h5>
            <p style={{ margin: 0, color: "#ccc" }}>
              📍 Halvad, Morbi, Gujarat - 363330
            </p>
            <p
              style={{
                margin: 0,
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}
            >
              <FaWhatsapp style={{ color: "green" }} size={20} />{" "}
              <a
                href="https://wa.me/917984950340"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "#ccc",
                  textDecoration: "none",
                }}
              >
                +91 79849 50340 | 96646 50340
              </a>
            </p>
            <p style={{ margin: 0, color: "#ccc" }}>✉️ support@blackburn.com</p>
          </div>

          {/* Social Media */}
          <div className="col-md-4 mb-4 text-center">
            <h5 className="fw-bold mb-3">Follow Us</h5>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center", // ✅ ensures vertical centering
                gap: "20px",
              }}
            >
              <a
                href="https://www.amazon.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src="/amazon.png"
                  alt="Amazon"
                  style={{
                    width: "32px", // match size with icons
                    height: "32px",
                    objectFit: "contain",
                    verticalAlign: "middle",
                    marginTop: "10px", // ✅ aligns inline with icons
                  }}
                />
              </a>

              <a
                href="https://www.instagram.com/blackburn_enterprise?igsh=MW5pNWw2a294MmprbA%3D%3D&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#e1306c", fontSize: "32px" }} // ✅ match image size
              >
                <FaInstagram />
              </a>

              <a
                href="https://www.facebook.com/share/19Z1E82Lqs/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#1877f2", fontSize: "32px" }} // ✅ match image size
              >
                <FaFacebook />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <hr style={{ borderColor: "#444" }} />
        <div
          className="text-center"
          style={{ fontSize: "14px", color: "#aaa" }}
        >
          © {new Date().getFullYear()} Blackburn Enterprise | All Rights
          Reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;
