import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  const styles = {
    container: {
      background: "#fff",
      padding: "20px",
      borderRadius: "12px",
      boxShadow: "0 6px 18px rgba(0, 0, 0, 0.08)",
      maxWidth: "250px",
      margin: "20px auto",
      transition: "transform 0.3s",
    },
    containerHover: {
      transform: "translateY(-2px)",
    },
    title: {
      textAlign: "center",
      marginBottom: "20px",
      fontFamily: "Poppins, sans-serif",
      fontWeight: 600,
      color: "#333",
    },
    menu: {
      display: "flex",
      flexDirection: "column",
      gap: "12px",
    },
    menuItem: {
      padding: "12px 16px",
      borderRadius: "8px",
      background: "#f9f9f9",
      color: "#333",
      fontWeight: 500,
      textDecoration: "none",
      transition: "all 0.3s ease",
      boxShadow: "0 2px 6px rgba(0, 0, 0, 0.05)",
    },
    menuItemHover: {
      background: "#4f46e5",
      color: "#fff",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    },
    menuItemActive: {
      background: "#4338ca",
      color: "#fff",
    },
  };

  return (
    <div style={styles.container}>
      <h4 style={styles.title}>Admin Panel</h4>
      <div style={styles.menu}>
        <NavLink
          to="/dashboard/admin/create-category"
          style={({ isActive }) =>
            isActive
              ? { ...styles.menuItem, ...styles.menuItemActive }
              : styles.menuItem
          }
        >
          Create Category
        </NavLink>

        <NavLink
          to="/dashboard/admin/create-product"
          style={({ isActive }) =>
            isActive
              ? { ...styles.menuItem, ...styles.menuItemActive }
              : styles.menuItem
          }
        >
          Create Product
        </NavLink>

        <NavLink
          to="/dashboard/admin/products"
          style={({ isActive }) =>
            isActive
              ? { ...styles.menuItem, ...styles.menuItemActive }
              : styles.menuItem
          }
        >
          Products
        </NavLink>

        <NavLink
          to="/dashboard/admin/orders"
          style={({ isActive }) =>
            isActive
              ? { ...styles.menuItem, ...styles.menuItemActive }
              : styles.menuItem
          }
        >
          Orders
        </NavLink>

        <NavLink
          to="/dashboard/admin/users"
          style={({ isActive }) =>
            isActive
              ? { ...styles.menuItem, ...styles.menuItemActive }
              : styles.menuItem
          }
        >
          Users
        </NavLink>
      </div>
    </div>
  );
};

export default AdminMenu;
