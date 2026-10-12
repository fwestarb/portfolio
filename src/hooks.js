import {useEffect, useLayoutEffect, useRef, useState} from 'react';

export function useNear(ref, margin='100px') {
  const [near,setNear]=useState(false);
  useEffect(()=>{const element=ref.current;if(!element)return;const observer=new IntersectionObserver(([entry])=>setNear(entry.isIntersecting),{rootMargin:margin});observer.observe(element);return()=>observer.disconnect();},[ref,margin]);
  return near;
}
export function useLocale() {
  const [lang,setLang]=useState(()=>{try{return localStorage.getItem('fw-language')==='en'?'en':'pt';}catch{return 'pt';}});
  useEffect(()=>{document.documentElement.lang=lang==='pt'?'pt-BR':'en';try{localStorage.setItem('fw-language',lang);}catch{}},[lang]);
  return [lang,setLang];
}
export function useLatest(value){const ref=useRef(value);ref.current=value;return ref;}
