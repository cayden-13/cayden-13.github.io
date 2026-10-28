const papers=[
 {title:'Explainable AI for malware analysis: a systematic review of benchmark datasets, traffic-oriented detection, and interpretability methods',venue:'PeerJ Computer Science 12:e3902 · Yu, B.W., et al.',year:'2026',type:'published',label:'Published',url:'https://doi.org/10.7717/peerj-cs.3902'},
 {title:'When Speech Meets Lips: Interpretable Audio-Visual Synchronization for L2 Pronunciation Assessment',venue:'arXiv · Yu, B.W., et al.',year:'2026',type:'preprint',label:'Preprint',url:'https://arxiv.org/abs/2609.06788'},
 {title:'A Survey on U-Net with Variants and Their Applications in Two-Dimensional Medical Image Segmentations',venue:'Journal of Imaging 12(10), 497 · Wu, T.H., Ullah, S., Yu, B.W., et al.',year:'2026',type:'published',label:'Published',url:'https://doi.org/10.3390/jimaging12100497'},
 {title:'Federated Transfer Learning for Personalized Household Financial Services',venue:'BTFM 2026 · Yu, B.W., Zhong, Z.Q., Liu, Y.S., Zhao, Y.',year:'2026',type:'published',label:'Published',url:'https://doi.org/10.1109/BTFM69084.2026.11484502'},
 {title:'Trustworthy Privacy-Preserving Federated Learning with Deep Generative Augmentation for Multimodal Emotion Recognition in Healthcare',venue:'Submitted to IEEE Journal of Biomedical and Health Informatics · Ullah, F., Mehmood, K., Yu, B.W., et al.',year:'2026',type:'review',label:'Under review'},
 {title:'Advanced AI-Driven Privacy-Preserving Federated Learning with Generative Augmentation for Multimodal Emotion Recognition in 6G Networks',venue:'Submitted to Digital Communications and Networks · Ullah, F., Mehmood, K., Yu, B.W., et al.',year:'2026',type:'review',label:'Under review'},
 {title:'Simulating Home Appliance Behavior and Operational Condition-Action Rules for Autonomous Intelligence',venue:'ICNGN 2024 · Ehimwenma, K.E., et al., Yu, B.W. · Best Paper Award',year:'2024',type:'published',label:'Published',url:'https://doi.org/10.1109/ICNGN63705.2024.10871679'}
];

papers.splice(4,0,{title:'Role-Playing vs. Baseline Generation in Educational Dialogue: A Multi-Turn Comparative Study with Automated Scoring',venue:'ICISBDA-26 · Yu, B.W., Zheng, Q.T., Zhong, Z.Q., Yu, B., Zhao, Y.',year:'2026',type:'accepted',label:'Accepted'});
const paperImages=['malware.jpg','speech-lips.jpg','unet.png','finance.jpg','dialogue.jpg','healthcare.jpg','6g.jpg','iot.jpg'];
function thumb(i){return `<button class="paper-image-button" data-paper-image="${i}" aria-label="Enlarge manuscript preview: ${papers[i].title}"><img src="assets/papers/${paperImages[i]}" alt="User-supplied manuscript preview for ${papers[i].title}" loading="lazy" width="160" height="190"><span class="image-zoom">↗ View image</span></button>`}
function render(filter='all',animateChange=false){const previous=new Map([...document.querySelectorAll('#paper-list .paper')].map(el=>[el.dataset.paperKey,el.getBoundingClientRect()]));document.getElementById('paper-list').innerHTML=papers.map((p,i)=>({...p,i})).filter(p=>filter==='all'||p.type===filter).map(p=>`<article class="paper" data-paper-key="${p.i}"><div class="paper-thumb">${thumb(p.i)}</div><div class="paper-content"><span class="badge ${p.type}">${p.label}</span><h3>${p.url?`<a href="${p.url}" target="_blank" rel="noopener">${p.title}</a>`:p.title}</h3><p class="authors">${p.venue.replace(/Yu, B.W./g,'<strong>Yu, B.W.</strong>')}</p><div class="paper-meta"><span>${p.year}</span>${p.url?`<a href="${p.url}" target="_blank" rel="noopener">[ Paper ↗ ]</a>`:''}</div></div></article>`).join('');if(animateChange){animatePaperLayout(previous);queueProgress();}}
render();document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('[data-filter]').forEach(x=>{x.classList.toggle('active',x===b);x.setAttribute('aria-pressed',String(x===b))});render(b.dataset.filter,true)}));
// Motion enhances visible content; no section depends on animation to be readable.
const motionQuery=matchMedia('(prefers-reduced-motion: reduce)');
let reducedMotion=motionQuery.matches;
motionQuery.addEventListener('change',e=>{reducedMotion=e.matches;if(reducedMotion)document.getAnimations().forEach(a=>a.cancel())});
const easeOut='cubic-bezier(.22,1,.36,1)';
function animatePaperLayout(previous){
 if(reducedMotion)return;
 document.querySelectorAll('#paper-list .paper').forEach((el,index)=>{
  const before=previous.get(el.dataset.paperKey),after=el.getBoundingClientRect();
  const transform=before?`translate(${before.left-after.left}px,${before.top-after.top}px)`:'translateY(16px)';
  el.animate([{opacity:before?1:0,transform},{opacity:1,transform:'translate(0,0)'}],{duration:520,delay:before?0:Math.min(index*45,180),easing:easeOut,fill:'backwards'});
 });
}
const sections=document.querySelectorAll('main>section[id]');
const navObserver=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){document.querySelectorAll('nav a[href^="#"]').forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+e.target.id))}})},{rootMargin:'-12% 0px -65% 0px'});sections.forEach(s=>navObserver.observe(s));
const entryObserver=new IntersectionObserver(entries=>{
 entries.forEach((entry,index)=>{if(!entry.isIntersecting)return;
 const el=entry.target;el.classList.add('entered');
 if(!reducedMotion){
  const delay=Math.min(index*55,165);
  el.animate([{opacity:.25,transform:'translateY(18px)'},{opacity:1,transform:'translateY(0)'}],{duration:760,delay,easing:easeOut,fill:'backwards'});
 }
 entryObserver.unobserve(el);
 });
},{threshold:.12,rootMargin:'0px 0px -20px 0px'});
document.querySelectorAll('.profile,.section-top,.achievement,.education-row,.experience-list>article,#paper-list>.paper,#projects>.project,.honor-list>li').forEach(el=>entryObserver.observe(el));


// A reading line follows the professional journey without intercepting scrolling.
const timeline=document.querySelector('.experience-list');
const progress=document.createElement('div');progress.className='reading-progress';progress.setAttribute('aria-hidden','true');document.body.append(progress);
const backToTop=document.createElement('button');backToTop.className='back-to-top';backToTop.setAttribute('aria-label','Back to top');backToTop.innerHTML='<span aria-hidden="true">↑</span>';backToTop.hidden=true;document.body.append(backToTop);
backToTop.addEventListener('click',()=>window.scrollTo({top:0,behavior:reducedMotion?'instant':'smooth'}));
let pending=false;
function syncProgress(){
 const max=document.documentElement.scrollHeight-innerHeight;
 progress.style.transform=`scaleX(${max>0?Math.min(scrollY/max,1):0})`;
 document.querySelector('.topbar').classList.toggle('scrolled',scrollY>24);
 backToTop.hidden=scrollY<650;
 if(timeline){const r=timeline.getBoundingClientRect();const ratio=Math.max(0,Math.min(1,(innerHeight*.68-r.top)/r.height));timeline.style.setProperty('--timeline-progress',String(ratio));}
 pending=false;
}
function queueProgress(){if(!pending){pending=true;requestAnimationFrame(syncProgress)}}
addEventListener('scroll',queueProgress,{passive:true});addEventListener('resize',queueProgress,{passive:true});
document.getElementById('paper-list').addEventListener('load',queueProgress,true);
syncProgress();
// Gentle localized light on the achievement surfaces, for precise pointers only.
if(matchMedia('(hover: hover) and (pointer: fine)').matches){
 document.querySelectorAll('.achievement').forEach(el=>{
  let frame=0,point;
  el.addEventListener('pointermove',e=>{if(reducedMotion)return;point={x:e.clientX,y:e.clientY};if(frame)return;frame=requestAnimationFrame(()=>{const r=el.getBoundingClientRect();el.style.setProperty('--light-x',`${point.x-r.left}px`);el.style.setProperty('--light-y',`${point.y-r.top}px`);frame=0;});});
  el.addEventListener('pointerleave',()=>{if(frame){cancelAnimationFrame(frame);frame=0;}});
 });
}

const imageDialog=document.createElement('dialog');imageDialog.className='paper-image-dialog';imageDialog.setAttribute('aria-labelledby','image-dialog-title');imageDialog.innerHTML='<div class="image-dialog-header"><div><h2 id="image-dialog-title"></h2><p>User-supplied manuscript preview</p></div><button class="close-image-dialog" aria-label="Close image preview">×</button></div><div class="image-dialog-scroll"><img class="full-paper-image" alt=""></div>';document.body.append(imageDialog);
let imageOpener;
document.getElementById('paper-list').addEventListener('click',e=>{const b=e.target.closest('[data-paper-image]');if(!b)return;const i=Number(b.dataset.paperImage);imageOpener=b;imageDialog.querySelector('h2').textContent=papers[i].title;const img=imageDialog.querySelector('.full-paper-image');img.src='assets/papers/'+paperImages[i];img.alt='Manuscript preview: '+papers[i].title;imageDialog.showModal();imageDialog.querySelector('.image-dialog-scroll').scrollTop=0;document.body.style.overflow='hidden'});
imageDialog.querySelector('.close-image-dialog').addEventListener('click',()=>closePaperPreview());imageDialog.addEventListener('close',()=>{document.body.style.overflow=document.querySelector('.planet-theme-dialog[open]')?'hidden':'';imageOpener?.focus()});imageDialog.addEventListener('click',e=>{if(e.target===imageDialog){const r=imageDialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closePaperPreview()}});

let previewClosing=false;
async function closePaperPreview(){
 if(previewClosing||!imageDialog.open)return;
 previewClosing=true;
 if(!reducedMotion){try{await imageDialog.animate([{opacity:1,transform:'translateY(0) scale(1)'},{opacity:0,transform:'translateY(8px) scale(.99)'}],{duration:180,easing:'ease-in'}).finished}catch{}}
 imageDialog.close();previewClosing=false;
}
imageDialog.addEventListener('cancel',e=>{e.preventDefault();closePaperPreview()});

// The cinematic opening is a same-origin, independently usable HTML module.
const heroFrame=document.querySelector('.skyranger-embed');
const heroSection=document.getElementById('skyranger');
if(heroFrame&&heroSection){
 let heroActive=true;
 function sendHeroVisibility(){heroFrame.contentWindow?.postMessage({type:'bowen:hero:visibility',active:heroActive&&!document.hidden&&!document.querySelector('.planet-theme-dialog[open]')},location.origin);}
 const heroVisibility=new IntersectionObserver(entries=>{heroActive=entries[0].isIntersecting;sendHeroVisibility();},{threshold:0});heroVisibility.observe(heroSection);
 heroFrame.addEventListener('load',sendHeroVisibility);
 document.addEventListener('visibilitychange',sendHeroVisibility);
 addEventListener('message',event=>{
  if(event.origin!==location.origin||event.source!==heroFrame.contentWindow||event.data?.type!=='bowen:hero:navigate')return;
  const allowed=new Set(['portfolio','about','publications','experience','projects']);
  if(!allowed.has(event.data.target))return;
  document.body.classList.add('portfolio-expanded');
  const target=document.getElementById(event.data.target);if(!target)return;
  target.scrollIntoView({behavior:reducedMotion?'instant':'smooth',block:'start'});
  history.replaceState(null,'','#'+event.data.target);
  const focusTarget=target.querySelector('h2,a')||target;focusTarget.setAttribute('tabindex','-1');focusTarget.focus({preventScroll:true});
 });
}

// Theme planets open the original, live sections: filters and image dialogs keep working.
const themeCatalog={about:{title:'About Me',index:'01',sections:['observatory','about','skills','contact']},publications:{title:'Publications',index:'02',sections:['publications']},honors:{title:'Honors & Awards',index:'03',sections:['honors']},experience:{title:'Experience',index:'04',sections:['experience']},education:{title:'Education',index:'05',sections:['education']},projects:{title:'Research & Projects',index:'06',sections:['projects']}};
const themeDialog=document.createElement('dialog');themeDialog.className='planet-theme-dialog';themeDialog.setAttribute('aria-labelledby','planet-theme-title');
themeDialog.innerHTML='<header class="theme-header"><div><p class="theme-eyebrow">CAYDEN / PERSONAL UNIVERSE</p><h2 id="planet-theme-title"></h2></div><button class="theme-close" aria-label="Close theme and return to the planets">×</button></header><nav class="theme-tabs" aria-label="Portfolio themes">'+Object.entries(themeCatalog).map(([key,t])=>`<button data-theme-topic="${key}">${key==='about'?'About':key==='publications'?'Papers':key==='experience'?'Experience':key==='education'?'Education':key==='honors'?'Honors':'Projects'}</button>`).join('')+'</nav><div class="theme-body"></div>';
document.body.append(themeDialog);const themeBody=themeDialog.querySelector('.theme-body');let borrowedSections=[],themeBusy=false;
function restoreSections(){borrowedSections.forEach(({element,placeholder})=>placeholder.replaceWith(element));borrowedSections=[];themeBody.replaceChildren();}
function heroVisibilityMessage(active){heroFrame?.contentWindow?.postMessage({type:'bowen:hero:visibility',active:active&&!document.hidden},location.origin);}
function openPlanetTheme(key){
 if(!Object.hasOwn(themeCatalog,key)||themeBusy)return;const theme=themeCatalog[key];
 restoreSections();themeDialog.dataset.theme=key;
 themeDialog.querySelector('#planet-theme-title').textContent=theme.title;
 themeDialog.querySelector('.theme-eyebrow').textContent=`CAYDEN / PLANET ${theme.index}`;
 themeDialog.querySelectorAll('[data-theme-topic]').forEach(b=>{const selected=b.dataset.themeTopic===key;b.classList.toggle('active',selected);b.setAttribute('aria-pressed',String(selected))});
 if(key==='about'){const portrait=document.createElement('div');portrait.className='theme-portrait';portrait.innerHTML='<img src="assets/bowen-photo.jpg" alt="Bowen Yu" width="1080" height="1440"><div><span>BOWEN YU</span><strong>Cayden</strong><p>MSc Robotics · The University of Manchester</p></div>';themeBody.append(portrait);}
 for(const id of theme.sections){const el=document.getElementById(id);if(!el)continue;const placeholder=document.createComment('planet home: '+id);el.replaceWith(placeholder);borrowedSections.push({element:el,placeholder});themeBody.append(el);}
 if(!themeDialog.open)themeDialog.showModal();themeBody.scrollTop=0;document.body.style.overflow='hidden';heroVisibilityMessage(false);
 if(!reducedMotion)themeBody.animate([{opacity:.3,transform:'translateY(8px)'},{opacity:1,transform:'translateY(0)'}],{duration:380,easing:easeOut});
}
async function closePlanetTheme(){if(themeBusy||!themeDialog.open)return;themeBusy=true;if(!reducedMotion){try{await themeDialog.animate([{opacity:1,transform:'scale(1)'},{opacity:0,transform:'scale(.985)'}],{duration:180,easing:'ease-in'}).finished}catch{}}themeDialog.close();themeBusy=false;}
themeDialog.querySelector('.theme-close').addEventListener('click',closePlanetTheme);
themeDialog.addEventListener('cancel',e=>{e.preventDefault();closePlanetTheme()});
themeDialog.addEventListener('close',()=>{restoreSections();document.body.style.overflow='';heroVisibilityMessage(true);heroFrame?.focus();});
themeDialog.addEventListener('click',e=>{const tab=e.target.closest('[data-theme-topic]');if(tab){openPlanetTheme(tab.dataset.themeTopic);return;}if(e.target===themeDialog){const r=themeDialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closePlanetTheme();}});
themeBody.addEventListener('click',e=>{const a=e.target.closest('a[href^="#"]');if(!a)return;const key=a.getAttribute('href').slice(1);if(themeCatalog[key]){e.preventDefault();openPlanetTheme(key)}});
addEventListener('message',event=>{if(event.origin!==location.origin||event.source!==heroFrame?.contentWindow||event.data?.type!=='bowen:hero:theme')return;openPlanetTheme(event.data.target);});
if(heroFrame){document.body.classList.add('has-planet-hub');if(location.hash&&location.hash!=='#skyranger')document.body.classList.add('portfolio-expanded');}
document.querySelector('.skip-intro')?.addEventListener('click',()=>{document.body.classList.add('portfolio-expanded');queueProgress();});
