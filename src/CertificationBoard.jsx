import React, { useState, useEffect } from "react";
import { DndContext, useDraggable } from "@dnd-kit/core";
import "./CertificationBoard.css";

const DraggableCard = ({ cert, index, isActive, onClick, position }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id: cert.id });

  const style = {
    backgroundColor: cert.color,
    zIndex: isActive || isDragging ? 1000 : index + 1,
    left: `calc(50% + ${position.x}px)`,
    top: `calc(50% + ${position.y}px)`,
    transform: transform
      ? `translate(-50%, -50%) translate3d(${transform.x}px, ${transform.y}px, 0) rotate(${cert.rotation}deg)`
      : `translate(-50%, -50%) rotate(${cert.rotation}deg)`,
    position: "absolute",
    width: "220px",
    height: "180px",
    padding: "16px",
    borderRadius: "8px",
    boxShadow:
      "0px 4px 8px rgba(0, 0, 0, 0.15), 0px 8px 16px rgba(0, 0, 0, 0.1)",
    cursor: isDragging ? "grabbing" : "grab",
    transition: isDragging ? "none" : "all 0.2s ease-in-out",
  };
  return (
    <div
      ref={setNodeRef}
      className={`sticky-note ${isActive ? "active" : ""}`}
      style={style}
      onClick={onClick}
      {...listeners}
      {...attributes}
    >
      <div className="card-handle">
        <div className="card-header">
          <h3>{cert.title}</h3>
          <div className="year-badge">{cert.year}</div>
        </div>
        <p className="issuer">{cert.issuer}</p>
      </div>
    </div>
  );
};

// Move certifications array outside the component
const certifications = [
  {
    id: 1,
    title: "AWS Certified Developer",
    issuer: "Amazon Web Services",
    year: "2023",
    color: "#fffa8b",
    rotation: -3,
  },
  {
    id: 2,
    title: "Google Cloud Professional",
    issuer: "Google Cloud",
    year: "2023",
    color: "#ffb3ba",
    rotation: 2,
  },
  {
    id: 3,
    title: "Microsoft Azure Fundamentals",
    issuer: "Microsoft",
    year: "2022",
    color: "#bae1ff",
    rotation: -1,
  },
  {
    id: 4,
    title: "Certified Kubernetes Administrator",
    issuer: "Cloud Native Computing Foundation",
    year: "2023",
    color: "#baffc9",
    rotation: 4,
  },
  {
    id: 5,
    title: "Docker Certified Associate",
    issuer: "Docker Inc.",
    year: "2022",
    color: "#ffffba",
    rotation: -2,
  },
  {
    id: 6,
    title: "React Developer Certification",
    issuer: "Meta",
    year: "2023",
    color: "#ffdfba",
    rotation: 1,
  },
];

const CertificationBoard = () => {
  const [activeCard, setActiveCard] = useState(null);
  // Track position for each card with initial stacked positions
  const [positions, setPositions] = useState(() => {
    const pos = {};
    for (let i = 0; i < certifications.length; i++) {
      // Create a natural stack with slight offsets
      const offsetX = (i % 3) * 15 - 15; // -15, 0, 15, -15, 0, 15
      const offsetY = Math.floor(i / 3) * 10 - 10; // -10, -10, -10, 0, 0, 0
      pos[certifications[i].id] = { x: offsetX, y: offsetY };
    }
    return pos;
  });

  // Visitor and heart count using localStorage (persists per device)
  const [visitorCount, setVisitorCount] = useState(0);
  const [heartCount, setHeartCount] = useState(0);

  useEffect(() => {
    // Load visitor count from localStorage, increment on visit
    const storedVisitors = localStorage.getItem('visitorCount');
    const newVisitorCount = storedVisitors ? parseInt(storedVisitors, 10) + 1 : 1;
    setVisitorCount(newVisitorCount);
    localStorage.setItem('visitorCount', newVisitorCount.toString());

    // Load heart count from localStorage
    const storedHearts = localStorage.getItem('heartCount');
    setHeartCount(storedHearts ? parseInt(storedHearts, 10) : 0);
  }, []);

  const handleHeartClick = () => {
    const newHeartCount = heartCount + 1;
    setHeartCount(newHeartCount);
    localStorage.setItem('heartCount', newHeartCount.toString());
  };


  return (
    <DndContext
      onDragEnd={({ active, delta }) => {
        setPositions((pos) => ({
          ...pos,
          [active.id]: {
            x: (pos[active.id]?.x ?? 0) + delta.x,
            y: (pos[active.id]?.y ?? 0) + delta.y,
          },
        }));
      }}
    >
      <div className="board">
        <div className="instruction-bar">
          💡 Drag and explore my certifications
        </div>
        <div className="cards-container">
          {certifications.map((cert, index) => (
            <DraggableCard
              key={cert.id}
              cert={cert}
              index={index}
              isActive={activeCard === cert.id}
              onClick={() => setActiveCard(cert.id)}
              position={positions[cert.id]}
            />
          ))}
        </div>
        {/* Floating Heart Button */}
        <button className="heart-button" onClick={handleHeartClick} aria-label="Like this board">
          <span className="heart-icon" role="img" aria-label="heart">❤️</span>
          <span className="heart-count">{heartCount}</span>
        </button>
        {/* Visitor Badge */}
        <div className="visitor-badge">
          👁️ Visitors: {visitorCount}
        </div>
      </div>
    </DndContext>
  );
};

export default CertificationBoard;
