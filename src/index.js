import { writeFileSync } from 'fs';
import TurndownService from 'turndown';

export async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
    console.log('fetchxx - Convert web pages to Markdown');
    console.log('');
    console.log('Usage: fetchxx <url> [options]');
    console.log('');
    console.log('Options:');
    console.log('  -o, --output <file>  Save output to file instead of stdout');
    console.log('  -h, --help           Show help');
    console.log('  -v, --version        Show version');
    console.log('');
    console.log('Examples:');
    console.log('  fetchxx https://example.com');
    console.log('  fetchxx https://example.com -o output.md');
    return;
  }
  
  if (args.includes('--version') || args.includes('-v')) {
    console.log('1.0.0');
    return;
  }
  
  // Parse arguments
  let url = null;
  let outputFile = null;
  
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    
    if (arg === '-o' || arg === '--output') {
      outputFile = args[i + 1];
      i++; // Skip next argument
    } else if (!arg.startsWith('-')) {
      url = arg;
    }
  }
  
  if (!url) {
    console.error('Error: URL is required');
    console.log('Use fetchxx --help for usage information');
    process.exit(1);
  }
  
  try {
    // Fetch the HTML content
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const html = await response.text();
    
    // Convert HTML to Markdown
    const turndownService = new TurndownService({
      headingStyle: 'atx',
      bulletListMarker: '-',
      codeBlockStyle: 'fenced'
    });
    
    const markdown = turndownService.turndown(html);
    
    // Output result
    if (outputFile) {
      writeFileSync(outputFile, markdown, 'utf8');
      console.log(`Markdown saved to ${outputFile}`);
    } else {
      console.log(markdown);
    }
    
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}