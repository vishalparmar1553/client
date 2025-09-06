import React from "react";
import Layout from "./../components/Layout/Layout";
import { FaBullseye, FaLightbulb } from "react-icons/fa";

const About = () => {
  return (
    <Layout title={"About Us - Ecommer App"}>
      <div className="container my-5">
        <div className="row align-items-center">
          {/* Image Section */}
          <div className="col-md-6 mb-4">
            <img
              src="/logo.png"
              alt="About Blackburn Enterprise"
              className="img-fluid rounded"
            />
          </div>

          {/* Content Section */}
          <div className="col-md-6">
            <h2 className="fw-bold mb-3" style={{ color: "#f5941d" }}>
              Welcome to Blackburn Enterprise
            </h2>
            <p className="text-muted">
              At <strong>Blackburn Enterprise</strong>, we are dedicated to
              enhancing everyday living through high-quality and innovative
              products. From promoting oral hygiene with our{" "}
              <b>Tongue Cleaner</b> to simplifying organization with our{" "}
              <b>Velcro Hook & Loop</b> solutions, we design products that
              combine functionality, durability, and customer satisfaction.
            </p>
            <p className="text-muted">
              We believe in creating solutions that make life healthier,
              cleaner, and more convenient. With a commitment to excellence and
              sustainability, our goal is to deliver products that not only
              serve today’s needs but also contribute to a better tomorrow.
            </p>
          </div>
        </div>

        {/* Vision & Mission Section */}
        <div className="row mt-5">
          <div className="col-md-6 mb-4">
            <div className="card shadow border-0 h-100 hover-shadow">
              <div className="card-body text-center">
                <FaBullseye size={40} className="text-primary mb-3" />
                <h4 className="fw-bold">Our Vision</h4>
                <p className="text-muted">
                  To be recognized as a global leader in providing innovative,
                  reliable, and eco-conscious lifestyle solutions that improve
                  the way people live, work, and stay organized.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-4">
            <div className="card shadow border-0 h-100 hover-shadow">
              <div className="card-body text-center">
                <FaLightbulb size={40} className="text-warning mb-3" />
                <h4 className="fw-bold">Our Mission</h4>
                <p className="text-muted">
                  To develop and deliver premium-quality products that promote
                  health, hygiene, and convenience. To innovate continuously,
                  adapting to the evolving lifestyles of our customers. To
                  integrate sustainability into our processes and product
                  designs. To build lasting trust with our customers through
                  integrity, service, and excellence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
