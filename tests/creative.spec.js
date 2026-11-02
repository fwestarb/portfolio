import {test,expect} from '@playwright/test';

test('real WebGL shaders load near the viewport, release offscreen and survive context loss',async({page})=>{
 await page.setViewportSize({width:1440,height:1000});await page.goto('/');
 await expect(page.locator('.hero-shader canvas')).toHaveCount(1);
 expect(await page.locator('.hero-shader canvas').evaluate(e=>!!e.getContext('webgl2'))).toBe(true);
 await page.locator('.reticle-control').click();
 await expect(page.locator('.hero-shader canvas')).toHaveCount(0);
 await page.locator('.cover-tera').scrollIntoViewIfNeeded();
 await expect(page.locator('.shader-layer canvas')).toHaveCount(1);
 await page.locator('.shader-layer canvas').evaluate(e=>e.getContext('webgl2').getExtension('WEBGL_lose_context').loseContext());
 await expect(page.locator('.shader-layer')).toHaveAttribute('data-shader','fallback');
 await expect(page.locator('.cover-tera>img')).toBeVisible();
 await page.getByRole('button',{name:'Explorar projeto: ESP32 Tera',exact:true}).click();
 await expect(page.getByRole('dialog')).toContainText('Alpha 1.0.0-alpha.2');
});

test('no WebGL retains the content and all primary interactions',async({page})=>{
 await page.addInitScript(()=>{const original=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(type,...args){return /webgl/.test(type)?null:original.call(this,type,...args);};});
 await page.goto('/');await expect(page.locator('.hero-shader')).toHaveAttribute('data-shader','fallback');
 await expect(page.locator('h1')).toContainText('CÓDIGO');
 await page.getByRole('button',{name:'Explorar projeto: GhostReply',exact:true}).click();
 await expect(page.getByRole('dialog')).toContainText('30 testes locais');await page.getByRole('dialog').press('Escape');
 await expect(page.locator('.project-flight')).toHaveCount(0);await expect(page.getByRole('dialog')).toHaveCount(0);
});

test('GhostReply showcase and camera annotations switch real demonstration images',async({page})=>{
 await page.setViewportSize({width:390,height:844});await page.goto('/');
 const ghost=page.locator('.showcase-ghostreply');
 for(const [label,src] of [['Empresa','empresa'],['Tradução','traducao'],['Respostas','ghostreply-382']]){
  await ghost.getByRole('button',{name:label,exact:false}).click();
  await expect(ghost.locator('.showcase-image')).toHaveAttribute('src',new RegExp(src));
  await expect(ghost.getByRole('button',{name:label,exact:false})).toHaveAttribute('aria-pressed','true');
 }
 await expect(ghost).toContainText('Sem chamada de IA ou envio de mensagens');
 const camera=page.locator('.showcase-camera');await camera.getByRole('button',{name:'Postura',exact:false}).click();
 await expect(camera.locator('img')).toHaveAttribute('src',/camera-postura/);await expect(camera.locator('circle')).toHaveAttribute('cx','340');
 await camera.getByRole('button',{name:'Alerta',exact:false}).click();await expect(camera).toContainText('não é um diagnóstico');
 await expect(camera).toContainText('Sem acesso à câmera');
 expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
});

test('gallery expands, handles rapid close and restores keyboard focus',async({page})=>{
 await page.goto('/');const opener=page.getByRole('button',{name:'Explorar projeto: GhostReply',exact:true});
 await opener.click();const dialog=page.getByRole('dialog');await expect(page.locator('.project-flight')).toHaveCount(0);
 await dialog.getByRole('button',{name:'Ampliar imagem',exact:false}).click();await expect(dialog.locator('.dialog-picture')).toHaveClass(/full-picture/);
 await dialog.getByRole('button',{name:'Tradução',exact:true}).click();await expect(dialog.locator('img')).toHaveAttribute('src',/traducao/);
 await dialog.getByRole('button',{name:'Fechar',exact:false}).click();await page.keyboard.press('Escape');
 await expect(dialog).toHaveCount(0);await expect(page.locator('.project-flight')).toHaveCount(0);await expect(opener).toBeFocused();
});

test('flowing menu reacts to keyboard focus and keeps navigation usable on mobile',async({page})=>{
 await page.setViewportSize({width:390,height:844});await page.goto('/');
 await page.getByRole('button',{name:'Abrir menu',exact:true}).click();const dialog=page.getByRole('dialog');
 await dialog.getByRole('link',{name:/Conhecimentos/}).focus();await expect(dialog.locator('.menu-preview')).toContainText('Do código à interface');
 await dialog.getByRole('link',{name:/Contato/}).focus();await expect(dialog.locator('.menu-preview')).toContainText('Vamos conversar');
 await page.keyboard.press('Enter');await expect(dialog).toHaveCount(0);await expect(page.locator('#contato')).toBeInViewport();
});

test('copy email confirms success and explains clipboard failure without sending anything',async({page,context})=>{
 await context.grantPermissions(['clipboard-read','clipboard-write']);await page.goto('/');
 await page.getByRole('button',{name:'Copiar e-mail',exact:true}).click();await expect(page.locator('.copy-status')).toContainText('copiado');
 expect(await page.evaluate(()=>navigator.clipboard.readText())).toBe('felipe.westarb@gmail.com');
 await page.evaluate(()=>{navigator.clipboard.writeText=async()=>{throw new Error('denied');};});
 await page.getByRole('button',{name:'Copiar e-mail',exact:true}).click();await expect(page.locator('.copy-status')).toContainText('Selecione');
 await expect(page.locator('.contact-address')).toHaveAttribute('href','mailto:felipe.westarb@gmail.com');
});
