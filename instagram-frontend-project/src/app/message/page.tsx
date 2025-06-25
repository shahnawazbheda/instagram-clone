import React from 'react'
import Message from '../components/Message';
import Sidebar from '../components/Sidebar';

const page: React.FC = () => {
    return (
        <>
            <Sidebar />
            <Message />
        </>
    )
}
export default page;