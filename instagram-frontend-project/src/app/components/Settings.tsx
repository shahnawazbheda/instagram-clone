'use client'
import Image from "next/image";
import { BiHide } from "react-icons/bi";
import { FaLanguage, FaLaptopCode, FaRegComment, FaRegUser, FaRegUserCircle } from "react-icons/fa";
import { GiAlliedStar } from "react-icons/gi";
import { GoMention } from "react-icons/go";
import { IoIosHelpBuoy, IoIosNotificationsOutline, IoMdNotificationsOff, IoMdNotificationsOutline } from "react-icons/io";
import { IoLockClosedOutline, IoRepeat } from "react-icons/io5";
import { LiaUserAltSlashSolid } from "react-icons/lia";
import { LuHeartOff } from "react-icons/lu";
import { MdBlockFlipped, MdOutlineFileDownload, MdOutlinePrivacyTip } from "react-icons/md";
import { TbMessage2Heart, TbUsers } from "react-icons/tb";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Settings() {

    return (
        <>
            <ToastContainer />
            <aside id="separator-sidebar" className="h-screen md:ml-80 ml-[100%] lp:ml-80 lp:w-1/4 w-full z-0 fixed
            transition-transform -translate-x-full md:w-1/4 sm:translate-x-0 border-gray-400 bg-white  border-l border-r"
                aria-label="Sidebar">
                <div className="md:p-12 p-6 overflow-y-scroll h-[100vh] ">
                    <p className="text-2xl font-bold ms-5 ">Settings</p>
                    <a href="#" className="block mt-5 w-full p-6 bg-white border border-gray-200 rounded-2xl shadow-lg hover:bg-gray-100 ">
                        <Image
                        priority={true}
                            width={500}
                            height={500}
                            alt="userDPNew" src="/assets/meta-logo-crop-removebg-preview.png" className="w-20" />
                        <p className="text-lg font-bold mt-4">Accounts Centre</p>
                        <p className="text-sm text-gray-500">Manage your connected experiences and account settings across Meta technologies.</p>

                        <div className="flex  mt-5">

                            <div className="text-sm">
                                <p className="text-xl"><FaRegUser /></p>
                            </div>
                            <div className="w-full ms-5 text-gray-500 text-sm">
                                Personal details
                            </div>

                        </div>

                        <div className="flex  mt-3">
                            <div className="text-sm">
                                <svg aria-label="" className="x1lliihq x1n2onr6 x1roi4f4" fill="currentColor" height="16" role="img" viewBox="0 0 24 24" width="16"><title></title><polyline fill="none" points="16.723 8.93 10.498 15.155 7.277 11.933" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.978"></polyline><path d="M3 13.5a9 9 0 0 0 18 0V4.488A17.848 17.848 0 0 1 12 1.5a17.848 17.848 0 0 1-9 2.988Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.978"></path></svg>
                            </div>
                            <div className="w-full ms-5 text-gray-500 text-sm">
                                Password and Security
                            </div>
                        </div>

                        <div className="flex  mt-3">
                            <div className=" text-sm">
                                <svg aria-label="" className="x1lliihq x1n2onr6 x1roi4f4" fill="currentColor" height="16" role="img" viewBox="0 0 24 24" width="16"><title></title><path d="M18.44 1H5.56A4.565 4.565 0 0 0 1 5.561v12.878A4.565 4.565 0 0 0 5.56 23h12.88A4.566 4.566 0 0 0 23 18.44V5.56A4.566 4.566 0 0 0 18.44 1ZM21 18.44A2.564 2.564 0 0 1 18.44 21H5.56A2.563 2.563 0 0 1 3 18.44V5.56A2.563 2.563 0 0 1 5.56 3h12.88A2.564 2.564 0 0 1 21 5.561Z"></path><path d="M12 16H6a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2Zm6-10H6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1Zm-1 6H7V8h10Zm1 4h-2a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2Z"></path></svg>
                            </div>
                            <div className="w-full  ms-5 text-gray-500 text-sm">
                                Ad preferences
                            </div>
                        </div>

                        <p className="text-blue-500 font-bold mt-5">See more in Accounts Centre</p>

                    </a>

                    <div className="mt-5 ms-5 ">
                        <p>How you use Instagram</p>
                        <div className="flex  mt-5 hover:bg-gray-100 rounded-xl py-2  px-3">
                            <div className="md:text-3xl text-xl">
                                <FaRegUserCircle />
                            </div>
                            <div className="w-full ms-5  md:text-lg text-sm">
                                Edit Profile
                            </div>
                        </div>

                        <div className="flex  mt-5 hover:bg-gray-100 rounded-xl py-2 px-3">
                            <div className="md:text-4xl text-2xl">
                                <IoMdNotificationsOutline />
                            </div>
                            <div className="w-full ms-5  md:text-lg text-sm ">
                                Notification
                            </div>
                        </div>
                    </div>


                    <div className="mt-5 ms-5 ">
                        <p>What you see</p>

                        <div className="flex  mt-5 hover:bg-gray-100 rounded-xl py-2  px-3">
                            <div className="md:text-3xl text-xl">
                                <IoMdNotificationsOff />
                            </div>
                            <div className="w-full ms-5  md:text-lg text-sm">
                                Mute Accounts
                            </div>
                        </div>

                        <div className="flex  mt-5 hover:bg-gray-100 rounded-xl py-2 px-3">
                            <div className="md:text-3xl text-xl">
                                <LuHeartOff />
                            </div>
                            <div className="w-full ms-5  md:text-lg  text-sm">
                                Like and share counts
                            </div>
                        </div>
                    </div>

                    <div className="mt-5 ms-5 ">
                        <p>Who can see your content</p>

                        <div className="flex  mt-5 hover:bg-gray-100 rounded-xl py-2  px-3">
                            <div className="md:text-3xl text-xl">
                                <IoLockClosedOutline />
                            </div>
                            <div className="w-full ms-5  md:text-lg  text-sm">
                                Account Privacy
                            </div>
                        </div>

                        <div className="flex  mt-5 hover:bg-gray-100 rounded-xl py-2 px-3">
                            <div className="md:text-3xl text-xl">
                                <GiAlliedStar />
                            </div>
                            <div className="w-full ms-5  text-sm md:text-lg ">
                                Close friends
                            </div>
                        </div>

                        <div className="flex  mt-5 hover:bg-gray-100 rounded-xl py-2  px-3">
                            <div className="md:text-3xl text-xl">
                                <MdBlockFlipped />
                            </div>
                            <div className="w-full ms-5 text-sm md:text-lg ">
                                Block
                            </div>
                        </div>

                        <div className="flex  mt-5 hover:bg-gray-100 rounded-xl py-2 px-3">
                            <div className="md:text-3xl text-xl">
                                <BiHide />
                            </div>
                            <div className="w-full ms-5  md:text-lg text-sm ">
                                Hide story and live
                            </div>
                        </div>
                    </div>

                    <div className="mt-5 ms-5 ">
                        <p>How others can interact with you</p>

                        <div className="flex  mt-5 hover:bg-gray-100 rounded-xl py-2  px-3">
                            <div className="md:text-3xl text-xl">
                                <TbMessage2Heart />
                            </div>
                            <div className="w-full ms-5  md:text-lg text-sm ">
                                Messages and story replies
                            </div>
                        </div>

                        <div className="flex  mt-5 hover:bg-gray-100 rounded-xl py-2 px-3">
                            <div className="md:text-3xl text-xl">
                                <GoMention />
                            </div>
                            <div className="w-full ms-5  md:text-lg text-sm ">
                                Tags and mentions
                            </div>
                        </div>

                        <div className="flex  mt-5 hover:bg-gray-100 rounded-xl py-2  px-3">
                            <div className="md:text-3xl text-xl">
                                <FaRegComment />
                            </div>
                            <div className="w-full ms-5  md:text-lg text-sm ">
                                Comments
                            </div>
                        </div>

                        <div className="flex  mt-5 hover:bg-gray-100 rounded-xl py-2 px-3">
                            <div className="md:text-3xl text-xl" >
                                <IoRepeat />
                            </div>
                            <div className="w-full ms-5  md:text-lg text-sm ">
                                Sharing and remixes
                            </div>
                        </div>

                        <div className="flex  mt-5 hover:bg-gray-100 rounded-xl py-2 px-3">
                            <div className="md:text-3xl text-xl">
                                <LiaUserAltSlashSolid />
                            </div>
                            <div className="w-full ms-5  md:text-lg text-sm ">
                                Restricted accounts
                            </div>
                        </div>

                        <div className="flex  mt-5 hover:bg-gray-100 py-2 px-3">
                            <div className="text-sm">
                                <svg aria-label="" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor"  role="img" viewBox="0 0 24 24" width="24"><title></title><path d="M12.596 20.797h-2.178l-.009-.039-.815-3.735H4.7l-.825 3.774H1.673l.014-.061L5.744 3.203h2.78l.01.038Zm-7.449-5.823h4L7.134 5.835Zm11.813 6.123a3.198 3.198 0 0 1-3.274-3.473c0-1.881 1.011-3.056 3.185-3.698l1.8-.524c.754-.212 1.163-.486 1.163-1.327a1.732 1.732 0 0 0-1.95-1.775 1.746 1.746 0 0 0-1.9 1.9v.524h-2.048V12.2a3.61 3.61 0 0 1 3.949-3.75c2.578 0 3.998 1.323 3.998 3.724v8.623h-2v-1.569a2.998 2.998 0 0 1-2.923 1.87Zm2.874-6.427a2.914 2.914 0 0 1-1.26.577l-1.126.325a1.996 1.996 0 0 0-1.714 1.976 1.565 1.565 0 0 0 1.675 1.7c2.189 0 2.425-2.237 2.425-3.199Z"></path></svg>
                            </div>
                            <div className="w-full ms-5  md:text-lg text-sm ">
                                Hidden words
                            </div>
                        </div>
                    </div>

                    <div className="mt-5 ms-5 ">
                        <p>Your app and media</p>

                        <div className="flex  mt-5 hover:bg-gray-100 rounded-xl py-2  px-3">
                            <div className="md:text-3xl text-xl">
                                <MdOutlineFileDownload />
                            </div>
                            <div className="w-full ms-5  text-sm md:text-lg ">
                                Archiving and Downloading
                            </div>
                        </div>

                        <div className="flex  mt-5 hover:bg-gray-100 rounded-xl py-2 px-3">
                            <div className="md:text-3xl text-xl">
                                <FaLanguage />
                            </div>
                            <div className="w-full ms-5  md:text-lg text-sm ">
                                Language
                            </div>
                        </div>

                        <div className="flex  mt-5 hover:bg-gray-100 rounded-xl py-2  px-3">
                            <div className="md:text-3xl text-xl">
                                <FaLaptopCode />
                            </div>
                            <div className="w-full ms-5  md:text-lg text-sm ">
                                Website permissions
                            </div>
                        </div>
                    </div>

                    <div className="mt-5 ms-5 ">
                        <p>For families</p>

                        <div className="flex  mt-5 hover:bg-gray-100 rounded-xl py-2  px-3">
                            <div className="md:text-3xl text-xl">
                                <TbUsers />
                            </div>
                            <div className="w-full ms-5  text-sm md:text-lg ">
                                Supervision
                            </div>
                        </div>
                    </div>

                    <div className="mt-5 ms-5 ">
                        <p>For professionals</p>

                        <div className="flex  mt-5 hover:bg-gray-100 py-2  px-3">
                            <div className="md:text-3xl text-sm">
                                <svg aria-label="" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor"  role="img" viewBox="0 0 24 24" width="24"><title></title><path d="M8 12a1 1 0 0 0-1 1v3a1 1 0 1 0 2 0v-3a1 1 0 0 0-1-1Zm8-3a1 1 0 0 0-1 1v6a1 1 0 1 0 2 0v-6a1 1 0 0 0-1-1Zm-4-2a1 1 0 0 0-1 1v8a1 1 0 1 0 2 0V8a1 1 0 0 0-1-1Z"></path><path d="M18.44 1H5.567a4.565 4.565 0 0 0-4.56 4.56v12.873a4.565 4.565 0 0 0 4.56 4.56H18.44a4.565 4.565 0 0 0 4.56-4.56V5.56A4.565 4.565 0 0 0 18.44 1ZM21 18.433a2.563 2.563 0 0 1-2.56 2.56H5.567a2.563 2.563 0 0 1-2.56-2.56V5.56A2.563 2.563 0 0 1 5.568 3H18.44A2.563 2.563 0 0 1 21 5.56v12.873Z"></path></svg>
                            </div>
                            <div className="w-full ms-5  md:text-lg text-sm ">
                                Account type and tools
                            </div>
                        </div>
                    </div>


                    <div className="mt-5 ms-5 ">
                        <p>More info and support</p>

                        <div className="flex  mt-5 hover:bg-gray-100 rounded-xl py-2  px-3">
                            <div className="md:text-4xl text-3xl">
                                <IoIosHelpBuoy />
                            </div>
                            <div className="w-full ms-5  md:text-lg text-sm ">
                                Help
                            </div>
                        </div>

                        <div className="flex  mt-5 hover:bg-gray-100 rounded-xl py-2  px-3">
                            <div className="md:text-4xl text-2xl">
                                <MdOutlinePrivacyTip />
                            </div>
                            <div className="w-full ms-5  md:text-lg  text-sm">
                                Privacy Centre
                            </div>
                        </div>

                        <div className="flex  mt-5 hover:bg-gray-100 rounded-xl py-2  px-3 md:mb-10 mb-28">
                            <div className="md:text-3xl text-xl">
                                <FaRegUser />
                            </div>
                            <div className="w-full ms-5  md:text-lg text-sm ">
                                Account Status
                            </div>
                        </div>
                    </div>
                </div>
            </aside>

            
        </>
    )
}
