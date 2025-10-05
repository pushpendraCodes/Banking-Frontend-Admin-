import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const AboutUsUpdateForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    desc: '',
    imageUrl: '',
    vision: '',
    mission: '',
    values: ['']
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const Navigate = useNavigate();

  // Fetch existing data
  useEffect(() => {
    const fetchAboutUsData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_API_URL}admin/get`);
        const data = response.data.data.aboutsUs;

        setFormData({
          title: data.title || '',
          desc: data.desc || '',
          imageUrl: data.imageUrl || '',
          vision: data.vision || '',
          mission: data.mission || '',
          values: data.values && data.values.length > 0 ? data.values : ['']
        });

        if (data.imageUrl) {
          setImagePreview(data.imageUrl);
        }
      } catch (error) {
        setMessage({ type: 'error', text: 'Failed to load About Us data' });
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutUsData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleQuillChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleValueChange = (index, value) => {
    const newValues = [...formData.values];
    newValues[index] = value;
    setFormData(prev => ({
      ...prev,
      values: newValues
    }));
  };

  const addValueField = () => {
    setFormData(prev => ({
      ...prev,
      values: [...prev.values, '']
    }));
  };

  const removeValueField = (index) => {
    if (formData.values.length <= 1) return;

    const newValues = [...formData.values];
    newValues.splice(index, 1);
    setFormData(prev => ({
      ...prev,
      values: newValues
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setMessage({ type: 'error', text: 'Please select a valid image file' });
      return;
    }

    setImageFile(file);

    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    setImageFile(null);
    setFormData(prev => ({ ...prev, imageUrl: '' }));

    const fileInput = document.getElementById('imageUpload');
    if (fileInput) fileInput.value = '';
  };
const token = localStorage.getItem("token")
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const submitData = new FormData();
      submitData.append('title', formData.title);
      submitData.append('desc', formData.desc);
      submitData.append('vision', formData.vision);
      submitData.append('mission', formData.mission);

      formData.values.forEach((value, index) => {
        submitData.append(`values[${index}]`, value);
      });

      if (imageFile) {
        submitData.append('aboutUsImage', imageFile);
      } else if (formData.imageUrl) {
        submitData.append('imageUrl', formData.imageUrl);
      }

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}admin/aboutUs/add`,
        submitData,
        {
          headers: { 'Content-Type': 'multipart/form-data',Authorization: `Bearer ${token}` },
        }
      );

      setMessage({ type: 'success', text: 'About Us updated successfully!' });
      alert("About Us updated successfully");
      Navigate(-1);

      if (response.data.imageUrl) {
        setFormData(prev => ({ ...prev, imageUrl: response.data.imageUrl }));
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to update About Us. Please try again.' });
      console.error('Error updating data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !formData.title) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className=" mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="bg-[#dc5212] flex gap-1 p-3 items-center">
        <button
          onClick={() => Navigate(-1)}
          className="flex items-center  hover:text-red-700 mr-4"
        >
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
        <h1 className="text-2xl font-bold text-gray-800 ">Update About Us Section</h1>
      </div>

      {message.text && (
        <div
          className={`mb-4 p-3 rounded ${
            message.type === 'success'
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700'
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 p-3">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-bold text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter title"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">
            Description
          </label>
          <ReactQuill
            theme="snow"
            value={formData.desc}
            onChange={(value) => handleQuillChange('desc', value)}
          />
        </div>

        {/* Vision */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">
            Vision
          </label>
          <ReactQuill
            theme="snow"
            value={formData.vision}
            onChange={(value) => handleQuillChange('vision', value)}
          />
        </div>

        {/* Mission */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">
            Mission
          </label>
          <ReactQuill
            theme="snow"
            value={formData.mission}
            onChange={(value) => handleQuillChange('mission', value)}
          />
        </div>

        {/* Values */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">
            Values
          </label>
          <div className="space-y-4">
            {formData.values.map((value, index) => (
              <div key={index} className="flex items-start space-x-2">
                <div className="flex-1">
                  <ReactQuill
                    theme="snow"
                    value={value}
                    onChange={(val) => handleValueChange(index, val)}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeValueField(index)}
                  disabled={formData.values.length <= 1}
                  className="p-2 text-red-500 hover:text-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addValueField}
            className="mt-2 flex items-center text-sm text-blue-600 hover:text-blue-800"
          >
            ➕ Add another value
          </button>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Image
          </label>
          {imagePreview ? (
            <div className="mt-2">
              <img
                src={imagePreview}
                alt="Preview"
                className="h-40 w-auto object-contain border rounded-md"
              />
              <button
                type="button"
                onClick={removeImage}
                className="mt-2 flex items-center text-sm text-red-600 hover:text-red-800"
              >
                Remove image
              </button>
            </div>
          ) : (
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <label
                  htmlFor="imageUpload"
                  className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500"
                >
                  <span>Upload an image</span>
                  <input
                    id="imageUpload"
                    name="imageUpload"
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={handleImageChange}
                  />
                </label>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
          )}
        </div>

        {/* Submit */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Updating...' : 'Update About Us'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AboutUsUpdateForm;
