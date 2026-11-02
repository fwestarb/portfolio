import {Fragment,useEffect,useLayoutEffect,useRef,useState} from 'react';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {content,projects,email,github,portfolioRepo} from './content';
import {Menu,ProjectDialog,ProjectWork,Shader} from './Creative';
import {useLocale} from './hooks';
import {useSmoothScroll,usePointerPolish,ribbonPath} from './usePolish';

gsap.registerPlugin(ScrollTrigger);
const ui={
 pt:{hero:['CÓDIGO','INTERFACES','e inteligência','artificial'],role:'Felipe Westarb · estudante de tecnologia',intro:'Construo sites e experimento integrações de IA, visão computacional e hardware. Aqui estão os projetos que desenvolvo e o que aprendo com eles.',work:'Projetos selecionados',open:'Explorar projeto',close:'Fechar',menu:'Abrir menu',closeMenu:'Fechar menu',motion:'Reduzir movimento',enable:'Ativar animações',about:'Sobre mim',skills:'Conhecimentos',services:'Serviços de escopo simples',contact:['UM PROJETO','em mente?'],contactSmall:'Sites, automações com IA e chatbots.',contactButton:'Escrever e-mail',details:'Detalhes e imagens',proof:'Verificação e limites',tech:'Tecnologias',next:'Próxima etapa',caption:'Projetos pessoais. Resultados e limites documentados.',credits:'Recursos e licenças',study:'Tech Explores',where:'Proway · Blumenau · em andamento'},
 en:{hero:['CODE','INTERFACES','& artificial','intelligence'],role:'Felipe Westarb · technology student',intro:'I build websites and experiment with AI integrations, computer vision and hardware. These are the projects I am developing and what I learn from them.',work:'Selected projects',open:'Explore project',close:'Close',menu:'Open menu',closeMenu:'Close menu',motion:'Reduce motion',enable:'Enable animations',about:'About me',skills:'Skills',services:'Clearly scoped services',contact:['A PROJECT','in mind?'],contactSmall:'Websites, AI automation and chatbots.',contactButton:'Write an email',details:'Details and images',proof:'Verification and limitations',tech:'Technologies',next:'Next stage',caption:'Personal projects. Documented results and limitations.',credits:'Resources and licenses',study:'Tech Explores',where:'Proway · Blumenau · in progress'}
};

function AnimatedWords({text}){
 return <span className="animated-words">{text.split(' ').map((word,i)=><Fragment key={`${i}-${word}`}><span className="word-mask"><span className="reveal-word">{word}</span></span>{' '}</Fragment>)}</span>;
}

export default function Editorial(){
 const [lang,setLang]=useLocale(),[menu,setMenu]=useState(false),[project,setProject]=useState(null),[copied,setCopied]=useState('');
 const root=useRef(null),header=useRef(null),scrollController=useRef(null),openOrigin=useRef(null);const t=ui[lang],c=content[lang],dialogOpen=menu||!!project;
 useSmoothScroll(scrollController,dialogOpen);
 usePointerPolish(root,lang);
 useEffect(()=>{if(root.current)root.current.inert=dialogOpen;if(header.current)header.current.inert=dialogOpen;return()=>{if(root.current)root.current.inert=false;if(header.current)header.current.inert=false;};},[dialogOpen]);
 useLayoutEffect(()=>{
  const context=gsap.context(()=>{
   if(window.scrollY<30)gsap.fromTo('.hero-line > span',{yPercent:110},{yPercent:0,duration:1.3,stagger:.1,ease:'power3.out'});
   const responsive=gsap.matchMedia();
   responsive.add({desktop:'(min-width: 801px)',mobile:'(max-width: 800px)'},({conditions})=>{
    const distance=conditions.desktop?28:10;
    gsap.to('.scroll-progress',{scaleX:1,ease:'none',scrollTrigger:{start:0,end:'max',scrub:true}});
    gsap.utils.toArray('.hero-line').forEach((el,i)=>gsap.to(el,{y:(i%2?-1:1)*(conditions.desktop?28:8),ease:'none',scrollTrigger:{trigger:'.editorial-hero',start:'top top',end:'bottom top',scrub:.16}}));
    gsap.utils.toArray('.project-cover').forEach(el=>{
     gsap.fromTo(el,{y:distance},{y:-distance,ease:'none',scrollTrigger:{trigger:el.closest('.work'),start:'top bottom',end:'bottom top',scrub:.16}});
     const frame=el.querySelector('.cover-frame');
     const sequence=gsap.timeline({scrollTrigger:{trigger:el.closest('.work'),start:'top 88%',end:'top 28%',scrub:.16}});
     sequence.fromTo(frame.querySelectorAll('.image-tile'),{scaleY:1},{scaleY:0,stagger:{each:.025,from:'start'},duration:.65,ease:'sine.inOut'},0);
     sequence.fromTo(frame.querySelector('img'),{scale:1.06,rotation:0},{scale:1,rotation:0,duration:1,ease:'none'},0);
     sequence.fromTo(el.closest('.work').querySelector('.work-name h3'),{clipPath:'inset(0 100% 0 0)',y:30},{clipPath:'inset(0 0% 0 0)',y:0,duration:.5,ease:'power2.out'},.4);
     sequence.fromTo(el.closest('.work').querySelector('.work-note'),{clipPath:'inset(0 0 100% 0)',y:20},{clipPath:'inset(0 0 0% 0)',y:0,duration:.5,ease:'none'},.6);
     const shader=frame.querySelector('.shader-layer');if(shader)sequence.fromTo(shader,{opacity:1},{opacity:0,duration:.7,ease:'none'},.15);
    });
    gsap.utils.toArray('.work-name').forEach(el=>gsap.fromTo(el,{x:conditions.desktop?-18:0},{x:conditions.desktop?18:0,ease:'none',scrollTrigger:{trigger:el,start:'top bottom',end:'bottom top',scrub:.16}}));
    gsap.utils.toArray('.animated-words').forEach(el=>gsap.fromTo(el.querySelectorAll('.reveal-word'),{yPercent:105,rotation:0},{yPercent:0,rotation:0,duration:1,stagger:.025,ease:'power2.out',scrollTrigger:{trigger:el,start:'top 92%',end:'top 48%',scrub:.16}}));
    gsap.utils.toArray('.section-title, .editorial-contact h2').forEach(el=>gsap.fromTo(el,{y:28},{y:0,ease:'none',scrollTrigger:{trigger:el,start:'top 95%',end:'top 58%',scrub:.16}}));
    gsap.utils.toArray('.knowledge-row, .service-row, .education-row').forEach(el=>gsap.fromTo(el,{y:24},{y:0,duration:.7,ease:'power2.out',scrollTrigger:{trigger:el,start:'top 95%',end:'top 67%',scrub:.16}}));
    gsap.utils.toArray('.knowledge-row, .service-row, .education-row').forEach(el=>gsap.fromTo(el,{ '--line-build':0 },{ '--line-build':1,ease:'none',scrollTrigger:{trigger:el,start:'top 94%',end:'top 68%',scrub:.16}}));
    gsap.utils.toArray('.ribbon-line').forEach((el,i)=>{const ribbon=gsap.timeline({scrollTrigger:{trigger:'.transition-band',start:'top bottom',end:'bottom top',scrub:.16}});ribbon.fromTo(el,{attr:{d:ribbonPath(i,false), 'stroke-dashoffset':1}},{attr:{d:ribbonPath(i,true),'stroke-dashoffset':0},duration:1,ease:'sine.inOut'});});
    gsap.fromTo('.contact-thread path',{strokeDashoffset:1},{strokeDashoffset:0,ease:'none',scrollTrigger:{trigger:'.editorial-contact',start:'top 90%',end:'top 35%',scrub:.2}});
    gsap.to('.transition-band>div',{xPercent:-20,ease:'none',scrollTrigger:{trigger:'.transition-band',start:'top bottom',end:'bottom top',scrub:.16}});
   });
  },root);

  let active=true;document.fonts.ready.then(()=>{if(active)ScrollTrigger.refresh();});
  return()=>{active=false;context.revert();};
 },[lang]);
 async function copyEmail(){try{await navigator.clipboard.writeText(email);setCopied(c.copied);}catch{setCopied(c.copyFailed);}}
 return <>
  <header className="editorial-header" ref={header}>
   <a className="wordmark" href="#inicio" aria-label="Felipe Westarb">Felipe<br/><span>✦</span>Westarb</a>
   <div className="header-controls"><button className="locale-button" onClick={()=>setLang(lang==='pt'?'en':'pt')} aria-label={lang==='pt'?'Switch to English':'Mudar para português'}>{lang.toUpperCase()}<span aria-hidden="true"> / {lang==='pt'?'EN':'PT'}</span></button><button className="menu-control" onClick={()=>setMenu(true)} aria-label={t.menu} aria-expanded={menu}><span/><span/></button></div>
  </header>
  <div className="editorial-page" ref={root}>
   <div className="scroll-progress" aria-hidden="true"/>
   <a className="skip-link" href="#projetos">{c.skip}</a>
   <main>
    <section className="editorial-hero" id="inicio" onPointerMove={e=>{const r=e.currentTarget.getBoundingClientRect();e.currentTarget.style.setProperty('--wave-x',`${((e.clientX-r.left)/r.width-.5)*28}px`);}}><Shader paused={dialogOpen}/><p className="hero-role">{t.role}</p><h1 aria-label={lang==='pt'?'Código, interfaces e inteligência artificial':'Code, interfaces and artificial intelligence'}>{t.hero.map((line,i)=><span className={`hero-line hero-line-${i}`} key={i}><span>{line}</span></span>)}</h1><p className="hero-support">{lang==='pt'?'Projetos pessoais em web, IA e hardware.':'Personal projects in web, AI and hardware.'}</p><a className="hero-scroll-link" href="#projetos">{t.work}<span aria-hidden="true">↓</span></a></section>
    <section className="intro-section"><p><AnimatedWords text={t.intro}/></p><a href="#sobre" className="circle-link" aria-label={t.about}><span aria-hidden="true">↗</span><span>{t.about}</span></a></section>
    <section className="works" id="projetos" aria-labelledby="works-title"><div className="works-intro"><h2 id="works-title">{t.work}</h2><p>{t.caption}</p></div>
     {projects.map(p=><ProjectWork key={p.id} p={p} lang={lang} t={t} c={c} paused={dialogOpen} onOpen={(value,event)=>{const element=event.currentTarget.querySelector('.cover-frame');openOrigin.current={element,rect:element.getBoundingClientRect()};setProject(value);}}/>)}
     <a className="round-button github-button" href={github}>{lang==='pt'?'Todos os projetos no GitHub':'All projects on GitHub'} <span aria-hidden="true">↗</span></a>
    </section>
    <div className="transition-band" aria-hidden="true"><svg className="scroll-ribbon" viewBox="0 0 1200 350" preserveAspectRatio="none">{Array.from({length:5},(_,i)=><path key={i} className="ribbon-line" d={ribbonPath(i,true)} pathLength="1" strokeDasharray="1" strokeDashoffset="0"/>)}</svg><div>{Array.from({length:8},(_,i)=><span key={i}>{lang==='pt'?'Interfaces / IA / Hardware / ':'Interfaces / AI / Hardware / '}</span>)}</div></div>
    <section className="about-section" id="sobre"><div className="about-heading"><h2 className="section-title"><AnimatedWords text={t.about}/></h2><p>Felipe Westarb</p></div><div className="about-copy"><p className="about-lead"><AnimatedWords text={c.aboutLead}/></p><p><AnimatedWords text={`${c.education} ${c.aboutText}`}/></p><span className="age-note">{c.ageDate}</span><a href={github}>GitHub <span aria-hidden="true">↗</span></a></div><div className="education-row"><span>{lang==='pt'?'Formação atual':'Current education'}</span><strong>{t.study}</strong><span>{t.where}</span></div></section>
    <section className="knowledge-section" id="conhecimentos"><h2 className="section-title"><AnimatedWords text={t.skills}/></h2>{c.skillGroups.map(([title,text,where])=><div className="knowledge-row" key={title}><h3><AnimatedWords text={title}/></h3><p><AnimatedWords text={text}/></p><span>{where}</span></div>)}<div className="service-block"><h2 className="section-title"><AnimatedWords text={t.services}/></h2>{c.serviceItems.map(([title,text])=><div className="service-row" key={title}><h3><AnimatedWords text={title}/></h3><p><AnimatedWords text={text}/></p></div>)}</div></section>
    <section className="editorial-contact" id="contato"><svg className="contact-thread" viewBox="0 0 1200 200" preserveAspectRatio="none" aria-hidden="true"><path d="M0 100 C300 0 430 200 600 100 S1000 0 1200 100" pathLength="1" strokeDasharray="1"/></svg><p>{t.contactSmall}</p><h2><span><AnimatedWords text={t.contact[0]}/></span><em><AnimatedWords text={t.contact[1]}/></em></h2><a className="round-button" href={`mailto:${email}?subject=${encodeURIComponent(c.subject)}`}>{t.contactButton} <span aria-hidden="true">↗</span></a><a className="contact-address" href={`mailto:${email}`}>{email}</a><button className="copy-email" aria-label={c.copy} data-copied={copied===c.copied} onClick={copyEmail}>{c.copy}</button><span className="copy-status" role="status">{copied}</span></section>
   </main>
   <footer><span>© Felipe Westarb · 2026</span><p>{c.footer}</p><div><a href={github}>GitHub</a><a href={portfolioRepo}>{c.source}</a><a href="./credits.html">{t.credits}</a></div></footer>
  </div>
  {menu&&<Menu lang={lang} t={t} c={c} onClose={()=>setMenu(false)}/>}
  {project&&<ProjectDialog origin={openOrigin.current} key={project.id} project={project} lang={lang} t={t} c={c} onClose={()=>setProject(null)}/>}
 </>;
}
