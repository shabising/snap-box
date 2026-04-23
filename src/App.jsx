import DropZone  from './components/DropZone';
import Toolbar   from './components/Toolbar';
import ImageCard from './components/ImageCard';
import { useImageManager } from './hooks/useImageManager';
import { formatSize } from './utils/format';
import './styles/global.css';

export default function App() {
  const {
    images, filtered, selected, filterCat, allCategories, totalSize, errors,
    processFiles,
    deleteImage, renameImage, addCategory, removeCategory,
    toggleSelect, selectAll, deselectAll, deleteSelected, deleteAll,
    setFilterCat, clearErrors,
  } = useImageManager();

  return (
    <div className="app">
      <header className="app-header">
        <div>
          <h1 className="app-title">Snap<span>Box</span></h1>
          <p className="app-subtitle">Local Upload &amp; Metadata Manager</p>
        </div>
        {images.length > 0 && (
          <div className="app-stats">
            <span>{images.length} file{images.length !== 1 ? 's' : ''}</span>
            <span className="dot">·</span>
            <span>{formatSize(totalSize)}</span>
          </div>
        )}
      </header>

      <DropZone onFiles={processFiles} />

      {errors.length > 0 && (
        <div className="error-box" role="alert">
          {errors.map((err, i) => (
            <p key={i}>⚠️ {err}</p>
          ))}
          <button className="error-close" onClick={clearErrors} aria-label="Close errors">✕</button>
        </div>
      )}

      {images.length > 0 && (
        <Toolbar
          totalCount={images.length}
          filteredCount={filtered.length}
          selectedCount={selected.size}
          allCategories={allCategories}
          activeFilter={filterCat}
          onSelectAll={() => selectAll(filtered)}
          onDeselect={deselectAll}
          onDeleteSelected={deleteSelected}
          onDeleteAll={deleteAll}
          onFilterChange={setFilterCat}
        />
      )}

      {filtered.length > 0 ? (
        <div className="image-grid">
          {filtered.map((img) => (
            <ImageCard
              key={img.id}
              image={img}
              selected={selected.has(img.id)}
              onToggle={toggleSelect}
              onDelete={deleteImage}
              onRename={renameImage}
              onAddCat={addCategory}
              onRemoveCat={removeCategory}
            />
          ))}
        </div>
      ) : images.length > 0 ? (
        <div className="empty-filter">
          <span>🔍</span>
          <p>No images match this filter</p>
        </div>
      ) : null}
    </div>
  );
}