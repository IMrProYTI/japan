import { createClient } from '@supabase/supabase-js';
import config from './assets/supabase_config.json';

// Create a single supabase client for interacting with your database
const supabase = createClient(config.SUPABASE_URL, config.SUPABASE_ANON_KEY);

async function checkAuth(): Promise<boolean> {
	const { error } = await supabase.auth.getUser();
	return error === null;
};

export { checkAuth };
export default supabase;