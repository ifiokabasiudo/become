'use client'

import supabase from '../../src/components/supabase'
import AppNavbar from '../navbar'
import Collection from './collections'
import { useState } from 'react'

export default function Scheduler({ session }: any) {
  const [openSidebar, setOpenSidebar] = useState(false)

  const openModal = () => {
    console.log("The modal was opened")
    setOpenSidebar(true)
  }

  const closeModal = () => {
    console.log("The modal was closed")
    setOpenSidebar(false)
  }

  let username

  if (session) {
    username = session.user.user_metadata.username
    console.log("This is the user: " + username)
  }

  const overlayStyle: React.CSSProperties = {
    display: openSidebar ? 'block' : 'none',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(30, 30, 30, 0.7)', // Semi-transparent background
    zIndex: 9, // Higher z-index than the sidebar
  }

  const sidebarStyle = `transition-all flex flex-col text-center duration-1000 overflow-hidden absolute right-0 top-0 h-[100vh] ${
    openSidebar ? `w-[40%] border-l dark-nav-border-color` : `w-0`
  } bg-black z-10`

  return (
    <div>
      <AppNavbar username={username} />

      <div style={overlayStyle} onClick={closeModal}></div>

      <div className={sidebarStyle}>
        {openSidebar && (
          <>
            <p className="w-[100%] px-10 mt-40">Just thought I should add something in here</p>
            <button
              onClick={closeModal}
              className="py-2 bg-transparent w-[30%] mx-[auto] my-5 hover:buttons text-white font-semibold hover:text-white border dark-nav-border-color rounded"
            >
              Done
            </button>
          </>
        )}
      </div>

      <div className='mt-28 relative'>
        <div className='border-b dark-nav-border-color flex flex-row text-left'>
          <h1 className='mb-12 px-28 text-4xl'>Let's keep our day organized</h1>
        </div>

        <div className="py-5 px-28">
          <button
            onClick={openModal}
            className="py-2 bg-transparent w-full hover:buttons text-white font-semibold hover:text-white border dark-nav-border-color rounded"
          >
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
