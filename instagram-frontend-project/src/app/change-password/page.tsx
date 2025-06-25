import React from 'react'
import dynamic from 'next/dynamic'

const ChangesPassword = dynamic(() => import('../components/ChangesPassword'), {
    ssr: false,
})

const Page: React.FC = () => {
  return (
    <>
      <ChangesPassword />
    </>
  )
}

export default Page;
