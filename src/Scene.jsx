import {useEffect,useRef,useState} from 'react';
import * as THREE from 'three';

// Original procedural sculpture: no downloaded models or reference-site assets.
export default function Scene({mode='solid'}) {
 const host=useRef(null), modeRef=useRef(mode);const [failed,setFailed]=useState(false);
 useEffect(()=>{modeRef.current=mode;},[mode]);
 useEffect(()=>{
  const el=host.current;if(!el)return;
  let renderer;
  try{renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'});}catch{setFailed(true);return;}
  renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));renderer.outputColorSpace=THREE.SRGBColorSpace;
  el.appendChild(renderer.domElement);
  const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(40,1,.1,40);camera.position.set(0,.2,7.6);
  scene.add(new THREE.AmbientLight('#c5ddae',1.2));
  const key=new THREE.DirectionalLight('#efffe0',3.8);key.position.set(3,4,4);scene.add(key);
  const rim=new THREE.DirectionalLight('#a1ed65',2.2);rim.position.set(-3,1,-2);scene.add(rim);
  const group=new THREE.Group();scene.add(group);
  const coreGeometry=new THREE.IcosahedronGeometry(1.22,1);
  const material=new THREE.MeshStandardMaterial({color:'#65794d',metalness:.65,roughness:.35,flatShading:true});
  const core=new THREE.Mesh(coreGeometry,material);group.add(core);
  const edges=new THREE.LineSegments(new THREE.EdgesGeometry(coreGeometry),new THREE.LineBasicMaterial({color:'#c6f09c',transparent:true,opacity:.4}));edges.scale.setScalar(1.005);group.add(edges);
  const orbit=new THREE.Group();group.add(orbit);
  for(let i=0;i<3;i++){
   const ring=new THREE.Mesh(new THREE.TorusGeometry(1.8+i*.12,.008,5,110),new THREE.MeshBasicMaterial({color:i===1?'#c6f09c':'#556448',transparent:true,opacity:.75}));
   ring.rotation.set(Math.PI/2+i*.6,.3+i*.6,.2);orbit.add(ring);
  }
  const nodes=[],positions=[];
  for(let i=0;i<35;i++){
   const y=1-(i/34)*2,r=Math.sqrt(Math.max(0,1-y*y)),theta=i*2.399963;
   const point=new THREE.Vector3(Math.cos(theta)*r,y,Math.sin(theta)*r).multiplyScalar(2.08);
   nodes.push(point);const dot=new THREE.Mesh(new THREE.SphereGeometry(i%7===0?.055:.025,8,6),new THREE.MeshBasicMaterial({color:i%7===0?'#e6ffd2':'#71964f'}));dot.position.copy(point);group.add(dot);
  }
  for(let i=0;i<nodes.length;i++)for(let j=i+1;j<nodes.length;j++)if(nodes[i].distanceTo(nodes[j])<1.23)positions.push(...nodes[i].toArray(),...nodes[j].toArray());
  const network=new THREE.BufferGeometry();network.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));group.add(new THREE.LineSegments(network,new THREE.LineBasicMaterial({color:'#819a66',transparent:true,opacity:.23})));
  const target={x:0,y:0};let raf=0,visible=true,disposed=false,last=0,elapsed=0;
  const resize=()=>{const w=el.clientWidth,h=el.clientHeight;if(!w||!h)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();};
  const move=e=>{const b=el.getBoundingClientRect();target.x=((e.clientX-b.left)/b.width-.5)*.65;target.y=((e.clientY-b.top)/b.height-.5)*.35;};
  const leave=()=>{target.x=target.y=0;};
  const draw=now=>{
   if(disposed||!visible||document.hidden)return;
   raf=requestAnimationFrame(draw);if(now-last<1000/30)return;
   elapsed+=Math.min((now-last)/1000,.05);last=now;
   group.rotation.y+=(target.x-group.rotation.y)*.04;group.rotation.x+=(target.y-group.rotation.x)*.04;
   core.rotation.y=edges.rotation.y=elapsed*.12;core.rotation.z=edges.rotation.z=elapsed*.08;
   orbit.rotation.y=elapsed*.06;group.position.y=Math.sin(elapsed*.7)*.075;
   material.wireframe=modeRef.current==='wire';material.color.set(modeRef.current==='wire'?'#c6f09c':'#65794d');
   renderer.render(scene,camera);el.dataset.ready='true';
  };
  const start=()=>{cancelAnimationFrame(raf);if(visible&&!document.hidden&&!disposed){last=performance.now();raf=requestAnimationFrame(draw);}};
  const visibility=()=>start();
  const lost=e=>{e.preventDefault();disposed=true;cancelAnimationFrame(raf);setFailed(true);};
  const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;start();},{threshold:.05});observer.observe(el);
  const sizeObserver=new ResizeObserver(resize);sizeObserver.observe(el);resize();
  el.addEventListener('pointermove',move);el.addEventListener('pointerleave',leave);renderer.domElement.addEventListener('webglcontextlost',lost);document.addEventListener('visibilitychange',visibility);start();
  return ()=>{
   disposed=true;cancelAnimationFrame(raf);observer.disconnect();sizeObserver.disconnect();el.removeEventListener('pointermove',move);el.removeEventListener('pointerleave',leave);document.removeEventListener('visibilitychange',visibility);renderer.domElement.removeEventListener('webglcontextlost',lost);
   scene.traverse(object=>{object.geometry?.dispose();if(object.material){for(const m of Array.isArray(object.material)?object.material:[object.material])m.dispose();}});renderer.dispose();renderer.forceContextLoss();renderer.domElement.remove();
  };
 },[]);
 return failed?null:<div className="scene" ref={host} aria-hidden="true"/>;
}
