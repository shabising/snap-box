import { useRef } from 'react';
import CategoryTag from './CategoryTag';
import { formatSize, formatType } from '../utils/format';
import './ImageCard.css';

export default function ImageCard({ image, selected, onToggle, onDelete, onRename, onAddCat, onRemoveCat }) {
  const nameRef = useRef(null);

  return (
    <article
      className={`img-card ${selected ? 'img-card--selected' : ''}`}
      aria-label={`Image: ${image.customName}`}
    >
      <div
        className={`img-card__check ${selected ? 'img-card__check--on' : ''}`}
        onClick={() => onToggle(image.id)}
        role="checkbox"
        aria-checked={selected}
        aria-label="Select image"
        tabIndex={0}
        onKeyDown={(e) => e.key === ' ' && onToggle(image.id)}
      >
        {selected && '✓'}
      </div>

      <div className="img-card__preview-wrap">
        {image.previewUrl
          ? <img
              className="img-card__preview"
              src={image.previewUrl}
              alt={`Preview of ${image.customName}`}
            />
          : <div className="img-card__placeholder" aria-label="Image placeholder">🖼️</div>
        }
        <div className="img-card__overlay">
          <button
            className="overlay-btn"
            onClick={() => nameRef.current?.focus()}
            aria-label="Rename image"
          >
            ✎ Rename
          </button>
          <button
            className="overlay-btn danger"
            onClick={() => onDelete(image.id)}
            aria-label="Delete image"
          >
            🗑 Delete
          </button>
        </div>
      </div>

      <div className="img-card__body">
        <div className="img-card__name-row">
          <input
            ref={nameRef}
            className="img-card__name"
            value={image.customName}
            onChange={(e) => onRename(image.id, e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && nameRef.current?.blur()}
            aria-label="Image name"
          />
          <span
            className="img-card__edit-icon"
            onClick={() => nameRef.current?.focus()}
            title="Rename"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && nameRef.current?.focus()}
          >
            ✎
          </span>
        </div>

        <div className="img-card__meta">
          <span className="meta-badge" title="File name">
            <span className="meta-badge-icon">📄</span>
            {image.originalName}
          </span>
          <span className="meta-badge" title="File size">
            <span className="meta-badge-icon">📦</span>
            {formatSize(image.size)}
          </span>
          <span className="meta-badge" title="File type">
            <span className="meta-badge-icon">🖼</span>
            {formatType(image.type)}
          </span>
          {image.width && (
            <span className="meta-badge" title="Dimensions">
              {image.width}×{image.height}
            </span>
          )}
        </div>

        <CategoryTag
          categories={image.categories}
          onAdd={(cat) => onAddCat(image.id, cat)}
          onRemove={(cat) => onRemoveCat(image.id, cat)}
        />
      </div>
    </article>
  );
}