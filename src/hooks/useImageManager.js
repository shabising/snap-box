import { useState, useCallback, useMemo } from 'react';

export function useImageManager() {
  const [images, setImages]     = useState([]);
  const [selected, setSelected] = useState(new Set());
  const [filterCat, setFilterCat] = useState('All');

  const processFiles = useCallback((files) => {
    const imageFiles = Array.from(files).filter((f) => f.type.startsWith('image/'));
    imageFiles.forEach((file) => {
      const previewUrl = URL.createObjectURL(file);
      const img = new Image();
      img.onload = () => {
        setImages((prev) => [...prev, {
          id:         crypto.randomUUID(),
          name:       file.name.replace(/\.[^.]+$/, ''),
          type:       file.type,
          size:       file.size,
          previewUrl,
          width:      img.naturalWidth,
          height:     img.naturalHeight,
          categories: [],
        }]);
      };
      img.src = previewUrl;
    });
  }, []);

  const deleteImage = useCallback((id) => {
    setImages((prev) => {
      const target = prev.find((i) => i.id === id);
      if (target?.previewUrl) URL.revokeObjectURL(target.previewUrl);
      return prev.filter((i) => i.id !== id);
    });
    setSelected((prev) => { const next = new Set(prev); next.delete(id); return next; });
  }, []);

  const renameImage  = useCallback((id, newName) => {
    setImages((prev) => prev.map((i) => (i.id === id ? { ...i, name: newName } : i)));
  }, []);

  const addCategory = useCallback((id, cat) => {
    setImages((prev) => prev.map((i) =>
      i.id === id ? { ...i, categories: [...new Set([...i.categories, cat.trim()])] } : i
    ));
  }, []);

  const removeCategory = useCallback((id, cat) => {
    setImages((prev) => prev.map((i) =>
      i.id === id ? { ...i, categories: i.categories.filter((c) => c !== cat) } : i
    ));
  }, []);

  const toggleSelect = useCallback((id) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  const selectAll    = useCallback((filteredImages) => {
    setSelected(new Set(filteredImages.map((i) => i.id)));
  }, []);

  const deselectAll  = useCallback(() => setSelected(new Set()), []);

  const deleteSelected = useCallback(() => {
    selected.forEach((id) => {
      const img = images.find((i) => i.id === id);
      if (img?.previewUrl) URL.revokeObjectURL(img.previewUrl);
    });
    setImages((prev) => prev.filter((i) => !selected.has(i.id)));
    setSelected(new Set());
  }, [selected, images]);

  const deleteAll = useCallback(() => {
    images.forEach((i) => URL.revokeObjectURL(i.previewUrl));
    setImages([]);
    setSelected(new Set());
    setFilterCat('All');
  }, [images]);

  const filtered = useMemo(
    () => (filterCat === 'All' ? images : images.filter((i) => i.categories.includes(filterCat))),
    [images, filterCat]
  );

  const allCategories = useMemo(() => {
    const cats = new Set();
    images.forEach((i) => i.categories.forEach((c) => cats.add(c)));
    return ['All', ...cats];
  }, [images]);

  const totalSize = useMemo(() => images.reduce((sum, i) => sum + i.size, 0), [images]);

  return {
    images, filtered, selected, filterCat, allCategories, totalSize,
    processFiles,
    deleteImage, renameImage, addCategory, removeCategory,
    toggleSelect, selectAll, deselectAll, deleteSelected, deleteAll,
    setFilterCat,
  };
}