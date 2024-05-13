import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import AxiosInstance from '../../Axios';

const CWlist = () => {
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [searchName, setSearchName] = useState('');

  useEffect(() => {
    AxiosInstance.get("organizer/content-writer/json/")
      .then((res) => {
        setRecords(res.data);
        setFilteredRecords(res.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleDelete = (id) => {
    AxiosInstance.delete(`user/delete/${id}`)
      .then(() => {
        setRecords(records.filter(record => record.uid !== id));
        setFilteredRecords(filteredRecords.filter(record => record.uid !== id));
      })
      .catch((error) => {
        console.error('Error deleting record:', error);
      });
  };

  const handleFilter = () => {
    const filtered = records.filter(record => record.name.toLowerCase().includes(searchName.toLowerCase()));
    setFilteredRecords(filtered);
  };

  return (
    <div>
      <div className="flex my-4">
        <input
          type="text"
          placeholder="Search by name"
          className="border-gray-300 border p-2 rounded-l-md focus:outline-none"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <Button variant="contained" color="primary" className="rounded-r-md" onClick={handleFilter}>Filter</Button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border-gray-300 shadow rounded-xl">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone Number</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nationality</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Domicile</th>
              <th className="px-6 py-3"></th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredRecords.map(record => (
              <tr key={record.id} className="hover:bg-gray-100">
                <td className="px-6 py-4 whitespace-nowrap">{record.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{record.username}</td>
                <td className="px-6 py-4 whitespace-nowrap">{record.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{record.phone_numbers}</td>
                <td className="px-6 py-4 whitespace-nowrap">{record.nationality}</td>
                <td className="px-6 py-4 whitespace-nowrap">{record.domicile}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Button variant="contained" color="secondary" onClick={() => handleDelete(record.uid)}>Delete</Button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Button variant="contained" color="primary" href={`/organizer/island-organizer/edit/${record.id}`}>Edit</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CWlist;
