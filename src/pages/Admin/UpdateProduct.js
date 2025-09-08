import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "./../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select, Spin, Card, Button, Input, Typography, Divider } from "antd";
import {
  UploadOutlined,
  SaveOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";

// CKEditor
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

// Formik + Yup
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// Image compression
import imageCompression from "browser-image-compression";

const { Option } = Select;
const { Title } = Typography;

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [photo, setPhoto] = useState("");
  const [id, setId] = useState("");
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
    shipping: Yup.string().required("Shipping is required"),
  });

  // get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      if (data?.success) setCategories(data.category);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // get single product
  const [initialValues, setInitialValues] = useState(null);

  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`
      );
      setId(data.product._id);
      setInitialValues({
        name: data.product.name || "",
        description: data.product.description || "",
        price: data.product.price || "",
        quantity: data.product.quantity || "",
        category: data.product.category?._id || "",
        shipping: data.product.shipping ? "1" : "0",
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleProduct();
    // eslint-disable-next-line
  }, []);

  // handle photo change with compression
  const handlePhotoChange = async (file) => {
    if (!file) return;
    try {
      let compressedFile = file;
      if (file.size > 1024 * 1024) {
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1024,
          useWebWorker: true,
        };
        compressedFile = await imageCompression(file, options);
      }
      setPhoto(compressedFile);
    } catch (error) {
      console.log(error);
      toast.error("Image compression failed");
    }
  };

  // update product
  const handleUpdate = async (values) => {
    try {
      setLoading(true);
      const productData = new FormData();
      productData.append("name", values.name);
      productData.append("description", values.description);
      productData.append("price", values.price);
      productData.append("quantity", values.quantity);
      if (photo) productData.append("photo", photo);
      productData.append("category", values.category);
      productData.append("shipping", values.shipping);

      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/product/update-product/${id}`,
        productData
      );

      if (!data?.success) toast.error(data?.message);
      else {
        toast.success("Product Updated Successfully");
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // delete product
  const handleDelete = async () => {
    try {
      let answer = window.confirm(
        "Are you sure you want to delete this product?"
      );
      if (!answer) return;
      setLoading(true);
      await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/product/delete-product/${id}`
      );
      toast.success("Product Deleted Successfully");
      navigate("/dashboard/admin/products");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title={"Dashboard - Update Product"}>
      <div className="container-fluid p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <Card
              title={<Title level={3}>Update Product</Title>}
              bordered={false}
              className="shadow-sm"
            >
              {initialValues ? (
                <Formik
                  initialValues={initialValues}
                  enableReinitialize
                  validationSchema={validationSchema}
                  onSubmit={handleUpdate}
                >
                  {({ setFieldValue, values }) => (
                    <Form>
                      {/* Category */}
                      <Select
                        placeholder="Select a category"
                        size="large"
                        className="w-100 mb-3"
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
                        className="text-danger mb-2"
                      />

                      {/* Photo Upload */}
                      <div className="mb-3">
                        <Button
                          icon={<UploadOutlined />}
                          onClick={() =>
                            document.getElementById("photo-input").click()
                          }
                        >
                          Upload New Photo
                        </Button>
                        <input
                          type="file"
                          id="photo-input"
                          accept="image/*"
                          style={{ display: "none" }}
                          onChange={(e) => handlePhotoChange(e.target.files[0])}
                        />
                      </div>
                      <div className="text-center my-3">
                        <img
                          src={
                            photo
                              ? URL.createObjectURL(photo)
                              : `${process.env.REACT_APP_API}/api/v1/product/product-photo/${id}`
                          }
                          alt="product_photo"
                          style={{
                            maxHeight: "180px",
                            maxWidth: "100%",
                            borderRadius: "8px",
                            objectFit: "contain",
                          }}
                        />
                      </div>

                      {/* Name */}
                      <Field
                        as={Input}
                        name="name"
                        placeholder="Product name"
                        className="mb-2"
                      />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="text-danger mb-2"
                      />

                      {/* Description */}
                      <div className="mb-3">
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
                      <Field
                        as={Input}
                        type="number"
                        name="price"
                        placeholder="Price"
                        className="mb-2"
                      />
                      <ErrorMessage
                        name="price"
                        component="div"
                        className="text-danger mb-2"
                      />

                      {/* Quantity */}
                      <Field
                        as={Input}
                        type="number"
                        name="quantity"
                        placeholder="Quantity"
                        className="mb-2"
                      />
                      <ErrorMessage
                        name="quantity"
                        component="div"
                        className="text-danger mb-2"
                      />

                      {/* Shipping */}
                      <Select
                        placeholder="Select Shipping"
                        size="large"
                        className="w-100 mb-3"
                        onChange={(value) => setFieldValue("shipping", value)}
                        value={values.shipping || undefined}
                      >
                        <Option value="0">No</Option>
                        <Option value="1">Yes</Option>
                      </Select>
                      <ErrorMessage
                        name="shipping"
                        component="div"
                        className="text-danger mb-2"
                      />

                      <Divider />

                      {/* Buttons */}
                      <div className="d-flex gap-3">
                        <Button
                          type="primary"
                          htmlType="submit"
                          loading={loading}
                          icon={<SaveOutlined />}
                        >
                          Update Product
                        </Button>
                        <Button
                          danger
                          onClick={handleDelete}
                          loading={loading}
                          icon={<DeleteOutlined />}
                        >
                          Delete Product
                        </Button>
                      </div>
                    </Form>
                  )}
                </Formik>
              ) : (
                <div className="text-center">
                  <Spin size="large" />
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
