import React from "react";
import Draggable from "react-draggable";
import "./CertificationBoard.css";

const CertificationBoard = () => {
  return (
    <div className="board">
      {/* Instruction Bar */}
      <div className="instruction-bar">
        Drag and explore my certifications 📝
      </div>

      {/* One Sticky Note */}
      <Draggable>
        <div className="sticky-note">
          <h3>AWS Certified Developer</h3>
          <p>Issued by Amazon Web Services</p>
        </div>
      </Draggable>
    </div>
  );
};

export default CertificationBoard;
