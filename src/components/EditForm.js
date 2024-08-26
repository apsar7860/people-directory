import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  role: z.string().min(1, "Role is required"),
  team: z.string().min(1, "Team is required"),
});

const EditForm = ({ onSubmit, defaultValues }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <label>Name</label>
        <input {...register('name')} className="p-2 border rounded w-full" />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>
      <div className="mb-4">
        <label>Role</label>
        <input {...register('role')} className="p-2 border rounded w-full" />
        {errors.role && <p className="text-red-500">{errors.role.message}</p>}
      </div>
      <div className="mb-4">
        <label>Team</label>
        <input {...register('team')} className="p-2 border rounded w-full" />
        {errors.team && <p className="text-red-500">{errors.team.message}</p>}
      </div>
      <button type="submit" className="p-2 bg-blue-500 text-white rounded">Submit</button>
    </form>
  );
};

export default EditForm;
