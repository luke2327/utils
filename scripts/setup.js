
import fs from 'fs';

function main() {
    const source = fs.readFileSync('package.json').toString('utf-8');
    const sourceObj = JSON.parse(source);
    sourceObj.scripts = {};
    sourceObj.devDependencies = {};
    if (sourceObj.main.startsWith('\\dist\\')) {
        sourceObj.main = sourceObj.main.slice(5);
    }
    fs.writeFileSync('dist/package.json', Buffer.from(JSON.stringify(sourceObj, null, 2), 'utf-8'));
    fs.writeFileSync('dist/version.txt', Buffer.from(sourceObj.version, 'utf-8'));

    fs.copyFileSync('.npmignore', 'dist/.npmignore');
    fs.copyFileSync('README.md', 'dist/README.md');
    fs.copyFileSync('LICENSE', 'dist/LICENSE');
}

main();