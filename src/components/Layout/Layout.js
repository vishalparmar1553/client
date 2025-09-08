import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";
import ContactPopup from "../ContactPopup";

const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <div style={{ overflowX: "hidden" }}>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
        <style>{`body { overflow-x: hidden; }`}</style>
      </Helmet>
      <Header />
      <main style={{ minHeight: "70vh", marginTop: "10px" }}>
        <Toaster />
        {children}
      </main>
      <Footer />
      <ContactPopup />
    </div>
  );
};

Layout.defaultProps = {
  title: "Ecommerce app - shop now",
  description: "mern stack project",
  keywords: "mern,react,node,mongodb",
  author: "Blackburn",
};

export default Layout;
