import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  IconButton,
} from '@mui/material';
import { Close } from '@mui/icons-material';

interface ConfirmDeleteDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmDeleteDialog: React.FC<ConfirmDeleteDialogProps> = ({
  open,
  onClose,
  onConfirm,
}) => {
  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="delete-task-dialog">
      {/* Title Section */}
      <DialogTitle id="delete-task-dialog">
        <span>Are you sure you want to delete the selected task?</span>
        <IconButton
          aria-label="close"
          onClick={onClose}
          style={{ position: 'absolute', right: 8, top: 8 }}
        >
          <Close />
        </IconButton>
      </DialogTitle>

      {/* Content Section */}
      <DialogContent>
        <DialogContentText>
          This will permanently delete the selected task. These items will no longer be accessible to you. This action is irreversible.
        </DialogContentText>
      </DialogContent>

      {/* Actions Section */}
      <DialogActions>
        <Button onClick={onClose} variant="outlined" color="inherit">
          Cancel
        </Button>
        <Button onClick={onConfirm} variant="contained" color="error">
          Yes, delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDeleteDialog;
