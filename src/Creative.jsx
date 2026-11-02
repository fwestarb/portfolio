import {Component,lazy,Suspense,useEffect,useLayoutEffect,useRef,useState} from 'react';
import gsap from 'gsap';
import {Flip} from 'gsap/Flip';
import {media,covers} from './project-media';
import {useNear} from './hooks';
gsap.registerPlugin(Flip);
const Waves=lazy(()=>import('./ShaderScenes').then(m=>({default:m.Waves})));
const Photo=lazy(()=>import('./ShaderScenes').then(m=>({default:m.Photo})));
let supported;
function supportsShader(){
 if(supported!==undefined)return supported;
 try{const gl=document.createElement('canvas').getContext('webgl2');supported=!!gl;gl?.getExtension('WEBGL_lose_context')?.loseContext();}catch{supported=false;}
 return supported;
}
class ShaderBoundary extends Component{
 state={failed:false};static getDerivedStateFromError(){return {failed:true};}
 render(){return this.state.failed?null:this.props.children;}
}
export function Shader({photo=false,paused=false}){
 const ref=useRef(null),near=useNear(ref,'60px');const [visible,setVisible]=useState(!document.hidden),[lost,setLost]=useState(false);
 useEffect(()=>{const update=()=>setVisible(!document.hidden);document.addEventListener('visibilitychange',update);return()=>document.removeEventListener('visibilitychange',update);},[]);
 useEffect(()=>{const el=ref.current;const lose=()=>setLost(true);el.addEventListener('webglcontextlost',lose,true);return()=>el.removeEventListener('webglcontextlost',lose,true);},[]);
 const active=near&&visible&&!paused&&!lost&&supportsShader();
 return <div ref={ref} className={photo?'shader-layer':'hero-shader'} aria-hidden="true" data-shader={active?'active':'fallback'}>
  {active&&<ShaderBoundary><Suspense fallback={null}>{photo?<Photo/>:<Waves/>}</Suspense></ShaderBoundary>}
 </div>;
}

function useDialog(ref,onClose){
 useEffect(()=>{
  const previous=document.activeElement,oldOverflow=document.body.style.overflow;document.body.style.overflow='hidden';
  const element=ref.current;element.querySelector('button,a')?.focus();
  const key=e=>{
   if(e.key==='Escape'){e.preventDefault();onClose();}
   if(e.key==='Tab'){
    const items=[...element.querySelectorAll('button,a[href],[tabindex="0"]')].filter(e=>!e.disabled&&e.getClientRects().length),first=items[0],last=items.at(-1);
    if(e.shiftKey&&document.activeElement===first){e.preventDefault();last?.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first?.focus();}
   }
  };
  element.addEventListener('keydown',key);
  return()=>{element.removeEventListener('keydown',key);document.body.style.overflow=oldOverflow;requestAnimationFrame(()=>{if(previous?.isConnected&&!document.querySelector('[aria-modal="true"]'))previous.focus({preventScroll:true});});};
 },[]);
}

export function Menu({lang,t,c,onClose}){
 const ref=useRef(null),nav=useRef(null),band=useRef(null);const [active,setActive]=useState(0);useDialog(ref,onClose);
 useLayoutEffect(()=>{const row=nav.current.children[active+1];const tween=gsap.to(band.current,{y:row.offsetTop,height:row.offsetHeight,duration:.35,ease:'power3.out'});return()=>tween.kill();},[active]);
 const previews=lang==='pt'?[['Projetos que ganham forma','Web, IA e hardware.'],['Do código à interface','React / Python / ESP32'],['Aprender construindo','Felipe Westarb · Tech Explores'],['Vamos conversar','felipe.westarb@gmail.com']]:[['Projects taking shape','Web, AI and hardware.'],['From code to interface','React / Python / ESP32'],['Learning by building','Felipe Westarb · Tech Explores'],['Let’s talk','felipe.westarb@gmail.com']];
 return <div className="menu-sheet" data-lenis-prevent role="dialog" aria-modal="true" aria-label={lang==='pt'?'Navegação':'Navigation'} ref={ref}>
  <div className="menu-top"><span>Felipe<br/>Westarb</span><button className="close-control" onClick={onClose}>{t.close} <span aria-hidden="true">×</span></button></div>
  <div className="menu-layout"><nav ref={nav}><span className="flow-band" ref={band} aria-hidden="true"/>{['projetos','conhecimentos','sobre','contato'].map((id,i)=><a key={id} className={active===i?'is-active':''} href={`#${id}`} onPointerEnter={()=>setActive(i)} onFocus={()=>setActive(i)} onClick={onClose}><small aria-hidden="true">0{i+1}</small>{c.nav[i]}<span aria-hidden="true">↗</span></a>)}</nav>
   <aside className="menu-preview" aria-hidden="true" key={active}>{active===0&&<div className="menu-preview-images">{Object.values(covers).map(src=><img key={src} src={`./media/${src}`} alt=""/>)}</div>}<p>{previews[active][0]}</p><span>{previews[active][1]}</span></aside></div>
  <div className="menu-bottom"><a href="mailto:felipe.westarb@gmail.com">felipe.westarb@gmail.com</a><a href="https://github.com/fwestarb">GitHub</a><span>Português / English</span></div>
 </div>;
}

function flight(image,from,to,onComplete){
 if(!image||!from||!to||from.width<1||to.width<1){onComplete?.();return null;}
 const clone=image.cloneNode();clone.alt='';clone.setAttribute('aria-hidden','true');clone.className='project-flight';
 document.body.appendChild(clone);gsap.set(clone,{left:from.left,top:from.top,width:from.width,height:from.height});
 const state=Flip.getState(clone);gsap.set(clone,{left:to.left,top:to.top,width:to.width,height:to.height});
 const tween=Flip.from(state,{duration:.6,ease:'power3.inOut',absolute:true,onComplete:()=>{clone.remove();onComplete?.();}});
 return ()=>{tween.kill();clone.remove();};
}

export function ProjectDialog({project:p,lang,t,c,onClose,origin}){
 const [selected,setSelected]=useState(0),[failed,setFailed]=useState(false),[full,setFull]=useState(false),[closing,setClosing]=useState(false);
 const ref=useRef(null),picture=useRef(null),closingRef=useRef(false),flightCleanup=useRef(null);
 const item=media[p.id][selected],info=p[lang];
 function close(){
  if(closingRef.current)return;closingRef.current=true;setClosing(true);flightCleanup.current?.();
  const image=picture.current.querySelector('img'),target=origin?.element?.getBoundingClientRect();
  flightCleanup.current=flight(image,picture.current.getBoundingClientRect(),target,onClose);
 }
 useDialog(ref,close);
 useLayoutEffect(()=>{const image=picture.current.querySelector('img');flightCleanup.current=flight(image,origin?.rect,picture.current.getBoundingClientRect());return()=>flightCleanup.current?.();},[]);
 useLayoutEffect(()=>{
  if(!picture.current)return;picture.current.scrollTop=0;
  const tween=gsap.fromTo(picture.current,{opacity:.35,y:8},{opacity:1,y:0,duration:.28,ease:'power2.out'});return()=>tween.kill();
 },[selected]);
 return <div className={`dialog-backdrop ${closing?'is-closing':''}`} data-lenis-prevent onClick={e=>{if(e.target===e.currentTarget)close();}}>
  <section className="project-dialog" role="dialog" aria-modal="true" aria-labelledby="dialog-title" ref={ref}>
   <header><span>{info.status}</span><button className="close-control" onClick={close}>{t.close} <span aria-hidden="true">×</span></button></header>
   <h2 id="dialog-title">{p.name}</h2>
   <div className="case-layout"><div className="case-gallery"><div tabIndex="0" aria-label={lang==='pt'?'Imagem do projeto; role para inspecionar':'Project image; scroll to inspect'} className={`dialog-picture picture-${p.id} ${full?'full-picture':''}`} ref={picture}>
    {!failed?<img src={`./media/${item[0]}`} alt={`${p.name}: ${item[lang==='pt'?1:2]}`} onError={()=>setFailed(true)}/>:<p>{lang==='pt'?'Imagem indisponível. Consulte o site ou o código abaixo.':'Image unavailable. See the website or source below.'}</p>}
   </div><div className="gallery-tools"><span>0{selected+1} / 03</span><button onClick={()=>setFull(v=>!v)} aria-pressed={full}>{lang==='pt'?(full?'Recolher imagem':'Ampliar imagem'):(full?'Collapse image':'Enlarge image')} ↗</button></div>
   <p className="image-caption" aria-live="polite">{item[lang==='pt'?3:4]}</p>
   <div className="image-tabs" aria-label={t.details}>{media[p.id].map((m,i)=><button key={m[0]} aria-pressed={selected===i} onClick={()=>{setSelected(i);setFailed(false);}}><span className="gallery-thumb" style={{backgroundImage:`url("./media/${m[0]}")`}} aria-hidden="true"/>{m[lang==='pt'?1:2]}</button>)}</div></div>
   <div className="case-copy"><p className="dialog-summary">{info.description}</p>
   <dl><div><dt>{c.problem}</dt><dd>{info.problem}</dd></div><div><dt>{c.implementation}</dt><dd>{info.implementation}</dd></div><div><dt>{t.proof}</dt><dd>{info.verified}<br/><br/>{info.limits}</dd></div></dl>
   <p className="dialog-stack">{p.stack.join(' / ')}</p><div className="dialog-links"><a className="round-button" href={p.site}>{c.site} <span aria-hidden="true">↗</span></a><a href={p.repo}>{c.code} <span aria-hidden="true">↗</span></a></div></div></div>
  </section>
 </div>;
}

function Showcase({id,lang}){
 const [selected,setSelected]=useState(0),ref=useRef(null);const ghost=id==='ghostreply',items=media[id];
 const notes=ghost?(lang==='pt'?['Mensagem → contexto → sugestão. O atendente confere antes de enviar.','Informações cadastradas ajudam a contextualizar o atendimento.','Uma captura da ferramenta de tradução, com dados de exemplo.']:['Message → context → suggestion. A person reviews before sending.','Saved company information helps contextualize replies.','A translation-tool capture with example data.']):(lang==='pt'?['O desenho é demonstrado com posições sintéticas.','A região destacada explica uma referência de postura.','O alerta é experimental e não é um diagnóstico.']:['Drawing is demonstrated using synthetic positions.','The highlighted area explains a posture reference.','The alert is experimental, not a diagnosis.']);
 useLayoutEffect(()=>{ref.current.querySelector('.showcase-visual').scrollTop=ghost&&selected===0?240:0;const ctx=gsap.context(()=>{gsap.fromTo('.showcase-image',{opacity:.4,y:12},{opacity:1,y:0,duration:.4});gsap.fromTo('.pixel-wipe span',{scaleY:1},{scaleY:0,stagger:.015,duration:.25,ease:'power2.out'});},ref);return()=>ctx.revert();},[selected]);
 return <div className={`project-showcase showcase-${id}`} ref={ref}>
  <div className="showcase-heading"><span>{ghost?(lang==='pt'?'Por dentro da interface':'Inside the interface'):(lang==='pt'?'Ler a imagem':'Reading the image')}</span><span>{lang==='pt'?'Demonstração com capturas':'Screenshot demonstration'}</span></div>
  <div className="showcase-layout"><div className="showcase-visual"><img className="showcase-image" src={`./media/${items[selected][0]}`} alt={`${ghost?'GhostReply':'Projeto Câmera'}: ${items[selected][lang==='pt'?1:2]}`} loading="lazy"/>
   {ghost?<div className="pixel-wipe" aria-hidden="true">{Array.from({length:12},(_,i)=><span key={i}/>)}</div>:<svg className={`camera-annotations annotation-${selected}`} viewBox="0 0 640 480" aria-hidden="true"><path d="M165 335 L260 230 L340 245 L430 145"/><circle cx={selected===0?260:selected===1?340:430} cy={selected===0?230:selected===1?245:145} r="34"/><path className="annotation-frame" d="M105 115v-30h30 M505 85h30v30 M535 365v30h-30 M135 395h-30v-30"/></svg>}
  </div><div className="showcase-info"><div className="showcase-tabs" aria-label={lang==='pt'?'Explorar demonstração':'Explore demonstration'}>{items.map((m,i)=><button key={m[0]} onClick={()=>setSelected(i)} aria-pressed={selected===i}><span>0{i+1}</span>{m[lang==='pt'?1:2]}<span aria-hidden="true">↗</span></button>)}</div><p aria-live="polite">{notes[selected]}</p><small>{ghost?(lang==='pt'?'Sem chamada de IA ou envio de mensagens.':'No AI call or message sending.'):(lang==='pt'?'Marcações ilustrativas sobre capturas sintéticas. Sem acesso à câmera.':'Illustrative marks over synthetic captures. No camera access.')}</small></div></div>
 </div>;
}

export function ProjectWork({p,lang,t,c,onOpen,paused}){
 const [reticle,setReticle]=useState(false);
 const proof=lang==='pt'?{tera:'Alpha 1.0.0-alpha.2 · firmware + companion',ghostreply:'30 testes locais · revisão humana',camera:'Processamento local · entradas sintéticas'}:{tera:'Alpha 1.0.0-alpha.2 · firmware + companion',ghostreply:'30 local tests · human review',camera:'Local processing · synthetic inputs'};
 return <article className={`work work-${p.id}`} data-reticle={reticle}>
  <button className="work-open" onClick={e=>onOpen(p,e)} aria-label={`${t.open}: ${p.name}`}><div className="project-cover"><div className={`cover-frame cover-${p.id}`} onPointerMove={e=>{const r=e.currentTarget.getBoundingClientRect();e.currentTarget.style.setProperty('--reveal-x',`${e.clientX-r.left}px`);e.currentTarget.style.setProperty('--reveal-y',`${e.clientY-r.top}px`);}}>
   <img src={`./media/${covers[p.id]}`} alt={`${p.name}: ${p[lang].origin}`} loading="lazy" width={p.id==='tera'?1280:p.id==='camera'?640:382} height={p.id==='tera'?1280:p.id==='camera'?480:948}/>
   {p.id==='tera'&&<Shader photo paused={paused}/>}
   <span className="image-construction" aria-hidden="true">{Array.from({length:12},(_,i)=><span key={i} className="image-tile"/>)}</span><span className="cover-action" aria-hidden="true">{t.open} ↗</span></div></div><div className="work-name"><h3>{p.name}</h3><p>{p.stack.join(' / ')}</p></div></button>
  <div className="work-note"><span>{p[lang].status}</span><p>{p[lang].description}</p><a href={p.site}>{c.site} ↗</a><strong className="project-proof">{proof[p.id]}</strong>{p.id==='tera'&&<button className="reticle-control" aria-pressed={reticle} onClick={()=>setReticle(v=>!v)}>{lang==='pt'?(reticle?'Ver fotografia':'Explorar retícula'):(reticle?'View photograph':'Explore dithering')} <span aria-hidden="true">◌</span></button>}</div>
  {(p.id==='ghostreply'||p.id==='camera')&&<Showcase id={p.id} lang={lang}/>}
 </article>;
}
