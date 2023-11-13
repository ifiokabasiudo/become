import supabase from '../../src/components/supabase'
import AppNavbar from '../navbar'

export default function Scheduler() {

    return(
        <div>
            <AppNavbar />
            <div className='border-b dark-nav-border-color flex flex-row text-left'>
                <h1 className='mt-28 mb-12 ml-12 text-4xl'>Let's keep our day orgainized</h1>
            </div>
        </div>
    )
}