#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

export function readUserscriptVersion(src) {
    const match = String(src).match(/^\/\/ @version\s+(\S+)/m);
    return match ? match[1].trim() : '';
}

export function isReleaseVersion(version) {
    return /^\d+\.\d+\.\d+(?:\.\d+)?(?:-Jayczee)?$/.test(version);
}

export function extractReadmeNotes(readme, version) {
    if (!version) return '';
    const heading = `### v${version}`;
    const lines = String(readme).split(/\r?\n/);
    const start = lines.findIndex((line) => line.trim() === heading);
    if (start < 0) return '';
    const body = [];
    for (let i = start + 1; i < lines.length; i++) {
        if (/^###\s/.test(lines[i])) break;
        body.push(lines[i]);
    }
    return body.join('\n').trim();
}

export function buildReleaseBody({ version, notes, repository = 'Jayczee/LDStatusPro' }) {
    const installUrl = `https://raw.githubusercontent.com/${repository}/v${version}/LDStatusPro.user.js`;
    return `**[点击安装 LDStatus Pro](${installUrl})**

已安装油猴的浏览器会打开安装或更新确认页。

## v${version} 更新内容

${notes.trim() || '本版脚本已随 Release 附上。'}
`;
}

function main() {
    const versionArg = process.argv[2];
    const userscript = fs.readFileSync(path.join(root, 'LDStatusPro.user.js'), 'utf8');
    const version = versionArg || readUserscriptVersion(userscript);
    if (!isReleaseVersion(version)) {
        console.error(`Invalid userscript version: ${version || '(empty)'}`);
        process.exit(1);
    }
    const notes = extractReadmeNotes(fs.readFileSync(path.join(root, 'README.md'), 'utf8'), version);
    const repository = process.env.GITHUB_REPOSITORY || 'Jayczee/LDStatusPro';
    process.stdout.write(buildReleaseBody({ version, notes, repository }));
}

const invoked = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (invoked) main();
