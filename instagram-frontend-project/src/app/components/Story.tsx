'use client'
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import SkeletonLoader from './SkeletonLoader';

const Story: React.FC = () => {

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 100);
    }, []);

    const [loading, setLoading] = useState<boolean>(true);
    const story: { id: number; ProfilePIc: string; UserName: string }[] = [
        {
            id: 1,
            ProfilePIc: '/assets/20190612142752_IMG_2645.JPG',
            UserName: 'i_nawaz_khatri',
        },
        {
            id: 2,
            ProfilePIc: '/assets/20190612142752_IMG_2645.JPG',
            UserName: 'i_nawaz_khatri',
        },
        {
            id: 3,
            ProfilePIc: '/assets/20190612142752_IMG_2645.JPG',
            UserName: 'i_nawaz_khatri',
        },
        {
            id: 4,
            ProfilePIc: '/assets/20190612142752_IMG_2645.JPG',
            UserName: 'i_nawaz_khatri',
        },
        {
            id: 5,
            ProfilePIc: '/assets/20190612142752_IMG_2645.JPG',
            UserName: 'i_nawaz_khatri',
        },
        {
            id: 6,
            ProfilePIc: '/assets/20190612142752_IMG_2645.JPG',
            UserName: 'i_nawaz_khatri',
        },
        {
            id: 7,
            ProfilePIc: '/assets/20190612142752_IMG_2645.JPG',
            UserName: 'i_nawaz_khatri',
        },

        {
            id: 8,
            ProfilePIc: '/assets/20190612142752_IMG_2645.JPG',
            UserName: 'i_nawaz_khatri',
        },


    ];

    return (

        <div className="flex md:overflow-hidden w-full overflow-x-scroll scrollhide">
            {loading ? (
                <SkeletonLoader type="story" />
            ) : (story.map((items, index) => (
                    <>
                        <div key={index} className='w-1/2'>
                            <Image
                                priority={true}
                                src={items.ProfilePIc}
                                width={500}
                                height={500}
                                className='w-20 h-20 ms-4 rounded-full border-[3px] border-[#EF3FAE]'
                                alt="Picture of the author"
                            />
                            <div className="truncate ...">
                                <p className='mt-3 text-center truncate' >{items.UserName}</p>
                            </div>
                        </div>
                    </>
                )))}

        </div>

    )
}

export default Story;