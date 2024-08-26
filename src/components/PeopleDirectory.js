import React, { useState, useMemo, useEffect } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { faker } from '@faker-js/faker';
import EditForm from './EditForm';
import SidePane from './SidePane';
import { useTable, useSortBy, useGlobalFilter } from 'react-table';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate, useLocation } from 'react-router-dom';

// Create a schema for form validation using Zod
const schema = z.object({
  name: z.string().min(1, "Name is required"),
  role: z.string().min(1, "Role is required"),
  team: z.string().min(1, "Team is required"),
});

const PeopleDirectory = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Read query parameters from the URL
  const queryParams = new URLSearchParams(location.search);
  const initialQuery = queryParams.get('query') || '';

  // Initial data generation using faker
  const initialData = useMemo(() => {
    return Array(10).fill(0).map(() => ({
      id: faker.datatype.uuid(),
      name: faker.name.findName(),
      role: faker.name.jobTitle(),
      team: faker.commerce.department(),
    }));
  }, []);

  const [data, setData] = useState(initialData);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [search, setSearch] = useState(initialQuery);

  // Table columns definition
  const columns = useMemo(() => [
    {
      Header: 'Name',
      accessor: 'name',
      sortType: 'basic',
    },
    {
      Header: 'Role',
      accessor: 'role',
      sortType: 'basic',
    },
    {
      Header: 'Team',
      accessor: 'team',
      sortType: 'basic',
    },
    {
      Header: 'Actions',
      Cell: ({ row }) => (
        <div>
          <button onClick={() => handleEdit(row.original)} className="text-blue-500">Edit</button>
          <button onClick={() => deleteRow(row.original.id)} className="text-red-500 ml-2">Delete</button>
        </div>
      ),
    }
  ], [data]);

  // Initialize the table instance
  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy
  );

  // Extract properties from the table instance
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, state, setGlobalFilter } = tableInstance;

  // Handle deleting a row
  const deleteRow = (id) => {
    setData(data.filter(d => d.id !== id));
  };

  // Handle editing a person
  const handleEdit = (person) => {
    setSelectedPerson(person);
    setIsEditing(true);
    setIsAdding(false);
  };

  // Handle form submission for editing or adding a person
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (formData) => {
    if (isEditing) {
      setData(data.map(person => person.id === selectedPerson.id ? { ...selectedPerson, ...formData } : person));
    } else {
      setData([...data, { id: faker.datatype.uuid(), ...formData }]);
    }
    setIsEditing(false);
    setIsAdding(false);
    setSelectedPerson(null);
    reset();
  };

  // Handle adding a new person
  const handleAdd = () => {
    setSelectedPerson(null);
    setIsAdding(true);
    setIsEditing(false);
  };

  // Update the URL with the search query
  useEffect(() => {
    navigate(`/people?query=${encodeURIComponent(search)}`);
  }, [search, navigate]);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setGlobalFilter(e.target.value);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={handleSearchChange}
          className="border p-2"
        />
        <button onClick={handleAdd} className="p-2 bg-blue-500 text-white">Add Member</button>
      </div>

      <table {...getTableProps()} className="min-w-full bg-white border">
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())} className="p-4 border">
                  {column.render('Header')}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} onClick={() => setSelectedPerson(row.original)} className="cursor-pointer hover:bg-gray-100">
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()} className="p-4 border">{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      {selectedPerson && !isEditing && !isAdding && (
        <div className="p-4 border mt-4 bg-gray-50">
          <h3 className="text-xl font-bold">Details for {selectedPerson.name}</h3>
          <p><strong>Role:</strong> {selectedPerson.role}</p>
          <p><strong>Team:</strong> {selectedPerson.team}</p>
        </div>
      )}

      {(isEditing || isAdding) && (
        <div className="p-4 border mt-4 bg-gray-50">
          <h3 className="text-xl font-bold">{isEditing ? 'Edit Person' : 'Add Person'}</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="block text-gray-700">Name</label>
              <input
                {...register('name')}
                defaultValue={isEditing ? selectedPerson.name : ''}
                className={`w-full p-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.name && <span className="text-red-500">{errors.name.message}</span>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Role</label>
              <input
                {...register('role')}
                defaultValue={isEditing ? selectedPerson.role : ''}
                className={`w-full p-2 border ${errors.role ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.role && <span className="text-red-500">{errors.role.message}</span>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Team</label>
              <input
                {...register('team')}
                defaultValue={isEditing ? selectedPerson.team : ''}
                className={`w-full p-2 border ${errors.team ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.team && <span className="text-red-500">{errors.team.message}</span>}
            </div>
            <button type="submit" className="p-2 bg-green-500 text-white">{isEditing ? 'Update' : 'Add'}</button>
            <button type="button" onClick={() => { setIsEditing(false); setIsAdding(false); setSelectedPerson(null); reset(); }} className="p-2 bg-red-500 text-white ml-2">Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default PeopleDirectory;
