'use client'
import QRCode from 'qrcode.react';
import React from 'react';
import { usePDF } from 'react-to-pdf';
import Sidebar from './Sidebar';

const QrCode: React.FC = () => {
    const { toPDF, targetRef } = usePDF({ filename: 'page.  ' });

    return (
        <>
            <Sidebar />
            <div className='md:hidden block bg-white p-4 fixed top-0 w-full'>
                <p className='text-xl text-center font-bold'>QR code</p>
            </div>
            <div className="md:p-4 sm:ml-80 bg-gradient-to-tr from-orange-500 via-[#cf3eb2] to-[#B7259B] ... h-screen">

                <div className="flex  md:flex-row flex-col mb-4 justify-center items-center h-screen">
                    <div className='md:w-1/6' >

                        <div ref={targetRef} className="flex justify-center  md:max-w-sm w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 ">
                            <QRCode value="https://www.instagram.com/_shahnawaz_khatri_29/" />
                        </div>

                    </div>
                    <div className='md:w-1/3 ms-10 text-white mt-5 md:mt-0'>
                        <p className='text-3xl font-serif'>QR code helps people follow you quickly</p>

                        <p className='mt-7'>People can scan your QR code with their smartphone&apos;s camera to see your profile. Download and print your QR code, then stick it on your products, posters and more.</p>

                        <button className='bg-white text-black py-2 px-3 font-bold mt-5' onClick={() => toPDF()}>Download QR Code</button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default QrCode;
