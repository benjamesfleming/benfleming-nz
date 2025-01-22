// https://www.rfc-editor.org/rfc/rfc7033

interface Env {
	PEOPLE: KVNamespace;
}

export const onRequest: PagesFunction<Env> = async (context) => {
    const url = new URL(context.request.url);
	const resource = url.searchParams.get("resource") ?? "";
    const parts = resource.split(":", 2);
	if (parts.length !== 2 || parts[0] !== "acct") {
		return new Response("", { status: 400 });
	}

    const personEmail = parts[1];
    const personExists = await context.env.PEOPLE.get(personEmail, "text");
	if (personExists === null) {
		return new Response("", { status: 404 });
	}

	return Response.json(
        {
            subject: `acct:${personEmail}`,
            aliases: [
                `mailto:${personEmail}`,
            ],
            links: [
                {
                    rel:  "http://openid.net/specs/connect/1.0/issuer",
                    href: "https://authelia.k3s-cluster.benfleming.nz"
                },
            ],
        },
        {
            headers: {
                "Content-Type":  "application/jrd+json",
                "Cache-Control": "max-age=3600, public",
            },
        }
    );
}
