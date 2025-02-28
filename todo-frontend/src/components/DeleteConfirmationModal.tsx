import { ReactNode } from "react";

type DeleteConfirmationModalProps = {
  show: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  children?: ReactNode;
};

const DeleteConfirmationModal = ({
  show,
  onConfirm,
  onCancel,
  children,
}: DeleteConfirmationModalProps) => {
  return (
    <div 
      className={`modal fade ${show ? "show d-block" : "d-none"}`}
      tabIndex={-1}
      style={{ backgroundColor: show ? "rgba(0,0,0,0.5)" : "transparent" }}
      onClick={onCancel}
    >
      <div className="modal-dialog">
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h5 className="modal-title">Confirm Delete</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onCancel}
            ></button>
          </div>
          <div className="modal-body">
            {children || "Are you sure you want to delete this item?"}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={onConfirm}
            >
              Yes, Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;