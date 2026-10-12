import {useEffect,useLayoutEffect} from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';

export function useSmoothScroll(controller,locked){
 useLayoutEffect(()=>{
  const lenis=new Lenis({lerp:.13,smoothWheel:true,syncTouch:false,anchors:{offset:-100},prevent:node=>node.closest?.('[aria-modal="true"],.dialog-backdrop')});
  controller.current=lenis;
  lenis.on('scroll',ScrollTrigger.update);
  const tick=time=>lenis.raf(time*1000);gsap.ticker.add(tick);
  document.documentElement.dataset.motion='true';
  return()=>{gsap.ticker.remove(tick);lenis.destroy();controller.current=null;};
 },[controller]);
 useEffect(()=>{if(locked)controller.current?.stop();else controller.current?.start();},[locked,controller]);
}

export function usePointerPolish(root,lang){
 useEffect(()=>{
  const media=matchMedia('(hover: hover) and (pointer: fine)');let dispose=()=>{};
  function bind(){
   dispose();if(!media.matches)return;
   const cleanups=[];
   root.current.querySelectorAll('.round-button,.circle-link').forEach(el=>{
    const x=gsap.quickTo(el,'x',{duration:.45,ease:'power3.out'}),y=gsap.quickTo(el,'y',{duration:.45,ease:'power3.out'});
    const move=e=>{const r=el.getBoundingClientRect();x((e.clientX-r.left-r.width/2)*.12);y((e.clientY-r.top-r.height/2)*.12);};
    const leave=()=>{x(0);y(0);};el.addEventListener('pointermove',move);el.addEventListener('pointerleave',leave);
    cleanups.push(()=>{el.removeEventListener('pointermove',move);el.removeEventListener('pointerleave',leave);x.tween.kill();y.tween.kill();gsap.set(el,{clearProps:'transform'});});
   });
   root.current.querySelectorAll('.cover-frame').forEach(frame=>{
    const badge=frame.querySelector('.cover-action'),x=gsap.quickTo(badge,'x',{duration:.35,ease:'power3.out'}),y=gsap.quickTo(badge,'y',{duration:.35,ease:'power3.out'});
    const displacement=frame.classList.contains('cover-tera')?document.querySelector('#hardware-refraction feDisplacementMap'):null;
    const enter=()=>{if(displacement)gsap.to(displacement,{attr:{scale:5},duration:.7,ease:'power2.out'});};
    const move=e=>{const r=frame.getBoundingClientRect(),half=badge.offsetWidth/2;const px=gsap.utils.clamp(half+12,r.width-half-12,e.clientX-r.left),py=gsap.utils.clamp(half+12,r.height-half-12,e.clientY-r.top);x(px-(r.width-24-half));y(py-(r.height-24-half));};
    const leave=()=>{x(0);y(0);if(displacement)gsap.to(displacement,{attr:{scale:0},duration:.7,ease:'power2.out'});};
    frame.addEventListener('pointerenter',enter);frame.addEventListener('pointermove',move);frame.addEventListener('pointerleave',leave);
    cleanups.push(()=>{frame.removeEventListener('pointerenter',enter);frame.removeEventListener('pointermove',move);frame.removeEventListener('pointerleave',leave);x.tween.kill();y.tween.kill();gsap.set(badge,{clearProps:'transform'});if(displacement){gsap.killTweensOf(displacement);displacement.setAttribute('scale','0');}});
   });
   dispose=()=>cleanups.forEach(fn=>fn());
  }
  bind();media.addEventListener('change',bind);
  return()=>{media.removeEventListener('change',bind);dispose();};
 },[root,lang]);
}

export function ribbonPath(index,expanded){
 const offset=index*15,spread=expanded?110:18;
 return `M -40 ${145+offset} C 160 ${145-spread+offset} 280 ${145-spread+offset} 430 ${145+offset} S 730 ${145+spread-offset} 900 ${145-offset} S 1120 ${145-spread-offset} 1240 ${145-offset}`;
}
