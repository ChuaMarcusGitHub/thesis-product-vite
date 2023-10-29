// https://supabase.com/docs/reference/javascript/installing
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.0";
import { corsHeaders } from "../../../src/modules/root/webservice/cors";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// interface IUserStatResponse {
//     id: string;
//     user_id: string;
//     username: string;
//     articles_read: string;
//     time_spent: string;
// };

serve(async (req: any) => {
    // This is needed if you're planning to invoke your function from a browser.
    if (req.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders });
    }

    const { uuid } = await req.json();
    // Query the user profile by UUID
    const { data: userProfile, error: profileError } = await supabase
        .from("USER_STATS")
        .select("*")
        .eq("uid", uuid)
        .single();

    if (profileError) {
        console.error("Error fetching profile details:", profileError);
        return { error: "Error fetching profile details" };
    }

    if (userProfile) {
        const stringified = JSON.parse(JSON.stringify(userProfile));
        console.log(stringified);
    }
});
