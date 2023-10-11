import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_ANON_KEY;

const supabaseClient = createClient(supabaseUrl, supabaseKey);

console.info("========== React Supabase has been initialized==========");

console.info("React supabaseUrl:::::", supabaseUrl);
console.info("React supabaseKey:::::", supabaseKey);
console.info(supabaseClient);
console.info("=================================================");

export default supabaseClient;
