
import React from 'react';
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

type DeleteStoreDialogProps = {
  storeName: string;
  onConfirm: () => void;
};

const DeleteStoreDialog = ({ storeName, onConfirm }: DeleteStoreDialogProps) => {
  return (
    <>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete the store
          <span className="font-medium"> {storeName}</span> and all associated data.
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

export default DeleteStoreDialog;
