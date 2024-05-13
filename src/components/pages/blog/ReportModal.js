import React, { useState } from 'react';
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import AxiosInstance from '../../Axios';

const ReportModal = ({ onClose, commentzz }) => {
    console.log(commentzz.id)
  const [reason, setReason] = useState('');

  const [text, setText] = useState("");
  const [content, setContent] = useState("");
  const [postDate, setPostDate] = useState(null);
  const [highlight, setHighlight] = useState(0);
  const navigate = useNavigate();

  const handleReasonChange = (event) => {
    setReason(event.target.value);
  };

  const handleSubmit = () => {
    AxiosInstance.post(`comments-report/`, {
      reason: reason,
      comment: commentzz.id
      
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg">
        <h2 className="text-lg font-bold mb-4">Report Comment</h2>
        <div className="flex flex-col">
          <label className="inline-flex items-center mb-4">
            <input
              type="radio"
              value="harassment"
              checked={reason === 'harassment'}
              onChange={handleReasonChange}
            />
            <span className="ml-2">Harassment</span>
          </label>
          <label className="inline-flex items-center mb-4">
            <input
              type="radio"
              value="user_violation"
              checked={reason === 'user_violation'}
              onChange={handleReasonChange}
            />
            <span className="ml-2">User Violation</span>
          </label>
          <label className="inline-flex items-center mb-4">
            <input
              type="radio"
              value="spam"
              checked={reason === 'spam'}
              onChange={handleReasonChange}
            />
            <span className="ml-2">Spam</span>
          </label>
        </div>
        <div className="mt-6 flex justify-end">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={handleSubmit}
          >
            Submit
          </button>
          <button
            className="px-4 py-2 ml-4 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportModal;
