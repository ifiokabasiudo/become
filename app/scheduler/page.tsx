import supabase from '../../src/components/supabase'
import AppNavbar from '../navbar'

export default function Scheduler() {

    return(
        <div>
            <AppNavbar />
            <div className='mt-28'>
                <div className='border-b dark-nav-border-color flex flex-row text-left'>
                    <h1 className='mb-12 ml-28 mr-20 text-4xl'>Let's keep our day orgainized</h1>
                </div>
            </div>
        </div>
    )
}