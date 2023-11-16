import { createClient } from '@supabase/supabase-js'

    const supabaseUrl = 'https://ikmoyfznxmjnbhplqzlm.supabase.co'
    const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlrbW95ZnpueG1qbmJocGxxemxtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk4MjE3OTMsImV4cCI6MjAxNTM5Nzc5M30.5e28dkeAd_CqNPCm3li0iCtz-nZGcmSVlb0FRHb2Ukg"

const supabase = () => {
    const supabaseClient = createClient(supabaseUrl, supabaseKey)

    return supabaseClient
}

export default supabase()