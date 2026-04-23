import { ImageContext } from './context/ImageContext';
import DropZone  from './components/DropZone';
import Toolbar   from './components/Toolbar';
import ImageCard from './components/ImageCard';
import { useImageManager } from './hooks/useImageManager';
import { formatSize } from './utils/format';
import './styles/global.css';

export default function App() {
  const imageManager = useImageManager();

  const {
    images, filtered, selected, filterCat, allCategories, totalSize, errors, loading,
    processFiles, deleteImage, renameImage, addCategory, removeCategory,
    toggleSelect, selectAll, deselectAll, deleteSelected, deleteAll,
    setFilterCat, clearErrors,
  } = imageManager;

  return (
    <ImageContext.Provider value={imageManager}>
      <div className="app">
        <header className="app-header">
          <div>
            <div className="app-title">
              <div className="app-title-icon">📸</div>
              <div>Snap<span style={{color: 'var(--accent)'}}>Box</span></div>
            </div>
            <p className="app-subtitle">Local image upload & metadata manager</p>
          </div>
          {images.length > 0 && (
            <div className="app-stats">
              <div className="stat-item">📁 {images.length} file{images.length !== 1 ? 's' : ''}</div>
              <div className="stat-item">💾 {formatSize(totalSize)}</div>
            </div>
          )}
        </header>

        <DropZone onFiles={processFiles} />

        {loading && (
          <div className="loading-bar">
            <div className="loading-bar__fill" />
          </div>
        )}

        {errors.length > 0 && (
          <div className="error-box" role="alert">
            {errors.map((err, i) => <p key={i}>⚠️ {err}</p>)}
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
              />
            ))}
          </div>
        ) : images.length > 0 ? (
          <div className="empty-filter">
            <div className="empty-filter-icon">🔍</div>
            <p>No images match this filter</p>
          </div>
        ) : null}
      </div>
    </ImageContext.Provider>
  );
}