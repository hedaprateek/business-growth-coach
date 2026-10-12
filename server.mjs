import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { startEditorServer } from './editor/server.mjs';

startEditorServer({
  root: dirname(fileURLToPath(import.meta.url)),
  port: Number(process.argv.slice(2).find(argument => argument !== '--edit') || 8790),
  variable: 'SITE_CONFIG',
  defaultPublishing: { owner: 'hedaprateek', repository: 'business-growth-coach', branch: 'main' },
  openEditor: process.argv.includes('--edit'),
});
