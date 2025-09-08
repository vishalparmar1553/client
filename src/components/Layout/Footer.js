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
      <div
        className="footer-container"
        style={{ maxWidth: "1200px", margin: "0 auto" }}
      >
        <div
          className="footer-row"
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            gap: "20px",
          }}
        >
          {/* Quick Links */}
          <div
            className="footer-col"
            style={{ flex: "1 1 220px", minWidth: "200px" }}
          >
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
          <div
            className="footer-col"
            style={{ flex: "1 1 220px", minWidth: "200px" }}
          >
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
              <FaWhatsapp style={{ color: "green" }} size={20} />
              <a
                href="https://wa.me/917984950340"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#ccc", textDecoration: "none" }}
              >
                +91 79849 50340 | 96646 50340
              </a>
            </p>
            <p style={{ margin: 0, color: "#ccc" }}>
              <a
                href="mailto:info@blackburnenterprise.com"
                style={{ color: "#ccc", textDecoration: "none" }}
              >
                ✉️ info@blackburnenterprise.com
              </a>
            </p>
          </div>

          {/* Social Media */}
          <div
            className="footer-col"
            style={{
              flex: "1 1 220px",
              minWidth: "200px",
              textAlign: "center",
            }}
          >
            <h5 className="fw-bold mb-3">Follow Us</h5>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "20px",
                flexWrap: "wrap",
              }}
            >
              <a
                href="https://www.instagram.com/blackburn_enterprise"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#e1306c", fontSize: "32px" }}
              >
                <FaInstagram />
              </a>
              <a
                href="https://www.facebook.com/share/19Z1E82Lqs/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#1877f2", fontSize: "32px" }}
              >
                <FaFacebook />
              </a>
            </div>
          </div>
        </div>
        {/* Also Available On */}
        <div
          className="footer-col"
          style={{
            flex: "1 1 220px",
            textAlign: "center",
            border: "1px solid white",
            borderRadius: "5px",
            padding: "5px",
          }}
        >
          <h5 className="fw-bold">Also Available On</h5>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "20px",
              flexWrap: "wrap",
              paddingBottom: "10px",
            }}
          >
            <a
              href="https://www.amazon.in"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/amazon.png" alt="Amazon" style={{ height: "40px" }} />
            </a>
            <a
              href="https://www.flipkart.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/flipkart.png"
                alt="Flipkart"
                style={{ height: "40px" }}
              />
            </a>
            <a
              href="https://www.meesho.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/meesho.png" alt="Meesho" style={{ height: "40px" }} />
            </a>
            <a
              href="https://www.indiamart.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/indiamart.png"
                alt="IndiaMart"
                style={{ height: "40px" }}
              />
            </a>
          </div>
        </div>
        {/* Divider */}
        <hr style={{ borderColor: "#444", margin: "30px 0" }} />

        {/* Copyright */}
        <div style={{ textAlign: "center", fontSize: "14px", color: "#aaa" }}>
          © {new Date().getFullYear()} Blackburn Enterprise | All Rights
          Reserved
        </div>
      </div>

      {/* Responsive styles */}
      <style>
        {`
          @media (max-width: 768px) {
            .footer-row {
              flex-direction: column;
              align-items: center;
              text-align: center;
            }
            .footer-col {
              text-align: center;
            }
          }
        `}
      </style>
    </footer>
  );
};

export default Footer;
