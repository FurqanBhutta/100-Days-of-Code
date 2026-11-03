"use client";

import { Trash, Pencil, X } from 'lucide-react';
import { useState, useEffect } from 'react';

const Page = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [data, setData] = useState([]);

    const user = {
        username: "John Doe",
        email: "john.doe@example.com",
        role: "student",
        status: "Active",
        created: "2023-01-01"
    }

    useEffect(()=>{
        const fetchUsers = async () => {
        try {
            const response = await fetch("/api/users");
            const data = await response.json();
            setData(data);
            setTimeout(() => {
                console.log("Fetched users:", data);
            }, 2000);
        } catch (err) {
            console.log("Error: " + err);
        }
    }
    fetchUsers();
    }, []);

    const addUser = () => {
        console.log("Add user clicked");
        setIsOpen(true);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = {
            username: e.target.username.value,
            email: e.target.email.value,
            role: e.target.role.value.toLowerCase(),
            status: e.target.status.checked ? "Active" : "Inactive"
        }
        console.log("Form submitted:", user);
        setIsOpen(false);
    }

    return (
        <div>
            <div className="bg-white p-5 rounded-xl ">
                <div className="flex justify-between items-center">
                    <div className="heading">
                        <h1 className="font-bold text-gray-700">Users</h1>
                        <p className="text-gray-500">Accounts for admins, teachers and students</p>
                    </div>
                    <div onClick={addUser} className="btn align-middle bg-yellow-500 px-3 py-1 rounded-xl text-blue-900 font-bold hover:bg-yellow-400 hover:text-black transition-all duration-200 cursor-pointer">
                        + Add user
                    </div>
                </div>
                <div className='mt-5 border-collapse border border-gray-200 rounded-lg overflow-hidden'>
                    <table className="table-auto w-full ">
                        <thead className="text-gray-700">
                            <tr>
                                <th className="border-b border-gray-300 p-2 text-left">Username</th>
                                <th className="border-b border-gray-300 p-2 text-left">Email</th>
                                <th className="border-b border-gray-300 p-2 text-left">Role</th>
                                <th className="border-b border-gray-300 p-2 text-left">Status</th>
                                <th className="border-b border-gray-300 p-2 text-left">Created</th>
                                <th className="border-b border-gray-300 p-2 text-left"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* {console.log(users)} */}
                            {/* {users.map((user) => (
                                <tr key={user.email}>
                                    <td className="border-b border-gray-300 p-2">{user.username}</td>
                                    <td className="border-b border-gray-300 p-2">{user.email}</td>
                                    <td className="border-b border-gray-300 p-2">{user.role}</td>
                                    <td className="border-b border-gray-300 p-2">{user.status}</td>
                                    <td className="border-b border-gray-300 p-2">{user.created}</td>
                                    <td className="border-b border-gray-300 gap-2 ">
                                        <div className="flex justify-end">
                                            <Pencil className='w-4 mr-2 cursor-pointer hover:text-green-500' />
                                            <Trash className='w-4 mr-2 cursor-pointer hover:text-red-500' />
                                        </div>
                                    </td>
                                </tr>
                            ))} */}
                            <tr key={user.email}>
                                <td className="border-b border-gray-300 p-2">{user.username}</td>
                                <td className="border-b border-gray-300 p-2">{user.email}</td>
                                <td className="border-b border-gray-300 p-2">{user.role}</td>
                                <td className="border-b border-gray-300 p-2">{user.status}</td>
                                <td className="border-b border-gray-300 p-2">{user.created}</td>
                                <td className="border-b border-gray-300 gap-2 ">
                                    <div className="flex justify-end">
                                        <Pencil className='w-4 mr-2 cursor-pointer hover:text-green-500' />
                                        <Trash className='w-4 mr-2 cursor-pointer hover:text-red-500' />
                                    </div>
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </div>
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                    <div className="bg-white p-6 rounded-lg w-96">
                        <div className="flex justify-between">
                            <h2 className="text-xl font-bold mb-4">Add User</h2>
                            <button onClick={() => setIsOpen(false)} className="cursor-pointer hover:text-red-500"><X /></button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                    Username
                                </label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                    Email
                                </label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Email" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                    Password
                                </label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="text" placeholder="Password" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">
                                    Role
                                </label>
                                <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="role">
                                    <option>Admin</option>
                                    <option>Teacher</option>
                                    <option>Student</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
                                    Status
                                </label>
                                <input className="h-4 w-4" id="status" type="checkbox" /> <span className="ml-1 ">Active</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                                    Add User
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Page
