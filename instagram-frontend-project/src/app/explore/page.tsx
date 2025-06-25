import React from 'react'
import dynamic from 'next/dynamic'

const Explore = dynamic(() => import('../components/Explore'), {
    ssr: false,
})

const page: React.FC = () => {
  return (
    <Explore />
  )
}

export default page;
