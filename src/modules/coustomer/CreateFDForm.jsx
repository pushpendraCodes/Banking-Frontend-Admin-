import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function CreateFDForm() {

  const { customerId ,savingAc} = useParams()
  const [formData, setFormData] = useState({
    fdTenure: '',
    fdTenureType: 'month',
    type: '12 Month ',
    // savingAccountNo: accountNo||'',
    fdDepositAmount: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const token = localStorage.getItem("token");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const MIN_FD_AMOUNT = import.meta.env.VITE_MINIMUM_FD_AMOUNT // Minimum FD deposit amount

const validateForm = () => {
  const newErrors = {};

  if (!formData.fdTenure) {
    newErrors.fdTenure = 'FD Tenure is required';
  } else if (formData.fdTenure <= 0) {
    newErrors.fdTenure = 'FD Tenure must be greater than 0';
  }

  if (!formData.fdDepositAmount) {
    newErrors.fdDepositAmount = 'Deposit Amount is required';
  } else if (formData.fdDepositAmount <= 0) {
    newErrors.fdDepositAmount = 'Deposit amount must be greater than 0';
  } else if (formData.fdDepositAmount < MIN_FD_AMOUNT) {
    newErrors.fdDepositAmount = `Minimum deposit amount is ₹${MIN_FD_AMOUNT}`;
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};



  const Navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      console.log("Submitting FD:", formData);

      // API call to create FD
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}customer/createFD/${customerId}`,  // <-- replace with your actual endpoint
        formData,
        
 {
           headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        alert("Fixed Deposit created successfully!");
        // Reset form
        setFormData({
          fdTenure: "",
          fdTenureType: "month",
          type: "standeredRd",

          fdDepositAmount: "",
        });

        Navigate(-1)
      } else {
        alert(response.data.message || "Failed to create Fixed Deposit.");
      }
    } catch (error) {
      console.error("Error creating FD:", error);
      alert(
        error.response?.data?.message ||
        "Failed to create Fixed Deposit. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">

      <div className="mb-6 flex items-center gap-4">
        <button
          type="button"
          onClick={() => Navigate(-1)}
          className="flex items-center gap-2 px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded text-gray-700"
        >
          ← Back
        </button>
        <h2 className="text-2xl font-bold text-gray-800">Create Fixed Deposit</h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* FD Tenure */}

        <div>
          <label htmlFor="fdTenure" className="block text-sm font-medium text-gray-700 mb-2">
            FD Tenure *
          </label>
          <input
            type="number"
            id="fdTenure"
            name="fdTenure"
            value={formData.fdTenure}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.fdTenure ? 'border-red-500' : 'border-gray-300'
              }`}
            placeholder="Enter tenure (e.g., 36)"
          />
          {errors.fdTenure && (
            <p className="mt-1 text-sm text-red-600">{errors.fdTenure}</p>
          )}
        </div>

        {/* FD Tenure Type */}
        <div>
          <label htmlFor="fdTenureType" className="block text-sm font-medium text-gray-700 mb-2">
            Tenure Type *
          </label>
          <select
            id="fdTenureType"
            name="fdTenureType"
            value={formData.fdTenureType}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="month">Months</option>
            <option value="year">Years</option>
            {/* <option value="day">Days</option> */}
          </select>
        </div>

        {/* Type */}
        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
            FD Type *
          </label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="9M FD">9M FD</option>
            <option value="12M FD">12M FD</option>
            <option value="24M FD">24M FD</option>
            <option value="36M FD">36M FD</option>
            <option value="60M FD">60M FD</option>
            <option value="84M FD">84M FD</option>
          </select>
        </div>

        {/* Saving Account Number */}
        {/* <div>
          <label htmlFor="savingAccountNo" className="block text-sm font-medium text-gray-700 mb-2">
            Saving Account Number *
          </label>
          <input
            type="text"
            id="savingAccountNo"
            name="savingAccountNo"
            disabled
            value={formData.savingAccountNo}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.savingAccountNo ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter account number (e.g., 20000008)"
          />
          {errors.savingAccountNo && (
            <p className="mt-1 text-sm text-red-600">{errors.savingAccountNo}</p>
          )}
        </div> */}

        {/* FD Deposit Amount */}
        <div>
          <label htmlFor="fdDepositAmount" className="block text-sm font-medium text-gray-700 mb-2">
            Deposit Amount (₹) *
          </label>
          <input
            type="number"
            id="fdDepositAmount"
            name="fdDepositAmount"
            value={formData.fdDepositAmount}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.fdDepositAmount ? 'border-red-500' : 'border-gray-300'
              }`}
            placeholder="Enter deposit amount (e.g., 1500000)"
          />
          {errors.fdDepositAmount && (
            <p className="mt-1 text-sm text-red-600">{errors.fdDepositAmount}</p>
          )}
  

          {formData.fdDepositAmount && (
            <p className="mt-1 text-sm text-gray-500">
              Amount in words: ₹{parseInt(formData.fdDepositAmount).toLocaleString('en-IN')}
            </p>
          )}
        </div>

        {/* Submit Buttons */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`flex-1 px-6 py-3 rounded-lg font-medium transition-colors ${isSubmitting
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Creating FD...
              </div>
            ) : (
              'Create Fixed Deposit'
            )}
          </button>

          <button
            type="button"
            onClick={() => window.history.back()}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>

      {/* Preview Section */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-medium text-gray-800 mb-3">Preview</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium text-gray-600">Tenure:</span>
            <span className="ml-2">{formData.fdTenure || '-'} {formData.fdTenureType}</span>
          </div>
          <div>
            <span className="font-medium text-gray-600">Type:</span>
            <span className="ml-2">{formData.type || '-'}</span>
          </div>
          <div>
            <span className="font-medium text-gray-600">Customer Saving Ac -:</span>
            <span className="ml-2">{savingAc || '-'}</span>
          </div>
          <div>
            <span className="font-medium text-gray-600">Amount:</span>
            <span className="ml-2">₹{formData.fdDepositAmount ? parseInt(formData.fdDepositAmount).toLocaleString('en-IN') : '-'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}