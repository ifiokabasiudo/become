import { createClient } from '@supabase/supabase-js'

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabase = () => {
    const supabaseClient = createClient(supabaseUrl, supabaseKey)

    return supabaseClient
}

export default supabase()