/* Ambient stardust shared by the full portfolio and its top-layer theme views. */
(()=>{'use strict';
const media=matchMedia('(prefers-reduced-motion: reduce)');
const dialog=document.querySelector('.planet-theme-dialog');
const globalCanvas=document.createElement('canvas');globalCanvas.className='cosmic-field';globalCanvas.setAttribute('aria-hidden','true');document.body.prepend(globalCanvas);
const dialogCanvas=document.createElement('canvas');dialogCanvas.className='theme-cosmic-field';dialogCanvas.setAttribute('aria-hidden','true');if(dialog)dialog.prepend(dialogCanvas);
let paused=false,raf=0,lastDraw=0,clock=0,pointer={x:.5,y:.5},gaze={x:.5,y:.5};
function makeField(canvas,limit){return {canvas,ctx:canvas.getContext('2d',{alpha:true}),limit,width:0,height:0,stars:[]}}
const fields=[makeField(globalCanvas,84),makeField(dialogCanvas,65)];
function resize(field){
 const r=field.canvas.getBoundingClientRect();const w=Math.round(r.width),h=Math.round(r.height);if(w<2||h<2)return;
 const dpr=Math.min(devicePixelRatio||1,1.5);
 if(field.width===w&&field.height===h&&field.dpr===dpr)return;
 field.width=w;field.height=h;field.dpr=dpr;field.canvas.width=Math.round(w*dpr);field.canvas.height=Math.round(h*dpr);
 let seed=7721;const random=()=>{seed=(seed*16807)%2147483647;return (seed-1)/2147483646};
 const count=Math.min(field.limit,Math.max(22,Math.round(w*h/14000)));
 field.stars=Array.from({length:count},()=>({x:random()*w,y:random()*h,r:.45+random()*1.05,speed:.004+random()*.01,phase:random()*Math.PI*2,depth:.3+random()*.7,gold:random()>.82}));
}
function paint(field,dt,still){
 const {ctx,width:w,height:h,dpr}=field;if(!ctx||!w||!h)return;
 ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,w,h);
 for(const s of field.stars){
  if(!still){s.y-=s.speed*dt;if(s.y<-5)s.y=h+5;}
  const x=s.x+(gaze.x-.5)*10*s.depth,y=s.y+(gaze.y-.5)*8*s.depth;
  const alpha=.25+(Math.sin(clock*.00045+s.phase)+1)*.18;
  ctx.globalAlpha=alpha;ctx.fillStyle=s.gold?'#e9cc91':'#b6d6f6';ctx.beginPath();ctx.arc(x,y,s.r,0,Math.PI*2);ctx.fill();
  if(s.r>1.25){ctx.globalAlpha=alpha*.09;ctx.beginPath();ctx.arc(x,y,s.r*3.5,0,Math.PI*2);ctx.fill();}
 }
 // A sparse constellation, bounded to 12 stars rather than all-pairs networking.
 const nodes=field.stars.slice(0,12);ctx.lineWidth=.55;ctx.strokeStyle='#a6c8eb';
 for(let i=0;i<nodes.length;i++)for(let j=i+1;j<nodes.length;j++){const a=nodes[i],b=nodes[j],distance=Math.hypot(a.x-b.x,a.y-b.y);if(distance>120)continue;ctx.globalAlpha=(1-distance/120)*.12;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();}
 ctx.globalAlpha=1;
}
function surfaces(){
 const modal=Boolean(dialog?.open);const portfolio=document.body.classList.contains('portfolio-expanded')&&scrollY+innerHeight>innerHeight*1.25;
 return {modal,portfolio};
}
function drawOnce(){fields.forEach(f=>{resize(f);paint(f,0,true)})}
function frame(time){
 raf=0;const visible=surfaces();if(document.hidden||paused||media.matches||(!visible.modal&&!visible.portfolio))return;
 if(time-lastDraw>=32){const dt=lastDraw?Math.min(time-lastDraw,64):32;lastDraw=time;clock+=dt;gaze.x+=(pointer.x-gaze.x)*.04;gaze.y+=(pointer.y-gaze.y)*.04;if(visible.modal)paint(fields[1],dt,false);else if(visible.portfolio)paint(fields[0],dt,false);}
 raf=requestAnimationFrame(frame);
}
function update(){
 fields.forEach(resize);const visible=surfaces();
 globalButton.hidden=!visible.portfolio||visible.modal;
 for(const b of buttons){b.disabled=media.matches;b.textContent=media.matches?'Static stars':paused?'Resume stardust':'Pause stardust';b.setAttribute('aria-pressed',String(paused||media.matches));b.setAttribute('aria-label',media.matches?'Static stars: reduced motion is enabled':paused?'Resume ambient star animation':'Pause ambient star animation');}
 if(document.hidden||paused||media.matches||(!visible.modal&&!visible.portfolio)){if(raf)cancelAnimationFrame(raf);raf=0;lastDraw=0;drawOnce();return;}
 if(!raf){lastDraw=0;drawOnce();raf=requestAnimationFrame(frame);}
}
function makeControl(parent){const button=document.createElement('button');button.className='cosmic-pause';button.type='button';button.addEventListener('click',()=>{paused=!paused;update()});parent.append(button);return button;}
const globalButton=makeControl(document.body);const buttons=[globalButton];if(dialog)buttons.push(makeControl(dialog));
addEventListener('pointermove',e=>{if(media.matches||e.pointerType==='touch')return;pointer={x:e.clientX/innerWidth,y:e.clientY/innerHeight}},{passive:true});
let updateQueued=false;function queueUpdate(){if(updateQueued)return;updateQueued=true;requestAnimationFrame(()=>{updateQueued=false;update()})}
addEventListener('scroll',queueUpdate,{passive:true});addEventListener('resize',queueUpdate,{passive:true});document.addEventListener('visibilitychange',update);media.addEventListener('change',update);
new MutationObserver(queueUpdate).observe(document.body,{attributes:true,attributeFilter:['class']});
if(dialog){new MutationObserver(queueUpdate).observe(dialog,{attributes:true,attributeFilter:['open','data-theme']});if('ResizeObserver'in window)new ResizeObserver(queueUpdate).observe(dialog);}
addEventListener('pagehide',()=>{if(raf)cancelAnimationFrame(raf);raf=0});
if(fields.every(f=>!f.ctx)){buttons.forEach(b=>b.hidden=true);return;}
update();
})();
