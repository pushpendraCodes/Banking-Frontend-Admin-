import React, { useState, useEffect, useRef } from "react";
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom";

const EditScheme = () => {
  const { id } = useParams()
  const [formData, setFormData] = useState({
    name: "",
    logo: null,
    desc: "",
    pdf: null
  });
  const [currentFiles, setCurrentFiles] = useState({
    logo: null,
    pdf: null
  });
  const [previews, setPreviews] = useState({
    logo: null,
    pdf: null
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
const token = localStorage.getItem("token")
  const logoInputRef = useRef(null);
  const pdfInputRef = useRef(null);

  const Navigate = useNavigate()

  // Fetch existing scheme data
  useEffect(() => {
    const fetchScheme = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}admin/schemes/get/${id}`);
        const scheme = response.data.data;

        setFormData({
          name: scheme.name,
          logo: null,
          desc: scheme.desc,
          pdf: null
        });

        setCurrentFiles({
          logo: scheme.logo,
          pdf: scheme.pdf
        });

        setPreviews({
          logo: scheme.logo,
          pdf: scheme.pdf ? extractFilename(scheme.pdf) : null
        });

        setLoading(false);
      } catch (error) {
        console.error("Error fetching scheme:", error);
        alert("Failed to load scheme data");
        setLoading(false);
      }
    };

    fetchScheme();
  }, [id]);

  const extractFilename = (url) => {
    if (!url) return null;
    const parts = url.split('/');
    return parts[parts.length - 1];
  };

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
        // For PDF, we just show the filename
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

  const handleRemoveFile = (fieldName) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: null
    }));

    if (fieldName === 'logo') {
      setPreviews(prev => ({
        ...prev,
        logo: currentFiles.logo // Revert to original
      }));
    } else if (fieldName === 'pdf') {
      setPreviews(prev => ({
        ...prev,
        pdf: currentFiles.pdf ? extractFilename(currentFiles.pdf) : null
      }));
    }

    // Reset file input
    const fileInput = document.getElementById(fieldName);
    if (fileInput) fileInput.value = '';
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

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setSaving(true);

    try {
      // Create FormData for file upload
      const uploadData = new FormData();
      uploadData.append('name', formData.name);
      uploadData.append('desc', formData.desc);

      // Only append files that were newly selected
      if (formData.logo) {
        uploadData.append('logo', formData.logo);
      }

      if (formData.pdf) {
        uploadData.append('pdf', formData.pdf);
      }

      // Mock API call - replace with actual endpoint
      console.log("Updating scheme data:", {
        name: formData.name,
        desc: formData.desc,
        newLogo: formData.logo?.name,
        newPdf: formData.pdf?.name,
        keepCurrentLogo: !formData.logo,
        keepCurrentPdf: !formData.pdf
      });

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      const response = await axios.put(`${import.meta.env.VITE_API_URL}admin/schemes/update/${id}`, uploadData, {
        headers: {
          'Content-Type': 'multipart/form-data',Authorization: `Bearer ${token}`
        }
      });
      if (response.data.success) {
        alert("Scheme added successfully!");
        Navigate(-1)
        // Navigate back to schemes list or reset form
      } else {
        alert(response.data.message || "Failed to upadate scheme");
      }

      // alert("Scheme updated successfully!");

    } catch (error) {
      console.error("Error updating scheme:", error);
      alert("Something went wrong while updating the scheme.");
    } finally {
      setSaving(false);
    }
  };

  const handleGoBack = () => {
    // Add your navigation logic here
    console.log("Navigate back to schemes list");
    window.history.back();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500 animate-pulse">Loading scheme data...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf7f3] p-8">
      <div className=" mx-auto">
        {/* Header */}
        <div className="flex items-center p-3 text-white bg-[#dc5212] mb-6">
          <button
            onClick={handleGoBack}
            className="flex items-center  hover:text-red-700 mr-4"
          >
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          <h1 className="text-2xl font-bold ">Edit Scheme</h1>
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
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 ${errors.name ? "border-red-300" : "border-gray-300"
                  }`}
                placeholder="Enter scheme name"
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>

            {/* Logo Upload */}
           {/* New Logo Upload Area */}
<div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-red-400 transition">
  <div className="space-y-1 text-center">
    {previews.logo && formData.logo ? (
      <div className="mb-4">
        <img
          src={previews.logo}
          alt="New logo preview"
          className="mx-auto h-20 w-20 object-contain rounded"
        />
        <p className="text-sm text-gray-500 mt-2">{formData.logo?.name}</p>
        <button
          type="button"
          onClick={() => handleRemoveFile("logo")}
          className="mt-2 text-sm text-red-600 hover:text-red-700"
        >
          Remove new logo
        </button>
      </div>
    ) : (
      <label className="flex flex-col items-center cursor-pointer">
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
        <span className="mt-2 text-sm text-gray-500">Upload Logo</span>
        <input
          id="logo"
          name="logo"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>
    )}
  </div>
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
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-vertical ${errors.desc ? "border-red-300" : "border-gray-300"
                  }`}
                placeholder="Enter scheme description"
              />
              {errors.desc && <p className="mt-1 text-sm text-red-600">{errors.desc}</p>}
              <p className="mt-1 text-sm text-gray-500">{formData.desc.length} characters</p>
            </div>

            {/* PDF Upload */}
           {/* New PDF Upload Area */}
<div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-red-400 transition">
  <div className="space-y-1 text-center">
    {previews.pdf && formData.pdf ? (
      <div className="mb-4">
        <svg className="mx-auto h-12 w-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 48 48">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 21h10m0 0v-4a2 2 0 012-2h8a2 2 0 012 2v4m-10 0v10a2 2 0 002 2h8a2 2 0 002-2V21m-10 0H7a2 2 0 00-2 2v10a2 2 0 002 2h3m4-12h8m0 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v8"
          />
        </svg>
        <p className="text-sm text-gray-900 font-medium">{previews.pdf}</p>
        <button
          type="button"
          onClick={() => handleRemoveFile("pdf")}
          className="mt-2 text-sm text-red-600 hover:text-red-700"
        >
          Remove new PDF
        </button>
      </div>
    ) : (
      <label className="flex flex-col items-center cursor-pointer">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          stroke="currentColor"
          fill="none"
          viewBox="0 0 48 48"
        >
          <path
            d="M8 14v20c0 4.418 7.163 8 16 8s16-3.582 16-8M8 14c0-4.418 7.163-8 16-8s16 3.582 16 8"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="mt-2 text-sm text-gray-500">Upload PDF</span>
        <input
          id="pdf"
          name="pdf"
          type="file"
          accept=".pdf"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>
    )}
  </div>
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
                disabled={saving}
                className={`px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition flex items-center ${saving ? "opacity-50 cursor-not-allowed" : ""
                  }`}
              >
                {saving && (
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                )}
                {saving ? "Updating..." : "Update Scheme"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditScheme;