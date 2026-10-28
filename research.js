/* A white research workspace: topic-specific motion, original portfolio content. */
(()=>{'use strict';
const root=document.getElementById('projects');if(!root)return;
const media=matchMedia('(prefers-reduced-motion: reduce)');
const meta=[
 {name:'Multi-Agent Intelligence',topic:'AGENTS / EVIDENCE / FEEDBACK',photo:'pi5.png',credit:'Raspberry Pi 5',url:'https://www.raspberrypi.com/products/raspberry-pi-5/'},
 {name:'Explainable Malware Analysis',topic:'SECURITY / EXPLANATION',photo:'chips.png',credit:'RP2040 chips',url:'https://www.raspberrypi.com/products/rp2040/'},
 {name:'Smart Flow Control',topic:'BIOMETRICS / CONTROL',photo:'sense-hat.jpg',credit:'Sense HAT',url:'https://www.raspberrypi.com/products/sense-hat/'},
 {name:'Autonomous Home Agents',topic:'PERCEPTION / ACTION',photo:'pico.png',credit:'Raspberry Pi Pico',url:'https://www.raspberrypi.com/products/raspberry-pi-pico/'}
];
function node(x,y,w,label,cls=''){return `<g class="demo-node ${cls}"><rect x="${x}" y="${y}" width="${w}" height="44" rx="9"/><text x="${x+w/2}" y="${y+26}" text-anchor="middle">${label}</text></g>`}
function graph(i){let body='';
 if(i===0){body=`<path class="flow-track" d="M99 92H306L535 92M99 92V238H535V92M307 92V238"/><path class="flow-track feedback" d="M445 238V297H195V238"/>${node(45,70,108,'RESEARCH','step-a')}${node(252,70,108,'EVIDENCE','step-b')}${node(481,70,108,'TOOLS / MCP','step-c')}${node(45,216,108,'ANALYSIS','step-d')}${node(252,216,108,'VALIDATE','step-e')}${node(481,216,108,'REPORT','step-f')}${node(251,278,110,'QUALITY LOOP','quality')}<g class="demo-packet packet-a"><circle cx="198" cy="92" r="5"/></g><g class="demo-packet packet-b"><circle cx="306" cy="164" r="5"/></g><g class="demo-packet packet-c"><circle cx="424" cy="238" r="5"/></g><text class="demo-note" x="320" y="178" text-anchor="middle">COLLECT → CHECK → REFINE</text>`;}
 if(i===1){body=`<image href="assets/hardware/chips.png" x="34" y="88" width="176" height="150" preserveAspectRatio="xMidYMid meet"/><path class="flow-track" d="M210 165H296m78 0h45"/>${node(263,143,112,'DETECTOR','step-b')}<g class="attribution-bars"><text class="demo-note" x="435" y="79">MODEL ATTRIBUTION</text><rect x="432" y="98" width="151" height="17" rx="4"/><rect x="432" y="136" width="115" height="17" rx="4"/><rect x="432" y="174" width="81" height="17" rx="4"/><rect x="432" y="212" width="45" height="17" rx="4"/></g><g class="bar-labels demo-note"><text x="432" y="92">FEATURE A</text><text x="432" y="130">FEATURE B</text><text x="432" y="168">FEATURE C</text><text x="432" y="206">FEATURE D</text></g><path class="scan-line" d="M35 110H208"/><text class="demo-note" x="320" y="294" text-anchor="middle">DETECTION + INTERPRETATION / CONCEPTUAL VIEW</text>`;}
 if(i===2){body=`<image href="assets/hardware/sense-hat.jpg" x="27" y="102" width="152" height="112" preserveAspectRatio="xMidYMid meet"/><path class="flow-track" d="M180 160H275m111 0h111"/>${node(258,138,132,'AI CONTROLLER','step-b')}<g class="reservoir"><rect x="482" y="68" width="97" height="176" rx="13"/><clipPath id="reservoir-clip"><rect x="490" y="77" width="81" height="157" rx="8"/></clipPath><g clip-path="url(#reservoir-clip)"><rect class="liquid-level" x="490" y="138" width="81" height="130"/></g><path d="M530 245v32h-131" class="flow-track"/><circle cx="443" cy="277" r="13" class="valve"/><path d="m436 270 14 14m0-14-14 14" class="valve-cross"/></g><path class="biometric-trace" d="M58 268h24l8-8 9 17 11-32 10 23h34"/><text class="demo-note" x="102" y="82" text-anchor="middle">HEALTH SIGNAL</text><text class="demo-note" x="532" y="52" text-anchor="middle">FLOW RESPONSE</text>`;}
 if(i===3){body=`<image href="assets/hardware/pico.png" x="232" y="126" width="175" height="124" preserveAspectRatio="xMidYMid meet"/><path class="flow-track" d="M163 99 320 174 488 98M320 174l-157 94m157-94 170 94"/>${node(66,77,120,'SENSOR','step-a')}${node(443,77,120,'APPLIANCE','step-c')}${node(66,244,120,'CONDITION','step-d')}${node(443,244,120,'ACTION','step-f')}<circle class="signal-wave wave-a" cx="320" cy="183" r="45"/><circle class="signal-wave wave-b" cx="320" cy="183" r="45"/><text class="demo-note" x="320" y="43" text-anchor="middle">PERCEIVE / DECIDE / ACT</text><text class="demo-note" x="320" y="319" text-anchor="middle">SENSOR-DRIVEN AUTONOMY</text>`;}
 return `<svg class="research-simulation sim-${i}" viewBox="0 0 640 350" role="img" aria-label="Animated conceptual demonstration: ${meta[i].name}"><defs><pattern id="demo-grid-${i}" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M24 0H0V24" fill="none" stroke="#879cb4" stroke-opacity=".08"/></pattern></defs><rect width="640" height="350" fill="url(#demo-grid-${i})"/>${body}</svg>`;
}
const projects=[...root.querySelectorAll(':scope>.project')];
const note=root.querySelector('.hardware-note');if(note)note.textContent='Interactive research illustrations, informed by the project workflows. Hardware photographs are representative; animations do not depict measured results.';
const workspace=document.createElement('div');workspace.className='motion-workspace';
const index=document.createElement('div');index.className='motion-index';index.setAttribute('role','tablist');index.setAttribute('aria-label','Research project selector');index.setAttribute('aria-orientation','vertical');
const detail=document.createElement('div');detail.className='motion-detail';
projects.forEach((project,i)=>{
 const button=document.createElement('button');button.className='motion-index-card';button.id='motion-tab-'+i;button.type='button';button.setAttribute('role','tab');button.setAttribute('aria-controls','motion-panel-'+i);button.dataset.motionProject=i;
 button.innerHTML=`<span class="motion-mini" aria-hidden="true">${graph(i).replaceAll('reservoir-clip','mini-reservoir-clip').replaceAll('demo-grid-','mini-grid-')}</span><span class="motion-card-meta"><span>0${i+1}</span><span>${meta[i].name}</span><span>↗</span></span><small>${meta[i].topic}</small>`;
 index.append(button);
 const old=project.querySelector('.project-art');const visual=document.createElement('figure');visual.className='project-art animated-project-art';visual.innerHTML=graph(i)+`<figcaption><span><i></i> INTERACTIVE ILLUSTRATION</span><span>0${i+1} / RESEARCH LOG</span></figcaption>`;old?.replaceWith(visual);
 const ref=document.createElement('div');ref.className='hardware-reference';ref.innerHTML=`<img src="assets/hardware/${meta[i].photo}" alt="${meta[i].credit}, representative hardware" loading="lazy"><span>HARDWARE REFERENCE<br><a href="${meta[i].url}" target="_blank" rel="noopener">${meta[i].credit} · Raspberry Pi ↗</a></span>`;project.append(ref);
 project.id='motion-panel-'+i;project.setAttribute('role','tabpanel');project.setAttribute('aria-labelledby',button.id);project.setAttribute('tabindex','0');detail.append(project);
});
const control=document.createElement('div');control.className='motion-toolbar';control.innerHTML='<span><i></i> RESEARCH IN MOTION</span><button type="button" class="motion-pause" aria-pressed="false">Pause previews Ⅱ</button>';
workspace.append(control,index,detail);root.append(workspace);
let selected=0,paused=false;
function selectProject(i,focus=false){selected=i;projects.forEach((p,n)=>p.hidden=n!==i);index.querySelectorAll('[role=tab]').forEach((b,n)=>{const yes=n===i;b.setAttribute('aria-selected',String(yes));b.tabIndex=yes?0:-1;b.classList.toggle('selected',yes);if(yes&&focus)b.focus()});if(!media.matches)projects[i].animate([{opacity:.3,transform:'translateY(9px)'},{opacity:1,transform:'translateY(0)'}],{duration:450,easing:'cubic-bezier(.22,1,.36,1)'});}
index.addEventListener('click',e=>{const button=e.target.closest('[data-motion-project]');if(button)selectProject(Number(button.dataset.motionProject))});
index.addEventListener('keydown',e=>{let next=selected;if(e.key==='ArrowDown')next=(selected+1)%projects.length;else if(e.key==='ArrowUp')next=(selected+projects.length-1)%projects.length;else if(e.key==='Home')next=0;else if(e.key==='End')next=projects.length-1;else return;e.preventDefault();selectProject(next,true)});
const pause=control.querySelector('button');function setMotion(){workspace.classList.toggle('previews-paused',paused||media.matches);pause.disabled=media.matches;pause.textContent=media.matches?'Static previews':paused?'Resume previews ▷':'Pause previews Ⅱ';pause.setAttribute('aria-pressed',String(paused||media.matches))}
pause.addEventListener('click',()=>{paused=!paused;setMotion()});media.addEventListener('change',setMotion);selectProject(0);setMotion();
const workVisibility=new IntersectionObserver(entries=>{workspace.classList.toggle('motion-offscreen',!entries[0].isIntersecting)},{threshold:0});workVisibility.observe(workspace);
document.addEventListener('visibilitychange',()=>workspace.classList.toggle('motion-tab-hidden',document.hidden));

// A large fluid particle sculpture with continuous surface advection and restoring flow.
const observatory=document.createElement('section');observatory.id='observatory';observatory.className='research-observatory';observatory.innerHTML='<div class="particle-study fluid-field"><canvas aria-label="Ambient flowing particle sculpture, positioned at the edge of the page" role="img"></canvas><button class="ring-pause" type="button" aria-label="Pause particle motion" aria-pressed="false">Ⅱ</button></div>';
const main=document.querySelector('.page main');main?.prepend(observatory);
const canvas=observatory.querySelector('canvas'),ctx=canvas.getContext('2d',{alpha:true});if(!ctx)return;
let width=0,height=0,points=[],pointer={x:-1000,y:-1000},visible=false,frame=0,last=0,time=0,ringPaused=false;const ringButton=observatory.querySelector('.ring-pause');
function resize(){const r=canvas.getBoundingClientRect();if(r.width<5||r.height<5)return;width=r.width;height=r.height;const dpr=Math.min(devicePixelRatio||1,1.5);canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);let seed=31;const rand=()=>{seed=seed*16807%2147483647;return(seed-1)/2147483646};const count=width<500?1600:3600;points=Array.from({length:count},()=>{const u=rand()*Math.PI*2,v=rand()*Math.PI*2;return {u,v,jitter:rand(),dx:0,dy:0,vx:0,vy:0}});draw(0);}
function draw(dt){
 ctx.clearRect(0,0,width,height);
 const t=media.matches?0:time,rotation=-.38+Math.sin(t*.000075)*.5,tilt=.55+Math.sin(t*.00011)*.14;
 const sin=Math.sin(rotation),cos=Math.cos(rotation),ct=Math.cos(tilt),st=Math.sin(tilt),raw=[];
 let minX=Infinity,maxX=-Infinity,minY=Infinity,maxY=-Infinity;
 for(const p of points){
  const u=p.u+t*.00022*(.8+p.jitter*.4),v=p.v-t*.00031;
  const radius=1+.13*Math.sin(3*u+t*.00029)+.035*Math.cos(5*u-t*.00017),tube=.27+.065*Math.cos(2*u-t*.0003);
  let x=(radius+tube*Math.cos(v))*Math.cos(u),y=(radius+tube*Math.cos(v))*Math.sin(u),z=tube*Math.sin(v)+.13*Math.sin(2*u+t*.0002);
  const xx=x*cos+z*sin,zz=-x*sin+z*cos;z=zz*ct+y*st;y=y*ct-zz*st;x=xx;
  const perspective=3/(3.8+z),nx=x*perspective,ny=y*perspective;
  minX=Math.min(minX,nx);maxX=Math.max(maxX,nx);minY=Math.min(minY,ny);maxY=Math.max(maxY,ny);raw.push({p,nx,ny,z,perspective});
 }
 const fit=Math.min(width*.83/Math.max(.1,maxX-minX),height*.82/Math.max(.1,maxY-minY));
 const centerX=(minX+maxX)/2,centerY=(minY+maxY)/2,projected=[],influence=width<500?68:110;
 for(const q of raw){const p=q.p,baseX=width*.66+(q.nx-centerX)*fit,baseY=height*.47+(q.ny-centerY)*fit,dx=baseX-pointer.x,dy=baseY-pointer.y,distance=Math.hypot(dx,dy);
  if(dt&&!media.matches){if(distance<influence&&distance>1){const force=(1-distance/influence)*1.2;p.vx+=(-dy/distance*.85+dx/distance*.3)*force;p.vy+=(dx/distance*.85+dy/distance*.3)*force;}p.vx-=p.dx*.02;p.vy-=p.dy*.02;p.vx*=.9;p.vy*=.9;p.dx+=p.vx;p.dy+=p.vy;}
  const x=baseX+p.dx,y=baseY+p.dy;
  projected.push({x,y,z:q.z,r:(.6+p.jitter*.85)*q.perspective,tail:p.jitter>.7&&dt>0&&Number.isFinite(p.lastX)&&Math.hypot(x-p.lastX,y-p.lastY)<22,tx:p.lastX,ty:p.lastY,color:p.jitter>.91?'#b0a997':p.jitter>.76?'#8a99a4':'#536575'});
  p.lastX=x;p.lastY=y;
 }
 projected.sort((a,b)=>b.z-a.z);
 for(const p of projected){const opacity=Math.min(.88,.3+Math.max(0,1-p.z)*.25);if(p.tail){ctx.globalAlpha=opacity*.3;ctx.strokeStyle=p.color;ctx.lineWidth=Math.max(.5,p.r*.65);ctx.beginPath();ctx.moveTo(p.tx,p.ty);ctx.lineTo(p.x,p.y);ctx.stroke();}ctx.globalAlpha=opacity;ctx.fillStyle=p.color;ctx.beginPath();ctx.arc(p.x,p.y,Math.max(.35,p.r),0,Math.PI*2);ctx.fill();}
 ctx.globalAlpha=1;
}
function tick(now){frame=0;if(!visible||document.hidden||media.matches||ringPaused)return;if(!last||now-last>=32){time+=last?Math.min(now-last,48):32;last=now;draw(32);}frame=requestAnimationFrame(tick);}
function sync(){if(frame)cancelAnimationFrame(frame);frame=0;last=0;ringButton.disabled=media.matches;ringButton.textContent=media.matches?'—':ringPaused?'▷':'Ⅱ';ringButton.setAttribute('aria-label',media.matches?'Static sculpture: reduced motion enabled':ringPaused?'Resume particle motion':'Pause particle motion');ringButton.setAttribute('aria-pressed',String(ringPaused||media.matches));if(visible&&!document.hidden&&!media.matches&&!ringPaused)frame=requestAnimationFrame(tick);else draw(0);}
document.addEventListener('pointermove',e=>{if(media.matches||!e.target.closest?.('.page main,.theme-body'))return;const r=canvas.getBoundingClientRect();pointer={x:e.clientX-r.left,y:e.clientY-r.top}},{passive:true});canvas.addEventListener('pointerleave',()=>pointer={x:-1000,y:-1000});ringButton.addEventListener('click',()=>{ringPaused=!ringPaused;sync()});new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync()},{threshold:.05}).observe(canvas);new ResizeObserver(resize).observe(canvas);document.addEventListener('visibilitychange',sync);media.addEventListener('change',sync);resize();
})();
