// https://supabase.com/docs/reference/javascript/installing
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.0";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_ANON_KEY;

export const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
        "authorization, x-client-info, apikey, content-type",
};

// Create a single supabase client for interacting with your database
const supabase = createClient(supabaseUrl, supabaseKey);

const { data, error } = await supabase.functions.invoke("hello-world", {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
    body: { name: "Functions" },
});
