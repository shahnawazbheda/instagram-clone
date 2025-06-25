'use client'
import { FormEvent, useEffect, useState } from 'react';
import Spinner from './Spinner';
import { registerUser } from '../utils/Api';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from 'next/image';

const VerifyEmail: React.FC = () => {
    const router = useRouter();
    const [loading, setLoading] = useState<Boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [error, setError] = useState<string>('');

    const handleRegister = async () => {
        setLoading(true);
        try {
            setLoading(true);
            const userData = {
                email,
            };
            await registerUser(userData);
            toast.success("Send OTP successful!");
            setLoading(false);
            router.push('signup');
        }
        catch (error) {
            console.log(error);
            setLoading(false);
            toast.error("Invalid Email");
            
        }
    };

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                setError('');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [error]);
    return (
        <>
            {loading && (
                <div className="fixed z-30 inset-0 flex items-center justify-center bg-gray-700 bg-opacity-75">
                    <Spinner />
                </div>
            )}
          
        <ToastContainer />
            <div className="flex flex-col ms:mt-0  h-screen justify-center items-center content-center    md:ms-0 md:px-6 md:p-16 p-5">
                <div className=" md:w-1/4 w-full p-12 bg-white border border-gray-200  shadow ">
                    <div className="sm:mx-auto   p-3 flex flex-col justify-center items-center">
                        <Image
                        priority={true}
                        width={500}
                        height={500}
                        alt="Profile"
                        src='/assets/lock-removebg-preview.png' className='md:w-52 w-64' />

                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form className="space-y-3" onSubmit={(e: FormEvent) => { e.preventDefault(); handleRegister(); }} >
                            <div>

                                <div className="mt-2">
                                    <input

                                        type="email"
                                        placeholder='Enter email address'
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="block w-full  border-0 py-3.5 px-2.5 text-gray-900 shadow-sm   placeholder:text-gray-400   bg-gray-50"

                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    onClick={() => setLoading(true)}
                                    type="submit"
                                    className="flex w-full justify-center rounded-xl bg-[#4CB5F9] px-3 py-2.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Verify
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <a href='/signin' onClick={() => setLoading(true)} className=" md:w-1/4 bg-gray-50  w-full p-3  border mb-5 border-gray-200  shadow ">
                    <div className='text-center'>
                        <p> Back to login</p>
                    </div>
                </a>
            </div>

            
        </>
    )
}
export default VerifyEmail;