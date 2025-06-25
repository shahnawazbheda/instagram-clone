
'use client'
import { FormEvent, useEffect, useState } from 'react';
import Spinner from './Spinner';
import { VerifyUser } from '../utils/Api';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from 'next/image';
const SignUp: React.FC = () => {

    const [loading, setLoading] = useState<Boolean>(false);
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [mobile, setMobile] = useState<string>('');
    const [userName, setUserName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [bio, setBio] = useState<string>('');
    const [otp, setOTP] = useState<string>('');

    const [error, setError] = useState<string>('');
    const router = useRouter();


    const handleVerify = async () => {
        setLoading(true);
        try {
            setLoading(true);
            const userData = {
                name,
                email,
                mobile,
                userName,
                password,
                bio,
                otp
            };
            await VerifyUser(userData);
            toast.success("Register successful!")   
            setLoading(false);
            router.push('signin');
        }
        catch (error) {
            console.log(error);
            setLoading(false);
            toast.error("Invalid Email")

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
            <div className="flex flex-col justify-self-center items-center content-center h-screen  md:ms-0 md:px-6 md:p-16 p-10 mb-16">
                <div className=" md:w-1/4 w-full md:p-12 p-5 bg-white border border-gray-200  shadow ">
                    <div className="sm:mx-auto   p-3 flex flex-col justify-center items-center">
                        <Image 
                        priority={true}
                        width={500}
                        height={500}
                        alt="Profile"
                        src='/assets/Title-removebg-preview.png' className='md:w-52 w-32' />
                    </div>
                    <p className='text-center md:text-xl text-gray-700 font-medium'>Sign up to see photos and videos from your friends</p>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form className="space-y-3" onSubmit={(e: FormEvent) => { e.preventDefault(); handleVerify(); }}>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    placeholder='Enter Name'
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="block w-full  border-0 py-3.5 px-2.5 text-gray-900 shadow-sm   placeholder:text-gray-400  bg-gray-50"
                                />
                            </div>

                            <div>
                                <input
                                    type="email"
                                    placeholder='Enter Email'
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full  border-0 py-3.5 px-2.5 text-gray-900 shadow-sm   placeholder:text-gray-400   bg-gray-50"
                                />
                            </div>

                            <div >
                                <input
                                    value={mobile}
                                    onChange={(e) => setMobile(e.target.value)}
                                    type="number"

                                    placeholder='Enter Mobile'
                                    required
                                    className="block w-full  border-0 py-3.5 px-2.5 text-gray-900 shadow-sm   placeholder:text-gray-400   bg-gray-50"

                                />
                            </div>
                            <div >
                                <input

                                    type="text"
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                    placeholder='Enter UserName'
                                    required
                                    className="block w-full  border-0 py-3.5 px-2.5 text-gray-900 shadow-sm   placeholder:text-gray-400   bg-gray-50"

                                />
                            </div>

                            <div >
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    placeholder='Password'
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full  border-0 py-3.5 px-2.5 text-gray-900 shadow-sm   placeholder:text-gray-400   bg-gray-50"

                                />
                            </div>

                            <div >
                                <textarea


                                    value={bio}
                                    onChange={(e) => setBio(e.target.value)}
                                    placeholder='Enter Bio'
                                    required
                                    className="block w-full  border-0 py-3.5 px-2.5 text-gray-900 shadow-sm   placeholder:text-gray-400   bg-gray-50"

                                />
                            </div>

                            <div >
                                <input

                                    type="text"
                                    value={otp}
                                    onChange={(e) => setOTP(e.target.value)}
                                    placeholder='Enter OTP'
                                    required
                                    className="block w-full  border-0 py-3.5 px-2.5 text-gray-900 shadow-sm   placeholder:text-gray-400   bg-gray-50"

                                />
                            </div>
                            <div className='text-center text-sm '>
                                <p className='mt-5'>People who use our service may have uploaded your contact information to Instagram. <a href='#'> Learn more</a></p>

                                <p className='mt-5'>By signing up, you agree to our Terms, Privacy Policy and Cookies Policy.</p>
                            </div>
                            <div>
                                <button onClick={() => setLoading(true)}
                                    type="submit"
                                    className="flex w-full justify-center rounded-xl bg-[#4CB5F9] px-3 py-2.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Sign Up
                                </button>
                            </div>
                            <div className='text-center'>
                                <a href='/verify-email'>Can`t Get OTP</a>
                            </div>
                        </form>
                    </div>
                </div>

                <div className=" md:w-1/4 mt-3  w-full p-6 bg-white border border-gray-200  shadow ">
                    <div className='text-center '>
                        Have an account?<a href='/signin' onClick={() => setLoading(true)} className='text-blue-700 font-bold ms-2 '> Log in</a>
                    </div>
                </div>
            </div>

        </>
    )
}

export default SignUp;