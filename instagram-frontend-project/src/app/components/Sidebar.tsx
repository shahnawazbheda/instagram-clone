'use client'
import { useRouter } from 'next/navigation';
import React, { FormEvent, useEffect, useState } from 'react';
import { BiSolidVideos } from 'react-icons/bi';
import { CiBrightnessUp } from 'react-icons/ci';
import { FaRegCompass, FaRegHeart, FaRegSave } from 'react-icons/fa';
import { FaThreads } from 'react-icons/fa6';
import { FiSettings } from 'react-icons/fi';
import { IoIosMenu, IoLogoInstagram, IoMdAddCircleOutline } from 'react-icons/io';
import { IoAddCircleOutline, IoHomeOutline, IoHomeSharp, IoSearchOutline } from 'react-icons/io5';
import { LuActivitySquare } from 'react-icons/lu';
import { RiLockPasswordLine } from 'react-icons/ri';
import { TbMessage2Heart, TbMessageHeart, TbMessageReport } from 'react-icons/tb';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRequireAuth } from '../components/useRequireAuth';
import { getNotification, SearchUser, uploadPost } from '../utils/Api';
import Image from 'next/image';
import Link from 'next/link';

interface User {
    userName: string;
    name: string;
    _id: string;
}

interface Notification {
    _id: string;
    actorId: {
        userName: string;
    };
    postId?: {
        title: string;
    };
    commentId?: {
        content: string;
    };
    type: string;
    createdAt: string;
}


export default function Sidebar({ token, isNotification1 }: { token: string, isNotification1: boolean }) {

    const [open, setOpen] = useState(true);
    const [isSubSidebar, setIsSubSidebar] = useState<boolean>(false);
    const [isNotification, setisNotification] = useState<boolean>(false);
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const router = useRouter();
    const [moreOption, setMoreOption] = useState(false);
    const [AddPost, setAddPost] = useState<boolean>(false);
    const [caption, setCaption] = useState('');
    const [files, setFiles] = useState<FileList | null>(null);
    const [error, setError] = useState('');
    const [search, setSearch] = useState('');
    const [results, setResults] = useState<User[]>([]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const response = await getNotification(token)
                    setNotifications(response.data.data);
                } else {
                    setError('Token not found in localStorage');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                setError('Error fetching user data');
            }
        };
        fetchUserData();
    }, []);

    useEffect(() => {
        if (search.length > 0) {
            const fetchResults = async () => {
                try {
                    const response = await SearchUser(search, token);
                    setResults(response.data.data);

                    console.log('Search Response', response.data.data[0]?._id);

                } catch (error) {
                    console.error('Error searching users:', error);
                }
            };

            fetchResults();
        } else {
            setResults([]);
        }
    }, [search, token]);

    const handleClickSearch = () => {
        router.push('/peouple-profile')
    }

    const toggleButton = () => {
        setMoreOption(!moreOption)
    }

    useRequireAuth();
    const handleLogout = () => {
        toast.success('Logout Successfully');
        localStorage.removeItem('token');
        router.push('/');
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFiles(e.target.files);
        }
    };

    const handlePost = async (e: FormEvent) => {
        if (!files || files.length === 0) {
            setError('Please upload a file');
            return;
        }

        const formData: any = new FormData();
        formData.append('caption', caption);

        for (let i = 0; i < files.length; i++) {
            formData.append('files', files[i]);
        }

        try {
            const response = await uploadPost(formData);
            const token = response.data.token;
            toast.success('Post Successfully Add');
            router.push('profile');
            if (token) {
                localStorage.setItem('token', token);
            }

        } catch (error) {
            console.error(error);
            setError('An error occurred while uploading the post');
        }
    };

    return (
        <>
            <ToastContainer />

            <aside id="separator-sidebar" className={`fixed  top-0 left-0 h-screen 
            transition-transform -translate-x-full sm:translate-x-0 border-gray-200  
                 ${open ? 'w-80 ' : 'w-1/3'}`} aria-label="Sidebar">
                <div className={`shadow-xl h-screen p-2 flex flex-col duration-500  overflow-y-scroll scrollhide 
                    ${open ? 'w-full' : 'w-20'}`} >
                    <nav>
                        <div className="h-full py-1 overflow-y-auto  "  >
                            <ul className="space-y-2 font-medium">
                                <li className='py-6'>
                                    <a href="/home" className="flex items-center p-2 text-gray-900 rounded-lg ">
                                        <IoLogoInstagram className={`text-4xl ${open ? 'hidden' : 'block'}`} />
                                        <Image
                                            priority={true}
                                            width={500}
                                            height={500}
                                            alt="Profile"
                                            src='/assets/Title-removebg-preview.png'
                                            className={`w-[103px] h-[29px]  ${open ? 'block' : 'hidden'}`}
                                        />
                                    </a>
                                </li>
                                <li>
                                    <a href="/home" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100">
                                        <IoHomeOutline className='text-4xl' />
                                        <span className={`flex-1 ms-4 whitespace-nowrap text-xl  ${open ? 'block' : 'hidden'}`}>Home</span>
                                    </a>
                                </li>
                                <li>
                                    <button onClick={() => {
                                        setOpen(!open);
                                        setIsSubSidebar(true);
                                        setisNotification(false)
                                        console.log('Search Click');
                                    }}
                                        className="flex items-center mt-4 p-3 text-gray-900 rounded-lg hover:bg-gray-100">
                                        <IoSearchOutline className='text-4xl' />
                                        <span className={`flex-1 ms-4 whitespace-nowrap text-xl font-normal  ${open ? 'block' : 'hidden'}`} >Search</span>
                                    </button>
                                </li>
                                <li>
                                    <a href="/explore" className="flex items-center mt-4 p-3 text-gray-900 rounded-lg hover:bg-gray-100">
                                        <FaRegCompass className='text-4xl' />
                                        <span className={`flex-1 ms-3 whitespace-nowrap text-xl font-normal ${open ? 'block' : 'hidden'}`} >Explore</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="/reels" className="flex mt-4 items-center p-3 ms-1 text-gray-900 rounded-lg hover:bg-gray-100">
                                        <BiSolidVideos className='text-4xl' />
                                        <span className={`flex-1 ms-4 whitespace-nowrap text-xl font-normal  ${open ? 'block' : 'hidden'}`} >Reels</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="/message" className={`flex mt-4 items-center p-3 ms-1 text-gray-900 rounded-lg hover:bg-gray-100`}>
                                        <TbMessageHeart className='text-4xl' />
                                        <span className={`flex-1 ms-3 whitespace-nowrap text-xl font-normal  ${open ? 'block' : 'hidden'}`} >Messages</span>
                                    </a>
                                </li>
                                <li>
                                    <button onClick={() => {
                                        setOpen(!open);
                                        setisNotification(true);
                                        setIsSubSidebar(false)
                                        console.log('notification Click');


                                    }} className="flex items-center mt-4 p-3 text-gray-900 rounded-lg hover:bg-gray-100">
                                        <FaRegHeart className='text-4xl' />
                                        <span className={`flex-1 ms-4 whitespace-nowrap text-xl font-normal  ${open ? 'block' : 'hidden'}`} >Notifications</span>
                                    </button>
                                </li>

                                <li>
                                    <button onClick={() => setAddPost(true)} className="flex mt-4 items-center p-3 ms-1 text-gray-900 rounded-lg hover:bg-gray-100">
                                        <IoMdAddCircleOutline className='text-4xl' />
                                        <span className={`flex-1 ms-3 whitespace-nowrap text-xl font-normal   ${open ? 'block' : 'hidden'}`} >Create</span>
                                    </button>
                                </li>

                                <li>
                                    <a href="/profile" className="flex mt-4 items-center p-3 ms-1 text-gray-900 rounded-lg hover:bg-gray-100">
                                        <Image
                                            priority={true}
                                            width={500}
                                            height={500}
                                            alt="Profile"
                                            src='/assets/userDPNew-removebg-preview.png' className='w-9 h-9  rounded-2xl' />
                                        <span className={`flex-1 ms-3 whitespace-nowrap text-xl font-normal   ${open ? 'block' : 'hidden'}`} >Profile</span>
                                    </a>
                                </li>

                                <li>
                                    <div onClick={toggleButton} className="flex relative mt-4 items-center p-3 ms-1 text-gray-900 rounded-lg hover:bg-gray-100">
                                        <IoIosMenu className='text-4xl' />
                                        <span className={`flex-1 ms-3 whitespace-nowrap text-xl font-normal   ${open ? 'block' : 'hidden'}`}>More</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        {moreOption && (
                            <div className=' bottom-28 fixed px-7 z-50' onClick={() => setMoreOption(false)}>
                                <><div className=' bottom-28 fixed px-7 z-40'>
                                    <div className=' w-[250px] h-[450px] '>
                                        <div className="block px-5 py-5 text-start bg-white border border-gray-200 rounded-t-xl shadow-2xl ">
                                            <div className="mb-2 text-xl hover:bg-gray-200 hover:rounded-xl py-1.5 px-3  tracking-tight texts-gray-900  flex">
                                                <FiSettings className='mt-1' />
                                                <a href='#' className='ms-3'>Settings</a>
                                            </div>

                                            <div className="mb-2 text-xl hover:bg-gray-200 hover:rounded-xl py-1.5 px-3 tracking-tight mt-5 text-gray-900  flex">
                                                <LuActivitySquare className='mt-1' />
                                                <a href='#' className='ms-3'>Your Activity</a>
                                            </div>

                                            <div className="mb-2 text-xl hover:bg-gray-200 hover:rounded-xl py-1.5 px-3 tracking-tight mt-5 text-gray-900  flex">
                                                <RiLockPasswordLine className='mt-1' />
                                                <a href='/change-password' className='ms-3'>Change Password</a>
                                            </div>

                                            <div className="mb-2 text-xl hover:bg-gray-200 hover:rounded-xl py-1.5 px-3  tracking-tight mt-5 text-gray-900  flex">
                                                <FaRegSave className='mt-1' />
                                                <a href='#' className='ms-3'>Saved</a>
                                            </div>

                                            <div className="mb-2 text-xl hover:bg-gray-200 hover:rounded-xl py-1.5 px-3  tracking-tight mt-5 text-gray-900  flex">
                                                <CiBrightnessUp className='mt-1' />
                                                <a href='#' className='ms-3'>Switch appearance</a>
                                            </div>

                                            <div className="mb-2 text-xl hover:bg-gray-200 hover:rounded-xl py-1.5 px-3 tracking-tight mt-5 text-gray-900  flex">
                                                <TbMessageReport className='mt-1' />
                                                <a href='#' className='ms-3'>Report a problem</a>
                                            </div>
                                        </div>

                                        <div className="block px-5 mt-1 text-start bg-white border border-gray-200  shadow-2xl ">
                                            <div className="mb-2 text-xl hover:bg-gray-200 hover:rounded-xl py-1.5 px-3 tracking-tight mt-5 text-gray-900  flex">
                                                <FaThreads className='mt-1' />
                                                <a href='#' className='ms-3'>Threads</a>
                                            </div>
                                        </div>

                                        <div className="block px-5 py-5 mt-1 text-start bg-white border border-gray-200 rounded-xl shadow-2xl ">
                                            <div className="mb-2 text-xl hover:bg-gray-200 hover:rounded-xl py-1.5 px-3  tracking-tight mt-5 text-gray-900 ">
                                                <a href='#' >Switch Account</a>
                                            </div>
                                            <hr className='border-gray-400 w-full mt-5' />
                                            <div className="mb-2 text-xl hover:bg-gray-200 hover:rounded-xl py-1.5 px-3  tracking-tight mt-5 text-gray-900 ">
                                                <button onClick={handleLogout}>Log out</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                </>
                            </div>
                        )}
                    </nav>
                </div>
            </aside>

            {isSubSidebar && (
                <>
                    <aside id="separator-sidebar1" className={`fixed z-50 top-0 left-20  w-full h-screen transition-transform -translate-x-full sm:translate-x-0 border-gray-200   ${open ? 'hidden' : 'block '}`} aria-label="Sidebar">
                        <div className="flex md:h-screen">
                            <div
                                className={`fixed top-0 left-0 bottom-0 w-1/3 rounded-r-3xl  bg-white shadow-xl transition-transform transform ${isSubSidebar ? 'translate-x-0 ' : '-translate-x-full'
                                    }`}
                            >
                                <div >
                                    <p className='md:p-8 text-3xl font-medium p-3'>Search</p>
                                    <form className="max-w-lg mx-auto p-5">
                                        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                                </svg>
                                            </div>
                                            <input
                                                type="search"
                                                value={search}
                                                onChange={(e) => setSearch(e.target.value)}
                                                id="default-search"
                                                className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                                                placeholder="Search ..."
                                                required
                                            />
                                        </div>
                                        {/* <div className="mt-4">
                                            {results.length > 0 && (
                                                <ul className=" shadow-md rounded-lg ">
                                                    {results.map((user) => (
                                                        <li key={user._id} className="py-2   px-4 hover:bg-gray-100 cursor-pointer">
                                                            <Link
                                                                href={{
                                                                    pathname: '/peouple-profile',
                                                                    query: {
                                                                        userId: user._id
                                                                    }

                                                                }}>
                                                                <div className='flex '>
                                                                    <div>
                                                                        <Image width={500}
                                                                            height={500}
                                                                            priority={true}
                                                                            alt="userDPNew"
                                                                            src='/assets/userDPNew-removebg-preview.png' className='md:w-16 md:h-16 w-12 h-12 ms-4 rounded-full' />
                                                                    </div>
                                                                    <div className='ms-5 mt-2'>
                                                                        <p>{user.userName}</p>
                                                                        <p className="text-gray-500 text-sm">{user.name}</p>
                                                                    </div>
                                                                </div>
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div> */}
                                        <div className="mt-4">
                                            {results.length > 0 && (
                                                <ul className="shadow-md rounded-lg">
                                                    {results.map((user) => (
                                                        <li key={user._id} className="py-2 px-4 hover:bg-gray-100 cursor-pointer">
                                                            <Link
                                                                href={{
                                                                    pathname: '/peouple-profile',
                                                                    query: {
                                                                        userId: user._id
                                                                    }
                                                                }}
                                                                replace
                                                            >
                                                                <div className='flex' onClick={handleClickSearch}>
                                                                    <div>
                                                                        <Image
                                                                            width={500}
                                                                            height={500}
                                                                            priority={true}
                                                                            alt="userDPNew"
                                                                            src='/assets/userDPNew-removebg-preview.png'
                                                                            className='md:w-16 md:h-16 w-12 h-12 ms-4 rounded-full'
                                                                        />
                                                                    </div>
                                                                    <div className='ms-5 mt-2'>
                                                                        <p>{user.userName}</p>
                                                                        <p className="text-gray-500 text-sm">{user.name}</p>
                                                                    </div>
                                                                </div>
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    </form>
                                    <hr className='border-gray-300 mt-10 md:w-full ' />
                                </div>
                            </div>
                        </div>
                    </aside>
                </>
            )}

            {/* {isNotification && (
                <>
                    <aside id="separator-sidebar1" className={`fixed  z-50  top-0 left-20  w-full h-screen transition-transform -translate-x-full sm:translate-x-0 border-gray-200   ${open ? 'hidden' : 'block '}`} aria-label="Sidebar">
                        <div className="flex md:h-screen">
                            <div
                                className={`fixed top-0 left-0 bottom-0 w-1/3 rounded-r-3xl  bg-white shadow-xl transition-transform transform ${isNotification ? 'translate-x-0 ' : '-translate-x-full'
                                    }`}
                            >
                                <div >
                                    <p className='p-8 md:text-3xl text-2xl font-bold'>Notifications</p>

                                    <p className='ms-5 md:text-xl  font-semibold'>New</p>
                                    <div className="flex mt-5 hover:bg-gray-50 md:p-3 justify-between mb-3" >

                                        <div className=' flex'>
                                            <div >
                                                <Image
                                                    priority={true}
                                                    width={500}
                                                    height={500}
                                                    alt="Profile"
                                                    src="/assets/userDPNew-removebg-preview.png"
                                                    className="md:w-14 w-10 h-10 md:h-14 ms-4 rounded-full"

                                                />
                                            </div>
                                            <div className="md:w-64 w-32 md:ms-7 ms-3 ">
                                                <p >
                                                    <span className="font-medium text-lg ">i_nawaz_khatri</span> <span className='text-sm '>liked your reel.</span>
                                                    <span className='ms-2 md:text-sm text-xs font-extralight'>15 h</span>
                                                </p>
                                            </div>
                                        </div>
                                        <div >
                                            <Image
                                                priority={true}
                                                width={500}
                                                height={500}
                                                alt="Profile"
                                                src='/assets/myImage01.PNG' className='md:w-14 w-10 h-10 md:h-14 rounded-lg me-5 ' />
                                        </div>

                                    </div>

                                    <hr className='w-full ' />

                                    <p className='ms-5 md:text-xl font-semibold mt-3'>Today</p>

                                    <div className="flex mt-5 hover:bg-gray-50 md:p-3  justify-between mb-3" >

                                        <div className=' flex'>
                                            <div >
                                                <Image
                                                    priority={true}
                                                    width={500}
                                                    height={500}
                                                    src="/assets/userDPNew-removebg-preview.png"
                                                    className="md:w-14 w-10 h-10 md:h-14 ms-4 rounded-full"
                                                    alt="Profile"
                                                />
                                            </div>
                                            <div className="md:w-64 w-32 md:ms-7 ms-3 ">
                                                <p >
                                                    <span className="font-medium text-lg">i_nawaz_khatri</span>
                                                    <span className='text-sm ms-3 '>started following you.</span>

                                                    <span className='ms-2 font-extralight text-sm '>15 h</span>
                                                </p>
                                            </div>
                                        </div>
                                        <div >
                                            <button className='bg-gray-200 me-3 md:ms-0 ms-5 py-2 px-6 rounded-lg mt-1'>Following</button>
                                        </div>

                                    </div>


                                </div>
                            </div>

                        </div>
                    </aside>
                </>
            )} */}

            {isNotification && (
            <aside
                id="separator-sidebar1"
                className={`fixed z-50 top-0 left-20 w-full h-screen transition-transform -translate-x-full sm:translate-x-0 border-gray-200 ${open ? 'hidden' : 'block '}`}
                aria-label="Sidebar"
            >
                <div className="flex md:h-screen">
                    <div className={`fixed top-0 left-0 bottom-0 w-1/3 rounded-r-3xl bg-white shadow-xl transition-transform transform ${isNotification ? 'translate-x-0 ' : '-translate-x-full'}`}>
                        <div>
                            <p className='p-8 md:text-3xl text-2xl font-bold'>Notifications</p>
                            {notifications.length === 0 ? (
                                <p className="text-center">No notifications</p>
                            ) : (
                                notifications.map(notification => (
                                    <div key={notification._id} className="flex mt-5 hover:bg-gray-50 md:p-3 justify-between mb-3">
                                        <div className=' flex'>
                                            <div >
                                                <Image
                                                    priority={true}
                                                    width={500}
                                                    height={500}
                                                    alt="Profile"
                                                    src="/assets/userDPNew-removebg-preview.png"
                                                    className="md:w-14 w-10 h-10 md:h-14 ms-4 rounded-full"
                                                />
                                            </div>
                                            <div className="md:w-64 w-32 md:ms-7 ms-3 ">
                                                <p>
                                                    <span className="font-medium text-lg ">{notification.actorId.userName}</span>
                                                    <span className='text-sm '>{notification.type === 'like' ? 'liked your post.' : 'started following you.'}</span>
                                                    {/* <span className='ms-2 md:text-sm text-xs font-extralight'>{notification.createdAt}</span> */}
                                                </p>
                                            </div>
                                        </div>
                                        <div>
                                            {notification.type === 'like' ? (
                                                <Image
                                                    priority={true}
                                                    width={500}
                                                    height={500}
                                                    alt="Profile"
                                                    src='/assets/myImage01.PNG'
                                                    className='md:w-14 w-10 h-10 md:h-14 rounded-lg me-5 '
                                                />
                                            ) : (
                                                <button className='bg-gray-200 me-3 md:ms-0 ms-5 py-2 px-6 rounded-lg mt-1'>Following</button>
                                            )}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </aside>
            )}

            {AddPost && (
                <div className="justify-center backdrop-brightness-50   items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="relative w-auto my-6 mx-auto md:max-w-3xl max-w-sm rounded-xl">
                        <div className="border-0 rounded-xl shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            <div className="flex items-center justify-end p-6  border-solid border-slate-200 ">
                                <button className="text-black background-transparent text-xl font-bold " type="button" onClick={() => setAddPost(false)}>X</button>
                            </div>
                            <div className="flex justify-center ">
                                <div className="text-3xl font-semibold text-center">
                                    <svg aria-label="Icon to represent media such as images or videos" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="77" role="img" viewBox="0 0 97.6 77.3" width="96"><title>Icon to represent media such as images or videos</title><path d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z" fill="currentColor"></path><path d="M84.7 18.4 58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z" fill="currentColor"></path><path d="M78.2 41.6 61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z" fill="currentColor"></path></svg>
                                </div>
                                <button className="p-1   font-semibold " onClick={() => setAddPost(false)}>
                                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">×</span>
                                </button>
                            </div>
                            <div className="relative p-12 flex-auto">
                                <form onSubmit={handlePost}>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="caption">Caption</label>
                                        <input type="text" id="caption" value={caption} onChange={(e) => setCaption(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="file">Files</label>
                                        <input type="file" id="file" multiple onChange={handleFileChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <button className="bg-blue-500 hover:bg-blue-700 w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Post</button>
                                    </div>
                                    {error && <p className="text-red-500 text-xs italic">{error}</p>}
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            )}

            <div className='z-50 md:hidden lp:hidden block p-1 shadow-xl bottom-0 w-full bg-white fixed'>
                <div className="flex mb-4 mt-3  flex-row  justify-between xs:ms-5 ms-5 me-5">
                    <div>
                        <a href='/home'>
                            <IoHomeSharp className='text-4xl' />
                        </a>
                    </div>
                    <div>
                        <a href='/explore'>
                            <FaRegCompass className='text-4xl' />
                        </a>
                    </div>
                    <div>
                        <a href='/reels'>

                            <BiSolidVideos className='text-4xl' />
                        </a>
                    </div>
                    <div>
                        <button onClick={() => setAddPost(true)}>
                            <IoAddCircleOutline className='text-4xl' />
                        </button>
                    </div>
                    <div>
                        <a href='/message'>
                            <TbMessage2Heart className='text-4xl' />
                        </a>
                    </div>
                    <div>
                        <a href='/profile'>
                            <Image
                                priority={true}
                                src="/assets/userDPNew-removebg-preview.png"
                                width={500}
                                height={500}
                                alt="Picture of the author"
                                className='w-8 h-8 rounded-full '
                            />
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}
