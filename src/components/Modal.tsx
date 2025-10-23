// MyModal.tsx
import React from "react";
import Modal from "react-modal";

interface MyModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  contentLabel: string;
  children: React.ReactNode;
}

Modal.setAppElement("#root"); // Important for accessibility

const MyModal: React.FC<MyModalProps> = ({
  isOpen,
  onRequestClose,
  contentLabel,
  children,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel={contentLabel}
      style={{
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          background: "#393f6e",
          border: "none",
          borderRadius: "12px",
        },
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.6)",
        },
      }}
    >
      {children}
    </Modal>
  );
};

export default MyModal;
