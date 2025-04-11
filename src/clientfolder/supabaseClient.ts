import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseKey = process.env.VITE_ANON_KEY || '';

const supabaseClient = createClient(supabaseUrl, supabaseKey);

if (process.env.NODE_ENV === 'development') {
	console.info('========== React Supabase has been initialized==========');

	console.info('React supabaseUrl:::::', supabaseUrl);
	console.info('React supabaseKey:::::', supabaseKey);
	console.info(supabaseClient);
	console.info('=================================================');
}

export default supabaseClient;
