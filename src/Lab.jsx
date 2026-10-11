import {useEffect,useRef,useState} from 'react';
export default function Lab({t,motion}) {
 const canvas=useRef(null),drawing=useRef(false),previous=useRef(null),timer=useRef(null);
 const [project,setProject]=useState('tera'),[step,setStep]=useState(-1);
 useEffect(()=>()=>clearTimeout(timer.current),[]);
 useEffect(()=>{clearTimeout(timer.current);setStep(-1);},[project]);
 useEffect(()=>{if(!motion){clearTimeout(timer.current);setStep(s=>s>=0?3:s);}},[motion]);
 function point(e){const r=canvas.current.getBoundingClientRect();return{x:(e.clientX-r.left)*canvas.current.width/r.width,y:(e.clientY-r.top)*canvas.current.height/r.height};}
 function start(e){drawing.current=true;previous.current=point(e);e.currentTarget.setPointerCapture(e.pointerId);const c=canvas.current.getContext('2d');c.fillStyle='#c6f09c';c.beginPath();c.arc(previous.current.x,previous.current.y,3,0,Math.PI*2);c.fill();}
 function move(e){if(!drawing.current)return;const now=point(e),c=canvas.current.getContext('2d');c.strokeStyle='#c6f09c';c.lineWidth=6;c.lineCap='round';c.beginPath();c.moveTo(previous.current.x,previous.current.y);c.lineTo(now.x,now.y);c.stroke();previous.current=now;}
 function end(){drawing.current=false;previous.current=null;}
 function run(){clearTimeout(timer.current);if(!motion){setStep(3);return;}setStep(0);const next=n=>{if(n>3)return;timer.current=setTimeout(()=>{setStep(n);next(n+1);},650);};next(1);}
 return <div className="lab-grid">
  <article className="lab-card"><div className="lab-head"><h3>{t.drawing}</h3><button type="button" onClick={()=>canvas.current.getContext('2d').clearRect(0,0,800,400)}>{t.clear} ↺</button></div><canvas ref={canvas} width="800" height="400" className="drawing-canvas" aria-label={t.drawing} onPointerDown={start} onPointerMove={move} onPointerUp={end} onPointerCancel={end}/><p className="caption">{t.drawingHint}</p></article>
  <article className="lab-card"><div className="lab-head"><h3>{t.flow}</h3><select aria-label={t.flowProject} value={project} onChange={e=>setProject(e.target.value)}><option value="tera">ESP32 Tera</option><option value="ghostreply">GhostReply</option></select></div><ol className="flow-list" data-step={step}>{t.flowLabels[project].map((label,i)=><li key={i} data-active={i<=step}><span>0{i+1}</span>{label}<b aria-hidden="true">{i<=step?'✓':'↘'}</b></li>)}</ol><div className="flow-actions"><button className="button outline" type="button" onClick={run}>{t.run} →</button><span role="status">{step===3?t.finished:''}</span></div><p className="caption">{t.flowHint}</p></article>
 </div>;
}
