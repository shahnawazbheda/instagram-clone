import Image from 'next/image';
import React from 'react'
import { IoCaretBackOutline } from 'react-icons/io5';
const Notification: React.FC = () => {

    const Suggestons: { id: number; ProfilePIc: string; UserName: string, title: string }[] = [
        {
            id: 1,
            ProfilePIc: '/assets/20190612142752_IMG_2645.JPG',
            UserName: 'i_nawaz_khatri',
            title: 'Suggested for you'
        },
        {
            id: 2,
            ProfilePIc: '/assets/20190612142752_IMG_2645.JPG',
            UserName: 'i_nawaz_khatri',
            title: 'Suggested for you'
        },
        {
            id: 3,
            ProfilePIc: '/assets/20190612142752_IMG_2645.JPG',
            UserName: 'i_nawaz_khatri',
            title: 'Suggested for you'
        },
        {
            id: 4,
            ProfilePIc: '/assets/20190612142752_IMG_2645.JPG',
            UserName: 'i_nawaz_khatri',
            title: 'Suggested for you'
        }, {
            id: 1,
            ProfilePIc: '/assets/20190612142752_IMG_2645.JPG',
            UserName: 'i_nawaz_khatri',
            title: 'Suggested for you'
        },
        {
            id: 2,
            ProfilePIc: '/assets/20190612142752_IMG_2645.JPG',
            UserName: 'i_nawaz_khatri',
            title: 'Suggested for you'
        }

    ];
    return (
        <>
            <nav className="bg-white border-gray-200   shadow-md  md:hidden block">
                <div className="md:max-w-screen-xl flex justify-between  md:container md:mx-auto p-6">
                    <a href="/home" className="flex  space-x-3 rtl:space-x-reverse">
                        <IoCaretBackOutline className='text-4xl' />
                    </a>
                    <div >
                        <p className='text-center text-xl font-medium'>Notifications</p>
                    </div>
                </div>

            </nav >

            <div className="flex flex-col  justify-center items-center md:ms-0    mb-4 mt-8 md:p-20 sm:ml-80 ">
                <p className='text-xl mb-12 text-start'>Suggesteds</p>
                {Suggestons.map((suggests, index) => (
                    <>
                        <div className='flex mt-5' key={index}>
                            <div className="md:w-1/4">
                                <Image width={500}
                                    height={500}
                                    priority={true}
                                    alt="Profile"
                                    src={suggests.ProfilePIc} className='w-14 h-14 ms-4 rounded-full ' />

                            </div>
                            <div className="md:w-full ms-5">
                                <p className='font-medium text-lg'>{suggests.UserName}</p>
                                <p className='text-gray-400 text-md'>{suggests.title}</p>
                            </div>
                            <div className="md:w-[400px]" >
                                <a href='#' className='bg-[#0F9BF7] text-white py-2.5 rounded-xl px-5 font-bold ms-5'>Follow</a>
                            </div>
                        </div>
                    </>
                ))}
            </div>
        </>

    )
}

export default Notification;
