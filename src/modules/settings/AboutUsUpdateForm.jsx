import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import { Navigate } from 'react-router-dom';

const AboutUsUpdateForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    desc: '',
    imageUrl: '',
    vision: '',
    values: ['']
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const Navigate = useNavigate()

  // Fetch existing data
  useEffect(() => {
    const fetchAboutUsData = async () => {
      try {
        setLoading(true);
        // Replace with your actual API endpoint
        const response = await axios.get(`${import.meta.env.VITE_API_URL}admin/get`);
        const data = response.data.data.aboutsUs;
        
        setFormData({
          title: data.title || '',
          desc: data.desc || '',
          imageUrl: data.imageUrl || '',
          vision: data.vision || '',
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

    // Check if file is an image
    if (!file.type.startsWith('image/')) {
      setMessage({ type: 'error', text: 'Please select a valid image file' });
      return;
    }

    setImageFile(file);

    // Create preview
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
    
    // Reset file input
    const fileInput = document.getElementById('imageUpload');
    if (fileInput) fileInput.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      // Create FormData for potential image upload
      const submitData = new FormData();
      submitData.append('title', formData.title);
      submitData.append('desc', formData.desc);
      submitData.append('vision', formData.vision);
      
      // Append each value individually
      formData.values.forEach((value, index) => {
        submitData.append(`values[${index}]`, value);
      });

      // If a new image was selected, append it
      if (imageFile) {
        submitData.append('aboutUsImage', imageFile);
      } else if (formData.imageUrl) {
        // Keep existing image URL if no new file was selected
        submitData.append('imageUrl', formData.imageUrl);
      }

      // Replace with your actual API endpoint
      const response = await axios.post(`${import.meta.env.VITE_API_URL}admin/aboutUs/add`, submitData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setMessage({ type: 'success', text: 'About Us updated successfully!' });
      alert("about us updated successfully ")
      Navigate(-1)
      
      // If the response contains an image URL, update our state
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
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
   
      
        <div className="">
           <button
            onClick={()=>Navigate(-1)}
            className="flex items-center text-red-600 hover:text-red-700 mr-4"
          >
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Update About Us Section</h1></div>
      
      {message.text && (
        <div className={`mb-4 p-3 rounded ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {message.text}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title Field */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
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

        {/* Description Field */}
        <div>
          <label htmlFor="desc" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="desc"
            name="desc"
            value={formData.desc}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter description"
          />
        </div>

        {/* Vision Field */}
        <div>
          <label htmlFor="vision" className="block text-sm font-medium text-gray-700 mb-1">
            Vision
          </label>
          <textarea
            id="vision"
            name="vision"
            value={formData.vision}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter vision statement"
          />
        </div>

        {/* Values Fields */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Values
          </label>
          <div className="space-y-2">
            {formData.values.map((value, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={value}
                  onChange={(e) => handleValueChange(index, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={`Value ${index + 1}`}
                />
                <button
                  type="button"
                  onClick={() => removeValueField(index)}
                  disabled={formData.values.length <= 1}
                  className="p-2 text-red-500 hover:text-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addValueField}
            className="mt-2 flex items-center text-sm text-blue-600 hover:text-blue-800"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
            </svg>
            Add another value
          </button>
        </div>

        {/* Image Upload Field */}
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
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                Remove image
              </button>
            </div>
          ) : (
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="flex text-sm text-gray-600">
                  <label htmlFor="imageUpload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none">
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
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {loading ? 'Updating...' : 'Update About Us'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AboutUsUpdateForm;