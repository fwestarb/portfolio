import {defineConfig} from '@playwright/test';
import {existsSync} from 'node:fs';
import path from 'node:path';
const edge=path.join(process.env['ProgramFiles(x86)']||'C:/Program Files (x86)','Microsoft/Edge/Application/msedge.exe');
export default defineConfig({
 testDir:'./tests',workers:1,reporter:'list',outputDir:'.playwright-output',
 use:{baseURL:'http://127.0.0.1:8814',viewport:{width:1366,height:768},reducedMotion:'no-preference',launchOptions:{executablePath:process.env.PLAYWRIGHT_EXECUTABLE_PATH||(process.platform==='win32'&&existsSync(edge)?edge:undefined)}},
 webServer:{command:'npm run dev -- --port 8814',url:'http://127.0.0.1:8814',reuseExistingServer:true,timeout:60000}
});
