

'use client'
import React, { useState } from 'react'
import Spinner from './Spinner';
import { verifyResetOtp } from '../utils/Api';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const VerifyForgotPassword: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [otp, setOtp] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
   
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            await verifyResetOtp({ email, otp: parseInt(otp), newpassword: newPassword });
            toast.success(` Password reset successfully!`);

            setTimeout(() => {
                router.push('/signin');
            }, 2000); 
        } catch (error) {
            console.error('Error:', error);
            toast.error(`Failed to reset password. Please try again.`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {loading && (
                <div className="fixed z-30 inset-0 flex items-center justify-center bg-gray-700 bg-opacity-75">
                    <Spinner />
                </div>
            )}
            
             <ToastContainer />
            <div className="flex flex-col ms:mt-0 justify-self-center items-center content-center h-screen md:ms-0 md:px-6 md:p-16 p-5">
                <div className="md:w-1/4 w-full mt-24 p-12 bg-white border border-gray-200 shadow">
                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form onSubmit={handleSubmit} className="space-y-3">
                            <div>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        placeholder='Enter email address'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="block w-full border-0 py-3.5 px-2.5 text-gray-900 shadow-sm placeholder:text-gray-40 bg-gray-50"
                                    />
                                </div>
                                <div className="mt-5">
                                    <input
                                        type="number"
                                        placeholder='Enter OTP'
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        required
                                        className="block w-full border-0 py-3.5 px-2.5 text-gray-900 shadow-sm placeholder:text-gray-40 bg-gray-50"
                                    />
                                </div>
                                <div className="mt-5">
                                    <input
                                        type="password"
                                        placeholder='Enter New Password'
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        required
                                        className="block w-full border-0 py-3.5 px-2.5 text-gray-900 shadow-sm placeholder:text-gray-40 bg-gray-50"
                                    />
                                </div>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-xl mt-12 bg-[#4CB5F9] px-3 py-2.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Verify OTP
                                </button>
                            </div>
                        </form>
                    </div>
                    <hr className='mt-5' />
                    <div className='text-center mt-5'>
                        <a href='/signup' onClick={() => setLoading(true)} className='text-sm'>Create New Account</a>
                    </div>
                </div>
                <a href='/signin' onClick={() => setLoading(true)} className="md:w-1/4 bg-gray-50 w-full p-3 bg-white border mb-5 border-gray-200 shadow">
                    <div className='text-center'>
                        <p> Back to login</p>
                    </div>
                </a>
            </div>
        </>
    )}
    export default VerifyForgotPassword;
