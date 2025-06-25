import Image from 'next/image';
import React from 'react';
import { FaComment, FaHeart } from 'react-icons/fa';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface SkeletonLoaderProps {
  type: 'reels' | 'profile' | 'explore' | 'home' | 'story';
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ type }) => {
  switch (type) {
    case 'reels':
      return (
        <div className="flex space-x-4 p-4 justify-center ">
          <Skeleton baseColor="#b5b4b3" highlightColor="#dbdad9" height={570} width={300} />
        </div>
      );

    case 'profile':
      return (
        <>
          <div className='md:hidden block'>
            <div className=" flex flex-col ">
              <div className='flex items-center  justify-center'>
                <Skeleton baseColor="#b5b4b3" highlightColor="#dbdad9" width={180} height={12} className='ms-5' />
              </div>
              <div className='flex flex-col'>
                <div className="flex md:flex-row mt-5">
                  <Skeleton baseColor="#b5b4b3" highlightColor="#dbdad9" width={200} height={20} className='ms-5' />
                  <Skeleton baseColor="#b5b4b3" highlightColor="#dbdad9" width={200} height={20} className='ms-5' />
                </div>
                <div className="flex flex-row justify-between mt-7">
                  <Skeleton baseColor="#b5b4b3" highlightColor="#dbdad9" width={100} height={12} className='ms-5' />
                  <Skeleton baseColor="#b5b4b3" highlightColor="#dbdad9" width={100} height={12} className='ms-5' />
                  <Skeleton baseColor="#b5b4b3" highlightColor="#dbdad9" width={100} height={12} className='ms-5' />
                </div>
                <div className="flex flex-col justify-start mt-12">
                  <Skeleton baseColor="#b5b4b3" highlightColor="#dbdad9" width={100} height={8} className='ms-5' />
                  <Skeleton baseColor="#b5b4b3" highlightColor="#dbdad9" width={200} height={8} className='ms-5' />
                  <Skeleton baseColor="#b5b4b3" highlightColor="#dbdad9" width={200} height={8} className='ms-5' />
                  <Skeleton baseColor="#b5b4b3" highlightColor="#dbdad9" width={200} height={8} className='ms-5' />

                  <Skeleton baseColor="#b5b4b3" highlightColor="#dbdad9" circle={true} height={80} width={80} className='ms-5' />
                </div>
              </div>
            </div>

            <div className='flex flex-col justify-center items-center mt-10'>
              <div className="flex flex-row justify-between mt-2 ">
                <Skeleton baseColor="#b5b4b3" highlightColor="#dbdad9" width={120} height={15} className='ms-5' />
                <Skeleton baseColor="#b5b4b3" highlightColor="#dbdad9" width={120} height={15} className='ms-5' />
                <Skeleton baseColor="#b5b4b3" highlightColor="#dbdad9" width={120} height={15} className='ms-5' />
              </div>
              <div className="flex flex-row mt-16">
                <Skeleton baseColor="#b5b4b3" highlightColor="#dbdad9" width={140} height={140} className='ms-5' />
                <Skeleton baseColor="#b5b4b3" highlightColor="#dbdad9" width={140} height={140} className='ms-5' />
                <Skeleton baseColor="#b5b4b3" highlightColor="#dbdad9" width={140} height={140} className='ms-5' />
              </div>
            </div>
          </div>
          <div className='md:block hidden'>
            <div className=" flex ms-32">
              <Skeleton baseColor="#b5b4b3" highlightColor="#dbdad9" circle={true} height={140} width={140} />
              <div className='flex flex-col'>
                <div className="flex md:flex-row mt-5">
                  <Skeleton baseColor="#b5b4b3" highlightColor="#dbdad9" width={120} height={15} className='ms-5' />
                  <Skeleton baseColor="#b5b4b3" highlightColor="#dbdad9" width={200} height={15} className='ms-5' />
                  <Skeleton baseColor="#b5b4b3" highlightColor="#dbdad9" width={100} height={15} className='ms-5' />
                </div>
                <div className="flex flex-row mt-5">
                  <Skeleton baseColor="#b5b4b3" highlightColor="#dbdad9" width={120} height={15} className='ms-5' />
                  <Skeleton baseColor="#b5b4b3" highlightColor="#dbdad9" width={200} height={15} className='ms-5' />
                  <Skeleton baseColor="#b5b4b3" highlightColor="#dbdad9" width={100} height={15} className='ms-5' />
                </div>
                <div className="flex flex-col mt-5">
                  <Skeleton baseColor="#b5b4b3" highlightColor="#dbdad9" width={100} height={8} className='ms-5' />
                  <Skeleton baseColor="#b5b4b3" highlightColor="#dbdad9" width={200} height={8} className='ms-5' />
                  <Skeleton baseColor="#b5b4b3" highlightColor="#dbdad9" width={200} height={8} className='ms-5' />
                  <Skeleton baseColor="#b5b4b3" highlightColor="#dbdad9" width={200} height={8} className='ms-5' />
                </div>
              </div>
            </div>

            <div className='flex flex-col ms-32 mt-16'>
              <div className="flex flex-row mt-2 ms-72">
                <Skeleton baseColor="#b5b4b3" highlightColor="#dbdad9" width={120} height={20} className='ms-5' />
                <Skeleton baseColor="#b5b4b3" highlightColor="#dbdad9" width={120} height={20} className='ms-5' />
                <Skeleton baseColor="#b5b4b3" highlightColor="#dbdad9" width={120} height={20} className='ms-5' />
              </div>
              <div className="flex flex-row mt-5">
                <Skeleton baseColor="#b5b4b3" highlightColor="#dbdad9" width={280} height={300} className='ms-5' />
                <Skeleton baseColor="#b5b4b3" highlightColor="#dbdad9" width={280} height={300} className='ms-5' />
                <Skeleton baseColor="#b5b4b3" highlightColor="#dbdad9" width={280} height={300} className='ms-5' />
              </div>
            </div>
          </div>
        </>
      );

    case 'home':
      return (
        <>
          <div className='md:hidden lp:hidden block p-1 shadow-lg top-0 w-full bg-white z-50 fixed'>
            <div className="flex mb-4 mt-3  flex-row  justify-between xs:ms-5">
              <div className="w-1/3">
                <Skeleton baseColor="#b5b4b3" highlightColor="#dbdad9" />
              </div>
              <div className="w-full">
                <Skeleton baseColor="#b5b4b3" highlightColor="#dbdad9" className='ms-5' />
              </div>
              <div className="w-1/6 ms-5" >
                <Skeleton baseColor="#b5b4b3" highlightColor="#dbdad9" className='ms-5' />
              </div>
            </div>
          </div>

          <div className="md:p-4  sm:ml-80">
            <div className="p-4 md:mt-0 mt-20 rounded-lg ">
              <div className="flex  mb-4">
                <div className='md:w-3/4 w-full  '>
                  <div className="flex md:overflow-hidden w-full overflow-x-scroll scrollhide">

                    <div className='w-1/2'>
                      <Skeleton baseColor="#b5b4b3" highlightColor="#dbdad9" circle={true} height={60} width={60} className='ms-5' />
                    </div>
                    <div className='w-1/2'>
                      <Skeleton baseColor="#b5b4b3" highlightColor="#dbdad9" circle={true} height={60} width={60} className='ms-5' />
                    </div>
                    <div className='w-1/2'>
                      <Skeleton baseColor="#b5b4b3" highlightColor="#dbdad9" circle={true} height={60} width={60} className='ms-5' />
                    </div>
                    <div className='w-1/2'>
                      <Skeleton baseColor="#b5b4b3" highlightColor="#dbdad9" circle={true} height={60} width={60} className='ms-5' />
                    </div>
                    <div className='w-1/2'>
                      <Skeleton baseColor="#b5b4b3" highlightColor="#dbdad9" circle={true} height={60} width={60} className='ms-5' />
                    </div>
                    <div className='w-1/2'>
                      <Skeleton baseColor="#b5b4b3" highlightColor="#dbdad9" circle={true} height={60} width={60} className='ms-5' />
                    </div>
                    <div className='w-1/2'>
                      <Skeleton baseColor="#b5b4b3" highlightColor="#dbdad9" circle={true} height={60} width={60} className='ms-5' />
                    </div>
                    <div className='w-1/2'>
                      <Skeleton baseColor="#b5b4b3" highlightColor="#dbdad9" circle={true} height={60} width={60} className='ms-5' />
                    </div>
                  </div>
                  <div className='flex flex-col justify-center items-center '>
                    <div className="md:w-2/3">


                      <div className="w-full mb-2 mt-10">
                        <div className="flex mb-2">
                          <div className="w-1/6">
                            <Skeleton baseColor="#b5b4b3" highlightColor="#dbdad9" circle={true} height={42} width={42} className='ms-10 mt-4' />
                          </div>
                          <div className="w-full mt-2 ms-10">
                            <div className="flex flex-col justify-start mt-5">
                              <Skeleton baseColor="#b5b4b3" highlightColor="#dbdad9" width={150} height={7} className='ms-5' />
                              <Skeleton baseColor="#b5b4b3" highlightColor="#dbdad9" width={50} height={7} className='ms-5' />
                            </div>
                          </div>
                          <div className="w-1/6 flex justify-end mt-10">
                            <Skeleton baseColor="#b5b4b3" highlightColor="#dbdad9" width={20} height={10} className='ms-5 ' />
                          </div>
                        </div>

                        <div className="block w-full bg-white  rounded-sm shadow">

                          <Skeleton baseColor="#b5b4b3" highlightColor="#dbdad9" className='h-96' />

                        </div>

                        <div className="flex justify-between mx-4 mt-4">
                          <div className="flex">
                            <Skeleton baseColor="#b5b4b3" highlightColor="#dbdad9" width={20} height={10} className='ms-3 ' />
                            <Skeleton baseColor="#b5b4b3" highlightColor="#dbdad9" width={20} height={10} className='ms-3 ' />
                            <Skeleton baseColor="#b5b4b3" highlightColor="#dbdad9" width={20} height={10} className='ms-3 ' />
                          </div>
                          <div>
                            <Skeleton baseColor="#b5b4b3" highlightColor="#dbdad9" width={20} height={10} className='ms-3 ' />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="md:w-1/3 md:block hidden">
                  {/* <Suggested /> */}


                  <div className="flex mb-4 mt-5">
                    <div className="w-1/4">
                      <Skeleton baseColor="#b5b4b3" highlightColor="#dbdad9" circle={true} height={42} width={42} className='ms-10' />
                    </div>
                    <div className="w-full ms-5">
                      <div className="flex flex-col justify-start mt-2">
                        <Skeleton baseColor="#b5b4b3" highlightColor="#dbdad9" width={150} height={10} className='ms-5' />
                        <Skeleton baseColor="#b5b4b3" highlightColor="#dbdad9" width={50} height={10} className='ms-5' />
                      </div>
                    </div>
                    <div className="w-1/4 mt-2">
                      <Skeleton baseColor="#b5b4b3" highlightColor="#dbdad9" width={30} height={10} className='ms-5 ' />
                    </div>
                  </div>

                  <div className="mt-10">
                    <div className="font-medium flex justify-between">
                      <div>
                        <Skeleton baseColor="#b5b4b3" highlightColor="#dbdad9" width={150} height={10} className='ms-5' />
                      </div>

                      <div>
                        <Skeleton baseColor="#b5b4b3" highlightColor="#dbdad9" width={30} height={10} className='ms-5' />
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex flex-col mb-4 mt-8">

                      <div className="flex mt-5">
                        <div className="w-1/4">
                          <Skeleton baseColor="#b5b4b3" highlightColor="#dbdad9" circle={true} height={42} width={42} className='ms-10' />
                        </div>
                        <div className="w-full ms-5">
                          <div className="flex flex-col justify-start mt-2">
                            <Skeleton baseColor="#b5b4b3" highlightColor="#dbdad9" width={150} height={10} className='ms-5' />
                            <Skeleton baseColor="#b5b4b3" highlightColor="#dbdad9" width={170} height={10} className='ms-5' />
                          </div>
                        </div>
                        <div className="w-1/4">
                        <Skeleton baseColor="#b5b4b3" highlightColor="#dbdad9" width={30} height={10} className='ms-5 ' />
                        </div>
                      </div>

                      <div className="flex mt-5">
                        <div className="w-1/4">
                          <Skeleton baseColor="#b5b4b3" highlightColor="#dbdad9" circle={true} height={42} width={42} className='ms-10' />
                        </div>
                        <div className="w-full ms-5">
                          <div className="flex flex-col justify-start mt-2">
                            <Skeleton baseColor="#b5b4b3" highlightColor="#dbdad9" width={150} height={10} className='ms-5' />
                            <Skeleton baseColor="#b5b4b3" highlightColor="#dbdad9" width={170} height={10} className='ms-5' />
                          </div>
                        </div>
                        <div className="w-1/4">
                        <Skeleton baseColor="#b5b4b3" highlightColor="#dbdad9" width={30} height={10} className='ms-5 ' />
                        </div>
                      </div>


                      <div className="flex mt-5">
                        <div className="w-1/4">
                          <Skeleton baseColor="#b5b4b3" highlightColor="#dbdad9" circle={true} height={42} width={42} className='ms-10' />
                        </div>
                        <div className="w-full ms-5">
                          <div className="flex flex-col justify-start mt-2">
                            <Skeleton baseColor="#b5b4b3" highlightColor="#dbdad9" width={150} height={10} className='ms-5' />
                            <Skeleton baseColor="#b5b4b3" highlightColor="#dbdad9" width={170} height={10} className='ms-5' />
                          </div>
                        </div>
                        <div className="w-1/4">
                        <Skeleton baseColor="#b5b4b3" highlightColor="#dbdad9" width={30} height={10} className='ms-5 ' />
                        </div>
                      </div>

                      <div className="flex mt-5">
                        <div className="w-1/4">
                          <Skeleton baseColor="#b5b4b3" highlightColor="#dbdad9" circle={true} height={42} width={42} className='ms-10' />
                        </div>
                        <div className="w-full ms-5">
                          <div className="flex flex-col justify-start mt-2">
                            <Skeleton baseColor="#b5b4b3" highlightColor="#dbdad9" width={150} height={10} className='ms-5' />
                            <Skeleton baseColor="#b5b4b3" highlightColor="#dbdad9" width={170} height={10} className='ms-5' />
                          </div>
                        </div>
                        <div className="w-1/4">
                        <Skeleton baseColor="#b5b4b3" highlightColor="#dbdad9" width={30} height={10} className='ms-5 ' />
                        </div>
                      </div>

                      <div className="flex mt-5">
                        <div className="w-1/4">
                          <Skeleton baseColor="#b5b4b3" highlightColor="#dbdad9" circle={true} height={42} width={42} className='ms-10' />
                        </div>
                        <div className="w-full ms-5">
                          <div className="flex flex-col justify-start mt-2">
                            <Skeleton baseColor="#b5b4b3" highlightColor="#dbdad9" width={150} height={10} className='ms-5' />
                            <Skeleton baseColor="#b5b4b3" highlightColor="#dbdad9" width={170} height={10} className='ms-5' />
                          </div>
                        </div>
                        <div className="w-1/4">
                        <Skeleton baseColor="#b5b4b3" highlightColor="#dbdad9" width={30} height={10} className='ms-5 ' />
                        </div>
                      </div>

                      <div className="flex mt-5">
                        <div className="w-1/4">
                          <Skeleton baseColor="#b5b4b3" highlightColor="#dbdad9" circle={true} height={42} width={42} className='ms-10' />
                        </div>
                        <div className="w-full ms-5">
                          <div className="flex flex-col justify-start mt-2">
                            <Skeleton baseColor="#b5b4b3" highlightColor="#dbdad9" width={150} height={10} className='ms-5' />
                            <Skeleton baseColor="#b5b4b3" highlightColor="#dbdad9" width={170} height={10} className='ms-5' />
                          </div>
                        </div>
                        <div className="w-1/4">
                        <Skeleton baseColor="#b5b4b3" highlightColor="#dbdad9" width={30} height={10} className='ms-5 ' />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      );

    case 'explore':
      return (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:p-12 p-5 md:mb-0 mb-16 ">
            <div className="grid ">
              <div className=" md:ms-3 " >
                <div className="block bg-white  shadow  hover:bg-gray-100 relative">
                  <div className="block   bg-white    shadow hover:bg-gray-100 ">
                    <Skeleton baseColor="#b5b4b3" highlightColor="#dbdad9" className='md:w-[241px] w-[200px] h-[250px] md:h-[311px] ' />

                  </div>
                </div>
              </div>

              <div className=" md:ms-3  " >
                <div className="block bg-white  shadow hover:bg-gray-100 relative">
                  <div className="block   bg-white   shadow hover:bg-gray-100 ">
                    <Skeleton baseColor="#b5b4b3" highlightColor="#dbdad9" className='md:w-[241px] w-[200px] h-[250px] md:h-[311px] ' />
                  </div>
                </div>
              </div>
              <div className=" md:ms-3 " >
                <div className="block bg-white  shadow hover:bg-gray-100 relative">
                  <div className="block   bg-white   shadow hover:bg-gray-100 ">
                    <Skeleton baseColor="#b5b4b3" highlightColor="#dbdad9" className='md:w-[241px] w-[200px] h-[250px] md:h-[311px] ' />

                  </div>
                </div>
              </div>
            </div>
            <div className="grid gap-4">
              <div className=" md:ms-3 " >
                <div className="block bg-white  shadow hover:bg-gray-100 relative">
                  <div className="block   bg-white   shadow hover:bg-gray-100 ">
                    <Skeleton baseColor="#b5b4b3" highlightColor="#dbdad9" className='md:w-[241px] w-[200px] h-[200px] md:h-[311px] ' />
                  </div>
                </div>
              </div>
              <div className=" md:ms-3 " >
                <div className="block bg-white  shadow hover:bg-gray-100 relative">
                  <div className="block   bg-white   shadow hover:bg-gray-100 ">
                    <Skeleton baseColor="#b5b4b3" highlightColor="#dbdad9" className='md:w-[241px] w-[200px] h-[330px] md:h-[311px] ' />
                  </div>
                </div>
              </div>
              <div className=" md:ms-3 " >
                <div className="block bg-white  shadow hover:bg-gray-100 relative">
                  <div className="block   bg-white   shadow hover:bg-gray-100 ">
                    <Skeleton baseColor="#b5b4b3" highlightColor="#dbdad9" className='md:w-[241px] w-[200px] h-[200px] md:h-[311px] ' />
                  </div>
                </div>
              </div>
            </div>
            <div className="grid gap-4">
              <div className=" md:ms-3 " >
                <div className="block bg-white  shadow hover:bg-gray-100 relative">
                  <div className="block   bg-white   shadow hover:bg-gray-100 ">
                    <Skeleton baseColor="#b5b4b3" highlightColor="#dbdad9" className='md:w-[241px] w-[200px] h-[200px] md:h-[380px] ' />
                  </div>
                </div>
              </div>

              <div className=" md:ms-3 " >
                <div className="block bg-white  shadow hover:bg-gray-100 relative">
                  <div className="block   bg-white   shadow hover:bg-gray-100 ">
                    <Skeleton baseColor="#b5b4b3" highlightColor="#dbdad9" className='md:w-[241px] w-[200px] h-[230px] md:h-[311px] ' />
                  </div>
                </div>
              </div>
              <div className=" md:ms-3 " >
                <div className="block bg-white  shadow hover:bg-gray-100 relative">
                  <div className="block   bg-white   shadow hover:bg-gray-100 ">
                    <Skeleton baseColor="#b5b4b3" highlightColor="#dbdad9" className='md:w-[241px] w-[200px] h-[230px] md:h-[311px] ' />
                  </div>
                </div>
              </div>
            </div>
            <div className="grid gap-4">
              <div className=" md:ms-3 " >
                <div className="block bg-white  shadow hover:bg-gray-100 relative">
                  <div className="block   bg-white   shadow hover:bg-gray-100 ">
                    <Skeleton baseColor="#b5b4b3" highlightColor="#dbdad9" className='md:w-[241px] w-[200px] h-[230px] md:h-[311px] ' />
                  </div>
                </div>
              </div>

              <div className=" md:ms-3 " >
                <div className="block bg-white  shadow hover:bg-gray-100 relative">
                  <div className="block   bg-white   shadow hover:bg-gray-100 ">
                    <Skeleton baseColor="#b5b4b3" highlightColor="#dbdad9" className='md:w-[241px] w-[200px] h-[350px] md:h-[450px] ' />
                  </div>
                </div>
              </div>
              <div className=" ms-3 " >
                <div className="block bg-white  shadow hover:bg-gray-100 relative">
                  <div className="block   bg-white   shadow hover:bg-gray-100 ">
                    <Skeleton baseColor="#b5b4b3" highlightColor="#dbdad9" className='md:w-[241px] w-[200px] h-[200px] md:h-[311px] ' />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>

      );
    default:
      return null;
  }
};

export default SkeletonLoader;
