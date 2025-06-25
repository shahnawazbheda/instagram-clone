import React, { FormEvent, useEffect, useState } from 'react';
import { getUserData, LoginUser, LoginUserByUserName } from '../utils/Api';
import { useRouter } from 'next/navigation';
import Spinner from './Spinner';
import Image from 'next/image';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface UserData {
    userName: string;
    name: string;
}

const Suggested: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [Switch, setSwitch] = useState<boolean>(false);
    const [userData, setUserData] = useState<UserData | null>(null);
    const [error, setError] = useState<string>('');
    const router = useRouter();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [success, setSuccess] = useState<string>('');
    const [input, setInput] = useState<string>('');


    const handleSwitchAccount = async (e: FormEvent) => {
        // e.preventDefault();
        // setLoading(true);
        // try {
        //     const userData = {
        //         email,
        //         password,
        //     };
        //     const response = await LoginUser(userData);
        //     const token = response.data.token;
        //     if (token) {
        //         localStorage.setItem('token', token);
        //         setSuccess('Switch Account successful!');
        //         setSwitch(false)
        //         router.push('/profile');
        //     } else {
        //         setError('Invalid token received');
        //         setLoading(false);
        //     }
        // } catch (error) {
        //     console.log(error);
        //     setLoading(false);
        //     setError('Invalid Email or Password');
        // }

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
                router.push('/profile');
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
        const fetchUserData = async () => {
            try {
                const token:any = localStorage.getItem('token');
                if (token) {
                    const response:any = await getUserData();
                    const responseData = response.data;

                    if (responseData && responseData.data && responseData.data.userName && responseData.data.name) {
                        setUserData({
                            userName: responseData.data.userName,
                            name: responseData.data.name
                        });
                        setLoading(false);
                    } else {
                        setLoading(false);
                        setError('User data does not have userName and name');
                    }
                } else {
                    setLoading(false);
                    setError('Token not found in localStorage');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                setLoading(false);
                setError('Error fetching user data');
            }
        };

        fetchUserData();
    }, []);

    const Suggestons: { id: number; ProfilePIc: string; UserName: string, title: string }[] = [
        {
            id: 1,
            ProfilePIc: 'https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=600',
            UserName: 'i_nawaz_khatri',
            title: 'Suggested for you'
        },
        {
            id: 2,
            ProfilePIc: 'https://images.pexels.com/photos/919278/pexels-photo-919278.jpeg?auto=compress&cs=tinysrgb&w=600',
            UserName: 'i_nawaz_khatri',
            title: 'Suggested for you'
        },
        {
            id: 3,
            ProfilePIc: 'https://images.pexels.com/photos/697259/pexels-photo-697259.jpeg?auto=compress&cs=tinysrgb&w=600',
            UserName: 'i_nawaz_khatri',
            title: 'Suggested for you'
        },
        {
            id: 4,
            ProfilePIc: 'https://images.pexels.com/photos/1089855/pexels-photo-1089855.jpeg?auto=compress&cs=tinysrgb&w=600',
            UserName: 'i_nawaz_khatri',
            title: 'Suggested for you'
        }, {
            id: 1,
            ProfilePIc: 'https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=600',
            UserName: 'i_nawaz_khatri',
            title: 'Suggested for you'
        },
        {
            id: 2,
            ProfilePIc: 'https://images.pexels.com/photos/919278/pexels-photo-919278.jpeg?auto=compress&cs=tinysrgb&w=600',
            UserName: 'i_nawaz_khatri',
            title: 'Suggested for you'
        }

    ];

    return (
        <>
            {/* {loading && (
                <div className="fixed z-30 inset-0 flex items-center justify-center bg-gray-700 bg-opacity-75">
                    <Spinner />
                </div>
            )} */}
            <ToastContainer />
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


            {error && <p>{error}</p>}

            {!loading && !error && (
                <>
                    <div className="flex mb-4 mt-5">
                        <div className="w-1/4">
                            <Image
                            priority={true}
                                width={500}
                                height={500}
                                alt="Profile"
                                src="/assets/userDPNew-removebg-preview.png" className="w-14 h-14 ms-4 rounded-full" />
                        </div>
                        <div className="w-full ms-5">
                            {userData ? (
                                <>
                                    <a href={`/profile`} onClick={() => setLoading(true)} className="font-medium text-lg">
                                        {userData.userName}
                                    </a>
                                    <p className="text-gray-400 text-md">{userData.name}</p>
                                </>
                            ) : (
                                <p>No user data available</p>
                            )}
                        </div>
                        <div className="w-1/4">
                            <a href="#" className="text-[#0F9BF7] font-bold" onClick={() => setSwitch(true)}>
                                Switch
                            </a>
                        </div>
                    </div>

                    {Switch && (
                        <>
                            <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none backdrop-brightness-75 focus:outline-none">

                                <div className="block p-6 w-[400px] h-[411px] bg-white border border-gray-200 rounded-2xl shadow ">
                                    <div className='flex justify-end'>
                                        <button onClick={() => setSwitch(false)} className='text-end   font-medium text-3xl'>X</button>
                                    </div>
                                    <div className='p-12 flex justify-center flex-col items-center'
                                    >
                                        <Image
                                        priority={true}
                                            width={500}
                                            height={500}
                                            alt="Profile"
                                            src='/assets/Title-removebg-preview.png' className='w-[175px] h-[51px] ' />



                                        <form className="space-y-4 w-full mt-5" onSubmit={handleSwitchAccount}>

                                            {/* <input
                                                type="text"
                                                placeholder='Phone number, username or email address'
                                                required
                                                className="block w-full border-0 py-3.5 px-2.5 text-gray-900 shadow-sm placeholder:text-gray-400 placeholder:text-sm bg-gray-50"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
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
                                            /> */}

                                            <input
                                                type="text"
                                                placeholder='Phone number, username or email address'
                                                required
                                                className="block w-full border-0 py-3.5 px-2.5 text-gray-900 shadow-sm placeholder:text-gray-400 placeholder:text-sm bg-gray-50"
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
                                </div>

                            </div>

                        </>
                    )
                    }

                    <div className="mt-10">
                        <div className="font-medium flex justify-between">
                            <p className="text-lg text-gray-500">Suggested for you</p>
                            <a href="/people" className="text-black">
                                See All
                            </a>
                        </div>
                    </div>

                    <div>
                        <div className="flex flex-col mb-4 mt-8">
                            {Suggestons.map((item) => (
                                <div className="flex mt-5" key={item.id}>
                                    <div className="w-1/4">
                                        <img
                                            src={item.ProfilePIc}
                                            className="w-14 h-14 ms-4 rounded-full"
                                            alt="Profile"
                                        />
                                    </div>
                                    <div className="w-full ms-5">
                                        <p className="font-medium text-lg">{item.UserName}</p>
                                        <p className="text-gray-400 text-md">{item.title}</p>
                                    </div>
                                    <div className="w-1/4">
                                        <a href="#" className="text-[#0F9BF7] font-bold ms-5">
                                            Follow
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default Suggested;


