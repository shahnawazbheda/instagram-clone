'use client'

import Sidebar from './Sidebar';
import Story from './Story';
import Posts from './Posts';
import Suggested from './Suggested';
import { IoIosSearch } from "react-icons/io";
import { CiHeart } from "react-icons/ci";
import Image from 'next/image';
import { useEffect, useState } from 'react';
import SkeletonLoader from './SkeletonLoader';
import { SearchUser } from '../utils/Api';
import Link from 'next/link';

interface User {
    userName: string;
    name: string;
    _id: string;
}

const Home: React.FC = ({ token }: { token: string }) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [search, setSearch] = useState('');
    const [results, setResults] = useState<User[]>([]);

    useEffect(() => {
        if (search.length > 0) {
            const fetchResults = async () => {
                try {
                    const response = await SearchUser(search, token);
                    setResults(response.data.data);
                } catch (error) {
                    console.error('Error searching users:', error);
                }
            };

            fetchResults();
        } else {
            setResults([]);
        }
    }, [search, token]);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 100);
    }, []);
    return (
        <>
            <div className='md:mb-0 mb-16'>
                <Sidebar />
                {loading ? (
                    <SkeletonLoader type="home" />
                ) : (
                    <>
                        <div className='md:hidden lp:hidden block p-1 shadow-lg top-0 w-full bg-white  fixed z-40'>
                            <div className="flex mb-4 mt-3  flex-row  justify-between xs:ms-5">
                                <div className="w-1/3">
                                    <Image
                                        priority={true}
                                        src="/assets/Title-removebg-preview.png"
                                        width={500}
                                        height={500}
                                        alt="Picture of the author"
                                        className='w-[103px] h-[29px] mt-1'
                                    />
                                </div>
                                <div className="w-full">
                                    <form className="w-full ">
                                        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                                <IoIosSearch className="w-4 h-4 ms-3 text-gray-500 " />
                                            </div>
                                            <input
                                                type="search"
                                                value={search}
                                                onChange={(e) => setSearch(e.target.value)}
                                                id="default-search"
                                                className="block ms-3 w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-100 focus:ring-blue-500 focus:border-blue-500 "
                                                placeholder="Search ..."
                                                required
                                            />
                                        </div>

                                        <div className="mt-4">
                                            {results.length > 0 && (
                                                <ul className="divide-y  divide-transparent bg-transparent shadow-md rounded-lg">
                                                    {results.map((user) => (
                                                        <li key={user._id} className="py-2  px-4 hover:bg-gray-100 cursor-pointer">
                                                            <Link
                                                                href={{
                                                                    pathname: '/peouple-profile',
                                                                    query: {
                                                                        userId: user._id
                                                                    }
                                                                }}
                                                                replace
                                                            >
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
                                        </div>
                                    </form>
                                </div>

                                <div className="w-1/6 " >
                                    <a href='/notification' >
                                        <CiHeart className="text-4xl ms-5  mt-1" />
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="md:p-4  sm:ml-80 ">
                            <div className="p-4 md:mt-0 mt-20 rounded-lg ">
                                <div className="flex  mb-4">
                                    <div className='md:w-3/4 w-full  '>
                                        <Story />
                                        <Posts />
                                    </div>
                                    <div className="md:w-1/3 md:block hidden">
                                        <Suggested />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>

        </>
    )
}


export default Home;
