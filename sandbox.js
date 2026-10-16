const frame=document.querySelector('#device-frame'),space=document.querySelector('#device-space'),prototype=document.querySelector('#prototype'),panel=document.querySelector('#settings-panel'),toggle=document.querySelector('#settings-toggle');let width=393,height=852;
function fit(){const scale=Math.min(1,(innerWidth-32)/width,(innerHeight-48)/height);frame.style.width=width+'px';frame.style.height=height+'px';frame.style.transform='scale('+scale+')';space.style.width=width*scale+'px';space.style.height=height*scale+'px';const box=space.getBoundingClientRect();document.documentElement.style.setProperty('--settings-left',Math.max(16,box.left-80-44)+'px');document.documentElement.style.setProperty('--settings-top',box.top+'px');}
function send(action,id){prototype.contentWindow.postMessage({source:'trailer-sandbox',action,id},location.origin);}
toggle.onclick=()=>{panel.hidden=!panel.hidden;toggle.setAttribute('aria-expanded',String(!panel.hidden));};
document.querySelector('#device').onchange=e=>{[width,height]=e.target.value.split(',').map(Number);fit();};
document.querySelector('#title').onchange=e=>send('title',Number(e.target.value));
for(const name of ['status','island','home'])document.querySelector('#'+name+'-toggle').onchange=e=>{frame.classList.toggle('no-'+name,!e.target.checked);installTouchCursor();};
document.querySelector('#replay').onclick=()=>send('restart',Number(document.querySelector('#title').value));
function installTouchCursor(){
 const doc=prototype.contentDocument;if(!doc)return;doc.documentElement.style.setProperty('--preview-status-height',document.querySelector('#status-toggle').checked?'44px':'0px');
 let style=doc.getElementById('sandbox-touch-cursor');if(!style){style=doc.createElement('style');style.id='sandbox-touch-cursor';doc.head.appendChild(style);}
 const svg='<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="white" fill-opacity=".35" stroke="black" stroke-opacity=".45" stroke-width="3"/><circle cx="12" cy="12" r="9" fill="none" stroke="white" stroke-opacity=".9" stroke-width="1"/></svg>';
 const cursor='url("data:image/svg+xml,'+encodeURIComponent(svg)+'") 12 12, default';
 style.textContent='.sandbox-embedded .phone>header{top:calc(var(--preview-status-height,44px) + 8px)}.sandbox-embedded #filters{top:calc(var(--preview-status-height,44px) + 56px)}.sandbox-embedded .detail-nav{height:calc(52px + var(--preview-status-height,44px));padding-top:var(--preview-status-height,44px)}.sandbox-embedded #toast.bookmark-toast{top:calc(var(--preview-status-height,44px) + 8px)}@media (hover:hover) and (pointer:fine){html,body,body *{cursor:'+cursor+' !important}}';
}
prototype.onload=()=>{installTouchCursor();send('title',Number(document.querySelector('#title').value));};
if(prototype.contentDocument?.readyState==='complete')installTouchCursor();
addEventListener('resize',fit);addEventListener('keydown',e=>{if(e.key==='Escape'){panel.hidden=true;toggle.setAttribute('aria-expanded','false');}});fit();
