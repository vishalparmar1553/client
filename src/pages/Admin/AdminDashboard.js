import React from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import { useAuth } from "../../context/auth";

const AdminDashboard = () => {
  const [auth] = useAuth();

  return (
    <Layout>
      <div className="container-fluid py-4 dashboard">
        <div className="row">
          {/* Sidebar */}
          <div className="col-lg-3 mb-4">
            <AdminMenu />
          </div>

          {/* Main Content */}
          <div className="col-lg-9">
            <div className="card shadow-sm border-0 rounded-4 p-4">
              <h2 className="mb-3">Admin Profile</h2>
              <div className="row g-3">
                <div className="col-md-4">
                  <div className="profile-card p-3 text-center border rounded-3 shadow-sm">
                    <h5 className="fw-bold">{auth?.user?.name}</h5>
                    <p className="text-muted mb-0">
                      {auth?.user?.role ? "Admin" : "User"}
                    </p>
                  </div>
                </div>

                <div className="col-md-8 d-flex flex-column justify-content-center">
                  <div className="mb-2">
                    <strong>Email: </strong>
                    <span className="text-secondary">{auth?.user?.email}</span>
                  </div>
                  <div className="mb-2">
                    <strong>Contact: </strong>
                    <span className="text-secondary">{auth?.user?.phone}</span>
                  </div>
                  <div className="mt-3">
                    <button className="btn btn-primary me-2">
                      Edit Profile
                    </button>
                    <button className="btn btn-outline-secondary">
                      Settings
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional cards */}
            <div className="row mt-4 g-3">
              <div className="col-md-6">
                <div className="card shadow-sm rounded-4 p-3 text-center">
                  <h5>Total Users</h5>
                  <h2>150</h2>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card shadow-sm rounded-4 p-3 text-center">
                  <h5>Active Orders</h5>
                  <h2>25</h2>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          .profile-card {
            background: #f8f9fa;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          .profile-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
          }
        `}</style>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
