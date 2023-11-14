'use client'

import supabase from '../../src/components/supabase'
import AppNavbar from '../navbar'
import Collection from './collections'
// import AddCollections from './addCollections'
// import { useState } from 'react'

export default async function Scheduler( {session}: any ) {
    // const [openSidebar, setOpenSidebar] = useState(false)

    // const openModal = () => {
    //     console.log("The modal was opened")
    //     setOpenSidebar(true)
    // }

    let username

    if(session){
        username = session.user.user_metadata.username
        console.log("This is the user: " + username)
    }

    return(
        <div>
            <AppNavbar username = {username}/>
            <div className='mt-28 relative'>
                {/* {
                    openSidebar && ( */}
                        <div className='absolute right-0 top-0 h-[100vh] w-[40%] bg-white z-10'>
                            <p>Just thought I should add something in here</p> 
                        </div>
                    {/* )
                } */}
                <div className='border-b dark-nav-border-color flex flex-row text-left'>
                    <h1 className='mb-12 px-28 text-4xl'>Let's keep our day orgainized</h1>
                </div>

                <div className="py-5 px-28">
                    <button className="py-2 bg-transparent w-full hover:buttons text-white font-semibold hover:text-white border dark-nav-border-color rounded">
                        Add Collection
                    </button>
                </div>

                <div id='collections'>
                    <Collection />
                </div>
            </div>
        </div>
    )
}