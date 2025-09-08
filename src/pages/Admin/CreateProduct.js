import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "./../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select, Spin, Card } from "antd";
import { useNavigate } from "react-router-dom";

// CKEditor imports
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

// Formik + Yup
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// Image compression
import imageCompression from "browser-image-compression";

const { Option } = Select;

const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [photo, setPhoto] = useState("");
  const [loading, setLoading] = useState(false);

  // validation schema
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
    price: Yup.number()
      .typeError("Price must be a number")
      .required("Price is required"),
    quantity: Yup.number()
      .typeError("Quantity must be a number")
      .required("Quantity is required"),
    category: Yup.string().required("Category is required"),
    shipping: Yup.string().required("Shipping selection is required"),
  });

  // get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // handle photo upload and compression
  const handlePhotoChange = async (e) => {
    let file = e.target.files[0];
    if (!file) return;

    try {
      if (file.size > 1024 * 1024) {
        // compress if > 1MB
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1024,
          useWebWorker: true,
        };
        const compressedFile = await imageCompression(file, options);
        setPhoto(compressedFile);
      } else {
        setPhoto(file);
      }
    } catch (error) {
      console.log(error);
      toast.error("Image compression failed");
    }
  };

  // create product function
  const handleCreate = async (values) => {
    try {
      setLoading(true);
      const productData = new FormData();
      productData.append("name", values.name);
      productData.append("description", values.description);
      productData.append("price", values.price);
      productData.append("quantity", values.quantity);
      productData.append("photo", photo);
      productData.append("category", values.category);
      productData.append("shipping", values.shipping);

      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/create-product`,
        productData
      );

      if (!data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("✅ Product Created Successfully");
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title={"Dashboard - Create Product"}>
      <div className="container-fluid p-3 dashboard">
        <div className="row">
          {/* Sidebar */}
          <div className="col-md-3 mb-3">
            <AdminMenu />
          </div>

          {/* Main Content */}
          <div className="col-md-9">
            <Card
              title="Create Product"
              bordered={false}
              style={{
                borderRadius: "16px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
            >
              <Formik
                initialValues={{
                  name: "",
                  description: "",
                  price: "",
                  quantity: "",
                  category: "",
                  shipping: "",
                }}
                validationSchema={validationSchema}
                onSubmit={handleCreate}
              >
                {({ setFieldValue, values }) => (
                  <Form>
                    {/* Category */}
                    <label className="fw-semibold">Category</label>
                    <Select
                      bordered={true}
                      placeholder="Select a category"
                      size="large"
                      className="w-100 mb-2"
                      onChange={(value) => setFieldValue("category", value)}
                      value={values.category || undefined}
                    >
                      {categories?.map((c) => (
                        <Option key={c._id} value={c._id}>
                          {c.name}
                        </Option>
                      ))}
                    </Select>
                    <ErrorMessage
                      name="category"
                      component="div"
                      className="text-danger mb-3"
                    />

                    {/* Photo Upload */}
                    <label className="fw-semibold">Product Photo</label>
                    <div className="mb-3">
                      <label className="btn btn-outline-primary w-100">
                        {photo ? photo.name : "Upload Photo"}
                        <input
                          type="file"
                          name="photo"
                          accept="image/*"
                          onChange={handlePhotoChange}
                          hidden
                        />
                      </label>
                    </div>
                    {photo && (
                      <div className="text-center mb-3">
                        <img
                          src={URL.createObjectURL(photo)}
                          alt="product_photo"
                          className="img-fluid rounded shadow-sm"
                          style={{
                            maxHeight: "200px",
                            maxWidth: "100%",
                            objectFit: "contain",
                          }}
                        />
                      </div>
                    )}

                    {/* Name */}
                    <label className="fw-semibold">Name</label>
                    <div className="mb-3">
                      <Field
                        type="text"
                        name="name"
                        placeholder="Enter product name"
                        className="form-control"
                      />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="text-danger"
                      />
                    </div>

                    {/* Description */}
                    <label className="fw-semibold">Description</label>
                    <div className="mb-3 border rounded p-2">
                      <CKEditor
                        editor={ClassicEditor}
                        data={values.description}
                        onChange={(event, editor) => {
                          const data = editor.getData();
                          setFieldValue("description", data);
                        }}
                      />
                      <ErrorMessage
                        name="description"
                        component="div"
                        className="text-danger"
                      />
                    </div>

                    {/* Price */}
                    <label className="fw-semibold">Price (₹)</label>
                    <div className="mb-3">
                      <Field
                        type="number"
                        name="price"
                        placeholder="Enter price"
                        className="form-control"
                      />
                      <ErrorMessage
                        name="price"
                        component="div"
                        className="text-danger"
                      />
                    </div>

                    {/* Quantity */}
                    <label className="fw-semibold">Quantity</label>
                    <div className="mb-3">
                      <Field
                        type="number"
                        name="quantity"
                        placeholder="Enter quantity"
                        className="form-control"
                      />
                      <ErrorMessage
                        name="quantity"
                        component="div"
                        className="text-danger"
                      />
                    </div>

                    {/* Shipping */}
                    <label className="fw-semibold">Shipping</label>
                    <Select
                      bordered={true}
                      placeholder="Select shipping"
                      size="large"
                      className="w-100 mb-2"
                      onChange={(value) => setFieldValue("shipping", value)}
                      value={values.shipping || undefined}
                    >
                      <Option value="0">No</Option>
                      <Option value="1">Yes</Option>
                    </Select>
                    <ErrorMessage
                      name="shipping"
                      component="div"
                      className="text-danger mb-3"
                    />

                    {/* Submit */}
                    <div className="d-grid">
                      <button
                        type="submit"
                        className="btn btn-success btn-lg rounded-pill"
                        disabled={loading}
                      >
                        {loading ? <Spin size="small" /> : "✅ Create Product"}
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
