import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { Link, useNavigate } from "react-router-dom";
import AxiosInstance from "../../Axios";

const DeleteCommentModal = ({ open, handleClose,  comment }) => {
  const navigate = useNavigate();

  const handleConfirmDelete = () => {
    AxiosInstance.delete(`comments-report/${comment.id}/`)
      .then(() => {
        navigate(`/admin/comment-report/`); // Navigate back to the trip detail page after successful deletion
      })
      .catch((error) => {
        console.error("Error deleting trip:", error);
      });

      AxiosInstance.delete(`comments/${comment.comment.id}/`);
      handleClose()

  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Confirm Action</DialogTitle>
      <DialogContent>
        <div>{comment.user}</div>
        <div>{comment.text}</div>
        <div>{comment.reason}</div>
        What do you want to do about this report
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose}>Close</Button>
        <Button onClick={handleConfirmDelete} color="error">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteCommentModal;
