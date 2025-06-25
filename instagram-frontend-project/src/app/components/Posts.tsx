import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaHeart, FaRegBookmark, FaRegComment, FaRegPaperPlane, FaRegSave } from "react-icons/fa";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { api } from '../pages/api/url';
import { Addcomments, CommentDelete, GetCommentFunction } from '../utils/Api';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from 'next/navigation';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Link from 'next/link';
import Image from 'next/image';

interface Comment {
    id: string;
    profilePic: string;
    userName: string;
    comment: string;
}

interface CommentComponentProps {
    postId: string;
}

interface UserPostData {
    id: string;
    fileName: string;
    filePath: string;
    files: { fileName: string; filePath: string; postId: number; }[];
    caption: string;
    likesCount: number;
    commentsCount: number;
    userName: string;
    userId: string;
    isLiked: boolean;
}

interface CommentData {
    id: string;
    postId: string;
    comment: string;
    commentBy: number;
    commentByUserName: string;
    postOwnerId: number;
    commentId: string;
    userId: any;
}
const Posts: React.FC = () => {
    const [moreOption, setMoreOption] = useState<boolean>(false);
    const [AboutAcount, setAboutAcount] = useState<boolean>(false);
    const [deleteComment, setDeleteComment] = useState<boolean>(false);
    const [showComment, setShowComment] = useState<any>(null);
    const [isshowComment, setIsShowComment] = useState<Boolean>(false);
    const [posts, setPosts] = useState<UserPostData[]>([]);
    const [CommentData, setCommentData] = useState<CommentData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const [showDoubleClickLike, setShowDoubleClickLike] = useState<{ [key: string]: boolean }>({});
    const [comment, setComment] = useState<any>('');
    const router = useRouter();

    const handleGetComment = async (postId: any) => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');

                if (token) {
                    const response = await GetCommentFunction(postId);
                    const responseData = response.data;

                    if (responseData && responseData.data) {
                        const userPosts = responseData.data.map((comment: any) => ({
                            commentId: responseData.data[0]?._id,
                            comment: comment.comment,
                            commentBy: comment.commentBy,
                            postId: comment.postId,
                            commentByUserName: comment.commentByUserName,
                            postOwnerId: comment.postOwnerId,
                        }));

                        setCommentData(userPosts);
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
    }

    

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const response = await axios.get(api.getAllPosts, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
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
                            likesCount: post.likesCount || 0,
                            commentsCount: post.commentsCount || 0,
                            userName: post.UserDetails[0]?.userName,
                            userId: post.UserDetails[0]?._id,
                            isLiked: post.isLiked || false,
                        })).reverse();

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
                setError('No Post');
            }
        };

        fetchUserData();
    }, []);

    const handleComment = async (postId: string, comment: string) => {
        try {
            const response = await Addcomments(postId, comment);
            if (response.status === 200) {
                setComment('');
                toast.success("Comment Successfully");
            } else {
                console.error('Failed to add comment:', response.data);
                toast.error("Failed to add comment");
            }
        } catch (error) {
            console.error('Error while adding comment:', error);
        }
    };

    const handleSubmit = (postId: string) => (e: React.FormEvent) => {

        e.preventDefault();
        handleComment(postId, comment);
    };

    const handleDeleteComment = async (commentId: string, userId: string) => {

        try {
            const response = await CommentDelete(commentId);
            if (response.status) {
                setCommentData(CommentData.filter(comment => comment.id !== commentId));
                toast.success("Comment deleted successfully");
                setDeleteComment(false);
            }
        } catch (error) {
            console.error('Error deleting comment:', error);
            toast.error("Can't delete comment");
        }
    };

    const likeHandler = async (postId: string) => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const postIndex = posts.findIndex(post => post.id === postId);
                const updatedPosts = [...posts];
                const url = updatedPosts[postIndex].isLiked ? api.unlikePost : api.likePost;
                await axios.post(url, { postId }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                updatedPosts[postIndex].likesCount += updatedPosts[postIndex].isLiked ? -1 : 1;
                updatedPosts[postIndex].isLiked = !updatedPosts[postIndex].isLiked;
                setPosts(updatedPosts);
            }
        } catch (error) {
            console.error('Error liking/unliking post:', error);
        }
    };

    // const handleDoubleClick = (postId: string) => {
    //     setShowDoubleClickLike({ ...showDoubleClickLike, [postId]: true });
    //     likeHandler(postId);
    //     setTimeout(() => {
    //         setShowDoubleClickLike({ ...showDoubleClickLike, [postId]: false });
    //     }, 1000);
    // };

    const handleDoubleClick = (postId: string) => {
        setShowDoubleClickLike(prevState => ({ ...prevState, [postId]: true }));
        likeHandler(postId);
        setTimeout(() => {
            setShowDoubleClickLike(prevState => ({ ...prevState, [postId]: false }));
        }, 1000);
    };

    const isVideoFile = (filePath: string | undefined | null) => {
        if (!filePath) {
            return false;
        }

        const allowedExtensions = ['mp4', 'avi', 'mov', 'mkv'];
        const fileExtension = filePath.split('.').pop()?.toLowerCase();
        return allowedExtensions.includes(fileExtension || '');
    };

    return (
        <>
            <ToastContainer />
            <div className='flex flex-col justify-center items-center '>
                <div className="md:w-2/3">
                    {error ? (
                        <p>{error}</p>
                    ) : posts.length > 0 ? (
                        posts.map((post, index) => (
                            <React.Fragment key={post.id}>
                                <div className="w-full mb-2 mt-10">
                                    <div onClick={() => {
                                        setShowComment(post)
                                        setComment(post)
                                    }} className="flex mb-2">
                                        <div className="w-1/6">
                                            <Image width={500}
                                                height={500}
                                                priority={true}
                                                alt="userDPNew"
                                                src='/assets/userDPNew-removebg-preview.png' className='md:w-16 md:h-16 w-12 h-12 ms-4 rounded-full' />
                                        </div>
                                        <div className="w-full mt-2 ms-10">
                                            <Link href={{
                                                pathname: '/peouple-profile',
                                                query: {
                                                    userId: post.userId
                                                }
                                            }} className='font-medium text-lg'>{post.userName}<span className='text-sm text-gray-500 ms-5'>59 m</span></Link>
                                            <p className='text-sm'>rajkot</p>
                                        </div>
                                        <div className="w-1/6 flex justify-end">
                                            <button onClick={() => setMoreOption(true)} className='mt-5'>
                                                <HiOutlineDotsHorizontal className='text-xl' />
                                            </button>
                                        </div>
                                    </div>
                                    {moreOption && (
                                        <div onClick={() => setMoreOption(false)} className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none backdrop-brightness-75 focus:outline-none">
                                            <div className="md:w-1/4 w-3/4 block p-6 bg-white border border-gray-200 rounded-2xl ">
                                                <div className="text-center">
                                                    <a href="#" className="text-red-600 font-bold">Report</a>
                                                    <hr className="mt-5 w-full border-gray-400" />
                                                    <div className='mt-5 '>
                                                        <a href="#" className="text-red-600 font-bold">Unfollow</a>
                                                    </div>
                                                    <hr className="mt-5 w-full border-gray-400" />
                                                    <div className='mt-5 '>
                                                        <a href="#" className="mt-5">Add to favourites</a>
                                                    </div>
                                                    <hr className="mt-3 w-full border-gray-400" />
                                                    <div className='mt-5 '>
                                                        <a href="#" className="mt-5">Go To Post</a>
                                                    </div>
                                                    <hr className="mt-3 w-full border-gray-400" />
                                                    <div className='mt-5 '>
                                                        <a href="#" className="mt-5">Share to ..</a>
                                                    </div>
                                                    <hr className="mt-3 w-full border-gray-400" />
                                                    <div className='mt-5 '>
                                                        <a href="#" className="mt-5">Copy link</a>
                                                    </div>
                                                    <hr className="mt-3 w-full border-gray-400" />
                                                    <div className='mt-5 '>
                                                        <a href="#" className="mt-5">Embed</a>
                                                    </div>
                                                    <hr className="mt-3 w-full border-gray-400" />
                                                    <div >
                                                        <button onClick={
                                                            () => {
                                                                setAboutAcount(true)
                                                                setMoreOption(false)
                                                            }} className="mt-5">About this account</button>
                                                    </div>
                                                    <hr className="mt-3 w-full border-gray-400" />
                                                    <div className='mt-5 '>
                                                        <a href="#" className="mt-5">Cancel</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {AboutAcount && (
                                        <div onClick={() => setAboutAcount(false)} className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none backdrop-brightness-75 focus:outline-none">
                                            <div className="md:w-1/4 w-3/4 block py-6 bg-white border border-gray-200 rounded-2xl ">
                                                <div className="text-center ">

                                                    <p >About this account</p>
                                                    <hr className='border-gray-400 mt-5' />
                                                    <div className='flex flex-col justify-center items-center mt-5'>
                                                        <Image
                                                            priority={true}
                                                            width={500}
                                                            height={500}
                                                            alt="userDPNew"
                                                            src="/assets/userDPNew-removebg-preview.png" className='w-24 h-24' />

                                                        <p className='mt-3 font-bold'>UserName</p>

                                                        <p className='text-sm text-gray-500 mt-5 p-4'>To help keep our community authentic, we&apos;re showing information about accounts on Instagram. See why this information is important.</p>
                                                    </div>
                                                    <hr className='border-gray-400 mt-5' />
                                                    <button onClick={() => setAboutAcount(false)} className='mt-5 w-full'>Close</button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <div onDoubleClick={() => handleDoubleClick(post)} className="block w-full bg-white border border-gray-200 rounded-sm shadow">
                                        {showDoubleClickLike[post] && (
                                            <div className="heart-animation">
                                                <svg aria-label="Like" viewBox="0 0 48 48" width="128"><title>Like</title><defs><linearGradient gradientTransform="rotate(35)" id="ig_heart_gradient"><stop offset="0%" stop-color="#FF7A00"></stop><stop offset="40%" stop-color="#FF0169"></stop><stop offset="100%" stop-color="#FF0169"></stop></linearGradient></defs><path d="M34.3 3.3C29.4 3.3 24 5.9 24 5.9S18.6 3.3 13.7 3.3C6.5 3.3 1 8.8 1 15.9c0 10.4 11.1 18.5 22.1 28.7l.9.9.9-.9C35.9 34.4 47 26.3 47 15.9c0-7.1-5.5-12.6-12.7-12.6z" fill="url(#ig_heart_gradient)"></path></svg>
                                            </div>
                                        )}

                                        {isVideoFile(post.files[0].filePath) ? (
                                            <video
                                                loop
                                                autoPlay
                                                className="w-full h-full">
                                                <source src={post.files[0].filePath} type="video/mp4" />
                                                Your browser does not support the video tag.
                                            </video>
                                        ) : (
                                            <img src={post.files[0].filePath} alt={post.files[0].fileName} className="w-full h-full" />
                                        )}
                                    </div>
                                    <div className="flex justify-between mx-4 mt-4">
                                        <div className="flex">
                                            <button onClick={() => likeHandler(post.id)}>
                                                <FaHeart className={`text-3xl me-2 ${post.isLiked ? 'text-red-600' : 'text-black'}`} />
                                            </button>
                                            <button onClick={() => {
                                                setShowComment(post);
                                                setIsShowComment(true);
                                                handleGetComment(post.id)
                                            }}>
                                                <FaRegComment className="text-3xl me-2" />
                                            </button>
                                            <FaRegPaperPlane className="text-3xl" />
                                        </div>
                                        <div>
                                            <FaRegBookmark className="text-3xl" />
                                        </div>
                                    </div>
                                    <div className="mx-4 mt-2">
                                        <p className="font-bold">{post.likesCount} likes</p>
                                        <p className="font-bold">{post.userName} <span className="font-normal">{post.caption}</span></p>
                                        <button className="text-gray-500">View all {post.commentsCount} comments</button>
                                        <div className="flex mb-2">

                                            {isshowComment && (
                                                <>
                                                    <div key={post.id} className="flex justify-center items-center overflow-x-hidden overflow-y-hidden fixed inset-0 outline-none backdrop-brightness-75 focus:outline-none">
                                                        <button className='text-white fixed md:top-5 top-32 text-3xl right-0 me-5' onClick={() => setIsShowComment(false)}> X</button>

                                                        <div className="block max-w-5xl md:ms-32 ms-12 me-12 md:me-28 h-fit bg-white border border-gray-200 shadow">
                                                            <div className="flex md:flex-row flex-col">

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
                                                                                    breakpoint: { max: 3000, min: 1024 },
                                                                                    items: 1,
                                                                                    partialVisibilityGutter: 40,
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
                                                                                    <img key={index} src={file.filePath} alt={file.fileName} className="w-full h-[154px] md:h-[520px]" />
                                                                                )
                                                                            ))}
                                                                        </Carousel>
                                                                    ) : (
                                                                        showComment.files.map((file: any, index: number) => (
                                                                            isVideoFile(file.filePath) ? (
                                                                                <video
                                                                                loop
                                                                                autoPlay
                                                                                key={index} className="w-full h-[154px] md:h-[520px]">
                                                                                    <source src={file.filePath} type="video/mp4" />
                                                                                    Your browser does not support the video tag.
                                                                                </video>
                                                                            ) : (
                                                                                <img key={index} src={file.filePath} alt={file.fileName} className="w-full h-[154px] md:h-[520px]" />
                                                                            )
                                                                        ))
                                                                    )}
                                                                </div>

                                                                <div className="md:w-1/2">
                                                                    <div className="flex flex-col md:h-full justify-between">
                                                                        <header className="md:h-24">
                                                                            <div className="flex w-full mb-2 mt-2 ">
                                                                                <div className="md:w-1/6">
                                                                                    <img src="./assets/userDPNew-removebg-preview.png" className='w-14 h-14 ms-4 rounded-full border-[2px] border-[#EF3FAE]' />
                                                                                </div>
                                                                                <div className="w-2/3 ms-6">
                                                                                    <div className='mt-2 md:ms-0 ms-10'>
                                                                                        <a href='#' className='font-medium text-lg'>I_Nawaz_khatri</a>
                                                                                        <a href='#' className='text-[#0F9BF7] font-bold ms-5'>Follow</a>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="md:w-1/6 me-5 mb-5 flex justify-end">
                                                                                    <button className='mt-5'>
                                                                                        <HiOutlineDotsHorizontal className='text-xl' />
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                        </header>
                                                                        <hr className='border-gray-400' />
                                                                        <main className="md:block hidden mb-auto h-96 overflow-y-scroll" key={post.id}>

                                                                            <div className='flex mt-5'>
                                                                                <div>
                                                                                    <Image
                                                                                        priority={true}
                                                                                        width={500}
                                                                                        height={500}
                                                                                        alt="userDPNew" src="/assets/myimage01.png" className='w-14 h-14 ms-4 rounded-full border-[2px] border-[#EF3FAE]' />
                                                                                </div>
                                                                                <div className='w-4/5 ms-5 mt-1'>
                                                                                    <p><span className='text-sm'>{post.userName}</span>
                                                                                        <span className='ms-3'>{post.caption}</span>
                                                                                    </p>
                                                                                </div>
                                                                            </div>

                                                                            <div className='overflow-y-scroll h-56 scrollhide'>
                                                                                {loading ? (
                                                                                    <p>Loading...</p>
                                                                                ) : error ? (
                                                                                    <p>{error}</p>
                                                                                ) : CommentData.length > 0 ? (
                                                                                    CommentData.map((comment, index) => (
                                                                                        <div key={index} className='flex mt-5'>
                                                                                            <div className='w-1/7'>
                                                                                                <Image
                                                                                                    priority={true}
                                                                                                    width={500}
                                                                                                    height={500}
                                                                                                    alt="userDPNew"
                                                                                                    src="/assets/myimage01.png" className='w-14 h-14 ms-4 rounded-full border-[2px] border-[#EF3FAE]' />
                                                                                            </div>
                                                                                            <div className='w-4/5 mt-1 ms-5'>
                                                                                                <p><span className='text-sm'>{comment.commentByUserName}</span>
                                                                                                    <span className='ms-1'>{comment.comment}</span>
                                                                                                </p>
                                                                                                <div className='flex'>
                                                                                                    <span className='text-sm'>1 w</span>
                                                                                                    <span className='ms-1 text-sm'>2 likes</span>
                                                                                                    <button onClick={() => setDeleteComment(true)} className='ms-5'>
                                                                                                        <HiOutlineDotsHorizontal />
                                                                                                    </button>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className='w-1/7 me-5'>
                                                                                                <FaHeart className='text-xl' />
                                                                                            </div>
                                                                                        </div>
                                                                                    ))
                                                                                ) : (
                                                                                    <p></p>
                                                                                )}
                                                                            </div>
                                                                        </main>
                                                                        <footer>
                                                                            <div className="flex justify-between mx-4 mt-4">
                                                                                <div className="flex">
                                                                                    <button onClick={() => likeHandler(post.id)}>
                                                                                        <FaHeart className={`text-3xl me-2 ${post.isLiked ? 'text-red-600' : 'text-black'}`} />
                                                                                    </button>
                                                                                    <button>
                                                                                        <FaRegComment className="text-3xl me-2" />
                                                                                    </button>
                                                                                </div>
                                                                                <div>
                                                                                    <FaRegBookmark className="text-3xl" />
                                                                                </div>
                                                                            </div>
                                                                            <div className='w-full ms-3'>
                                                                                <p className="font-bold">{post.likesCount} likes</p>
                                                                                <p className='text-sm'>1 day ago</p>
                                                                            </div>
                                                                            <div className='mt-4'>
                                                                                <hr className='border-gray-400' />
                                                                                <div className='flex mt-2 ms-4'>
                                                                                    <form onSubmit={handleSubmit(showComment.id)} className='flex w-full gap-3'>
                                                                                        <p className='text-xl'>😀</p>
                                                                                        <input
                                                                                            type="text"
                                                                                            value={comment}
                                                                                            onChange={(e) => setComment(e.target.value)}
                                                                                            placeholder='Add a comment...'
                                                                                            className="w-full focus:outline-none focus:ring focus:ring-transparent p-2 rounded-md flex-grow"
                                                                                        />
                                                                                        <button type='submit' className='text-blue-500 px-4 py-2 rounded-md'>Post</button>
                                                                                    </form>
                                                                                </div>
                                                                            </div>
                                                                        </footer>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            )}

                                            {deleteComment && (
                                                <div
                                                    onClick={() => setDeleteComment(false)}
                                                    className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 outline-none backdrop-brightness-50 focus:outline-none"
                                                >
                                                    <div className="md:w-1/4 w-3/4 block p-6 bg-white border border-gray-200 rounded-2xl ">
                                                        <div className="text-center">
                                                            <div>
                                                                <button
                                                                    onClick={() => {
                                                                        handleDeleteComment(CommentData[0].commentId, showComment!.userId)
                                                                    }

                                                                    }
                                                                    className="mt-2 text-red-500 font-bold w-full"
                                                                >
                                                                    Delete
                                                                </button>
                                                            </div>
                                                            <hr className="mt-3 w-full border-gray-400" />
                                                            <div>
                                                                <button className="mt-5 w-full" onClick={() => setDeleteComment(false)}>Cancel</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <p className="text-gray-500 text-sm mx-4 mt-2">2 hours ago</p>
                                </div>
                            </React.Fragment>
                        ))
                    ) : (

                        <p>No posts available</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default Posts;
