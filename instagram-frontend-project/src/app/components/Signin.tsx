'use client';
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';
import { LoginUserByUserName } from '../utils/Api';
import Spinner from './Spinner';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from 'next/image';

const Signin: React.FC = () => {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const [input, setInput] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');


    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const userData: any = {
                input,
                password,
            };
            const response = await LoginUserByUserName(userData);
            const token = response.data.token;
            if (token) {
                localStorage.setItem('token', token);
                toast.success("Login Successfully");
                setLoading(false);
                router.push('/home');
            } else {
                toast.error("Invalid token received");
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
            toast.error("Invalid Identifier or Password");
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
            <div className="flex flex-col justify-center items-center h-screen p-5 md:px-6 md:py-36 py-28">
                <div className="md:flex mb-4 w-full max-w-4xl">
                    <div className="md:w-1/2 hidden md:flex justify-center items-center">
                        <div className="relative border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[520px] w-[300px] shadow-xl">
                            <div className="w-[148px] h-[8px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute" />
                            <div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[90px] rounded-s-lg" />
                            <div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[150px] rounded-s-lg" />
                            <div className="h-[64px] w-[3px] bg-gray-800 absolute -end-[17px] top-[110px] rounded-e-lg" />
                            <div className="rounded-[2rem] overflow-hidden w-[272px] h-[490px] bg-white">
                                <Image
                                    priority={true}
                                    width={500}
                                    height={500}
                                    alt="Profile"
                                    src="/assets/lg.png" className=" w-full h-fit" />
                            </div>
                        </div>
                    </div>
                    <div className="md:w-1/2 w-full flex flex-col items-center ">
                        <div className="p-12 bg-white border h-full border-gray-200 shadow w-full">
                            <form className="space-y-4" onSubmit={handleLogin}>
                                <input
                                    type="text"
                                    placeholder='Phone number, username or email address'
                                    required
                                    className="block w-full border-0 py-3.5 px-2.5 md:mt-32 text-gray-900 shadow-sm placeholder:text-gray-400 placeholder:text-sm bg-gray-50"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                />
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    placeholder='Password'
                                    required
                                    className="block w-full border-0 py-3.5 px-2.5 text-gray-900 shadow-sm placeholder:text-gray-400 placeholder:text-sm bg-gray-50"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-xl bg-[#4CB5F9] px-3 py-2.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Login
                                </button>
                            </form>
                            <div className="text-sm mt-10 text-center w-full">
                                <a
                                    href="/forgot"
                                    className="text-black hover:text-indigo-500"
                                    onClick={() => setLoading(true)}
                                >
                                    Forgotten your password?
                                </a>
                            </div>
                        </div>
                        <div className="mt-5 p-6 bg-white border border-gray-200 shadow w-full">
                            <div className='text-center'>
                                Don&apos;t have an account?<a href='/verify-email'
                                    onClick={() => {
                                        setLoading(true)
                                    }} className='text-blue-700 font-bold ms-2'>Sign up</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Signin;
