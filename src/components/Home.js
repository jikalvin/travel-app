import React from 'react'
import Header from './Header'
import Todo from './Todo'
import Banner1 from './HomeBanner'
import NewNav from './NewNav';

const Home = () => {
    return(
        <>
        <NewNav />
        <div className="mt-[60px] grid h-full grid-cols-1 gap-5 xl:grid-cols-2 2xl:grid-cols-3 p-8">
            <Banner1 />
            <Todo />
        </div>
        </>
    )
}

export default Home