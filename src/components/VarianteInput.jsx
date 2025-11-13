import React, { useState } from 'react';
import axios from 'axios';

export default function VarianteInput({ variante, index, onChange, onRemove }) {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setUploadError('');

    const formData = new FormData();
    formData.append('image', file);

    try {
      const { data } = await axios.post('/api/upload-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (data.ok) {
        onChange(index, { target: { name: 'imagen', value: data.url } });
      } else {
        setUploadError('Error al subir imagen');
      }
    } catch {
      setUploadError('Error en la subida');
    }
    setUploading(false);
  };

  return (
    <div className="border rounded p-4 mb-4 relative bg-gray-50">
      <button
        type="button"
        onClick={() => onRemove(index)}
        className="absolute top-2 right-2 text-red-600 hover:text-red-800 font-bold"
        aria-label="Eliminar variante"
      >
        &times;
      </button>
      <input
        name="color"
        value={variante.color}
        onChange={e => onChange(index, e)}
        placeholder="Color"
        className="border rounded p-2 mb-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="mb-2 w-full"
      />
      {uploading && <p className="text-blue-600">Subiendo imagen...</p>}
      {uploadError && <p className="text-red-600">{uploadError}</p>}
      {variante.imagen && <img src={variante.imagen} alt="Variante" className="w-24 h-24 object-cover mb-2" />}
      <input
        name="tamaño"
        value={variante.tamaño}
        onChange={e => onChange(index, e)}
        placeholder="Tamaño"
        className="border rounded p-2 mb-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <input
        name="precio_extra"
        type="number"
        min="0"
        value={variante.precio_extra}
        onChange={e => onChange(index, e)}
        placeholder="Precio extra"
        className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>
  );
}