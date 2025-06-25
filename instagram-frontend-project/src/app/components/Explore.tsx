'use client'
import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar';
import { FaComment, FaHeart } from 'react-icons/fa';
import Image from 'next/image';
import SkeletonLoader from './SkeletonLoader';

const Explore: React.FC = () => {

    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 50);
    }, []);
    return (
        <>
<Sidebar token={localStorage.getItem('token') || ''} isNotification1={false} />

            <div className='sm:ml-80'>
                {loading ? (
                    <>
                        <SkeletonLoader type="explore" />
                    </>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:p-12 p-5 md:mb-0 mb-16">
                        <div className="grid ">
                            <div className=" md:ms-3 md:mt-0 mt-5" >
                                <div className="block bg-white  shadow  hover:bg-gray-100 relative">
                                    <div className="block   bg-white    shadow hover:bg-gray-100 ">
                                        <Image
                                            priority={true}
                                            width={500}
                                            height={500}
                                            alt="userDPNew"
                                            className="h-auto max-w-full rounded-lg" src="/assets/myimage01.png" />
                                        <div className="opacity-0 backdrop-brightness-75 hover:opacity-100 duration-300 absolute inset-0 z-4 flex justify-center items-center rounded-lg text-white font-semibold">
                                            <div className="flex">
                                                <div className="text-3xl flex"><FaHeart /> <span className="text-xl ms-2">10K</span></div>
                                                <div className="text-3xl flex ms-5"><FaComment /> <span className="text-2xl ms-2">100</span></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className=" md:ms-3 md:mt-0 mt-5 " >
                                <div className="block bg-white  shadow hover:bg-gray-100 relative">
                                    <div className="block   bg-white   shadow hover:bg-gray-100 ">
                                        <Image
                                            priority={true}
                                            width={500}
                                            height={500}
                                            alt="Profile"
                                            className="h-auto max-w-full rounded-lg" src="/assets/myimage02.png" />
                                        <div className="opacity-0 backdrop-brightness-75 hover:opacity-100 duration-300 absolute inset-0 z-4 flex justify-center items-center text-white font-semibold">
                                            <div className="flex">
                                                <div className="text-3xl flex"><FaHeart /> <span className="text-xl ms-2">10K</span></div>
                                                <div className="text-3xl flex ms-5"><FaComment /> <span className="text-2xl ms-2">100</span></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className=" md:ms-3 md:mt-0 mt-5" >
                                <div className="block bg-white  shadow hover:bg-gray-100 relative">
                                    <div className="block   bg-white   shadow hover:bg-gray-100 ">
                                        <Image
                                            priority={true}
                                            width={500}
                                            height={500}
                                            alt="Profile"
                                            className="h-auto max-w-full rounded-lg" src="/assets/myimage03.png" />
                                        <div className="opacity-0 rounded-lg backdrop-brightness-75 hover:opacity-100 duration-300 absolute inset-0 z-4 flex justify-center items-center text-white font-semibold">
                                            <div className="flex">
                                                <div className="text-3xl flex"><FaHeart /> <span className="text-xl ms-2">10K</span></div>
                                                <div className="text-3xl flex ms-5"><FaComment /> <span className="text-2xl ms-2">100</span></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="grid gap-4">
                            <div className=" md:ms-3 md:mt-0 mt-5" >
                                <div className="block bg-white  shadow hover:bg-gray-100 relative">
                                    <div className="block   bg-white   shadow hover:bg-gray-100 ">
                                        <Image
                                            priority={true}
                                            width={500}
                                            height={500}
                                            alt="Profile"
                                            className="h-auto max-w-full rounded-lg" src="/assets/myimage03.png" />
                                        <div className="opacity-0 rounded-lg backdrop-brightness-75 hover:opacity-100 duration-300 absolute inset-0 z-4 flex justify-center items-center text-white font-semibold">
                                            <div className="flex">
                                                <div className="text-3xl flex"><FaHeart /> <span className="text-xl ms-2">10K</span></div>
                                                <div className="text-3xl flex ms-5"><FaComment /> <span className="text-2xl ms-2">100</span></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className=" md:ms-3 md:mt-0 mt-5" >
                                <div className="block bg-white  shadow hover:bg-gray-100 relative">
                                    <div className="block   bg-white   shadow hover:bg-gray-100 ">
                                        <Image
                                            priority={true}
                                            width={500}
                                            height={500}
                                            alt="Profile"
                                            className="h-auto max-w-full rounded-lg" src="/assets/myimage01.png" />
                                        <div className="opacity-0 rounded-lg backdrop-brightness-75 hover:opacity-100 duration-300 absolute inset-0 z-4 flex justify-center items-center text-white font-semibold">
                                            <div className="flex">
                                                <div className="text-3xl flex"><FaHeart /> <span className="text-xl ms-2">10K</span></div>
                                                <div className="text-3xl flex ms-5"><FaComment /> <span className="text-2xl ms-2">100</span></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className=" md:ms-3 md:mt-0 mt-5" >
                                <div className="block bg-white  shadow hover:bg-gray-100 relative">
                                    <div className="block   bg-white   shadow hover:bg-gray-100 ">
                                        <Image
                                            priority={true}
                                            width={500}
                                            height={500}
                                            alt="Profile"
                                            className="h-auto max-w-full rounded-lg" src="/assets/myimage02.png" />
                                        <div className="opacity-0 rounded-lg backdrop-brightness-75 hover:opacity-100 duration-300 absolute inset-0 z-4 flex justify-center items-center text-white font-semibold">
                                            <div className="flex">
                                                <div className="text-3xl flex"><FaHeart /> <span className="text-xl ms-2">10K</span></div>
                                                <div className="text-3xl flex ms-5"><FaComment /> <span className="text-2xl ms-2">100</span></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="grid gap-4">
                            <div className=" md:ms-3 md:mt-0 mt-5" >
                                <div className="block bg-white  shadow hover:bg-gray-100 relative">
                                    <div className="block   bg-white   shadow hover:bg-gray-100 ">
                                        <video className="h-auto max-w-full rounded-lg"
                                          loop
                                          
                                        autoPlay src="./assets/cutest-shortsfeed-drimranpatel-baby-funny-shorts-720-ytshorts.savetube.me.mp4" />
                                        <div className="opacity-0 rounded-lg backdrop-brightness-75 hover:opacity-100 duration-300 absolute inset-0 z-4 flex justify-center items-center text-white font-semibold">
                                            <div className="flex">
                                                <div className="text-3xl flex"><FaHeart /> <span className="text-xl ms-2">10K</span></div>
                                                <div className="text-3xl flex ms-5"><FaComment /> <span className="text-2xl ms-2">100</span></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className=" md:ms-3 md:mt-0 mt-5" >
                                <div className="block bg-white  shadow hover:bg-gray-100 relative">
                                    <div className="block   bg-white   shadow hover:bg-gray-100 ">
                                        <Image
                                            priority={true}
                                            width={500}
                                            height={500}
                                            alt="Profile"
                                            className="h-auto max-w-full rounded-lg" src="/assets/myimage02.png" />
                                        <div className="opacity-0 rounded-lg backdrop-brightness-75 hover:opacity-100 duration-300 absolute inset-0 z-4 flex justify-center items-center text-white font-semibold">
                                            <div className="flex">
                                                <div className="text-3xl flex"><FaHeart /> <span className="text-xl ms-2">10K</span></div>
                                                <div className="text-3xl flex ms-5"><FaComment /> <span className="text-2xl ms-2">100</span></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className=" md:ms-3 md:mt-0 mt-5" >
                                <div className="block bg-white  shadow hover:bg-gray-100 relative">
                                    <div className="block   bg-white   shadow hover:bg-gray-100 ">
                                        <Image
                                            priority={true}
                                            width={500}
                                            height={500}
                                            alt="Profile"
                                            className="h-auto max-w-full rounded-lg" src="/assets/myimage03.png" />
                                        <div className="opacity-0 rounded-lg backdrop-brightness-75 hover:opacity-100 duration-300 absolute inset-0 z-4 flex justify-center items-center text-white font-semibold">
                                            <div className="flex">
                                                <div className="text-3xl flex"><FaHeart /> <span className="text-xl ms-2">10K</span></div>
                                                <div className="text-3xl flex ms-5"><FaComment /> <span className="text-2xl ms-2">100</span></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="grid gap-4">
                            <div className=" md:ms-3 md:mt-0 mt-5" >
                                <div className="block bg-white  shadow hover:bg-gray-100 relative">
                                    <div className="block   bg-white   shadow hover:bg-gray-100 ">
                                        <Image
                                            priority={true}
                                            width={500}
                                            height={500}
                                            alt="Profile"
                                            className="h-auto max-w-full rounded-lg" src="/assets/myimage01.png" />
                                        <div className="opacity-0 rounded-lg backdrop-brightness-75 hover:opacity-100 duration-300 absolute inset-0 z-4 flex justify-center items-center text-white font-semibold">
                                            <div className="flex">
                                                <div className="text-3xl flex"><FaHeart /> <span className="text-xl ms-2">10K</span></div>
                                                <div className="text-3xl flex ms-5"><FaComment /> <span className="text-2xl ms-2">100</span></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className=" md:ms-3 md:mt-0 mt-5" >
                                <div className="block bg-white  shadow hover:bg-gray-100 relative">
                                    <div className="block   bg-white   shadow hover:bg-gray-100 ">
                                        <video className="h-auto max-w-full rounded-lg "
                                          loop
                                        autoPlay src="./assets/cutest-shortsfeed-drimranpatel-baby-funny-shorts-720-ytshorts.savetube.me.mp4" />
                                        <div className="opacity-0 rounded-lg backdrop-brightness-75 hover:opacity-100 duration-300 absolute inset-0 z-4 flex justify-center items-center text-white font-semibold">
                                            <div className="flex">
                                                <div className="text-3xl flex"><FaHeart /> <span className="text-xl ms-2">10K</span></div>
                                                <div className="text-3xl flex ms-5"><FaComment /> <span className="text-2xl ms-2">100</span></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className=" md:ms-3 md:mt-0 mt-5" >
                                <div className="block bg-white  shadow hover:bg-gray-100 relative">
                                    <div className="block   bg-white   shadow hover:bg-gray-100 ">
                                        <Image
                                            priority={true}
                                            width={500}
                                            height={500}
                                            alt="Profile"
                                            className="h-auto max-w-full rounded-lg" src="/assets/myimage02.png" />
                                        <div className="opacity-0 rounded-lg backdrop-brightness-75 hover:opacity-100 duration-300 absolute inset-0 z-4 flex justify-center items-center text-white font-semibold">
                                            <div className="flex">
                                                <div className="text-3xl flex"><FaHeart /> <span className="text-xl ms-2">10K</span></div>
                                                <div className="text-3xl flex ms-5"><FaComment /> <span className="text-2xl ms-2">100</span></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

        </>
    )
}

export default Explore;