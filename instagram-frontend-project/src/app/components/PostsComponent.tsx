'use client'
import React, { useEffect, useState } from "react";
import { FaComment, FaHeart } from "react-icons/fa";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DeletePost, getOwnAllPosts } from "../utils/Api";
import { useRouter } from "next/navigation";
import Spinner from "./Spinner";
import Image from "next/image";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { IoMdShare } from "react-icons/io";

interface UserPostData {
    id: string;
    files: { fileName: string; filePath: string; postId: number; }[];
    caption: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
    likeCount: number;
    commentCount: number;
    userName:string;
}

const PostsComponent: React.FC = () => {
    const [posts, setPosts] = useState<UserPostData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const [showComment, setShowComment] = useState<any>(null);
    const [isshowComment, setIsShowComment] = useState<Boolean>(false);
    const [moreOption, setMoreOption] = useState<boolean>(false);
    const router = useRouter();

    const handleDeletePost = async (postId: string) => {
        try {
            const response = await DeletePost(postId);

            toast.success("Post Deleted Successfully");
            const token = response.data.token;

            if (token) {
                localStorage.setItem('token', token);
                setPosts(posts.filter(post => post.id !== postId));
            }

        } catch (error) {
            console.error('Error deleting post:', error);
            toast.error("Can't Delete Post");
        }
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const response = await getOwnAllPosts();
                    const responseData = response.data;

                    if (responseData && responseData.data) {
                        const userPosts = responseData.data.map((post: any) => ({
                            id: post._id,
                            files: post.files.map((file: any) => ({
                                fileName: file.fileName,
                                filePath: file.filePath,
                                postId: file.postId,
                            })),
                            caption: post.caption,
                            userId: post.userId,
                            createdAt: post.createdAt,
                            updatedAt: post.updatedAt,
                            postId: post.files[0]?.postId,
                            likeCount: post.likeCount,
                            commentCount: post.commentCount,
                            userName:post.userName,

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
        fetchUserData();
    }, []);

    const isImageFile = (filePath: string) => {
        const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
        const fileExtension = filePath.split('.').pop()?.toLowerCase();
        return allowedExtensions.includes(fileExtension || '');
    };

    const isVideoFile = (filePath: string) => {
        const allowedExtensions = ['mp4', 'avi', 'mov', 'mkv'];
        const fileExtension = filePath.split('.').pop()?.toLowerCase();
        return allowedExtensions.includes(fileExtension || '');
    };

    if (error) {
        return <div>{error}</div>;
    }

    const Comments: { id: number; ProfilePIc: string; UserName: string, comment: string; }[] = [
        {
            id: 1,
            ProfilePIc: 'https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=600',
            UserName: 'keval_sidd_07',
            comment: "#AngularJS developer",
        }
    ];

    return (
        <div>
            <ToastContainer />
            {loading && (
                <div className="fixed z-30 inset-0 flex items-center justify-center bg-gray-700 bg-opacity-75">
                    <Spinner />
                </div>
            )}
         
            <div className="flex flex-wrap -mx-2 md:mt-5 mt-16 mb-12">
                {posts.length > 0 ? (
                    posts.map((post, index) => (
                        <React.Fragment key={post.id}>
                            <div className="w-1/3 px-0.5 md:mb-4 mb-1" key={index}>
                                <div onClick={() => { setShowComment(post), setIsShowComment(true) }}
                                    className="block bg-white border border-gray-200 shadow hover:bg-gray-100 relative">
                                    {isVideoFile(post.files[0].filePath) ? (
                                        <video 
                                        loop
                                        autoPlay
                                        className="w-full h-[150px] md:h-[320px]">
                                            <source src={post.files[0].filePath} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    ) : (
                                        <img src={post.files[0].filePath} alt={post.files[0].fileName} className='w-full h-[150px] md:h-[320px]' />
                                    )}
                                    <div className="opacity-0 backdrop-brightness-75 hover:opacity-100 duration-300 absolute inset-0 z-40 flex flex-col justify-center items-center text-white font-semibold">
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


                            <div className="flex md:flex-row flex-col ">
                                <div className="md:w-1/2 ">
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
                                                        min: 1024
                                                    },
                                                    items: 1,
                                                    partialVisibilityGutter: 40
                                                },
                                                mobile: {
                                                    breakpoint: {
                                                        max: 164,
                                                        min: 0
                                                    },
                                                    items: 1,
                                                    partialVisibilityGutter: 30
                                                },
                                                tablet: {
                                                    breakpoint: {
                                                        max: 1024,
                                                        min: 464
                                                    },
                                                    items: 1,
                                                    partialVisibilityGutter: 30
                                                }
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
                                                    key={index}  className="w-full h-[350px] md:h-[520px]">
                                                        <source src={file.filePath} className="w-full h-[100px] md:h-[520px]" type="video/mp4" />
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
                                                key={index}  className="w-full h-[350px] md:h-[520px]">
                                                    <source src={file.filePath} type="video/mp4" />
                                                    Your browser does not support the video tag.
                                                </video>
                                            ) : (
                                                <img key={index} src={file.filePath} alt={file.fileName} className="w-full h-[350px] md:h-[520px]" />
                                            )
                                        ))
                                    )}
                                </div>
                                <div className="md:w-1/2 ">
                                    <div className="flex flex-col md:h-full justify-between">
                                        <header className="md:h-24">
                                            <div className="flex w-full mb-2 mt-2">
                                                <div className="md:w-1/6">
                                                    <img src="./assets/userDPNew-removebg-preview.png" className=   'w-14 h-14 ms-4 rounded-full ' />
                                                </div>
                                                <div className="md:w-2/3 w-full">
                                                    <div className='mt-2 md:ms-6 ms-10'>
                                                        <a href='#' className='font-medium text-lg'
                                                         onClick={()=> console.log('ShowCommentData',showComment)
                                                         }>
                                                            test

                                                        </a>
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
                                                        <button onClick={() => handleDeletePost
                                                            (showComment.postId)} className="text-red-600 font-bold">Delete</button>
                                                        <hr className="mt-5 w-full border-gray-400" />
                                                        <div className='mt-5 '>
                                                            <a href="#" className="mt-5">Edit</a>
                                                        </div>
                                                        <hr className="mt-3 w-full border-gray-400" />
                                                        <div className='mt-5 '>
                                                            <a href="#" className="mt-5">Hide like count to others</a>
                                                        </div>
                                                        <hr className="mt-3 w-full border-gray-400" />
                                                        <div className='mt-5 '>
                                                            <a href="#" className="mt-5">Turn off commeting</a>
                                                        </div>
                                                        <hr className="mt-3 w-full border-gray-400" />
                                                        <div className='mt-5 '>
                                                            <a href="#" className="mt-5">Go to post</a>
                                                        </div>
                                                        <hr className="mt-3 w-full border-gray-400" />
                                                        <div className='mt-5 '>
                                                            <a href="#" className="mt-5">Share to</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        <div className="flex-1 h-full px-4 overflow-y-auto">
                                            <div className="flex mb-4">
                                                <img src="./assets/userDPNew-removebg-preview.png" className='w-10 h-10 rounded-full border-[2px] border-[#EF3FAE]' />
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
        </div>
    );
};

export default PostsComponent;
