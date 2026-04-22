import './Toolbar.css';

export default function Toolbar({
  totalCount, filteredCount, selectedCount,
  allCategories, activeFilter,
  onSelectAll, onDeselect, onDeleteSelected, onDeleteAll,
  onFilterChange,
}) {
  return (
    <div className="toolbar-wrap">
      <div className="toolbar">
        <span className="toolbar__count">
          {selectedCount > 0
            ? `${selectedCount} selected`
            : `${filteredCount} shown / ${totalCount} files`}
          </span>
        <button className="tb-btn" onClick={onSelectAll}>Select all</button>
        {selectedCount > 0 && (
          <>
            <button className="tb-btn" onClick={onDeselect}>Deselect</button>
            <button className="tb-btn tb-btn--danger" onClick={onDeleteSelected}>
                Remove selected ({selectedCount})
            </button>
          </>
        )}
        <button className="tb-btn tb-btn--danger" onClick={onDeleteAll}>Remove all</button>
      </div>

      {allCategories.length > 1 && (
        <div className="cat-filter">
          {allCategories.map((cat) => (
            <button
              key={cat}
              className={`filter-pill ${activeFilter === cat ? 'filter-pill--active' : ''}`}
              onClick={() => onFilterChange(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}