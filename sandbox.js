const frame=document.querySelector('#device-frame'),space=document.querySelector('#device-space'),prototype=document.querySelector('#prototype'),panel=document.querySelector('#settings-panel');let width=393,height=852;
function fit(){const available=innerWidth-32;const scale=Math.min(1,available/width,(innerHeight-48)/height);frame.style.width=width+'px';frame.style.height=height+'px';frame.style.transform='scale('+scale+')';space.style.width=width*scale+'px';space.style.height=height*scale+'px';document.documentElement.style.setProperty('--device-half-width',width*scale/2+'px');document.documentElement.style.setProperty('--device-top',space.getBoundingClientRect().top+'px');}
function send(action,id){prototype.contentWindow.postMessage({source:'trailer-sandbox',action,id},location.origin);}
const device=document.querySelector('#device'),options=document.querySelector('#device-options');
function closeOptions(){options.hidden=true;device.setAttribute('aria-expanded','false');}
device.onclick=()=>{options.hidden=!options.hidden;device.setAttribute('aria-expanded',String(!options.hidden));};
for(const option of options.querySelectorAll('[role=option]'))option.onclick=()=>{[width,height]=option.dataset.size.split(',').map(Number);document.querySelector('#device-value').textContent=option.textContent;for(const other of options.children)other.setAttribute('aria-selected',String(other===option));closeOptions();fit();device.focus();};
device.onkeydown=e=>{if(e.key==='ArrowDown'||e.key==='ArrowUp'){e.preventDefault();options.hidden=false;device.setAttribute('aria-expanded','true');options.querySelector('[aria-selected=true]').focus();}};
options.onkeydown=e=>{const items=[...options.children],index=items.indexOf(document.activeElement);if(e.key==='ArrowDown'||e.key==='ArrowUp'){e.preventDefault();items[(index+(e.key==='ArrowDown'?1:-1)+items.length)%items.length].focus();}if(e.key==='Escape'){closeOptions();device.focus();}};
addEventListener('click',e=>{if(!e.target.closest('.device-field'))closeOptions();});
document.querySelector('#replay').onclick=()=>send('restart',0);
function installTouchCursor(){
 const doc=prototype.contentDocument;if(!doc)return;doc.documentElement.style.setProperty('--preview-status-height','44px');
 let style=doc.getElementById('sandbox-touch-cursor');if(!style){style=doc.createElement('style');style.id='sandbox-touch-cursor';doc.head.appendChild(style);}
 const svg='<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="white" fill-opacity=".35" stroke="black" stroke-opacity=".45" stroke-width="3"/><circle cx="12" cy="12" r="9" fill="none" stroke="white" stroke-opacity=".9" stroke-width="1"/></svg>';
 const cursor='url("data:image/svg+xml,'+encodeURIComponent(svg)+'") 12 12, default';
 style.textContent='.sandbox-embedded .phone>header{top:calc(var(--preview-status-height,44px) + 8px)}.sandbox-embedded #filters{top:calc(var(--preview-status-height,44px) + 56px)}.sandbox-embedded .detail-nav{height:calc(52px + var(--preview-status-height,44px));padding-top:var(--preview-status-height,44px)}.sandbox-embedded #toast.bookmark-toast{top:calc(var(--preview-status-height,44px) + 8px)}@media (hover:hover) and (pointer:fine){html,body,body *{cursor:'+cursor+' !important}}';
}
prototype.onload=()=>{installTouchCursor();send('title',0);};
if(prototype.contentDocument?.readyState==='complete')installTouchCursor();
addEventListener('resize',fit);addEventListener('keydown',e=>{if(e.key==='Escape')closeOptions();});fit();

addEventListener('pointerdown',()=>send('dismiss-filters',0),true);
