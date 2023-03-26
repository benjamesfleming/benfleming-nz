interface Env {
	STATS: KVNamespace;
}

export const onRequest: PagesFunction<Env> = async (context) => {
	// FIXME: This is only eventually consistant! Page hits might be lost
	let hits = await context.env.STATS.get('total_page_hits');
	let hitsAsInt = parseInt(hits??"0", 10);

	hits = (hitsAsInt + 1).toString();

	// Save the incremented page hits
	await context.env.STATS.put('total_page_hits', hits);
 	
	// Return the total to the user
	return new Response(hits);
}
