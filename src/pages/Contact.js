import React from "react";
import Layout from "./../components/Layout/Layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";
import { FaWhatsapp } from "react-icons/fa";

const Contact = () => {
  return (
    <Layout title={"Contact Us"}>
      <div className="container my-5">
        <div className="row align-items-center">
          {/* Image Section */}
          <div className="col-md-6 mb-4">
            <img
              src="/images/contactus.jpeg"
              alt="contactus"
              className="img-fluid rounded shadow"
            />
          </div>

          {/* Contact Info Section */}
          <div className="col-md-6">
            <h2 className="fw-bold text-center text-primary mb-4">
              Get in Touch
            </h2>
            <p className="text-muted text-center mb-4">
              Have a question or need help? We’re available 24/7 — feel free to
              reach out to us through any of the options below.
            </p>

            <div className="row g-4">
              {/* Email */}
              <div className="col-md-6">
                <div className="card shadow border-0 h-100 text-center p-3 hover-shadow">
                  <div className="card-body">
                    <BiMailSend size={40} className="text-danger mb-3" />
                    <h5 className="fw-bold">Email</h5>
                    <p style={{ margin: 0, color: "#ccc" }}>
                      <a
                        href="mailto:info@blackburnenterprise.com"
                        style={{ color: "#2b2929ff", textDecoration: "none" }}
                      >
                        ✉️ info@blackburnenterprise.com
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="col-md-6">
                <div className="card shadow border-0 h-100 text-center p-3 hover-shadow">
                  <div className="card-body">
                    <BiPhoneCall size={40} className="text-primary mb-3" />
                    <h5 className="fw-bold">Call Us</h5>
                    <p className="text-muted">+91 96646 50340</p>
                  </div>
                </div>
              </div>

              {/* WhatsApp Support */}
              <div className="col-md-6">
                <a
                  href="https://wa.me/917984950340"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none" }}
                >
                  <div className="card shadow border-0 h-100 text-center p-3 hover-shadow">
                    <div className="card-body">
                      <FaWhatsapp size={40} className="text-success mb-3" />
                      <h5 className="fw-bold">WhatsApp Support</h5>
                      <p className="text-muted">+91 79849 50340</p>
                    </div>
                  </div>
                </a>
              </div>

              {/* Customer Care */}
              <div className="col-md-6">
                <div className="card shadow border-0 h-100 text-center p-3 hover-shadow">
                  <div className="card-body">
                    <BiSupport size={40} className="text-warning mb-3" />
                    <h5 className="fw-bold">Customer Care</h5>
                    <p className="text-muted">24x7 Available</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
