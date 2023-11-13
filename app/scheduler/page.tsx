import supabase from '../../src/components/supabase'
import AppNavbar from '../../src/components/navbar'

export default function Scheduler() {

    return(
        <div>
            <div>  
                <nav className= "fixed flex flex-row h-10 w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
                    <div className="text-left">
                        <h1 className="text-8xl">Scheduler</h1>
                    </div>    
                </nav>
            </div>
            <h1>Hello</h1>
        </div>
    )
}