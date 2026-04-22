import { useRef } from 'react';
import CategoryTag from './CategoryTag';
import { formatSize, formatType } from '../utils/format';
import './ImageCard.css';

export default function ImageCard({ image, selected, onToggle, onDelete, onRename, onAddCat, onRemoveCat }) {
  const nameRef = useRef(null);

  return (
    <article className={`img-card ${selected ? 'img-card--selected' : ''}`}>
      <div
        className={`img-card__check ${selected ? 'img-card__check--on' : ''}`}
        onClick={() => onToggle(image.id)}
        role="checkbox"
        aria-checked={selected}
        tabIndex={0}
        onKeyDown={(e) => e.key === ' ' && onToggle(image.id)}
      >
        {selected && '✓'}
      </div>

      {image.previewUrl
        ? <img className="img-card__preview" src={image.previewUrl} alt={image.name} />
        : <div className="img-card__placeholder">🖼️</div>
      }

      <div className="img-card__body">
        <div className="img-card__name-row">
          <input
            ref={nameRef}
            className="img-card__name"
            value={image.name}
            onChange={(e) => onRename(image.id, e.target.value)}
          />
          <span className="img-card__edit-icon" onClick={() => nameRef.current?.focus()}>✎</span>
        </div>

        <div className="img-card__meta">
          <span className="meta-badge">{formatType(image.type)}</span>
          <span className="meta-badge">{formatSize(image.size)}</span>
          {image.width && <span className="meta-badge">{image.width}×{image.height}</span>}
        </div>

        <CategoryTag
          categories={image.categories}
          onAdd={(cat) => onAddCat(image.id, cat)}
          onRemove={(cat) => onRemoveCat(image.id, cat)}
        />

        <button className="img-card__delete" onClick={() => onDelete(image.id)}>🗑 Remove</button>
      </div>
    </article>
  );
}