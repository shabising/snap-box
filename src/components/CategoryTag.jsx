import { useState } from 'react';
import './CategoryTag.css';

const PRESETS = ['Nature', 'Design', 'Architecture', 'Portrait', 'Abstract', 'Travel'];

function colorIndex(name) {
  let hash = 0;
  for (let ch of name) hash = (hash * 31 + ch.charCodeAt(0)) & 0xffff;
  return hash % 5;
}

export default function CategoryTag({ categories, onAdd, onRemove }) {
  const [editing, setEditing] = useState(false);
  const [input, setInput]     = useState('');

  const commit = () => {
    const val = input.trim();
    if (val && !categories.includes(val)) onAdd(val);
    setInput('');
    setEditing(false);
  };

  const handleKey = (e) => {
    if (e.key === 'Enter')  commit();
    if (e.key === 'Escape') { setEditing(false); setInput(''); }
  };

  return (
    <div className="cat-tags">
      {categories.map((cat) => (
        <span key={cat} className={`cat-tag cat-tag--${colorIndex(cat)}`} onClick={() => onRemove(cat)}>
          {cat} ×
        </span>
      ))}
      {editing ? (
        <input
          autoFocus
          className="cat-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          onBlur={commit}
          list="cat-presets"
          placeholder="tag name..."
        />
      ) : (
        <button className="cat-add-btn" onClick={() => setEditing(true)}>+ tag</button>
      )}
      <datalist id="cat-presets">
        {PRESETS.map((p) => <option key={p} value={p} />)}
      </datalist>
    </div>
  );
}