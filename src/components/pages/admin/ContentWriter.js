import { Button } from "@mui/material";
import React from "react";
import CWlist from "./CWList";
import { useNavigate } from "react-router-dom";

const ContentWriter = () => {
  const navigate = useNavigate()

  const handleRegistrationModalOpen = () => {
    navigate('/admin/content-writer/signup');
  };

  return (
    <div>
      <div class="w-full flex items-start justify-start" style={{ paddingBottom: "15px" }}>
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg" onClick={() => navigate(`/manage-access`)}> Back </button>
      </div>
      <h1 className="text-blue-600 text-5xl">Content Writer Register</h1>
      <div className="border-gray-400 rounded-2xl bg-slate-300 border-2 mt-3 py-5 px-10">
        {/* Button to trigger registration modal */}
        <Button onClick={handleRegistrationModalOpen} variant="contained">
          Add Account
        </Button>
      </div>
      <CWlist />
    </div>
  );
};

export default ContentWriter;
