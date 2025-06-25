import React from 'react'
import dynamic from 'next/dynamic'

// Dynamically import the Home component to ensure it's client-side only
const Home = dynamic(() => import('../components/Home'), {
    ssr: false,
})

const Page: React.FC = () => {
    return (
        <>
            <Home token="" />
        </>
    )
}

export default Page;