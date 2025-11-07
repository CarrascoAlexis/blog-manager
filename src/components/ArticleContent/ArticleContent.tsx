import './ArticleContent.css';

interface ArticleContentProps {
    content: string;
}

function ArticleContent({ content }: ArticleContentProps) {
    // Simple markdown to HTML converter
    const convertMarkdownToHTML = (markdown: string): string => {
        let html = markdown;

        // Code blocks (trim whitespace from content)
        html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (_match, _lang, code) => {
            const trimmedCode = code.trim()
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;');
            return `<pre><code>${trimmedCode}</code></pre>`;
        });
        html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

        // Headers
        html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
        html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
        html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

        // Horizontal rule
        html = html.replace(/^---$/gim, '<hr>');

        // Bold and Italic
        html = html.replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>');
        html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

        // Blockquotes
        html = html.replace(/^> (.*$)/gim, '<blockquote><p>$1</p></blockquote>');

        // Tables
        html = html.replace(/^\|(.+)\|$/gim, (match) => {
            const cells = match.slice(1, -1).split('|').map(cell => cell.trim());
            if (match.includes('---')) {
                return '';
            }
            const isHeader = !html.substring(0, html.indexOf(match)).includes('<table>');
            if (isHeader) {
                return '<table><thead><tr>' + cells.map(cell => `<th>${cell}</th>`).join('') + '</tr></thead><tbody>';
            }
            return '<tr>' + cells.map(cell => `<td>${cell}</td>`).join('') + '</tr>';
        });
        html = html.replace(/<\/tr>\n(?!<tr>|<\/tbody>)/g, '</tr></tbody></table>\n');

        // Lists
        html = html.replace(/^\- (.*$)/gim, '<li>$1</li>');
        html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');

        // Paragraphs
        html = html.replace(/^(?!<[hul>]|```|---|\|)(.+)$/gim, '<p>$1</p>');

        // Clean up extra paragraph tags
        html = html.replace(/<p><\/p>/g, '');
        html = html.replace(/<p>(<[hul])/g, '$1');
        html = html.replace(/(<\/[hul]>)<\/p>/g, '$1');

        return html;
    };

    return (
        <div className="article-content" dangerouslySetInnerHTML={{ __html: convertMarkdownToHTML(content) }} />
    );
}

export default ArticleContent;
