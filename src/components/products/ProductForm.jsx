import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { addProductThunk } from "../../store/productSlice";
import { toast } from "react-toastify";

// Preset category options
const CATEGORY_OPTIONS = ["Laptop", "Desktop", "Mobile", "Accessories"];
const STATUS_OPTIONS = ["active", "inactive"];

// Cloudinary config (replace with your own)
const CLOUDINARY_UPLOAD_PRESET = "my_product_images"; // or your unsigned preset
const CLOUDINARY_CLOUD_NAME = "djfvqd23n";
const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;
// const CLOUDINARY_URL = `cloudinary://333756586916113:I5ViJBkeTLh_DGCUyFTDeMBiD-Q@djfvqd23n`


// Validation Schema
const schema = yup.object().shape({
  name: yup.string().required("Product name is required"),
  price: yup
    .number()
    .typeError("Price must be a number")
    .positive("Price must be greater than 0")
    .required("Price is required"),
  description: yup.string().required("Description is required"),
  category: yup.string().required("Category is required"),
});

const ProductForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const dispatch = useDispatch();

  const onImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
    }
  };

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    const res = await fetch(CLOUDINARY_URL, {
      method: "POST",
      body: formData,
    });
    if (!res.ok) throw new Error("Cloudinary upload failed");
    const data = await res.json();
    return data.secure_url;
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      let imageUrlCloudinary = "";
      if (imageFile) {
        // 1. Upload to Cloudinary
        imageUrlCloudinary = await uploadToCloudinary(imageFile);
        // 2. Upload to Firebase
        console.log("imageFile", imageFile);
      }
      const productData = {
        name: data.name,
        price: parseFloat(data.price),
        description: data.description,
        category: data.category,
        status: data.status || "active",
        createdAt: new Date(),
        imageUrlCloudinary,
      };

      await dispatch(addProductThunk(productData)).unwrap();
      toast.success("Product added!");
      reset();
      setImageFile(null);
      setImagePreview(null);
    } catch (e) {
      toast.error(`Failed to add product: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="p-3 border rounded shadow-sm bg-white" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-2">
        <input
          {...register("name")}
          placeholder="Product Name"
          className="form-control"
        />
        {errors.name && <small className="text-danger">{errors.name.message}</small>}
      </div>

      <div className="mb-2">
        <input
          {...register("price")}
          placeholder="Price"
          type="number"
          className="form-control"
        />
        {errors.price && <small className="text-danger">{errors.price.message}</small>}
      </div>

      <div className="mb-2">
        <input
          {...register("description")}
          placeholder="Description"
          className="form-control"
        />
        {errors.description && <small className="text-danger">{errors.description.message}</small>}
      </div>

      <div className="mb-2">
        <select {...register("category")} className="form-control" defaultValue="">
          <option value="" disabled>
            Select Category
          </option>
          {CATEGORY_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {errors.category && <small className="text-danger">{errors.category.message}</small>}
      </div>

      <div className="mb-2">
        <select {...register("status")} className="form-control" defaultValue="">
          <option value="" disabled>
            Select Status
          </option>
          {STATUS_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      {/* Image upload */}
      <div className="mb-2">
        <input
          type="file"
          accept="image/*"
          className="form-control"
          onChange={onImageChange}
        />
        {imagePreview && (
          <div className="mt-2 text-center">
            <img src={imagePreview} alt="Preview" style={{ maxHeight: 150, objectFit: 'contain' }} />
          </div>
        )}
      </div>

      <button className="btn btn-success w-100" type="submit" disabled={loading}>
        {loading ? "Uploading..." : "Add Product"}
      </button>
    </form>
  );
};

export default ProductForm;
