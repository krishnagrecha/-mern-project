import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchProductDetails } from "../../redux/slices/productSlice";
import { updateProduct } from "../../redux/slices/adminProductSlice";
import axios from "axios";

const EditProductPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { selectedProduct, loading, error } = useSelector(
    (state) => state.products
  );
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: 0,
    countInStock: 0,
    sku: "",
    category: "",
    brand: "",
    sizes: [],
    colors: [],
    collections: "",
    material: "",
    gender: "",
    images: [],
  });

  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductDetails(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedProduct && Object.keys(selectedProduct).length > 0) {
      setProductData({
        ...selectedProduct,
        sizes: selectedProduct.sizes || [],
        colors: selectedProduct.colors || [],
        images: selectedProduct.images || [],
      });
    }
  }, [selectedProduct]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);
    try {
      setUploading(true);
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/upload`,
        formData,
        {
          headers: {
             "Content-Type": "multipart/form-data",
             Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            },
        }
      );
      if (data && data.imageUrl) {
        setProductData((prevData) => ({
          ...prevData,
          images: [...(prevData.images || []), { url: data.imageUrl, altText: "" }],
        }));
      } else {
        console.error("Image URL not found in response:", data);
      }
      setUploading(false);
    } catch (error) {
      console.error("Image upload failed:", error);
      setUploading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProduct({ id, productData }));
    navigate("/admin/products");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!productData.name && !loading && selectedProduct) {
     return <p>Initializing form...</p>;
  }


  return (
    <div className="max-w-5xl mx-auto p-6 shadow-md rounded-md bg-white">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block font-semibold mb-2 text-gray-700">Product Name</label>
          <input
            type="text"
            name="name"
            value={productData.name || ""}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block font-semibold mb-2 text-gray-700">Description</label>
          <textarea
            name="description"
            value={productData.description || ""}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={4}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
                 <label className="block font-semibold mb-2 text-gray-700">Price</label>
                <input
                    type="number"
                    name="price"
                    value={productData.price || 0}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="0"
                    step="0.01"
                />
            </div>
            <div>
                <label className="block font-semibold mb-2 text-gray-700">Count in Stock</label>
                <input
                    type="number"
                    name="countInStock"
                    value={productData.countInStock || 0}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                     min="0"
                />
            </div>
        </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
                <label className="block font-semibold mb-2 text-gray-700">SKU</label>
                <input
                  type="text"
                  name="sku"
                  value={productData.sku || ""}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
            </div>
             <div>
                <label className="block font-semibold mb-2 text-gray-700">Category</label>
                <input
                  type="text"
                  name="category"
                  value={productData.category || ""}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
            </div>
             <div>
                <label className="block font-semibold mb-2 text-gray-700">Brand</label>
                <input
                  type="text"
                  name="brand"
                  value={productData.brand || ""}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
            </div>
        </div>

        <div className="mb-6">
          <label className="block font-semibold mb-2 text-gray-700">
            Sizes (comma-separated)
          </label>
          <input
            type="text"
            name="sizes"
            value={(productData.sizes || []).join(", ")}
            onChange={(e) =>
              setProductData({
                ...productData,
                sizes: e.target.value ? e.target.value.split(",").map((size) => size.trim()) : [],
              })
            }
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="mb-6">
          <label className="block font-semibold mb-2 text-gray-700">
            Colors (comma-separated)
          </label>
          <input
            type="text"
            name="colors"
            value={(productData.colors || []).join(", ")}
            onChange={(e) =>
              setProductData({
                ...productData,
                colors: e.target.value ? e.target.value.split(",").map((color) => color.trim()) : [],
              })
            }
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
             <div>
                <label className="block font-semibold mb-2 text-gray-700">Collection</label>
                <input
                  type="text"
                  name="collections"
                  value={productData.collections || ""}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
            </div>
             <div>
                <label className="block font-semibold mb-2 text-gray-700">Material</label>
                <input
                  type="text"
                  name="material"
                  value={productData.material || ""}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
            </div>
            <div>
                <label className="block font-semibold mb-2 text-gray-700">Gender</label>
                <select
                  name="gender"
                  value={productData.gender || ""}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                >
                    <option value="">Select Gender</option>
                    <option value="Men">Men</option>
                    <option value="Women">Women</option>
                    <option value="Unisex">Unisex</option>
                </select>
            </div>
         </div>

        <div className="mb-6">
          <label className="block font-semibold mb-2 text-gray-700">Upload Image</label>
          <input
            type="file"
            onChange={handleImageUpload}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {uploading && <p className="text-blue-600 mt-2">Uploading image...</p>}

          <div className="flex flex-wrap gap-4 mt-4">
            {(productData.images || []).map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={image.url}
                  alt={image.altText || `Product Image ${index + 1}`}
                  className="w-20 h-20 object-cover rounded-md shadow-md border border-gray-200"
                />
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={uploading || loading}
          className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Updating...' : 'Update Product'}
        </button>
      </form>
    </div>
  );
};
export default EditProductPage;