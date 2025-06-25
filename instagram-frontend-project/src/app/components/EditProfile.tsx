'use client'
import React, { useState, useEffect, FormEvent } from 'react';
import Sidebar from './Sidebar';
import { useRouter } from 'next/navigation';
import { getUserData, updateUserData } from '../utils/Api';
import Spinner from './Spinner';
// import { authContext } from './authContext';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditProfile: React.FC = () => {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');

    const [formData, setFormData] = useState<any>({
        name: '',
        mobile: '',
        userName: '',
        bio: ''
    });
    
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response:any = await getUserData();
                setFormData(response.data);
                setIsFetching(false); 
            } catch (error) {
                console.error("Error fetching user data:", error);
                setIsFetching(false); 
                setError('Error fetching user data');
            }
        };

        fetchUserData(); 
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await updateUserData(formData); 
            
            toast.success('Profile updated successfully!')
            setLoading(false);
            router.push('/profile');
        } catch (error: any) {
            setLoading(false);
            if (error.response && error.response.data) {
                toast.error(error.response.data.errors || {});
            } else {
                toast.error('There was an error updating the profile!')
            }
        }
    };

    if (isFetching) {
        return (
            <div className="fixed z-30 inset-0 flex items-center justify-center bg-gray-700 bg-opacity-75">
                <Spinner />
            </div>
        );
    }
<ToastContainer />
    return (
        <>
            {loading && (
                <div className="fixed z-30 inset-0 flex items-center justify-center bg-gray-700 bg-opacity-75">
                    <Spinner />
                </div>
            )}
            {error && (
                <div className="fixed top-0 right-0 m-4 p-4 bg-red-500 text-white rounded shadow-lg">
                    {error}
                </div>
            )}
            {success && (
                <div className="fixed top-0 right-0 m-4 p-4 bg-green-500 text-white rounded shadow-lg">
                    {success}
                </div>
            )}
            <Sidebar />
            <div className="md:p-4 sm:ml-80">
                <p className='text-2xl ms-5 mt-5 font-bold'>Edit Profile</p>
                <form className="md:mt-10 md:p-0 p-12 mx-auto" onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <label className="block mb-2 text-sm font-medium text-gray-900">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="Enter Your Name"
                            required
                        />
                        
                    </div>
                    <div className="mb-5">
                        <label className="block mb-2 text-sm font-medium text-gray-900">Mobile</label>
                        <input
                            type="text"
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="Enter Mobile Number"
                            required
                        />
                       
                    </div>
                    <div className="mb-5">
                        <label className="block mb-2 text-sm font-medium text-gray-900">UserName</label>
                        <input
                            type="text"
                            name="userName"
                            value={formData.userName}
                            onChange={handleChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="Enter Your Username"
                            required
                        />
                    </div>
                    <div className="mb-5">
                        <label className="block mb-2 text-sm font-medium text-gray-900">Bio</label>
                        <textarea
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            placeholder="Enter Your Bio"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            required
                        />
                    </div>
                    <div className='flex'>
                        <button
                            type="submit"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                        >
                            Submit
                        </button>
                        <a
                            href='/profile'
                            className="text-white ms-5 bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                        >
                            Cancel
                        </a>
                    </div>
                </form>
            </div>
        </>
    );
};

export default EditProfile;
