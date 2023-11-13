'use client'

import supabase from '../../src/components/supabase'
import AppNavbar from '../navbar'
import Collection from './collections'
import AddCollections from './addCollections'

export default async function Scheduler( {session}: any ) {

    let username

    if(session){
        username = session.user.user_metadata.username
        console.log("This is the user: " + username)
    }

    return(
        <div>
            <AppNavbar username = {username}/>
            <div className='mt-28'>
                <div className='border-b dark-nav-border-color flex flex-row text-left'>
                    <h1 className='mb-12 px-28 text-4xl'>Let's keep our day orgainized</h1>
                </div>

                <AddCollections />

                <div id='collections'>
                    <Collection />
                </div>
            </div>
        </div>
    )
}