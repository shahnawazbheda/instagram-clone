import React from 'react'
import { Suspense } from 'react'
import PeopleProfile from '../components/PeopleProfile';

const Page: React.FC = () => {
    const userId = '';
    const usersData: any = '';

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PeopleProfile userId={userId} usersData={usersData} />
        </Suspense>
    )
}

export default Page;
