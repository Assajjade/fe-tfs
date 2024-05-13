import React, { useState } from 'react';
import axios from '../Axios';

const SectionForm = ({ section, setEditing, refreshSections }) => {
  const [formData, setFormData] = useState({
    section_type: section ? section.section_type : 'hero',
    title: section ? section.title : '',
    description: section ? section.description : '',
    // image: section ? section.image : '',
    is_published: section ? section.is_published : false,
    previewMode: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleTogglePublished = async () => {
    if (!window.confirm('Are you sure you want to change the publish status of this section?')) return;
    const url = section ? `/api/sections/${section.id}/` : '/api/sections/';
    const method = section ? 'put' : 'post';
    try {
      await axios[method](url, {...formData, is_published: !formData.is_published});
      refreshSections();
      setEditing(false);
    } catch (error) {
      console.error('Error toggling publish status', error);
    }
  };

  const handleDelete = async () => {
    if (!section || !section.id || !window.confirm('Are you sure you want to delete this section?')) return;
    try {
      await axios.delete(`/api/sections/${section.id}/`);
      refreshSections();
      setEditing(false);
    } catch (error) {
      console.error('Error deleting section', error);
    }
  };

  const handleClose = () => {
    setEditing(false); // Assuming setEditing toggles the form display
  };

  return (
    <form style={{ padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px', textAlign: 'left' }}>
      <div>
        <label>Section Type:</label>
        <select name="section_type" value={formData.section_type} onChange={handleChange}>
          <option value="hero">Hero</option>
          <option value="impact">Impact Numbers</option>
          <option value="trusted_by">Trusted By</option>
          <option value="why_join">Why Join Card</option>
        </select>
      </div>
      <div>
        <label>Title:</label>
        <input type="text" name="title" value={formData.title} onChange={handleChange} />
      </div>
      <div>
        <label>Description:</label>
        <textarea name="description" value={formData.description} onChange={handleChange}></textarea>
      </div>
      {/* <div>
        <label>Image URL:</label>
        <input type="text" name="image" value={formData.image} onChange={handleChange} />
      </div> */}
      <div style={{ marginTop: '10px' }}>
        <button type="button" onClick={handleTogglePublished} style={{ backgroundColor: '#28a745', color: 'white', padding: '8px 15px', border: 'none', borderRadius: '5px', cursor: 'pointer', marginRight: '10px' }}>Publish</button>
        <button type="button" onClick={handleDelete} style={{ backgroundColor: '#dc3545', color: 'white', padding: '8px 15px', border: 'none', borderRadius: '5px', cursor: 'pointer', marginRight: '10px' }}>Delete</button>
        <button type="button" onClick={handleClose} style={{ backgroundColor: '#6c757d', color: 'white', padding: '8px 15px', border: 'none', borderRadius: '5px', cursor: 'pointer', marginRight: '10px' }}>Back</button>
      </div>
    </form>
  );
};

export default SectionForm;
