'use client'
import React, { useState } from 'react';
import Spinner from './Spinner';
import { forgotPassword } from '../utils/Api';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgotPassword: React.FC = () => {
    const [loading, setLoading] = useState<Boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage('');
        try {
            const response = await forgotPassword({ email });
            if (response.data.status) {
                toast.success(`OTP Send Successfully ${email}`);
                router.push('/verify-forgot-password');
            } else {
                setErrorMessage(response.data.message || 'Failed to send reset link');
                toast.success(`Enter valid Email !`);
            }
        } catch (error) {
            console.error('Error sending reset link:', error);
            setErrorMessage('An error occurred while sending the reset link');
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            {loading && (
                <div className="fixed z-30 inset-0 flex items-center justify-center bg-gray-700 bg-opacity-75">
                    <Spinner />
                </div>
            )}

            <ToastContainer />
            <div>
                <nav className="bg-white border-gray-200 shadow-md ">
                    <div className="max-w-screen-xl flex flex-wrap items-center justify-between container mx-auto p-6">
                        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                            <Image
                                priority={true}
                                src="/assets/Title-removebg-preview.png"
                                width={500}
                                height={500}
                                alt="Picture of the author"
                                className="w-32"
                            />
                        </a>
                    </div>
                </nav>
            </div>
            <div className="flex flex-col justify-self-center items-center content-center h-screen md:ms-0 md:px-6 md:p-16 p-5 ">
                <div className="md:w-1/4 w-full p-12 bg-white border border-gray-200 shadow">
                    <div className="sm:mx-auto p-3 flex flex-col justify-center items-center">
                        <Image
                            priority={true}
                            src="/assets/lock-removebg-preview.png"
                            width={500}
                            height={500}
                            alt="Picture of the author"
                            className='md:w-52 w-64'
                        />
                    </div>
                    <p className='text-center text-xl text-gray-700 font-bold'>Trouble with logging in?</p>
                    <div className='text-center text-md text-gray-500'>
                        <p className='mt-5'>Enter your email address, phone number or username, and we&apos;ll send 
                        you a link to get back into your account.</p>
                    </div>
                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form className="space-y-3" onSubmit={handleSubmit}>
                            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                            <div>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        placeholder='Enter email address'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="block w-full border-0 py-3.5 px-2.5 text-gray-900 shadow-sm placeholder:text-gray-400 bg-gray-50"
                                    />
                                </div>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-xl bg-[#4CB5F9] px-3 py-2.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
                <a href='/signin' onClick={() => setLoading(true)} className="md:w-1/4 bg-gray-50 w-full p-3  border mb-5 border-gray-200 shadow">
                    <div className='text-center'>
                        <p>Back to login</p>
                    </div>
                </a>
            </div>
        </>
    )
}

export default ForgotPassword;
