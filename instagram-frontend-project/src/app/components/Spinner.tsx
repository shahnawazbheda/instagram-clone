import Image from 'next/image';
import React from 'react'

const Spinner: React.FC = () => {
    return (
        <div className="flex justify-center items-center h-full bg-transparent z-50 w-full bg-white">
            <Image
                priority={true}
                width={500}
                height={500}
                alt="Profile"
                src='/assets/LoadingImage-removebg-preview.png' className='h-24 w-24 rounded-xl' />
            <div className='fixed bottom-10 md:mb-0 mb-16'>
                <div className='flex flex-col justify-center items-center'>
                    <p className='text-center'>from</p>
                    <Image
                        priority={true}
                        width={500}
                        height={500}
                        alt="Profile"
                        src='/assets/MetaLogo-removebg-preview.png' className='h-10 w-32 rounded-xl' />
                </div>
            </div>
        </div>
    );
};
export default Spinner;
