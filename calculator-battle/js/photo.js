// Foto pemain (kamera / upload / URL) + potongan: titik fokus x,y (%) dan zoom z.
// URL dimuat tanpa Referer, lalu coba proxy gambar bila gagal.
const qs=s=>s.replace(/"/g,'%22');
const cv=p=>`--x:${p.x}%;--y:${p.y}%;--z:${p.z}`;
const pimg=p=>p.img?`<img src="${qs(p.img)}" data-u="${qs(p.img)}" referrerpolicy="no-referrer" draggable="false" alt="" onerror="imgFail(this)">`:'';
function imgFail(i){const u=i.dataset.u;if(!i.dataset.p&&/^https?:/.test(u)){i.dataset.p=1;i.src='https://wsrv.nl/?url='+encodeURIComponent(u);return}i.parentNode.classList.add('bad')}
function setImg(i,s){const p=G.p[i];if(p.img.startsWith('blob:'))URL.revokeObjectURL(p.img);Object.assign(p,{img:s,x:50,y:50,z:1})}
