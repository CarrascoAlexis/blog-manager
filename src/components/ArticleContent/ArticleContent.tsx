import './ArticleContent.css';

/**
 * Props interface for ArticleContent component
 */
interface ArticleContentProps {
    content: string; // Markdown-formatted article content
}

/**
 * ArticleContent component that converts Markdown to HTML and displays it
 * Supports various Markdown features: headers, code blocks, lists, tables, etc.
 * 
 * @param {ArticleContentProps} props - Component props
 */
function ArticleContent({ content }: ArticleContentProps) {
    /**
     * Convert Markdown text to HTML
     * Implements a simple Markdown parser supporting common syntax
     * 
     * @param {string} markdown - Raw Markdown text
     * @returns {string} - HTML string
     */
    const convertMarkdownToHTML = (markdown: string): string => {
        let html = markdown;

        // Code blocks - convert ```language\ncode\n``` to <pre><code>
        // Escape HTML entities to prevent XSS attacks
        html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (_match, _lang, code) => {
            const trimmedCode = code.trim()
                .replace(/&/g, '&amp;')   // Escape ampersands
                .replace(/</g, '&lt;')     // Escape less-than
                .replace(/>/g, '&gt;')     // Escape greater-than
                .replace(/"/g, '&quot;');  // Escape quotes
            return `<pre><code>${trimmedCode}</code></pre>`;
        });
        // Inline code - convert `code` to <code>
        html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

        // Headers - convert # to <h1>, ## to <h2>, ### to <h3>
        html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
        html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
        html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

        // Horizontal rule - convert --- to <hr>
        html = html.replace(/^---$/gim, '<hr>');

        // Bold and Italic formatting
        html = html.replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>'); // ***text*** = bold + italic
        html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');               // **text** = bold
        html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');                            // *text* = italic

        // Blockquotes - convert > text to <blockquote>
        html = html.replace(/^> (.*$)/gim, '<blockquote><p>$1</p></blockquote>');

        // Tables - convert | header | format to HTML tables
        html = html.replace(/^\|(.+)\|$/gim, (match) => {
            const cells = match.slice(1, -1).split('|').map(cell => cell.trim());
            // Skip separator rows (contain ---)
            if (match.includes('---')) {
                return '';
            }
            // Determine if this is header row (first table row)
            const isHeader = !html.substring(0, html.indexOf(match)).includes('<table>');
            if (isHeader) {
                return '<table><thead><tr>' + cells.map(cell => `<th>${cell}</th>`).join('') + '</tr></thead><tbody>';
            }
            return '<tr>' + cells.map(cell => `<td>${cell}</td>`).join('') + '</tr>';
        });
        html = html.replace(/<\/tr>\n(?!<tr>|<\/tbody>)/g, '</tr></tbody></table>\n');

        // Lists - convert - item to <ul><li>
        html = html.replace(/^\- (.*$)/gim, '<li>$1</li>');
        html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');

        // Paragraphs - wrap regular text in <p> tags
        html = html.replace(/^(?!<[hul>]|```|---|\|)(.+)$/gim, '<p>$1</p>');

        // Clean up extra paragraph tags around block elements
        html = html.replace(/<p><\/p>/g, '');              // Remove empty paragraphs
        html = html.replace(/<p>(<[hul])/g, '$1');         // Remove <p> before block elements
        html = html.replace(/(<\/[hul]>)<\/p>/g, '$1');    // Remove </p> after block elements

        return html;
    };

    return (
        // Render converted HTML (dangerouslySetInnerHTML used because we control the content)
        <div className="article-content" dangerouslySetInnerHTML={{ __html: convertMarkdownToHTML(content) }} />
    );
}

export default ArticleContent;
