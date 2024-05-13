import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import AxiosInstance from "../../Axios";
import { useParams, useNavigate } from "react-router-dom";
import DeleteCommentModal from "./DeleteModal";

const CommentReport = () => {
  const columns = [
    {
      name: "Author",
      selector: (row) => row.comment.user?.name || "Unknown",
      sortable: true,
    },
    {
      name: "Comment",
      selector: (row) => row.comment.text,
    },
    {
      name: "Reason",
      selector: (row) => row.reason,
    },
    {
      name: "",
      cell: (row) => <Button onClick={() => handleAction(row)}>Action</Button>,
    },
  ];
  

  const data = [
    {
      id: 1,
      author: "Abdi",
      comment: "Kamu terlalu kurus",
      reason: "Mengejek",
    },
    {
      id: 2,
      author: "Raehan",
      comment: "Kamu terlalu jangkung",
      reason: "Mengejek",
    },
    {
      id: 3,
      author: "Munir",
      comment: "Kamu terlalu hitam",
      reason: "Mengejek",
    },
    {
      id: 4,
      author: "Safiq",
      comment: "Kamu terlalu gemuk",
      reason: "Mengejek",
    },
    {
      id: 5,
      author: "Purno",
      comment: "Kamu terlalu jahat",
      reason: "Mengejek",
    },
  ];

  const [record, setRecord] = useState(data);
  const [comment, setComment] = useState(data);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    AxiosInstance.get("comments-report/").then((res) => {
      setRecord(res.data); 
      console.log(res.data);
      console.log(res.data);
    });
  }, []);

  function handleFilter(event) {
    const newData = record.filter((row) => {
      // Check if row.comment and event.target.value are defined and not null
      if (row.comment && event.target.value) {
        // Use String() to ensure row.comment is a string before calling toLowerCase
        return String(row.comment)
          .toLowerCase()
          .includes(String(event.target.value).toLowerCase());
      }
      return false; // Return false if either row.comment or event.target.value is undefined or null
    });
    setRecord(newData);
  }

  function handleAction(row) {
    // Implement action here
    setComment(row);
    handleDeleteClick(row);
  }

  const handleDeleteClick = (row) => {
    setShowDeleteModal(true);
  };

  const navigate = useNavigate();

  const handleConfirmDelete = () => {
    AxiosInstance.delete(`comments/delete/${comment.id}/`)
      .then(() => {
        navigate(`/admin/comment-report/`); // Navigate back to the trip detail page after successful deletion
      })
      .catch((error) => {
        console.error("Error deleting trip:", error);
      });
    setShowDeleteModal(false);
  };

  return (
    <div className="container mt-5">
      <div className="text-end">
        <input
          className="border-2 rounded-lg border-black"
          type="text"
          onChange={handleFilter}
        />
      </div>
      <DataTable columns={columns} data={record} fixedHeader pagination />
      <DeleteCommentModal
        open={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        comment={comment}
      />
    </div>
  );
};

export default CommentReport;
