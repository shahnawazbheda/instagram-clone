'use client'
import { useRouter, usePathname } from "next/navigation"
import React, { useEffect, useState } from 'react'
import { FaComment, FaHeart, FaUserTag } from 'react-icons/fa'
import { HiOutlineDotsHorizontal } from 'react-icons/hi'
import { MdGridOn, MdOutlineVideoLibrary } from 'react-icons/md'
import { VscVerifiedFilled } from 'react-icons/vsc'
import { followUser, getAllFollowers, getAllFollowing, getPostsByUserId, getProfileByUserId, unfollowUser } from '../utils/Api'
import Sidebar from './Sidebar'
import Spinner from './Spinner'
import { useSearchParams } from 'next/navigation'
import Image from "next/image"
import SkeletonLoader from "./SkeletonLoader"
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { jwtDecode } from "jwt-decode";

interface ProfileProps {
  userId: any;
  usersData: {
    userName: string;
    name: string;
    bio: string;
    // other fields...
  };
}

interface UserData {
  userId: string;
  userName: string;
  name: string;
  bio: string;
  followingCount: string;
  followerCount: string;
}

interface UserPostData {
  id: string;
  fileName: string;
  filePath: string;
  files: { fileName: string; filePath: string; postId: number; }[];
  postId: number;
  likeCount: number;
  commentCount: number;
}

const PeopleProfile: React.FC<ProfileProps> = ({ userId }: { userId: any }) => {
  const searchButton = useSearchParams();
  const [activeSection, setActiveSection] = useState<any>('POSTS');
  const [posts, setPosts] = useState<UserPostData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [showComment, setShowComment] = useState<any>(null);
  const [isshowComment, setIsShowComment] = useState<Boolean>(false);
  const [moreOption, setMoreOption] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [openPeopleModel, setOpenPeopleModel] = useState<boolean>(false);
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const router = useRouter();
  const [Openfollowers, setOpenfollowers] = useState<Boolean>(false);
  const [Openfollowing, setOpenfollowing] = useState<Boolean>(false);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [hasFollowedMe, setHasFollowedMe] = useState(false);


  const followButtonText = isFollowing ? 'Unfollow' : hasFollowedMe ? 'Followback' : 'Follow';

  const Comments: { id: number; ProfilePIc: string; UserName: string, comment: string; }[] = [
    {
      id: 1,
      ProfilePIc: 'https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=600',
      UserName: 'i_nawaz_khatri',
      comment: "#photography",
    }
  ];

  const handleSectionClick = (section: string) => {
    setActiveSection(section);
  };

  const handleRedirectMessage = () => {
    router.push('message');
  }

  const isVideoFile = (filePath: string | undefined | null) => {
    if (!filePath) {
      return false;
    }
    const allowedExtensions = ['mp4', 'avi', 'mov', 'mkv'];
    const fileExtension = filePath.split('.').pop()?.toLowerCase();
    return allowedExtensions.includes(fileExtension || '');
  };


  useEffect(() => {
    const fetchDataFollower = async () => {
      try {
        const token = localStorage.getItem('token');
        const userId = searchButton.get('userId');
        if (token) {
          const response = await getAllFollowers(userId);
          setFollowers(response.data.data.followers);
        } else {
          setError('Token not found in localStorage');
        }

      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
        setError('Error fetching user data');
      }
    }

    const fetchDataFollowing = async () => {
      try {
        const token = localStorage.getItem('token');
        const userId = searchButton.get('userId');
        if (token) {
          const response = await getAllFollowing(userId);
          setFollowing(response.data.data.following);
        } else {
          setError('Token not found in localStorage');
        }
      } catch (error) {
        console.error('Error fetching following:', error);
        setError('Error fetching following');
      } finally {
        setLoading(false);
      }
    };

    fetchDataFollowing();
    fetchDataFollower();
  }, [])


  useEffect(() => {
    const fetchDataByUserId = async () => {
      try {
        const token = localStorage.getItem('token');
        const userId = searchButton.get('userId');
        if (token) {
          const response = await getProfileByUserId(userId);
          const responseData = response.data;
          if (responseData && responseData.data) {
            const { _id, userName, name, bio, isFollowing,hasFollowedMe, followerCount, followingCount } = responseData.data;
            setUserData({ userId: _id, userName, name, bio, followerCount, followingCount });
            setIsFollowing(isFollowing);
            setHasFollowedMe(hasFollowedMe);
          } else {
            setError('User data does not have userName and name');
          }
        } else {
          setError('Token not found in localStorage');
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
        setError('Error fetching user data');
      }
    };
    fetchDataByUserId();
  }, [searchButton]);


  useEffect(() => {
    const fetchDataByUserId = async () => {
      try {
        const token:any = localStorage.getItem('token');
        const userId = searchButton.get('userId');

        const decoded = jwtDecode(token);
       
        if (token) {
          if (userId === decoded.id) {
            router.push('/profile');
          }

          const response = await getPostsByUserId(userId);
          const responseData = response.data;

          if (responseData && responseData.data) {
            const userPosts = responseData.data.map((post: any) => ({
              id: post._id,
              files: post.files.map((file: any) => ({
                fileName: file.fileName,
                filePath: file.filePath,
                postId: file.postId,
              })),
              likeCount: post.likeCount,
              commentCount: post.commentCount,
            }));

            setPosts(userPosts);
            setLoading(false);
          } else {
            setLoading(false);
            setError('User data not found');
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
    fetchDataByUserId();
  }, []);

  
  const handleFollowClick = async () => {
    const token = localStorage.getItem('token');
    if (token && userData && userData.userId) {
      try {
        if (isFollowing) {
          await unfollowUser(userData.userId, token);
          setIsFollowing(false);
        } else {
          await followUser(userData.userId, token);
          setIsFollowing(true);
        }
      } catch (error) {
        console.error('Error following/unfollowing user:', error);
      }
    }
  };

  const Followers: { id: number; ProfilePIc: string; UserName: string, name: string }[] = [
    {
      id: 1,
      ProfilePIc: '/assets/userDPNew-removebg-preview.png',
      UserName: 'i_nawaz_khatri',
      name: 'shahnawaz bheda'
    }
  ];
  return (
    <>
      <Sidebar />
      <div className="md:p-4 sm:ml-80 ">
        <div className="p-4  rounded-lg">
          <div className='md:ms-32 md:me-32 '>
            <div className="flex md:flex-row-reverse flex-wrap ">
              {loading ? (
                <SkeletonLoader type="profile" />
              ) : userData ? (
                <>
                  <div className={`w-full md:w-3/4 ${userData ? `animate-none` : `animate-pulse`}`}>
                    <div className="md:block hidden">
                      <div className="flex md:flex-row flex-col">
                        <p className="md:text-2xl text-center mt-2 flex ">
                          {userData.userName}
                          <span className="ms-2 mt-1 text-3xl">
                            <VscVerifiedFilled className="text-[#0095F6]" />
                          </span>
                        </p>
                        {/* <button
                          onClick={handleFollowClick}
                          className={`bg-[#0095F6] text-white px-8 ms-5 py-3 rounded-xl font-bold ${isFollowing ? 'bg-gray-400' : ''}`}
                        >
                          {isFollowing ? 'UnFollow' : 'Follow'}
                        </button> */}
                        <button onClick={handleFollowClick}>{followButtonText}</button>
                        <div className="flex md:flex-row flex-col">
                          <button onClick={() => {

                            handleRedirectMessage()
                          }} className="md:w-auto md:mt-0 mt-2 w-full bg-gray-200 py-1.5 px-8 rounded-xl md:ms-3">
                            Message
                          </button>
                          <div className="mt-1">
                            <button onClick={() => setOpenPeopleModel(true)}>
                              <HiOutlineDotsHorizontal className="text-3xl ms-5 mt-1" />
                            </button>

                          </div>
                        </div>
                      </div>
                    </div>

                    {openPeopleModel && (
                      <div onClick={() => setOpenPeopleModel(false)} className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none backdrop-brightness-75 focus:outline-none">
                        <div className="md:w-1/4 w-3/4 block p-6 bg-white border border-gray-200 rounded-2xl">
                          <div className="text-center">
                            <div>
                              <a href="#" className="mt-5 text-red-600 font-bold">Block</a>
                            </div>
                            <hr className="mt-3 w-full border-gray-400" />
                            <div className="mt-5">
                              <a href="#" className="mt-5 text-red-600 font-bold">Restrict</a>
                            </div>
                            <hr className="mt-3 w-full border-gray-400" />
                            <div className="mt-5">
                              <a href="#" className="mt-5 text-red-600 font-bold">Report</a>
                            </div>
                            <hr className="mt-3 w-full border-gray-400" />
                            <div className="mt-5">
                              <a href="#" className="mt-5">Share to...</a>
                            </div>
                            <hr className="mt-3 w-full border-gray-400" />
                            <div className="mt-5">
                              <a href="#" className="mt-5">About this account</a>
                            </div>
                            <hr className="mt-3 w-full border-gray-400" />
                            <div className="mt-5">
                              <a href="#" className="mt-5">Cancel</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="md:hidden flex md:flex-row flex-col">
                      <div className="flex justify-center">
                        <p className="text-2xl text-center md:mt-2 flex">
                          {userData.userName}
                          <span className="ms-2 text-3xl">
                            <VscVerifiedFilled className="text-[#0095F6]" />
                          </span>
                        </p>
                        <div>
                          <button onClick={() => setOpenPeopleModel(true)}>
                            <HiOutlineDotsHorizontal className="text-3xl ms-5" />
                          </button>
                        </div>
                      </div>
                      <div className="flex flex-row">
                        <button
                          onClick={handleFollowClick}
                          className={`bg-[#0095F6] text-white w-full px-8 ms-5 py-2 rounded-xl font-bold ${isFollowing ? 'bg-gray-400' : ''}`}
                        >
                          {isFollowing ? 'UnFollow' : 'Follow'}
                        </button>
                        <button className="bg-gray-200 w-full px-8 ms-5 py-2 rounded-xl font-bold">Message</button>
                      </div>
                    </div>

                    <div className="md:w-1/2 flex mt-10 justify-between">
                      <p className="text-lg">
                        <span className="font-medium">1,700</span> posts
                      </p>
                      <button className="text-lg" onClick={() => setOpenfollowers(true)} >
                        <span className="font-medium">{userData.followerCount}</span> followers
                      </button>
                      <button className="text-lg" onClick={() => setOpenfollowing(true)} >
                        <span className="font-medium">{userData.followingCount}</span> following
                      </button>
                    </div>

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
                                      <Image
                                        priority={true}
                                        width={500}
                                        height={500}
                                        alt="Profile"
                                        src={items.ProfilePIc} className='w-14 h-14 ms-4 rounded-full ' />
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
                                      <Image
                                        priority={true}
                                        width={500}
                                        height={500}
                                        alt="Profile" src={items.ProfilePIc} className='w-14 h-14 ms-4 rounded-full ' />
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

                    <div className="mt-7">
                      <p className="text-black font-bold">{userData.name}</p>
                      <p className="text-black font-medium w-72">{userData.bio}!</p>
                      <p className="mt-5">
                        Followed by <span className="text-black font-medium">_mansi.ravat and vips__parmar018</span>
                      </p>
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
                        <div className="flex flex-wrap -mx-2 md:mt-10 mt-16 mb-12 ">
                          {posts.length > 0 ? (
                            posts.map((post, index) => (
                              <React.Fragment key={post.id}>
                                <div className="w-1/3  px-0.5 md:mb-4 mb-1" key={index}>
                                  <div onClick={() => { setShowComment(post), setIsShowComment(true) }} className="block bg-white border border-gray-200 shadow hover:bg-gray-100 relative">
                                    {isVideoFile(post.files[0].filePath) ? (
                                      <video
                                        loop
                                        autoPlay
                                        className="w-full h-[100px] md:h-[320px]">
                                        <source src={post.files[0].filePath} type="video/mp4" />
                                        Your browser does not support the video tag.
                                      </video>
                                    ) : (
                                      <img src={post.files[0].filePath} alt={post.files[0].fileName} className='w-full h-[100px] md:h-[320px]' />
                                    )}
                                    <div className="opacity-0 backdrop-brightness-75 hover:opacity-100 duration-300 absolute inset-0  z-40 flex flex-col justify-center items-center text-white font-semibold">
                                      <div className="flex">
                                        <div className="text-3xl flex"><FaHeart /> <span className="text-2xl ms-2">{post.likeCount}</span></div>
                                        <div className="text-3xl flex ms-5"><FaComment /> <span className="text-2xl ms-2">{post.commentCount}</span></div>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                              </React.Fragment>
                            ))
                          ) : (
                            <div>No posts available</div>
                          )}
                          {isshowComment ? (
                            <div className="pulse flex justify-center items-center overflow-x-hidden overflow-y-hidden fixed inset-0 outline-none backdrop-brightness-75 focus:outline-none z-50">
                              <button className='text-white fixed top-5 text-3xl right-0 me-5' onClick={() => setIsShowComment(false)}> X</button>
                              <div className="block md:max-w-5xl w-2/3 md:ms-32 ms-12 me-12 md:me-28 h-fit bg-white border border-gray-200 shadow">
                                <div className="flex md:flex-row flex-col">
                                  {/* <div className="md:w-1/2">
                                    {isVideoFile(showComment.filePath) ? (
                                      <video controls className="w-full h-[350px] md:h-[520px]  ">
                                        <source src={showComment.filePath} type="video/mp4" />
                                        Your browser does not support the video tag.
                                      </video>
                                    ) : (
                                      <img src={showComment.filePath} className='w-full h-[350px] md:h-[520px]' />
                                    )}
                                  </div> */}

                                  <div className="md:w-1/2">
                                    {showComment.files.length > 1 ? (
                                      <Carousel
                                        additionalTransfrom={0}
                                        arrows
                                        autoPlaySpeed={3000}
                                        centerMode={false}
                                        className="z-10"
                                        containerClass="container-with-dots"
                                        dotListClass=""
                                        draggable
                                        focusOnSelect={false}
                                        infinite
                                        keyBoardControl
                                        minimumTouchDrag={80}
                                        pauseOnHover
                                        renderArrowsWhenDisabled={false}
                                        renderButtonGroupOutside={false}
                                        renderDotsOutside={false}
                                        responsive={{
                                          desktop: {
                                            breakpoint: { max: 3000, min: 1024 },
                                            items: 1,
                                            partialVisibilityGutter: 40,
                                          },
                                          mobile: {
                                            breakpoint: { max: 164, min: 0 },
                                            items: 1,
                                            partialVisibilityGutter: 30,
                                          },
                                          tablet: {
                                            breakpoint: { max: 1024, min: 464 },
                                            items: 1,
                                            partialVisibilityGutter: 30,
                                          },
                                        }}
                                        showDots={false}
                                        sliderClass=""
                                        slidesToSlide={1}
                                        swipeable
                                      >
                                        {showComment.files.map((file: any, index: number) => (
                                          isVideoFile(file.filePath) ? (
                                            <video
                                              loop
                                              autoPlay
                                              key={index} className="w-full h-[350px] md:h-[520px]">
                                              <source src={file.filePath} type="video/mp4" />
                                              Your browser does not support the video tag.
                                            </video>
                                          ) : (
                                            <img key={index} src={file.filePath} alt={file.fileName} className="w-full h-[350px] md:h-[520px]" />
                                          )
                                        ))}
                                      </Carousel>
                                    ) : (
                                      showComment.files.map((file: any, index: number) => (
                                        isVideoFile(file.filePath) ? (
                                          <video
                                            loop
                                            autoPlay
                                            key={index} className="w-full h-[350px] md:h-[520px]">
                                            <source src={file.filePath} type="video/mp4" />
                                            Your browser does not support the video tag.
                                          </video>
                                        ) : (
                                          <img key={index} src={file.filePath} alt={file.fileName} className="w-full h-[350px] md:h-[520px]" />
                                        )
                                      ))
                                    )}
                                  </div>
                                  <div className="md:w-1/2">
                                    <div className="flex flex-col md:h-full justify-between">
                                      <header className="md:h-24">
                                        <div className="flex w-full mb-2 mt-2">
                                          <div className="md:w-1/6">
                                            <Image
                                              width={500}
                                              priority={true}
                                              height={500}
                                              alt="Profile"
                                              src="/assets/userDPNew-removebg-preview.png" className='w-14 h-14 ms-4 rounded-full ' />
                                          </div>
                                          <div className="md:w-2/3 w-full">
                                            <div className='mt-2 md:ms-6 ms-10'>
                                              <a href='#' className='font-medium text-lg'>test</a>
                                            </div>
                                          </div>
                                          <div className="md:w-1/6 me-5 mb-5 flex justify-end">
                                            <button className='mt-5'>
                                              <HiOutlineDotsHorizontal onClick={() => setMoreOption(true)} className='text-xl' />
                                            </button>
                                          </div>
                                        </div>
                                      </header>

                                      {moreOption && (
                                        <div onClick={() => setMoreOption(false)} className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none backdrop-brightness-75 focus:outline-none">
                                          <div className="md:w-1/4 w-3/4 block p-6 bg-white border border-gray-200 rounded-2xl ">
                                            <div className="text-center">
                                              <button className="text-red-600 font-bold">Report</button>
                                              <hr className="mt-5 w-full border-gray-400" />
                                              <div className='mt-5 '>
                                                <button className="text-red-600 font-bold">Unfollow</button>
                                              </div>
                                              <hr className="mt-3 w-full border-gray-400" />
                                              <div className='mt-5 '>
                                                <a href="#" className="mt-5">Go to post</a>
                                              </div>
                                              <hr className="mt-3 w-full border-gray-400" />
                                              <div className='mt-5 '>
                                                <a href="#" className="mt-5">Cancel</a>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      )}


                                      <div className="flex-1 h-full px-4 overflow-y-auto">
                                        <div className="flex mb-4">
                                          <Image
                                            width={500}
                                            height={500}
                                            priority={true}
                                            alt="Profile"
                                            src="/assets/userDPNew-removebg-preview.png" className='w-10 h-10 rounded-full border-[2px] border-[#EF3FAE]' />
                                          <div className="ml-4">
                                            <a href="#" className="font-medium">test</a>
                                            <p>{showComment.caption}</p>
                                          </div>
                                        </div>
                                        {Comments.map((comment) => (
                                          <div key={comment.id} className="flex mb-4">
                                            <img src={comment.ProfilePIc} className='w-10 h-10 rounded-full border-[2px] border-[#EF3FAE]' />
                                            <div className="ml-4">
                                              <a href="#" className="font-medium">{comment.UserName}</a>
                                              <p>{comment.comment}</p>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                      <div className="md:h-16 h-14 px-4">
                                        <input
                                          type="text"
                                          className="w-full h-full border-none focus:outline-none"
                                          placeholder="Add a comment..."
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : null}
                        </div>
                      </>
                    )}

                    {activeSection === 'REELS' && (
                      <>
                        <div className="flex md:flex-row flex-col h-1/2 mb-12 mt-5 ">
                          <div className="md:w-1/4 md:mt-0 mt-5 ">
                            <div className="block bg-white border border-gray-200 shadow hover:bg-gray-100 relative">
                              <div className="block h-[384px]  bg-white border border-gray-200  shadow hover:bg-gray-100 ">
                                <video
                                  loop
                                  autoPlay
                                  className="h-full w-full rounded-lg" autoPlay src="./assets/1406-147169807_tiny.mp4" />

                                <div className="opacity-0  backdrop-brightness-75 hover:opacity-100 duration-300 absolute inset-0 z-4 flex justify-center items-center text-white font-semibold">
                                  <div className="flex">
                                    <div className="text-3xl flex"><FaHeart /> <span className="text-xl ms-2">20K</span></div>
                                    <div className="text-3xl flex ms-5"><FaComment /> <span className="text-xl ms-2">500</span></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="md:w-1/4 h-[384px] md:ms-3 md:mt-0 mt-5">
                            <div className="block bg-white border border-gray-200 shadow hover:bg-gray-100 relative">
                              <div className="block h-[384px]  bg-white border border-gray-200  shadow hover:bg-gray-100 ">
                                <video
                                  loop

                                  className="h-full w-full rounded-lg" autoPlay src="./assets/1406-147169807_tiny.mp4" />

                                <div className="opacity-0 backdrop-brightness-75 hover:opacity-100 duration-300 absolute inset-0 z-4 flex justify-center items-center text-white font-semibold">
                                  <div className="flex">
                                    <div className="text-3xl flex"><FaHeart /> <span className="text-xl ms-2">30K</span></div>
                                    <div className="text-3xl flex ms-5"><FaComment /> <span className="text-xl ms-2">10K</span></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="md:w-1/4 h-[384px] md:ms-3 md:mt-0 mt-5" >
                            <div className="block bg-white border border-gray-200 shadow hover:bg-gray-100 relative">
                              <div className="block h-[384px]  bg-white border border-gray-200  shadow hover:bg-gray-100 ">
                                <video
                                  loop
                                  className="h-full w-full rounded-lg" autoPlay src="./assets/1406-147169807_tiny.mp4" />

                                <div className="opacity-0 backdrop-brightness-75 hover:opacity-100 duration-300 absolute inset-0 z-4 flex justify-center items-center text-white font-semibold">
                                  <div className="flex">
                                    <div className="text-3xl flex"><FaHeart /> <span className="text-xl ms-2">25K</span></div>
                                    <div className="text-3xl flex ms-5"><FaComment /> <span className="text-xl ms-2">5500</span></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="md:w-1/4 h-[384px] md:ms-3 md:mt-0 mt-5" >
                            <div className="block bg-white border border-gray-200 shadow hover:bg-gray-100 relative">
                              <div className="block h-[384px]  bg-white border border-gray-200  shadow hover:bg-gray-100 ">
                                <video className="h-full w-full rounded-lg"
                                  loop
                                  autoPlay
                                  src="./assets/1406-147169807_tiny.mp4" />

                                <div className="opacity-0 backdrop-brightness-75 hover:opacity-100 duration-300 absolute inset-0 z-4 flex justify-center items-center text-white font-semibold">
                                  <div className="flex">
                                    <div className="text-3xl flex"><FaHeart /> <span className="text-xl ms-2">10K</span></div>
                                    <div className="text-3xl flex ms-5"><FaComment /> <span className="text-2xl ms-2">100</span></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                    {activeSection === 'TAGGED' && (
                      <>
                        <div className="flex mt-5 ">
                          <p>Tagged</p>
                        </div>
                      </>
                    )}
                  </div>
                </>
              ) : (
                <p>Loading .....</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}


export default PeopleProfile;