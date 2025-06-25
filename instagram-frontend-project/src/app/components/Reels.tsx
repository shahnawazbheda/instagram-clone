'use client';
import React, { useEffect, useRef, useState } from 'react';
import Sidebar from './Sidebar';
import { CiHeart, CiLocationArrow1, CiSaveUp2 } from 'react-icons/ci';
import { FaRegComment, FaHeart } from 'react-icons/fa6';
import { PiDotsThreeLight } from 'react-icons/pi';
import { useRouter } from 'next/navigation';
import { getAllPosts, getOwnAllPosts } from '../utils/Api';
import { Carousel } from '@material-tailwind/react';
import 'react-multi-carousel/lib/styles.css';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import SkeletonLoader from './SkeletonLoader';

interface UserPostData {
  id: string;
  files: { fileName: string; filePath: string; postId: number }[];
  caption: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  likeCount: number;
  commentCount: number;
}

const Reels: React.FC = () => {
  const [posts, setPosts] = useState<UserPostData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [showComment, setShowComment] = useState<any>(null);
  const [isshowComment, setIsShowComment] = useState<Boolean>(false);
  const [moreOption, setMoreOption] = useState<boolean>(false);
  const router = useRouter();
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [token, setToken] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);


  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       const token = localStorage.getItem('token');
  //       if (token) {
  //         const response = await getOwnAllPosts(token);
  //         const responseData = response.data;
  //         if (responseData && responseData.data) {
  //           const userPosts = responseData.data.map((post: any) => ({
  //             id: post._id,
  //             files: post.files.map((file: any) => ({
  //               fileName: file.fileName,
  //               filePath: file.filePath,
  //               postId: file.postId,
  //             })),
  //             caption: post.caption,
  //             userId: post.userId,
  //             createdAt: post.createdAt,
  //             updatedAt: post.updatedAt,
  //             likeCount: post.likeCount,
  //             commentCount: post.commentCount,
  //           }));
  //           const videoPosts = userPosts.filter((post) =>
  //             post.files.some((file) => isVideoFile(file.filePath))
  //           );
  //           setPosts(videoPosts);
  //           setLoading(false);
  //         } else {
  //           setLoading(false);
  //           setError('User data not found');
  //         }
  //       } else {
  //         setLoading(false);
  //         setError('Token not found in localStorage');
  //       }
  //     } catch (error) {
  //       console.error('Error fetching user data:', error);
  //       setLoading(false);
  //       setError('Error fetching user data');
  //     }
  //   };
  //   fetchUserData();
  // }, []);


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage?.getItem('token');
        if (token) {
          const response = await getAllPosts();
          const responseData = response.data;

          if (responseData && responseData.data) {
            const userPosts = responseData.data.map((post:any) => ({
              id: post._id,
              files: post.files.map((file:any) => ({
                fileName: file.fileName,
                filePath: file.filePath,
                postId: file.postId,
              })),
              caption: post.caption,
              likesCount: post.likesCount || 0,
              commentsCount: post.commentsCount || 0,
              userName: post.UserDetails[0]?.userName,
              userId: post.UserDetails[0]?._id,
              isLiked: post.isLiked || false,
            })).reverse();

            const videoPosts = userPosts.filter((post:any) =>
              post.files.some((file:any) => isVideoFile(file.filePath))
            );

            setPosts(videoPosts);
          } else {
            setError('User data not found');
          }
        } else {
          setError('Token not found in localStorage');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Error fetching user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);
  useEffect(() => {
    const handleScroll = () => {
      videoRefs.current.forEach((video) => {
        if (video) {
          const rect = video.getBoundingClientRect();
          if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
            video.play();
          } else {
            video.pause();
          }
        }
      });
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [posts]);

  const isVideoFile = (filePath: string) => {
    const allowedExtensions = ['mp4', 'avi', 'mov', 'mkv'];
    const fileExtension = filePath.split('.').pop()?.toLowerCase();
    return allowedExtensions.includes(fileExtension || '');
  };

  return (
    <>
      <Sidebar token={token} isNotification1={false} />
      <div className="md:p-4 sm:ml-80 overflow-y-auto h-[94vh] snap-y snap-mandatory scrollhide">

        {loading ? (
          <SkeletonLoader type="reels" />
        ) : posts.length > 0 ? (
          posts.map((post, index) => (
            <React.Fragment key={post.id}>
              <div key={post.id} className="flex mt-10 h-screen justify-center items-center snap-start">
                <div className="flex bg-white border  md:w-auto w-2/3 border-gray-200 rounded-lg shadow">
                  <video
                    className="h-screen w-full rounded-lg"
                    loop
                    autoPlay
                    ref={(el) => {
                      videoRefs.current[index] = el
                    }}
                  >
                    <source src={post.files[0].filePath} type="video/mp4" />
                  </video>
                </div>
                <div className="flex flex-col md:mt-96 lg:mt-36 sm:mt-64 ms-3">
                  <div>
                    <p className="text-4xl">
                      <CiHeart />
                    </p>
                    <p className="ms-2">{post.likeCount}</p>
                  </div>
                  <div className="mt-10">
                    <p className="text-3xl ms-1">
                      <FaRegComment />
                    </p>
                    <p className="ms-2">{post.commentCount}</p>
                  </div>
                  <div className="mt-10">
                    <p className="text-4xl">
                      <CiLocationArrow1 />
                    </p>
                  </div>
                  <div className="mt-10">
                    <p className="text-4xl">
                      <CiSaveUp2 />
                    </p>
                  </div>
                  <div className="mt-10">
                    <p className="text-4xl">
                      <PiDotsThreeLight />
                    </p>
                  </div>
                </div>
              </div>
            </React.Fragment>
          ))        ) : (
          <div className='h-full  justify-self-center items-center flex justify-center'>
            <img src='./assets/file.png' className='h-36 w-36 ' />
          </div>
        )}
        {/* {isshowComment && (
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-hidden fixed inset-0 z-50 outline-none backdrop-brightness-75 focus:outline-none">
            <button className="text-white fixed top-5 text-3xl right-0 me-5" onClick={() => setIsShowComment(false)}>
              X
            </button>
            <div className="block max-w-7xl md:ms-32 ms-12 me-12 md:me-28 h-fit bg-white border border-gray-200 shadow">
              <div className="flex md:flex-row flex-col">
                <div className="md:w-1/2">
                  {showComment.files.length > 1 ? (
                    <Carousel
                      additionalTransfrom={0}
                      arrows
                      autoPlaySpeed={3000}
                      centerMode={false}
                      className=""
                      containerClass="container-with-dots"
                      dotListClass=""
                      draggable
                      focusOnSelect={false}
                      infinite
                      itemClass=""
                      keyBoardControl
                      minimumTouchDrag={80}
                      pauseOnHover
                      renderArrowsWhenDisabled={false}
                      renderButtonGroupOutside={false}
                      renderDotsOutside={false}
                      responsive={{
                        desktop: {
                          breakpoint: {
                            max: 3000,
                            min: 1024,
                          },
                          items: 1,
                          partialVisibilityGutter: 40,
                        },
                        mobile: {
                          breakpoint: {
                            max: 464,
                            min: 0,
                          },
                          items: 1,
                          partialVisibilityGutter: 30,
                        },
                        tablet: {
                          breakpoint: {
                            max: 1024,
                            min: 464,
                          },
                          items: 1,
                          partialVisibilityGutter: 30,
                        },
                      }}
                      showDots={false}
                      sliderClass=""
                      slidesToSlide={1}
                      swipeable
                    >
                      {showComment.files.map((file: any, index: number) =>
                        isVideoFile(file.filePath) ? (
                          <video key={index} controls className="w-full h-[100px] md:h-[320px]">
                            <source src={file.filePath} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        ) : (
                          <img key={index} src={file.filePath} alt={file.fileName} className="w-full h-[100px] md:h-[320px]" />
                        )
                      )}
                    </Carousel>
                  ) : (
                    showComment.files.map((file: any, index: number) =>
                      isVideoFile(file.filePath) ? (
                        <video key={index} controls className="w-full h-[100px] md:h-[320px]">
                          <source src={file.filePath} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      ) : (
                        <img key={index} src={file.filePath} alt={file.fileName} className="w-full h-[100px] md:h-[320px]" />
                      )
                    )
                  )}
                </div>
                <div className="md:w-1/2 p-4">
                  <h2 className="text-xl font-semibold mb-4">Comments</h2>
                </div>
              </div>
            </div>
          </div>
        )} */}
      </div>
    </>
  );
};

export default Reels;
