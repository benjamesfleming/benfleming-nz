const { DateTime } = require('luxon');

/** 
 * @param {import('@11ty/eleventy').UserConfig} cfg
 */
module.exports = function (cfg) {
    // Markdown
    // Use remark to compile .md files
    cfg.addExtension('md', {
        compile: async (content) => {
            return (await import('./scripts/remark.mjs')).default(content);
        },
    });

    // Layout Aliases
    cfg.addLayoutAlias('base', 'layouts/base.njk');
    
    // Global Data
    cfg.addGlobalData('current_date', DateTime.now().toRFC2822())
};