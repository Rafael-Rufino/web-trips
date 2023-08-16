import React, { useEffect, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import Loading from "@/app/loading";
import Button from "@/components/button";

interface ModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  handleDelete: () => void;
  titleModal?: string;
  cancelText?: string;
  confirmText?: string;
  confirmationLoading?: boolean;
  confirmationFeedback?: string;
}

const ConfirmationModal = ({
  open,
  setOpen,
  handleDelete,
  titleModal,
  cancelText,
  confirmText,
  confirmationLoading,
  confirmationFeedback,
}: ModalProps) => {
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteClick = async () => {
    if (confirmationLoading) {
      setLoading(true);
    }

    try {
      await handleDelete();
      setLoading(false);
      handleClose();
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
          <div className="relative w-[500px] h-[500px] bg-white rounded-lg">
            <div className="absolute top-0 right-0 p-5">
              <button onClick={handleClose}>
                <AiFillCloseCircle className="h-8 w-8 text-primary " />
              </button>
            </div>

            <div className="flex flex-col items-center justify-center h-full">
              <h1 className="text-xl font-semibold text-primaryDark">
                {titleModal}
              </h1>

              <div className="flex gap-5 mt-5">
                <Button
                  className={`px-5 ${
                    loading && "bg-red-500 disabled:opacity-80"
                  }`}
                  onClick={handleDeleteClick}
                  disabled={loading}
                >
                  {loading ? (
                    <Loading
                      borderColor="secondary"
                      label={confirmationFeedback}
                      size="small"
                    />
                  ) : (
                    confirmText
                  )}
                </Button>
                {!loading && (
                  <Button
                    className="px-5"
                    onClick={handleClose}
                    disabled={loading}
                  >
                    {cancelText}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConfirmationModal;
