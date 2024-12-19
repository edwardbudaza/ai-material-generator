import { readdirSync, statSync, readFileSync, writeFileSync } from 'fs';
import { join, resolve } from 'path';

function replaceAliases(dir) {
  const files = readdirSync(dir);
  files.forEach((file) => {
    const fullPath = join(dir, file);
    if (statSync(fullPath).isDirectory()) {
      replaceAliases(fullPath);
    } else if (file.endsWith('.js') || file.endsWith('.jsx')) {
      const content = readFileSync(fullPath, 'utf8');
      const updatedContent = content.replace(/@\/(.*)/g, './src/$1');
      writeFileSync(fullPath, updatedContent, 'utf8');
    }
  });
}

// Run the script in the `src` directory
replaceAliases(resolve(process.cwd(), 'src'));
