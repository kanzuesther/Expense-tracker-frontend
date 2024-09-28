import React from 'react'
import { Link } from 'react-router-dom'
import { FaEllipsisH } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../constants';
import AdminLayout from './adminLayout';



const adminDashboard = () => {
    let subtitle;
    const [usersList, setUsersList] = useState([]);
    const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);


    // const links = [
    //     {
    //         id: 1,
    //         name: "users",
    //         text: "users",
    //         url: "/users"
    //     },
    //     {
    //         id: 2,
    //         name: "expense",
    //         text: "expense",
    //         url: "/expense"
    //     }
    // ]


    useEffect(() => {
        axios.get(`${API_URL}/auth/users`)
            .then((response) => {
                console.log("Data gotten from API")
                console.log(response.data);
                setUsersList(response.data);
            });
    }, [])
    return (
        <AdminLayout>
            <div>
                <table class="table-auto border-collapse border border-gray-400 w-full">
                    <tr>
                        <th class="border border-gray-400 px-4 py-2">Name</th>
                        <th class="border border-gray-400 px-4 py-2">DOB</th>
                        <th class="border border-gray-400 px-4 py-2">Gender</th>
                        <th class="border border-gray-400 px-4 py-2">E-mail</th>
                        <th class="border border-gray-400 px-4 py-2">Actions</th>
                    </tr>
                    <tbody>


                        {
                            usersList?.map((user, index) => (
                                <tr>
                                    <td class="border border-gray-400 px-4 py-2 capitalize">{user?.username}</td>
                                    <td class="border border-gray-400 px-4 py-2">{new Date(user?.dob).toDateString()}</td>
                                    <td class="border border-gray-400 px-4 py-2">{user?.gender === 'M' ? 'Male' : 'Female'}</td>
                                    <td class="border border-gray-400 px-4 py-2">{user?.email}</td>
                                    <td class="border border-gray-400 px-4 py-2" onClick={() => alert(JSON.stringify(user))}><FaEllipsisH /></td>

                                </tr>
                            ))
                        }


                    </tbody>

                </table>
            </div>
        </AdminLayout>

    )
}

export default adminDashboard;