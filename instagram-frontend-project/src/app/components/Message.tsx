
'use client'
import React, { useState, useEffect } from 'react';
import { AiOutlinePicture } from 'react-icons/ai';
import { IoCallOutline, IoMicOutline } from 'react-icons/io5';
import { CiVideoOn } from 'react-icons/ci';
import { FaRegHeart } from 'react-icons/fa';
import { PiNotePencilBold } from "react-icons/pi";
import { IoMdInformationCircleOutline, IoMdNotificationsOutline } from 'react-icons/io';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from 'next/image';

const Message: React.FC = () => {
    const [messages, setMessages] = useState<string[]>([]);
    const [newMessage, setNewMessage] = useState<string>('');
    const [details, setDetails] = useState<boolean>(false);

        const toggleButton = () => {
            setDetails(!details)
        }

    useEffect(() => {
        const storedMessages = localStorage.getItem('messages');
        if (storedMessages) {
            setMessages(JSON.parse(storedMessages));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('messages', JSON.stringify(messages));
    }, [messages]);

    const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (newMessage.trim() !== '') {
            setMessages([...messages, newMessage]);
            setNewMessage('');
        }
    };

    const handleSendHeart = () => {
        setMessages([...messages, '❤️']);
    };

    return (
        <>
            <ToastContainer />
            <div className='sm:ml-80 flex'>
                <div className="block w-full h-screen md:w-1/2 bg-white border border-gray-200">
                    <nav>
                        <div className='flex justify-between md:p-2.5 p-7 mt-3'>
                            <p className='text-2xl font-bold ms-5'>_shahnawaz_khatri_29</p>
                            <p><PiNotePencilBold className='text-4xl' /></p>
                        </div>
                        <hr className='border-gray-300 mt-5' />
                        <div className=''>
                            <div className='mt-5 flex justify-between p-2'>
                                <p className='font-bold text-xl'>Message</p>
                                <p className='text-lg text-gray-400'>Requests</p>
                            </div>
                        </div>
                        <div className='overflow-y-scroll md:h-[470px] sm:h-[400px] xxs:h-[500px] scrollhide'>
                            <div className='overflow-y-scroll md:h-[470px] h-[400px] scrollhide'>
                                <div className="flex mt-5 hover:bg-gray-100 " >
                                    <div className="md:w-1/4">
                                        <Image
                                        priority={true}
                                            width={500}
                                            height={500}

                                            src="/assets/20190612142752_IMG_2645.JPG"
                                            className="w-14 h-14 ms-4 rounded-full"
                                            alt="Profile"
                                        />
                                    </div>
                                    <div className="w-full ms-5 ">
                                        <p className="font-medium text-lg">i_nawaz_khatri</p>
                                        <p className="text-gray-400 text-md">You sent an attachment.</p>
                                    </div>
                                </div>

                                <div className="flex mt-5 hover:bg-gray-100 " >
                                    <div className="md:w-1/4">
                                        <Image
                                        priority={true}
                                            width={500}
                                            height={500}
                                            src="/assets/20190612142752_IMG_2645.JPG"
                                            className="w-14 h-14 ms-4 rounded-full"
                                            alt="Profile"
                                        />
                                    </div>
                                    <div className="w-full ms-5 ">
                                        <p className="font-medium text-lg">i_nawaz_khatri</p>
                                        <p className="text-gray-400 text-md">You sent an attachment.</p>
                                    </div>
                                </div>

                                <div className="flex mt-5 hover:bg-gray-100 " >
                                    <div className="md:w-1/4">
                                        <Image
                                            width={500}
                                            height={500}
                                            priority={true}
                                            src="/assets/20190612142752_IMG_2645.JPG"
                                            className="w-14 h-14 ms-4 rounded-full"
                                            alt="Profile"
                                        />
                                    </div>
                                    <div className="w-full ms-5">
                                        <p className="font-medium text-lg">i_nawaz_khatri</p>
                                        <p className="text-gray-400 text-md">You sent an attachment.</p>
                                    </div>
                                </div>

                                <div className="flex mt-5 hover:bg-gray-100 " >
                                    <div className="md:w-1/4">
                                        <Image
                                            width={500}
                                            height={500}
                                            priority={true}
                                            src="/assets/20190612142752_IMG_2645.JPG"
                                            className="w-14 h-14 ms-4 rounded-full"
                                            alt="Profile"
                                        />
                                    </div>
                                    <div className="w-full ms-5 ">
                                        <p className="font-medium text-lg">i_nawaz_khatri</p>
                                        <p className="text-gray-400 text-md">You sent an attachment.</p>
                                    </div>
                                </div>

                                <div className="flex mt-5 hover:bg-gray-100 " >
                                    <div className="md:w-1/4">
                                        <Image
                                            width={500}
                                            height={500}
                                            priority={true}
                                            src="/assets/20190612142752_IMG_2645.JPG"
                                            className="w-14 h-14 ms-4 rounded-full"
                                            alt="Profile"
                                        />
                                    </div>
                                    <div className="w-full ms-5 ">
                                        <p className="font-medium text-lg">i_nawaz_khatri</p>
                                        <p className="text-gray-400 text-md">You sent an attachment.</p>
                                    </div>
                                </div>

                                <div className="flex mt-5 hover:bg-gray-100 " >
                                    <div className="md:w-1/4">
                                        <Image
                                            width={500}
                                            priority={true}
                                            height={500}
                                            src="/assets/20190612142752_IMG_2645.JPG"
                                            className="w-14 h-14 ms-4 rounded-full"
                                            alt="Profile"
                                        />
                                    </div>
                                    <div className="w-full ms-5">
                                        <p className="font-medium text-lg">i_nawaz_khatri</p>
                                        <p className="text-gray-400 text-md">You sent an attachment.</p>
                                    </div>

                                </div>


                                <div className="flex mt-5 hover:bg-gray-100 " >
                                    <div className="md:w-1/4">
                                        <Image
                                        priority={true}
                                            src="/assets/20190612142752_IMG_2645.JPG"
                                            className="w-14 h-14 ms-4 rounded-full"
                                            width={500}
                                            height={500}
                                            alt="Profile"
                                        />
                                    </div>
                                    <div className="w-full ms-5 ">
                                        <p className="font-medium text-lg">i_nawaz_khatri</p>
                                        <p className="text-gray-400 text-md">You sent an attachment.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </nav >
                </div >

                <div className='w-full bg-white border border-gray-200 md:block hidden'>
                    <div className="flex flex-col md:h-full h-[90%] justify-between ">
                        <header>
                            <div className='flex justify-between p-4'>
                                <div className='flex'>
                                    <Image
                                    width={500}
                                    height={500}
                                    priority={true}
                                    src="/assets/myimage01.png" className='w-14 md:h-14 h-12 md:mt-0 mt-3  rounded-full' alt="Profile" />
                                    <a href='/people-profile' className='ms-5 mt-4 font-medium'>Shahnawaz Bheda</a>
                                </div>
                                <div className='flex left-0 p-1'>
                                    <button className='md:ms-5 text-3xl'><IoCallOutline /></button>
                                    <button className='md:ms-5 text-4xl'><CiVideoOn /></button>
                                    <button onClick={toggleButton} className={`md:ms-5 text-4xl `}><IoMdInformationCircleOutline /></button>
                                </div>
                            </div>
                            <hr className='border-gray-300' />
                        </header>

                        <main className="block  mb-auto h-[60%] overflow-y-scroll scrollhide mt-3">
                            {messages.map((message, index) => (
                                <div key={index} className="flex justify-end me-3 mt-1 ">
                                    <p className={`text-md py-2 px-3 rounded-full text-center ${message === '❤️' ? 'bg-transparent text-4xl ' : 'bg-blue-500 text-white'}`}>
                                        {message}
                                    </p>

                                </div>
                            ))}
                        </main>

                        <footer>
                            <form onSubmit={handleSendMessage} className='border border-gray-400 w-[98%] md:ms-3 ms-1 mb-3 p-3 rounded-full'>
                                <div className='flex justify-between'>
                                    <div className='w-full flex'>
                                        <div><button type="button" className='text-2xl'>😀</button></div>
                                        <div className='ms-3 w-full'>
                                            <input
                                                type="text"
                                                placeholder='Message...'
                                                className='w-full py-1 focus:outline-none focus:ring focus:ring-transparent'
                                                value={newMessage}
                                                onChange={(e) => setNewMessage(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className='flex me-3'>
                                        <button type="button" className='ms-5 text-3xl '><IoMicOutline /></button>
                                        <button type="button" className='ms-4 text-3xl '><AiOutlinePicture /></button>
                                        <button type="button" onClick={handleSendHeart} className='ms-4 text-3xl'><FaRegHeart /></button>
                                    </div>
                                </div>
                            </form>
                        </footer>
                    </div>
                </div>

                {details && (
                    <>
                        <div className="w-1/2" >
                            <div className='p-7'>
                                <p className='text-2xl font-semibold'>Details</p>
                            </div>
                            <hr className='border-gray-300' />
                            <div className='flex justify-between p-5'>
                                <div className='text-xl flex'>
                                    <p className='text-4xl'><IoMdNotificationsOutline /></p>
                                    <p className='ms-3 mt-1'>Mute messages</p>
                                </div>
                                <div>
                                    <label className="inline-flex items-center cursor-pointer mt-1">
                                        <input type="checkbox" className="sr-only peer" />
                                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4  rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full  after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white  after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-black" />
                                    </label>
                                </div>
                            </div>
                            <hr className='border-gray-300' />
                            <div className='md:h-[57%] h-[45%]'>
                                <p className='p-5 text-xl font-semibold'>Members</p>
                                <div className='hover:bg-gray-50'>
                                    <div className='flex p-3 ms-3 '>
                                        <div>
                                            <Image
                                            width={500}
                                            height={500}
                                            priority={true}
                                            src="/assets/myimage01.png" className='md:w-14 w-12 md:h-14 h-12 md:mt-0 mt-3  rounded-full' alt="Profile" />
                                        </div>
                                        <div className='ms-5'>
                                            <p className='font-medium text-md'>i_nawaz_khatri_07</p>
                                            <p>شاہ نواز</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <hr className='border-gray-300' />
                            <div className='flex flex-col text-red-500 text-xl p-5'>
                                <a href='#'>Report</a>
                                <a href='#' className='mt-5'>Block</a>
                                <a href='#' className='mt-5'>Delete Chat</a>
                            </div>
                        </div>
                    </>
                )}
            </div >
        </>
    );
}

export default Message;
