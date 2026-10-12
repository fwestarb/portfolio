import {test,expect} from '@playwright/test';

test('all project details retain truthful limits, images and source links',async({page})=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto('/');
 for(const name of ['ESP32 Tera','GhostReply','Projeto Câmera']){
  const opener=page.getByRole('button',{name:`Explorar projeto: ${name}`,exact:true});await opener.click();
  const dialog=page.getByRole('dialog');await expect(dialog.getByRole('heading',{name,exact:true})).toBeVisible();
  await expect(dialog).toContainText('Verificação e limites');
  await expect(dialog.getByRole('link',{name:'Ver código',exact:false})).toHaveAttribute('href',/github.com\/fwestarb/);
  const tabs=dialog.locator('.image-tabs button');for(let i=0;i<3;i++){await tabs.nth(i).click();await expect(tabs.nth(i)).toHaveAttribute('aria-pressed','true');await expect(dialog.locator('.dialog-picture img')).toBeVisible();await expect.poll(()=>dialog.locator('img').evaluate(e=>e.complete&&e.naturalWidth>0)).toBe(true);}
  await dialog.press('Escape');await expect(opener).toBeFocused();
 }
 expect(errors).toEqual([]);
});

test('menu contains focus, supports keyboard and navigates without a hidden overlay',async({page})=>{
 await page.setViewportSize({width:390,height:844});await page.goto('/');const opener=page.getByRole('button',{name:'Abrir menu',exact:true});
 await opener.click();const dialog=page.getByRole('dialog');await expect(dialog.getByRole('button',{name:'Fechar',exact:false})).toBeFocused();
 await expect(page.locator('.editorial-page')).toHaveAttribute('inert','');
 await dialog.press('Shift+Tab');await expect(dialog.getByRole('link',{name:'GitHub',exact:true})).toBeFocused();
 await dialog.press('Tab');await expect(dialog.getByRole('button',{name:'Fechar',exact:false})).toBeFocused();
 await dialog.press('Escape');await expect(opener).toBeFocused();await expect(page.locator('.editorial-page')).not.toHaveAttribute('inert','');
 await opener.click();await page.getByRole('dialog').getByRole('link',{name:'Contato',exact:true}).click();await expect(page.getByRole('dialog')).toHaveCount(0);await expect(page.locator('#contato')).toBeInViewport();
});

test('motion stays active without a toggle even with an old off preference',async({page})=>{
 await page.addInitScript(()=>localStorage.setItem('fw-motion','off'));await page.emulateMedia({reducedMotion:'reduce'});await page.goto('/');
 await expect(page.locator('html')).toHaveAttribute('data-motion','true');await expect(page.locator('.motion-control')).toHaveCount(0);
 await page.reload();await expect(page.locator('html')).toHaveAttribute('data-motion','true');await expect(page.locator('h1')).toBeVisible();
});

test('English translation persists and retains contact and education',async({page})=>{
 await page.goto('/');await page.getByRole('button',{name:'Switch to English'}).click();await page.reload();await expect(page.locator('html')).toHaveAttribute('lang','en');
 await expect(page.locator('#sobre')).toContainText('I am 14');await expect(page.locator('#sobre')).toContainText('Proway');await expect(page.locator('h1')).toContainText('INTERFACES');
 await page.getByRole('button',{name:'Explore project: Projeto Câmera'}).click();await expect(page.getByRole('dialog')).toContainText('Not a medical diagnosis');
 await page.getByRole('dialog').press('Escape');await expect(page.locator('.contact-address')).toHaveAttribute('href','mailto:felipe.westarb@gmail.com');
});

test('layout fits five viewport sizes in both languages without clipped titles',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});await page.goto('/');
 for(const lang of ['pt','en']){
  if(lang==='en')await page.getByRole('button',{name:'Switch to English'}).click();
  for(const width of [320,390,768,1440,1920]){
   await page.setViewportSize({width,height:900});
   const result=await page.evaluate(()=>({width:document.documentElement.scrollWidth,viewport:innerWidth,titles:[...document.querySelectorAll('.work-name h3')].map(e=>{const r=e.getBoundingClientRect();return r.left>=-1&&r.right<=innerWidth+1;})}));
   expect(result.width).toBeLessThanOrEqual(result.viewport);expect(result.titles.every(Boolean)).toBe(true);
  }
 }
});

test('removed demos stay absent and scroll reveals text with active motion',async({page})=>{
 await page.goto('/');await expect(page.locator('canvas')).toHaveCount(0);await expect(page.getByText('Por dentro da Tera',{exact:true})).toHaveCount(0);
 await expect(page.getByText('Um espaço para desenhar',{exact:true})).toHaveCount(0);
 expect(await page.locator('.about-lead .reveal-word').last().evaluate(e=>new DOMMatrix(getComputedStyle(e).transform).m42)).toBeGreaterThan(10);
 await page.locator('#sobre').scrollIntoViewIfNeeded();await expect.poll(()=>page.locator('.about-lead .reveal-word').last().evaluate(e=>Math.abs(new DOMMatrix(getComputedStyle(e).transform).m42))).toBeLessThan(1);
 expect(await page.locator('.scroll-progress').evaluate(e=>new DOMMatrix(getComputedStyle(e).transform).m11)).toBeGreaterThan(0);
 await expect(page.locator('.scroll-progress')).toBeVisible();
});

test('missing image gives readable fallback and preserves outbound links',async({page})=>{
 await page.route('**/media/ghostreply-empresa-380.webp',route=>route.abort());await page.goto('/');
 await page.getByRole('button',{name:'Explorar projeto: GhostReply',exact:true}).click();await page.getByRole('dialog').getByRole('button',{name:'Empresa',exact:true}).click();
 await expect(page.getByRole('dialog')).toContainText('Imagem indisponível');await expect(page.getByRole('dialog').getByRole('link',{name:'Ver site',exact:false})).toBeVisible();
});

test('procedural image assembly pauses with scroll and reverses on desktop and mobile',async({page})=>{
 for(const width of [1440,390]){
  await page.setViewportSize({width,height:900});await page.goto('/');
  const range=await page.locator('.work-tera').evaluate(e=>{const top=e.getBoundingClientRect().top+scrollY;return {start:top-innerHeight*.88,end:top-innerHeight*.28};});
  const scales=()=>page.locator('.work-tera .image-tile').evaluateAll(es=>es.map(e=>new DOMMatrix(getComputedStyle(e).transform).m22));
  await page.evaluate(y=>scrollTo({top:y,behavior:'instant'}),range.start-20);await page.waitForTimeout(500);expect((await scales()).every(v=>v>.99)).toBe(true);
  await page.evaluate(y=>scrollTo({top:y,behavior:'instant'}),range.start+(range.end-range.start)*.4);await page.waitForTimeout(650);const middle=await scales();expect(middle.some(v=>v<.95)).toBe(true);expect(middle.some(v=>v>.1)).toBe(true);
  await page.waitForTimeout(400);const paused=await scales();expect(Math.max(...paused.map((v,i)=>Math.abs(v-middle[i])))).toBeLessThan(.02);
  await page.evaluate(y=>scrollTo({top:y,behavior:'instant'}),range.end+30);await page.waitForTimeout(650);expect((await scales()).every(v=>v<.01)).toBe(true);
  await page.evaluate(y=>scrollTo({top:y,behavior:'instant'}),range.start-20);await page.waitForTimeout(650);expect((await scales()).every(v=>v>.99)).toBe(true);
 }
});


test('smooth wheel, magnetic pointer and SVG refraction work with dialog scrolling',async({page})=>{
 await page.goto('/');await expect(page.locator('html')).toHaveClass(/lenis/);
 await page.mouse.wheel(0,450);await expect.poll(()=>page.evaluate(()=>scrollY)).toBeGreaterThan(100);
 await page.locator('.work-tera').scrollIntoViewIfNeeded();await page.waitForTimeout(700);const photo=page.locator('.cover-tera');const box=await photo.boundingBox();
 await page.mouse.move(box.x+100,Math.max(120,box.y+100));await expect.poll(()=>page.locator('#hardware-refraction feDisplacementMap').getAttribute('scale')).not.toBe('0');
 await page.mouse.move(10,110);await expect.poll(async()=>Number(await page.locator('#hardware-refraction feDisplacementMap').getAttribute('scale'))).toBeLessThan(.05);
 await page.getByRole('button',{name:'Explorar projeto: ESP32 Tera',exact:true}).click();await expect(page.locator('html')).toHaveClass(/lenis-stopped/);
 const overlay=page.locator('.dialog-backdrop');await overlay.hover();await page.mouse.wheel(0,500);await expect.poll(()=>overlay.evaluate(e=>e.scrollTop)).toBeGreaterThan(100);
 await page.getByRole('dialog').press('Escape');await expect(page.locator('html')).not.toHaveClass(/lenis-stopped/);
});
