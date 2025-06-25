'use client';
import React, { FormEvent, useEffect, useState } from 'react';

import { getUserData, DeletePost, getOwnAllPosts } from '../utils/Api';
import PostsComponent from './PostsComponent';
import { IoSettingsOutline } from "react-icons/io5";
import Spinner from './Spinner';
import { FaComment, FaHeart, FaUserTag } from 'react-icons/fa';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from 'next/navigation';
import { MdGridOn, MdOutlineVideoLibrary } from 'react-icons/md';
import Image from 'next/image';
import ReelsComponents from './ReelsComponents';
import SkeletonLoader from './SkeletonLoader';

interface UserData {
    userName: string;
    name: string;
    bio: string;
}

interface UserPostData {
    id: string;
    fileName: string;
    filePath: string;
    caption: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
    postId: number;
    likeCount: number;
    commentCount: number;
}

const Profile: React.FC = () => {

    const router = useRouter();
    const [setting, setSetting] = useState<boolean>(false);
    const [Openfollowers, setOpenfollowers] = useState<Boolean>(false);
    const [Openfollowing, setOpenfollowing] = useState<Boolean>(false);
    const [activeSection, setActiveSection] = useState<any>('POSTS');
    const [userData, setUserData] = useState<UserData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [posts, setPosts] = useState<UserPostData[]>([]);
    const [error, setError] = useState<string>('');
    const handleSectionClick = (section: any) => {
        setActiveSection(section);
    };


    // useEffect(() => {
    //     const fetchUserData = async () => {
    //         try {
    //             const token = localStorage.getItem('token');
    //             if (token) {
    //                 const response = await getOwnAllPosts();
    //                 const responseData = response.data;


    //                 if (responseData && responseData.data) {
    //                     const userPosts = responseData.data.map((post: any) => ({
    //                         id: post._id,
    //                         fileName: post.files[0]?.fileName,
    //                         filePath: post.files[0]?.filePath,
    //                         caption: post.caption,
    //                         userId: post.userId,
    //                         createdAt: post.createdAt,
    //                         updatedAt: post.updatedAt,
    //                         postId: post.files[0]?.postId,
    //                         likeCount: post.likeCount,
    //                         commentCount: post.commentCount,
    //                     }));
    //                     setPosts(userPosts);
    //                     setLoading(false);
    //                 } else {
    //                     setLoading(false);
    //                     setError('User data not found');
    //                 }
    //             } else {
    //                 setLoading(false);
    //                 setError('Token not found in localStorage');
    //             }
    //         } catch (error) {
    //             console.error('Error fetching user data:', error);
    //             setLoading(false);
    //             setError('Error fetching user data');
    //         }
    //     };
    //     fetchUserData();
    // }, []);


    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {

                    const response:any = await getUserData();
                    const responseData = response.data;

                    if (responseData && responseData.data.userName && responseData.data.name && responseData.data.bio) {
                        setUserData({
                            userName: responseData.data.userName,
                            name: responseData.data.name,
                            bio: responseData.data.bio,
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


    const Followers: { id: number; ProfilePIc: string; UserName: string, name: string }[] = [
        {
            id: 1,
            ProfilePIc: './assets/userDPNew-removebg-preview.png',
            UserName: 'i_nawaz_khatri',
            name: 'shahnawaz bheda'
        }
    ];
    return (
        <>

            <ToastContainer />
            {/* {loading && (
                <div className="fixed z-30 inset-0 flex items-center justify-center bg-gray-700 bg-opacity-75">
                    <Spinner />
                </div>
            )} */}

            <div className="md:p-4 sm:ml-80">
                <div className="p-4  rounded-lg ">
                    {loading ? (
                        <SkeletonLoader type="profile" />
                    ) : userData ? (
                        <div className='md:ms-32 md:me-32 mt:mb-0 mb-20'>
                            <div className="flex md:flex-row-reverse flex-wrap ">
                                <div className=" w-full md:w-3/4 ">
                                    <div className='md:block hidden'>
                                        <div className=' flex md:flex-row flex-col'>
                                            <p className='md:text-xl text-center'>{userData.userName}</p>
                                            <a href='/edit' className='md:ms-5 text-center md:mt-0 mt-5 md:w-auto w-full bg-gray-200 py-1.5 px-3 rounded-xl'>Edit Profile</a>
                                            <div className='flex md:flex-row flex-col' >
                                                <button className='md:w-auto md:mt-0 mt-2 w-full bg-gray-200 py-1.5 px-3 rounded-xl md:ms-3'>View archive</button>
                                                <div className='mt-1 '>
                                                    <button onClick={() => setSetting(true)}>
                                                        <IoSettingsOutline className='text-3xl ms-1' />
                                                    </button>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <div className='md:hidden  flex md:flex-row flex-col'>
                                        <div className='flex justify-center'>
                                            <p className='text-xl text-center'>{userData.userName}</p>
                                            <div >
                                                <button onClick={() => setSetting(true)}>
                                                    <IoSettingsOutline className='text-3xl ms-5' />
                                                </button>
                                            </div>
                                        </div>

                                        <div className='flex flex-row' >

                                            <a href='/edit' className='ms-5 text-center md:mt-0 mt-5 md:w-auto w-full bg-gray-200 py-1.5 px-3 rounded-xl'>Edit Profile</a>

                                            <button className='ms-2 text-center md:mt-0 mt-5 md:w-auto w-full bg-gray-200 py-1.5 px-3 rounded-xl'>View archive</button>

                                        </div>
                                    </div>
                                    {setting && (
                                        <>
                                            <div onClick={() => setSetting(false)} className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none backdrop-brightness-75 focus:outline-none">
                                                <div className="md:w-1/4 w-3/4 block p-6 bg-white border border-gray-200 rounded-2xl ">
                                                    <div className="text-center">
                                                        <div >
                                                            <a href="/account/manage_access" className="mt-5">Apps and websites</a>
                                                        </div>
                                                        <hr className="mt-3 w-full border-gray-400" />
                                                        <div className='mt-5 '>
                                                            <a href="/qrcode" className="mt-5">QR code</a>
                                                        </div>
                                                        <hr className="mt-3 w-full border-gray-400" />
                                                        <div className='mt-5 '>
                                                            <a href="#" className="mt-5">Notifications</a>
                                                        </div>
                                                        <hr className="mt-3 w-full border-gray-400" />
                                                        <div className='mt-5 '>
                                                            <a href="#" className="mt-5">Settings and privacy</a>
                                                        </div>
                                                        <hr className="mt-3 w-full border-gray-400" />
                                                        <div className='mt-5 '>
                                                            <a href="#" className="mt-5">Supervision</a>
                                                        </div>
                                                        <hr className="mt-3 w-full border-gray-400" />
                                                        <div className='mt-5 '>
                                                            <a href="#" className="mt-5">Embed</a>
                                                        </div>
                                                        <hr className="mt-3 w-full border-gray-400" />
                                                        <div className='mt-5 '>
                                                            <a href="#" className="mt-5">Log out</a>
                                                        </div>

                                                        <hr className="mt-3 w-full border-gray-400" />
                                                        <div className='mt-5 '>
                                                            <a href="#" className="mt-5">Cancel</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                    <div className='md:w-1/2 flex mt-10 justify-between'>
                                        <p className='text-lg'><span className='font-medium'>3</span> posts</p>
                                        <button onClick={() => setOpenfollowers(true)} className='text-lg'><span className='font-medium'>100M</span> followers</button>
                                        <button onClick={() => setOpenfollowing(true)} className='text-lg '><span className='font-medium'>1</span> following</button>

                                        {Openfollowers && (
                                            <>
                                                <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none backdrop-brightness-50 focus:outline-none">
                                                    <div className="md:w-1/4  block p-6 bg-white border border-gray-200 rounded-2xl ">
                                                        <div className='flex justify-between'>
                                                            <div className='text-center text-xl'>
                                                                Followers
                                                            </div>
                                                            <div>
                                                                <button onClick={() => setOpenfollowers(false)} className='text-xl'>X</button>
                                                            </div>
                                                        </div>
                                                        <hr className='mt-5 border-gray-400' />

                                                        <input type='search' className='bg-gray-200 rounded-md py-1.5 px-3 w-full mt-5' placeholder='Search' />

                                                        <div className="flex flex-col  mb-4 mt-8 overflow-y-scroll h-80" >
                                                            {Followers.map((items, index) => (
                                                                <>
                                                                    <div key={index} className='flex justify-between mt-5'>
                                                                        <div className="w-1/3">
                                                                            <img src={items.ProfilePIc} className='w-14 h-14 ms-4 rounded-full ' />
                                                                        </div>
                                                                        <div className="w-full ms-5">
                                                                            <p className='font-medium text-lg'>{items.UserName}</p>
                                                                            <p className='text-gray-400 text-md'>{items.name}</p>
                                                                        </div>
                                                                        <div className="w-1/2 me-4" >
                                                                            <button className='bg-gray-200 rounded-lg py-1.5 px-3 ms-5'>Remove</button>
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        )}

                                        {Openfollowing && (
                                            <>
                                                <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none backdrop-brightness-50 focus:outline-none">
                                                    <div className="md:w-1/4  block p-6 bg-white border border-gray-200 rounded-2xl ">
                                                        <div className='flex justify-between'>
                                                            <div className='text-center text-xl'>
                                                                Following
                                                            </div>
                                                            <div>
                                                                <button onClick={() => setOpenfollowing(false)} className='text-xl'>X</button>
                                                            </div>
                                                        </div>
                                                        <hr className='mt-5 border-gray-400' />

                                                        <input type='search' className='bg-gray-200 rounded-md py-1.5 px-3 w-full mt-5' placeholder='Search' />

                                                        <div className="flex flex-col  mb-4 mt-8 overflow-y-scroll h-80" >
                                                            {Followers.map((items, index) => (
                                                                <>
                                                                    <div key={index} className='flex mt-5'>
                                                                        <div className="w-1/2">
                                                                            <img src={items.ProfilePIc} className='w-14 h-14 ms-4 rounded-full ' />
                                                                        </div>
                                                                        <div className="w-full ms-5">
                                                                            <p className='font-medium text-lg'>{items.UserName}</p>
                                                                            <p className='text-gray-400 text-md'>{items.name}</p>
                                                                        </div>
                                                                        <div className="w-1/2 me-5" >
                                                                            <button className='bg-gray-200 rounded-lg py-1.5 px-3 ms-5'>Following</button>
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        )}

                                    </div>
                                    <div className=' mt-7'>
                                        <p className='text-black font-bold'>{userData.name}</p>
                                        <div className='w-72'>
                                            <p className='text-black font-medium'>{userData.bio}</p>
                                        </div >
                                    </div>
                                </div>
                                <div className="w-full md:w-1/4">
                                    <Image
                                    priority={true}
                                        width={500}
                                        height={500}
                                        alt="Profile"
                                        src="/assets/userDPNew-removebg-preview.png" className='md:w-48 md:h-48 w-32 h-32 ms-4 rounded-full ' />
                                </div>
                            </div>

                            <div className='w-full'>
                                <hr className='mt-16' />
                                <div className='flex justify-center mt-4'>

                                    <div className='md:w-1/3 w-full  text-sm justify-between  flex'>
                                        <button onClick={() => handleSectionClick('POSTS')} className='flex'><MdGridOn className='text-xl' /> <span className='ms-2'>POSTS</span></button>
                                        <button onClick={() => handleSectionClick('REELS')} className='flex'><MdOutlineVideoLibrary className='text-xl' /> <span className='ms-2'>REELS</span></button>
                                        <button onClick={() => handleSectionClick('TAGGED')} className='flex'><FaUserTag className='text-xl' /> <span className='ms-2'>TAGGED</span></button>
                                    </div>
                                </div>

                                {activeSection === 'POSTS' && (
                                    <>
                                        <PostsComponent />
                                    </>
                                )}

                                {activeSection === 'REELS' && (
                                    <>

                                        <ReelsComponents />
                                    </>)}

                                {activeSection === 'TAGGED' && (
                                    <>
                                        TAGGED
                                    </>)}
                            </div>
                        </div>
                    ) : (
                        <p>Loading .....</p>
                    )}
                </div>
            </div>
        </>
    )
}

export default Profile;