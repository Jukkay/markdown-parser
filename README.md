# Markdown-parser

Markdown-parser is a web app that converts markdown to html. The resulting page can be converted to PDF and downloaded. It's build on React/Next.js and PDF conversion is handled by external library.

The functionality is limited. Supported markdown features are:
- Headings
- Unordered lists (Ordered list is converted to unordered)
- Images
- Quotes
- URLs
- Bold (Limited functionality. Whole line gets bolded.)
- Italic (Limited functionality. Whole line gets italicized.)

*Extra functionality:* Line color can be specified with `$color[your color] lorem ipsum`. For example writing 'red' inside square brackets makes the line red.

Viewer page allows user to change background color and font color and size for the whole document.

### Technologies
- React.js
- Next.js
- Bulma CSS
