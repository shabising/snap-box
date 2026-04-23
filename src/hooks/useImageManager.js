import { useState, useCallback, useMemo, useEffect } from 'react';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export function useImageManager() {
  const [images, setImages]       = useState([]);
  const [selected, setSelected]   = useState(new Set());
  const [filterCat, setFilterCat] = useState('All');
  const [errors, setErrors]       = useState([]);

  useEffect(() => {
    return () => {
      images.forEach((img) => URL.revokeObjectURL(img.previewUrl));
    };
  }, []);

const processFiles = useCallback((files) => {
  const newErrors = [];

  const imageFiles = Array.from(files).filter((file) => {
    if (!file.type.startsWith('image/')) {
      newErrors.push(`"${file.name}" is not an image file.`);
      return false;
    }
    if (file.size > MAX_FILE_SIZE) {
      newErrors.push(`"${file.name}" exceeds 5MB limit.`);
      return false;
    }
    const isDuplicate = images.some(
      (img) => img.originalName === file.name && img.size === file.size
    );
    if (isDuplicate) {
      newErrors.push(`"${file.name}" is already uploaded.`);
      return false;
    }
    return true;
  });

  if (newErrors.length > 0) setErrors(newErrors);

  imageFiles.forEach((file) => {
    try {
      const previewUrl = URL.createObjectURL(file);
      const img = new Image();

      img.onerror = () => {
        setErrors((prev) => [...prev, `"${file.name}" could not be loaded.`]);
        URL.revokeObjectURL(previewUrl);
      };

      img.onload = () => {
        setImages((prev) => [
          ...prev,
          {
            id:           crypto.randomUUID(),
            file,
            previewUrl,
            originalName: file.name,
            customName:   file.name.replace(/\.[^.]+$/, ''),
            size:         file.size,
            type:         file.type,
            width:        img.naturalWidth,
            height:       img.naturalHeight,
            categories:   [],
          },
        ]);
      };

      img.src = previewUrl;
    } catch (err) {
      setErrors((prev) => [...prev, `"${file.name}" could not be processed.`]);
    }
  });
}, [images]);

  const deleteImage = useCallback((id) => {
    setImages((prev) => {
      const target = prev.find((i) => i.id === id);
      if (target?.previewUrl) URL.revokeObjectURL(target.previewUrl);
      return prev.filter((i) => i.id !== id);
    });
    setSelected((prev) => { const next = new Set(prev); next.delete(id); return next; });
  }, []);

  const renameImage = useCallback((id, customName) => {
    setImages((prev) => prev.map((i) => (i.id === id ? { ...i, customName } : i)));
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

  const clearErrors = useCallback(() => setErrors([]), []);

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
    images, filtered, selected, filterCat, allCategories, totalSize, errors,
    processFiles,
    deleteImage, renameImage, addCategory, removeCategory,
    toggleSelect, selectAll, deselectAll, deleteSelected, deleteAll,
    setFilterCat, clearErrors,
  };
}