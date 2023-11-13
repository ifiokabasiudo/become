

export default function AppNavbar( { username }: any ) {

    return( 
        // <div>  
        //     <nav className= "bg-black fixed flex flex-row w-full z-20 top-0 start-0 border-b dark-nav-border-color border-gray-200">
        //         <div className="text-left">
        //             <h1 className="text-3xl ml-6 mt-4 mb-4">Scheduler</h1>
        //             <h2 className="text-xl">{username}</h2>
        //         </div>    
        //     </nav>
        // </div>
        <div>  
        <nav className="bg-black fixed flex flex-row justify-between w-full z-20 top-0 border-b dark-nav-border-color border-gray-200">
            <div className="text-left">
            <h1 className="text-3xl ml-6 mt-4 mb-4">Scheduler</h1>
            </div>
            <div className="text-right mr-6 mt-4 mb-4">
            <h2 className="text-xl">{username}</h2>
            </div>
        </nav>
        </div>
    )
}