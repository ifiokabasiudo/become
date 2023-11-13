import supabase from '../../src/components/supabase'
import AppNavbar from '../navbar'
import Collection from './collections'

export default async function Scheduler( {session}: any ) {

    console.log(session)

    return(
        <div>
            <AppNavbar />
            <div className='mt-28'>
                <div className='border-b dark-nav-border-color flex flex-row text-left'>
                    <h1 className='mb-12 px-28 text-4xl'>Let's keep our day orgainized</h1>
                </div>

                <div id='collections' className='py-5 px-20'>
                    <Collection />
                </div>
            </div>
        </div>
    )
}