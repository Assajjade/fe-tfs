import React, { useEffect, useState } from 'react';
import axios from '../Axios';
import SectionForm from './SectionForm';

const ManageHomepage = () => {
  const [sections, setSections] = useState([]);
  const [editing, setEditing] = useState(false);
  const [currentSection, setCurrentSection] = useState(null);

  useEffect(() => {
    fetchSections();
  }, []);

  const fetchSections = async () => {
    try {
      const { data } = await axios.get('/api/sections/');
      setSections(data);
    } catch (error) {
      console.error('Error fetching sections', error);
    }
  };

  const handleEdit = (section) => {
    setCurrentSection(section);
    setEditing(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this section?')) return;
    try {
      await axios.delete(`/api/sections/${id}/`);
      fetchSections();
    } catch (error) {
      console.error('Error deleting section', error);
    }
  };

  const handleBack = () => {
    setEditing(false);
    fetchSections(); // Refresh sections to show any changes that might not have been saved
  };

  return (
    <div>
      {editing ? (
        <SectionForm 
          section={currentSection} 
          setEditing={setEditing} 
          refreshSections={fetchSections} 
          handleBack={handleBack} 
        />
      ) : (
        <div>
          <button onClick={() => handleEdit(null)} style={{ backgroundColor: '#28a745', color: 'white', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer' }}>Add Section</button>
          <div style={{ marginTop: '20px' }}>
            {sections.map(section => (
              <div key={section.id} style={{ padding: '10px', backgroundColor: '#f5f5f5', borderRadius: '8px', marginBottom: '10px' }}>
                <h3>{section.title}</h3>
                <p>{section.description}</p>
                <button onClick={() => handleEdit(section)} style={{ backgroundColor: '#007bff', color: 'white', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer', marginRight: '5px' }}>Edit</button>
                <button onClick={() => handleDelete(section.id)} style={{ backgroundColor: '#dc3545', color: 'white', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer' }}>Delete</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageHomepage;
