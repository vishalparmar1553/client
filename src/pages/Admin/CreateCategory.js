import React, { useEffect, useState } from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "./../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Modal, Spin } from "antd";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);

  // Validation schema
  const categorySchema = Yup.object({
    name: Yup.string()
      .min(2, "Category name must be at least 2 characters")
      .required("Category name is required"),
  });

  // Get all categories
  const getAllCategory = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      if (data?.success) setCategories(data?.category);
    } catch (error) {
      toast.error("Error fetching categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // Create category
  const handleCreate = async (values, { resetForm }) => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/category/create-category`,
        values
      );
      if (data?.success) {
        toast.success(`${values.name} created successfully`);
        resetForm();
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong while creating");
    } finally {
      setLoading(false);
    }
  };

  // Update category
  const handleUpdate = async (values) => {
    try {
      setLoading(true);
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/category/update-category/${selected._id}`,
        values
      );
      if (data?.success) {
        toast.success(`${values.name} updated successfully`);
        setSelected(null);
        setVisible(false);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong while updating");
    } finally {
      setLoading(false);
    }
  };

  // Delete category
  const handleDelete = async (pId) => {
    try {
      setLoading(true);
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/category/delete-category/${pId}`
      );
      if (data.success) {
        toast.success("Category deleted successfully");
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error deleting category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title={"Dashboard - Create Category"}>
      <div className="container-fluid p-4 dashboard">
        <div className="row">
          {/* Sidebar */}
          <div className="col-md-3 mb-3">
            <AdminMenu />
          </div>

          {/* Main Content */}
          <div className="col-md-9">
            <div className="card shadow-lg border-0 rounded-3 p-4">
              <h2 className="mb-4 text-primary fw-bold">Manage Categories</h2>

              {/* Create Category Form */}
              <Formik
                initialValues={{ name: "" }}
                validationSchema={categorySchema}
                onSubmit={handleCreate}
              >
                {({ isSubmitting }) => (
                  <Form className="d-flex flex-column flex-md-row gap-3 mb-4">
                    <div className="flex-grow-1">
                      <Field
                        name="name"
                        placeholder="Enter new category"
                        className="form-control form-control-lg rounded-3 shadow-sm"
                      />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="text-danger small mt-1"
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn btn-success btn-lg rounded-3 shadow-sm"
                      disabled={isSubmitting || loading}
                    >
                      {loading ? <Spin size="small" /> : "Add Category"}
                    </button>
                  </Form>
                )}
              </Formik>

              {/* Category List */}
              <div className="table-responsive">
                <table className="table table-hover align-middle shadow-sm">
                  <thead className="table-dark">
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col" className="text-center">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories?.map((c) => (
                      <tr key={c._id}>
                        <td>{c.name}</td>
                        <td className="text-center">
                          <button
                            className="btn btn-primary btn-sm me-2"
                            onClick={() => {
                              setVisible(true);
                              setSelected(c);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDelete(c._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Edit Modal */}
              <Modal
                open={visible}
                onCancel={() => setVisible(false)}
                footer={null}
                centered
              >
                <h5 className="mb-3">Update Category</h5>
                <Formik
                  initialValues={{ name: selected?.name || "" }}
                  validationSchema={categorySchema}
                  enableReinitialize
                  onSubmit={handleUpdate}
                >
                  {({ isSubmitting }) => (
                    <Form className="d-flex flex-column gap-3">
                      <Field
                        name="name"
                        placeholder="Enter category name"
                        className="form-control form-control-lg rounded-3 shadow-sm"
                      />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="text-danger small"
                      />
                      <div className="d-flex justify-content-end">
                        <button
                          type="submit"
                          className="btn btn-primary rounded-3"
                          disabled={isSubmitting || loading}
                        >
                          {loading ? <Spin size="small" /> : "Update"}
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
