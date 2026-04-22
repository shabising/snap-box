import { useState, useRef } from 'react';
import './DropZone.css';

export default function DropZone({ onFiles }) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef(null);

  const handleDragOver  = (e) => { e.preventDefault(); setDragging(true); };
  const handleDragLeave = () => setDragging(false);
  const handleDrop      = (e) => { e.preventDefault(); setDragging(false); onFiles(e.dataTransfer.files); };
  const handleInputChange = (e) => { onFiles(e.target.files); e.target.value = ''; };

  return (
    <div
      className={`drop-zone ${dragging ? 'drop-zone--active' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
    >
        <input ref={inputRef} type="file" accept="image/*" multiple style={{ display: 'none' }} onChange={handleInputChange} />
        <div className="drop-zone__icon">{dragging ? '⬇️' : '📁'}</div>
            <h2 className="drop-zone__title">{dragging ? 'Drop it here!' : 'Drag & drop your images'}</h2>
            <p className="drop-zone__sub">PNG · JPG · GIF · WebP · SVG</p>
            <button className="drop-zone__browse" onClick={(e) => { e.stopPropagation(); inputRef.current?.click(); }}>
            Browse files
        </button>
    </div>
  );
}