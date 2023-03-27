interface Env {
	STATS: KVNamespace;
}

export const onRequest: PagesFunction<Env> = async (context) => {
	// Use "0" as the error response as it's OK to silently fail this API
	// FIXME: Add admin notification on failure
	const ErrResponse = new Response("0");

	let pageId = pageKeyFromReq(context.request);
	if (pageId == '') {
		return ErrResponse;
	}

	// FIXME: This is only eventually consistant! Page hits might be lost
	let hits = await context.env.STATS.get(`total_page_hits:${pageId}`);
	let hitsAsInt = parseInt(hits??"0", 10);

	hits = (hitsAsInt + 1).toString();

	await context.env.STATS.put(`total_page_hits:${pageId}`, hits);
	
	return new Response(hits);
}


// --

function pageKeyFromReq(req: Request): string {
	return (new URL(req.url)).searchParams.get('id')?.trim() ?? '';
}
