import React from "react";

import BookingFormDaily from "./BookingFormDaily";

const ModalForm = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div
                className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative"
                style={{
                    margin: "20px",
                    maxHeight: "calc(100% - 40px)",
                    overflowY: "auto",
                }}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                >
                    ✕
                </button>

                {/* Booking Form */}

                <BookingFormDaily />
            </div>
        </div>
    );
};

export default ModalForm;
