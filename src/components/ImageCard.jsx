import { useRef, memo } from 'react';
import CategoryTag from './CategoryTag';
import { useImageContext } from '../context/ImageContext';
import { formatSize, formatType } from '../utils/format';
import './ImageCard.css';

const ImageCard = memo(function ImageCard({ image }) {
  const { selected, toggleSelect, deleteImage, renameImage, addCategory, removeCategory } = useImageContext();
  const nameRef = useRef(null);
  const isSelected = selected.has(image.id);

  return (
    <article
      className={`img-card ${isSelected ? 'img-card--selected' : ''}`}
      aria-label={`Image: ${image.customName}`}
    >
      <div
        className={`img-card__check ${isSelected ? 'img-card__check--on' : ''}`}
        onClick={() => toggleSelect(image.id)}
        role="checkbox"
        aria-checked={isSelected}
        aria-label="Select image"
        tabIndex={0}
        onKeyDown={(e) => e.key === ' ' && toggleSelect(image.id)}
      >
        {isSelected && '✓'}
      </div>

      <div className="img-card__preview-wrap">
        {image.previewUrl
          ? <img className="img-card__preview" src={image.previewUrl} alt={`Preview of ${image.customName}`} />
          : <div className="img-card__placeholder" aria-label="Image placeholder">🖼️</div>
        }
        <div className="img-card__overlay">
          <button className="overlay-btn" onClick={() => nameRef.current?.focus()} aria-label="Rename image">
            ✎ Rename
          </button>
          <button className="overlay-btn danger" onClick={() => deleteImage(image.id)} aria-label="Delete image">
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
            onChange={(e) => renameImage(image.id, e.target.value)}
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
          onAdd={(cat) => addCategory(image.id, cat)}
          onRemove={(cat) => removeCategory(image.id, cat)}
        />
      </div>
    </article>
  );
});

export default ImageCard;