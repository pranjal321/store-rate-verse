
import React from 'react';
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

type DeleteUserDialogProps = {
  userName: string;
  onConfirm: () => void;
};

const DeleteUserDialog = ({ userName, onConfirm }: DeleteUserDialogProps) => {
  return (
    <>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete the user
          <span className="font-medium"> {userName}</span> and all associated data.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={onConfirm} className="bg-red-600 hover:bg-red-700">
          Delete
        </AlertDialogAction>
      </AlertDialogFooter>
    </>
  );
};

export default DeleteUserDialog;
