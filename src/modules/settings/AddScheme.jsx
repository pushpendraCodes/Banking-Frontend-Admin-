import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddScheme = () => {
  const [formData, setFormData] = useState({
    name: "",
    logo: null,
    desc: "",
    pdf: null
  });
  const [previews, setPreviews] = useState({
    logo: null,
    pdf: null
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
const token = localStorage.getItem("token")
  const Navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    
    if (file) {
      setFormData(prev => ({
        ...prev,
        [name]: file
      }));

      // Create preview for logo
      if (name === 'logo' && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setPreviews(prev => ({
            ...prev,
            logo: e.target.result
          }));
        };
        reader.readAsDataURL(file);
      } else if (name === 'pdf') {
        setPreviews(prev => ({
          ...prev,
          pdf: file.name
        }));
      }

      // Clear error when file is selected
      if (errors[name]) {
        setErrors(prev => ({
          ...prev,
          [name]: ""
        }));
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Scheme name is required";
    }
    
    if (!formData.desc.trim()) {
      newErrors.desc = "Description is required";
    }
    
    if (formData.logo && !formData.logo.type.startsWith('image/')) {
      newErrors.logo = "Please select a valid image file";
    }
    
    if (formData.pdf && formData.pdf.type !== 'application/pdf') {
      newErrors.pdf = "Please select a valid PDF file";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    
    try {
      // Create FormData for file upload
      const uploadData = new FormData();
      uploadData.append('name', formData.name);
      uploadData.append('desc', formData.desc);
      
      if (formData.logo) {
        uploadData.append('logo', formData.logo);
      }
      
      if (formData.pdf) {
        uploadData.append('pdf', formData.pdf);
      }

      // Mock API call - replace with actual endpoint
      console.log("Submitting scheme data:", {
        name: formData.name,
        desc: formData.desc,
        logo: formData.logo?.name,
        pdf: formData.pdf?.name
      });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Original axios code (uncomment when using real API):
      const response = await axios.post(`${import.meta.env.VITE_API_URL}admin/schemes/add`, uploadData, {
        headers: {
          'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}`
        }
      });
      if (response.data.success) {
        alert("Scheme added successfully!");
        Navigate(-1)
        // Navigate back to schemes list or reset form
      } else {
        alert(response.data.message || "Failed to add scheme");
      }
      
    //   alert("Scheme added successfully!");
      // Reset form
      setFormData({
        name: "",
        logo: null,
        desc: "",
        pdf: null
      });
      setPreviews({
        logo: null,
        pdf: null
      });
      
      // Reset file inputs
      const fileInputs = document.querySelectorAll('input[type="file"]');
      fileInputs.forEach(input => input.value = '');
      
    } catch (error) {
      console.error("Error adding scheme:", error);
      alert("Something went wrong while adding the scheme.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    // Add your navigation logic here
    console.log("Navigate back to schemes list");
    Navigate(-1)
  };

  return (
    <div className="min-h-screen bg-[#faf7f3] p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-6">
          <button
            onClick={handleGoBack}
            className="flex items-center text-red-600 hover:text-red-700 mr-4"
          >
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          <h1 className="text-2xl font-bold text-red-600">Add New Scheme</h1>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
          <div className="space-y-6">
            {/* Scheme Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Scheme Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 ${
                  errors.name ? "border-red-300" : "border-gray-300"
                }`}
                placeholder="Enter scheme name"
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>

            {/* Logo Upload */}
            <div>
              <label htmlFor="logo" className="block text-sm font-medium text-gray-700 mb-2">
                Logo Image
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-red-400 transition">
                <div className="space-y-1 text-center">
                  {previews.logo ? (
                    <div className="mb-4">
                      <img 
                        src={previews.logo} 
                        alt="Logo preview" 
                        className="mx-auto h-20 w-20 object-contain rounded"
                      />
                      <p className="text-sm text-gray-500 mt-2">{formData.logo?.name}</p>
                    </div>
                  ) : (
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="logo"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-red-600 hover:text-red-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-red-500"
                    >
                      <span>{previews.logo ? 'Change logo' : 'Upload logo'}</span>
                      <input
                        id="logo"
                        name="logo"
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        onChange={handleFileChange}
                      />
                    </label>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
              {errors.logo && <p className="mt-1 text-sm text-red-600">{errors.logo}</p>}
            </div>

            {/* Description */}
            <div>
              <label htmlFor="desc" className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                id="desc"
                name="desc"
                value={formData.desc}
                onChange={handleInputChange}
                rows="4"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-vertical ${
                  errors.desc ? "border-red-300" : "border-gray-300"
                }`}
                placeholder="Enter scheme description"
              />
              {errors.desc && <p className="mt-1 text-sm text-red-600">{errors.desc}</p>}
              <p className="mt-1 text-sm text-gray-500">{formData.desc.length} characters</p>
            </div>

            {/* PDF Upload */}
            <div>
              <label htmlFor="pdf" className="block text-sm font-medium text-gray-700 mb-2">
                PDF Document
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-red-400 transition">
                <div className="space-y-1 text-center">
                  {previews.pdf ? (
                    <div className="mb-4">
                      <svg className="mx-auto h-12 w-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 48 48">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10m0 0v-4a2 2 0 012-2h8a2 2 0 012 2v4m-10 0v10a2 2 0 002 2h8a2 2 0 002-2V21m-10 0H7a2 2 0 00-2 2v10a2 2 0 002 2h3m4-12h8m0 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v8" />
                      </svg>
                      <p className="text-sm text-gray-900 font-medium">{previews.pdf}</p>
                      <p className="text-xs text-gray-500">PDF file selected</p>
                    </div>
                  ) : (
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                    >
                      <path
                        d="M8 14v20c0 4.418 7.163 8 16 8 1.381 0 2.721-.087 4-.252M8 14c0 4.418 7.163 8 16 8s16-3.582 16-8M8 14c0-4.418 7.163-8 16-8s16 3.582 16 8m0 0v14m-16-8l4 4m0 0l4-4m-4 4V14"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="pdf"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-red-600 hover:text-red-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-red-500"
                    >
                      <span>{previews.pdf ? 'Change PDF' : 'Upload PDF'}</span>
                      <input
                        id="pdf"
                        name="pdf"
                        type="file"
                        accept=".pdf"
                        className="sr-only"
                        onChange={handleFileChange}
                      />
                    </label>
                  </div>
                  <p className="text-xs text-gray-500">PDF up to 10MB</p>
                </div>
              </div>
              {errors.pdf && <p className="mt-1 text-sm text-red-600">{errors.pdf}</p>}
            </div>

            {/* Form Actions */}
            <div className="flex items-center justify-between pt-4">
              <button
                type="button"
                onClick={handleGoBack}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className={`px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition flex items-center ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {loading && (
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                )}
                {loading ? "Adding..." : "Add Scheme"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddScheme;