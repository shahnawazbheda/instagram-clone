// import React from 'react'

// export default function ManageAccess() {
//   return (
//     <div>ManaageAccess</div>
//   )
// }


'use client';
import Settings from '@/app/components/Settings'
import Sidebar from '@/app/components/Sidebar'
import React, { useState } from 'react'

export default function ManageAccess() {
    const [activeSection, setActiveSection] = useState<any>('Active');

    const handleSectionClick = (section: any) => {
        setActiveSection(section);
    };
    return (
        <>
            <Sidebar token={localStorage.getItem('token') || ''} isNotification1={false} />
            <Settings />

            
            <div className='md:ml-[44%] lp:ml-[50%] ml-56 md:block lg:block lp:block hidden md:p-20 p-6 md:text-start text-center'>
                <div className=' '>
                    <p className='md:text-2xl text-md font-bold'>App and websites</p>
                </div>

                <div className="flex mb-4 md:mt-16 mt-10 text-center">
                    <div className="w-1/3">
                        <button className='w-full md:text-xl text-xs' onClick={() => handleSectionClick('Active')}>Active</button>
                    </div>
                    <div className="w-1/3">
                        <button className='w-full  ms-3 md:text-xl text-xs' onClick={() => handleSectionClick('Expired')}>Expired</button>
                    </div>
                    <div className="w-1/3">
                        <button className='w-full md:ms-3 ms-5 md:text-xl text-xs' onClick={() => handleSectionClick('Removed')}>Removed</button>
                    </div>

                </div>
                <hr className='border-gray-300' />


                {activeSection === 'Active' && (
                    <>
                        <div className='mt-10 '>
                            <p className='md:text-lg  font-sans'>These are apps and websites that you've connected to your Instagram or Threads account. They can access non-public information that you choose to share with them.</p>

                            <p className='mt-10  text-gray-500'>You have not authorised any applications to access your Instagram account.</p>
                        </div>

                        <div className='flex flex-col justify-center items-center mt-80 text-gray-500'>
                            <div className='flex md:flex-row lp:flex-row flex-col'>
                                <p>Meta</p>
                                <p className='ms-3 md:mt-0 lp:mt-0 mt-5'> About</p>
                                <p className='ms-3 md:mt-0 lp:mt-0 mt-5'> Blog</p>
                                <p className='ms-3 md:mt-0 lp:mt-0 mt-5'> Jobs</p>
                                <p className='ms-3 md:mt-0 lp:mt-0 mt-5'> Help</p>
                                <p className='ms-3 md:mt-0 lp:mt-0 mt-5'> API</p>
                                <p className='ms-3 md:mt-0 lp:mt-0 mt-5'> Privacy</p>
                                <p className='ms-3 md:mt-0 lp:mt-0 mt-5'> Terms</p>
                                <p className='ms-3 md:mt-0 lp:mt-0 mt-5'> Locations</p>
                                <p className='ms-3 md:mt-0 lp:mt-0 mt-5'> Instagram Lite</p>
                                <p className='ms-3 md:mt-0 lp:mt-0 mt-5'> Threads</p>
                            </div>
                            <div className='flex mt-2'>
                                <p> Contact uploading and non-users</p>
                                <p className='ms-3'>Meta Verified</p>
                            </div>
                        </div>

                    </>
                )}

                {activeSection === 'Expired' && (
                    <>
                        <div className='mt-10'>
                            <p className='md:text-lg font-sans'>
                                These are apps and websites that you've connected to your Instagram or Threads account that you may not have used in the last 90 days. They're no longer able to access your non-public information, but may still have the information that you shared while they were active. 'Non-public' means information that an app can only access if you choose to share it when you log in with your Instagram or Threads account (such as your email address).
                            </p>

                            <p className='mt-10 text-gray-500'>
                                You have no expired applications that had access to your Instagram or Threads account

                            </p>
                        </div>

                        <div className='flex flex-col justify-center items-center mt-80 text-gray-500'>
                            <div className='flex md:flex-row lp:flex-row flex-col'>
                                <p>Meta</p>
                                <p className='ms-3 md:mt-0 lp:mt-0 mt-5'> About</p>
                                <p className='ms-3 md:mt-0 lp:mt-0 mt-5'> Blog</p>
                                <p className='ms-3 md:mt-0 lp:mt-0 mt-5'> Jobs</p>
                                <p className='ms-3 md:mt-0 lp:mt-0 mt-5'> Help</p>
                                <p className='ms-3 md:mt-0 lp:mt-0 mt-5'> API</p>
                                <p className='ms-3 md:mt-0 lp:mt-0 mt-5'> Privacy</p>
                                <p className='ms-3 md:mt-0 lp:mt-0 mt-5'> Terms</p>
                                <p className='ms-3 md:mt-0 lp:mt-0 mt-5'> Locations</p>
                                <p className='ms-3 md:mt-0 lp:mt-0 mt-5'> Instagram Lite</p>
                                <p className='ms-3 md:mt-0 lp:mt-0 mt-5'> Threads</p>
                            </div>
                            <div className='flex mt-2'>
                                <p> Contact uploading and non-users</p>
                                <p className='ms-3'>Meta Verified</p>
                            </div>
                        </div>
                    </>
                )}

                {activeSection === 'Removed' && (
                    <>
                        <div className='mt-10'>
                            <p className='md:text-lg font-sans'>
                                These are apps and websites that are no longer connected to your Instagram or Threads account. They can't access your non-public information anymore, but may still have the information that you shared while they were active. 'Non-public' means information that an app can only access if you choose to share it when you log in with your Instagram or Threads account (such as your email address). You can ask an app to delete your information. To do it, review their Privacy Policy for details and contact information. If you contact an app, they may need your user ID.
                            </p>

                            <p className='mt-10 text-gray-500'>
                                You have no removed applications that had access to your Instagram account.
                            </p>
                        </div>

                        <div className='flex flex-col justify-center items-center mt-80 text-gray-500'>
                            <div className='flex md:flex-row lp:flex-row flex-col'>
                                <p >Meta</p>
                                <p className='ms-3 md:mt-0 lp:mt-0 mt-5'> About</p>
                                <p className='ms-3 md:mt-0 lp:mt-0 mt-5'> Blog</p>
                                <p className='ms-3 md:mt-0 lp:mt-0 mt-5'> Jobs</p>
                                <p className='ms-3 md:mt-0 lp:mt-0 mt-5'> Help</p>
                                <p className='ms-3 md:mt-0 lp:mt-0 mt-5'> API</p>
                                <p className='ms-3 md:mt-0 lp:mt-0 mt-5'> Privacy</p>
                                <p className='ms-3 md:mt-0 lp:mt-0 mt-5'> Terms</p>
                                <p className='ms-3 md:mt-0 lp:mt-0 mt-5'> Locations</p>
                                <p className='ms-3 md:mt-0 lp:mt-0 mt-5'> Instagram Lite</p>
                                <p className='ms-3 md:mt-0 lp:mt-0 mt-5'> Threads</p>
                            </div>
                            <div className='flex mt-2'>
                                <p> Contact uploading and non-users</p>
                                <p className='ms-3'>Meta Verified</p>
                            </div>
                        </div>
                    </>
                )}


            </div>
        </>
    )
}