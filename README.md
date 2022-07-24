# Markdown-parser

Markdown-parser is a web app that converts markdown to html. The resulting page can be converted to PDF and downloaded. It's built on React/Next.js, and PDF conversion is handled by jsPDF library. Parsing is done manually, but ReactHtmlParser is used is some cases to convert temporary string type arrays to ReactNodes.

### Supported markdown features

- Headings
- Unordered lists (Ordered list is converted to unordered)
- Images
- Quotes
- URLs
- Bold
- Italic

### Limitations

Only one markdown styling type allowed per line.

### Extra functionality 

Line color can be specified with `$color[your color] lorem ipsum`. For example writing 'red' inside square brackets makes the line red.

Viewer page allows user to change background color, font color, title color, and font size for the whole document.

### Technologies
- React.js
- Next.js
- Bulma CSS
- Sass

### Deployment

The app is deployed through Vercel. You can find it at:
http://markdown-parser.vercel.app/


### Usage

1. Click the 'editor' button
2. Write markup
3. Click the 'Go to viewer' or 'Viewer' button to open the viewer. Text is saved and parsed automatically.
4. If you want you can change the colors and the font size to fine tune the look.
5. Click 'Download as PDF' button to download the file.