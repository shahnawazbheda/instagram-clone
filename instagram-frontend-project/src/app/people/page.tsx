
'use client';
import React, { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar';
import { IoCaretBackOutline } from "react-icons/io5";


const page: React.FC = () => {
    const [token, setToken] = useState('');

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
        }
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
            <div className='md:block hidden'>
                <Sidebar token={token} isNotification1={false} />
            </div>
            
            <div>
                <nav className="bg-white border-gray-200  shadow-md  md:hidden block">
                    <div className="md:max-w-screen-xl flex justify-between md:container md:mx-auto p-6">
                        <a href="/home" className="flex items-center space-x-3 rtl:space-x-reverse">
                            <IoCaretBackOutline className='text-4xl'/>
                        </a>
                        <div className='md:ms-48 ms-28'>
                            <p className='text-center text-xl font-medium'>Discover people</p>
                        </div>
                    </div>

                </nav >
                <div className="flex flex-col  justify-center items-center md:ms-0  mb-4 mt-8 md:p-20 sm:ml-80 ">
                    <p className='text-xl mb-12 text-start'>Suggesteds</p>
                    {Suggestons.map((items, index) => (
                        <>
                            <div key={index} className='flex mt-5'>
                                <div className="md:w-1/4">
                                    <img src={items.ProfilePIc} className='w-14 h-14 ms-4 rounded-full ' />
                                </div>
                                <div className="md:w-full ms-5">
                                    <p className='font-medium text-lg'>{items.UserName}</p>
                                    <p className='text-gray-400 text-md'>{items.title}</p>
                                </div>
                                <div className="md:w-[400px]" >
                                    <a href='#' className='bg-[#0F9BF7] text-white py-2.5 rounded-xl px-5 font-bold ms-5'>Follow</a>
                                </div>
                            </div>
                        </>
                    ))}
                </div>
            </div>

        </>
    )
}

export default page;
