import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeExternalLinks from 'rehype-external-links'
import rehypeStringify from 'rehype-stringify'

/**
 * @param stirng
 * @returns Promise<() => Promise<string>>;
 */
export default async (content) => {
    const { process } = await unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkRehype)
        .use(rehypeExternalLinks, { target: "_blank" })
        .use(rehypeStringify);

    return async () => process(content);
};