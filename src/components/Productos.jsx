import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VarianteForm = ({ variante, index, onChange, onRemove }) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    setError('');

    const formData = new FormData();
    formData.append('image', file);

    try {
      const { data } = await axios.post('/api/upload-image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (data.ok) {
        onChange(index, { target: { name: 'imagen', value: data.url } });
      } else {
        setError('Error al subir imagen');
      }
    } catch {
      setError('Error en la subida');
    }
    setUploading(false);
  };

  return (
    <div className="border p-4 rounded mb-4 relative bg-gray-50 shadow-sm">
      <button
        type="button"
        onClick={() => onRemove(index)}
        className="absolute right-2 top-2 text-red-600 hover:text-red-800 font-bold"
      >
        &times;
      </button>
      <div className="mb-2">
        <input
          name="color"
          value={variante.color}
          onChange={e => onChange(index, e)}
          placeholder="Color"
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div className="mb-2">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full"
        />
        {uploading && <p className="text-sm text-blue-600">Subiendo imagen...</p>}
        {error && <p className="text-sm text-red-600">{error}</p>}
        {variante.imagen && (
          <img src={variante.imagen} alt="Variante" className="w-24 h-24 object-cover mt-2" />
        )}
      </div>
      <input
        name="tamaño"
        value={variante.tamaño}
        onChange={e => onChange(index, e)}
        placeholder="Tamaño"
        className="border border-gray-300 rounded px-3 py-2 mb-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <input
        name="precio_extra"
        type="number"
        min="0"
        value={variante.precio_extra}
        onChange={e => onChange(index, e)}
        placeholder="Precio Extra"
        className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>
  );
};

export default function Productos() {
  const [variantes, setVariantes] = useState([{ color: '', imagen: '', tamaño: '', precio_extra: '' }]);
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('');
  const [marca, setMarca] = useState('');
  const [categoria, setCategoria] = useState('');
  const [error, setError] = useState('');

  const handleVariantChange = (index, e) => {
    const newVariantes = [...variantes];
    newVariantes[index] = { ...newVariantes[index], [e.target.name]: e.target.value };
    setVariantes(newVariantes);
  };

  const addVariante = () => {
    setVariantes([...variantes, { color: '', imagen: '', tamaño: '', precio_extra: '' }]);
  };

  const removeVariante = (index) => {
    setVariantes(variantes.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Aquí enviarías los datos al backend
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded shadow mt-6">
      <h1 className="text-3xl font-bold mb-4">Gestionar Producto</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Campos Básicos */}
        <div>
          <input
            placeholder="Nombre"
            className="w-full border border-gray-300 rounded px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
          <input
            placeholder="Precio"
            type="number"
            className="w-full border border-gray-300 rounded px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
          />
          {/* Más campos... */}
        </div>

        {/* Variantes */}
        <h2 className="text-xl font-semibold mb-2">Variantes</h2>
        {variantes.map((v, index) => (
          <VarianteForm
            key={index}
            variante={v}
            index={index}
            onChange={handleVariantChange}
            onRemove={removeVariante}
          />
        ))}
        <button
          type="button"
          onClick={addVariante}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Añadir Variante
        </button>

        <button
          type="submit"
          className="bg-indigo-600 text-white px-6 py-3 rounded hover:bg-indigo-700 transition"
        >
          Guardar Producto
        </button>
      </form>
    </div>
  );
}