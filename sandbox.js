const frame=document.querySelector('#device-frame'),space=document.querySelector('#device-space'),prototype=document.querySelector('#prototype'),panel=document.querySelector('#settings-panel'),toggle=document.querySelector('#settings-toggle');let width=393,height=852;
function fit(){const scale=Math.min(1,(innerWidth-32)/width,(innerHeight-48)/height);frame.style.width=width+'px';frame.style.height=height+'px';frame.style.transform='scale('+scale+')';space.style.width=width*scale+'px';space.style.height=height*scale+'px';}
function send(action,id){prototype.contentWindow.postMessage({source:'trailer-sandbox',action,id},location.origin);}
toggle.onclick=()=>{panel.hidden=!panel.hidden;toggle.setAttribute('aria-expanded',String(!panel.hidden));};
document.querySelector('#device').onchange=e=>{[width,height]=e.target.value.split(',').map(Number);fit();};
document.querySelector('#title').onchange=e=>send('title',Number(e.target.value));
for(const name of ['status','island','home'])document.querySelector('#'+name+'-toggle').onchange=e=>frame.classList.toggle('no-'+name,!e.target.checked);
document.querySelector('#replay').onclick=()=>send('restart',Number(document.querySelector('#title').value));
prototype.onload=()=>send('title',Number(document.querySelector('#title').value));
addEventListener('resize',fit);addEventListener('keydown',e=>{if(e.key==='Escape'){panel.hidden=true;toggle.setAttribute('aria-expanded','false');}});fit();
