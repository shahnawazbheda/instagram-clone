'use client'
import React, { useState } from 'react'
import Sidebar from './Sidebar';
import { changePassword } from '../utils/Api';
import { useRouter } from 'next/navigation';

const ChangesPassword: React.FC = () => {
    const [password, setPassword] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await changePassword({ password, newpassword: newPassword });
            if (response.data.status) {
                localStorage.removeItem('token');
                router.push('/signin');
            } else {
                setErrorMessage(response.data.message || 'Failed to change password');
            }
        } catch (error) {
            console.error('Error changing password:', error);
            setErrorMessage('An error occurred while changing the password');
        }
    }

    return (
        <>
            <Sidebar />
            <div className="md:p-4 sm:ml-80">
                <p className='text-2xl ms-5 mt-5 font-medium'>Change Password</p>
                <form className="md:p-32 p-12 mx-auto" onSubmit={handleSubmit}>
                    {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
                    <div className="mb-5">
                        <label className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                        <input type="password" id="password" placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="newpassword" className="block mb-2 text-sm font-medium text-gray-900">New Password</label>
                        <input type="password" placeholder='Enter New Password' id="newpassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                    </div>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Change Password</button>
                </form>
            </div>
        </>
    )
}

export default ChangesPassword;
