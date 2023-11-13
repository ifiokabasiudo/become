import supabase from '../../src/components/supabase'
import AppNavbar from '../navbar'

export default function Scheduler() {

    return(
        <div>
            <AppNavbar />
            <div className='border-b dark-nav-border-color flex flex-row text-left'>
                <h1 className='mt-32 mb-24 ml-6 text-4xl'>Let's keep our day orgainized</h1>
            </div>
        </div>
    )
}