// Layar pengaturan: mode, nama, foto, target kemenangan
function side(i,img){
 const p=G.p[i];
 const pic=img?`<div class="pic"><div class="crop" data-crop="${i}" style="${cv(p)}">${pimg(p)}</div>${p.img?`<label class="zoom">Zoom<input type="range" min="1" max="3" step="0.05" value="${p.z}" data-zoom="${i}"></label><p class="hint">Geser gambar untuk memilih bagian yang tampil.</p>`:''}<div class="row"><button data-pick="cam" data-i="${i}">Kamera</button><button data-pick="up" data-i="${i}">Upload</button><button data-urlt="${i}" class="${on(p.url)}">URL</button></div></div>`
  +(p.url?`<div class="row"><input type="url" data-url="${i}" placeholder="https://contoh.com/foto.jpg"><button data-load="${i}">Muat</button></div><p class="hint">Gagal memuat? Banyak situs memblokir gambarnya dipakai di luar situs mereka. Simpan gambarnya, lalu pakai Upload.</p>`:'')
  +`<input type="file" accept="image/*" capture="user" hidden data-f="${i}" data-k="cam"><input type="file" accept="image/*" hidden data-f="${i}" data-k="up">`:'';
 return `<section class="pc c${i}"><h3>Pemain ${i+1}</h3><input data-name="${i}" maxlength="20" value="${h(G.p[i].name)}" placeholder="Nama pemain ${i+1}">${pic}</section>`;
}
function drawSetup(){
 const img=G.mode==='img',live=G.log.length>0;
 $('#setup').innerHTML=`<h3>Mode</h3><div class="seg"><button data-mode="simple" class="${on(!img)}">Simple</button><button data-mode="img" class="${on(img)}">Dengan gambar</button></div>
${side(0,img)}${side(1,img)}
<h3>Target kemenangan</h3><input type="number" id="target" min="1" max="99" inputmode="numeric" value="${G.target}">
${live?'<button class="go alt" data-act="resume">Kembali ke pertandingan</button>':''}<button class="go" data-act="start">${live?'Mulai baru (skor 0)':'Mulai'}</button>`;
}
$('#setup').addEventListener('click',e=>{
 const b=e.target.closest('button');if(!b)return;const d=b.dataset;
 if(d.mode){G.mode=d.mode;drawSetup()}
 else if(d.pick)$(`[data-f="${d.i}"][data-k="${d.pick}"]`).click();
 else if(d.urlt!=null){G.p[d.urlt].url=!G.p[d.urlt].url;drawSetup()}
 else if(d.load!=null){const u=$(`[data-url="${d.load}"]`).value.trim();if(u){setImg(+d.load,u);drawSetup()}}
 else if(d.act==='start'){G.target=Math.max(1,Math.min(99,parseInt($('#target').value)||G.target));start();drawBattle();show('battle')}
 else if(d.act==='resume'){drawBattle();show('battle')}
});
$('#setup').addEventListener('input',e=>{const t=e.target;
 if(t.dataset.name!=null)G.p[t.dataset.name].name=t.value;
 else if(t.id==='target'){const v=parseInt(t.value);if(v>0)G.target=Math.min(v,99)}
 else if(t.dataset.zoom!=null){const p=G.p[t.dataset.zoom];p.z=+t.value;$(`[data-crop="${t.dataset.zoom}"]`).style.cssText=cv(p)}
});
$('#setup').addEventListener('change',e=>{const t=e.target,f=t.files&&t.files[0];
 if(t.dataset.f==null||!f)return;setImg(+t.dataset.f,URL.createObjectURL(f));drawSetup();
});
// Geser pratinjau foto = pilih bagian yang tampil (titik fokus). Jarak geser dihitung dari ukuran gambar asli.
let dr=null;
$('#setup').addEventListener('pointerdown',e=>{
 const c=e.target.closest('[data-crop]');if(!c||!c.querySelector('img'))return;
 const p=G.p[c.dataset.crop];dr={c,p,sx:e.clientX,sy:e.clientY,x:p.x,y:p.y};c.setPointerCapture(e.pointerId);
});
$('#setup').addEventListener('pointermove',e=>{
 if(!dr)return;const{c,p}=dr,im=c.querySelector('img'),bw=c.clientWidth,bh=c.clientHeight,nw=im.naturalWidth,nh=im.naturalHeight;
 if(!nw)return;
 const r=Math.max(bw/nw,bh/nh),ox=Math.max(1,p.z*nw*r-bw),oy=Math.max(1,p.z*nh*r-bh);
 p.x=Math.min(100,Math.max(0,dr.x-(e.clientX-dr.sx)/ox*100));
 p.y=Math.min(100,Math.max(0,dr.y-(e.clientY-dr.sy)/oy*100));
 c.style.cssText=cv(p);
});
['pointerup','pointercancel'].forEach(t=>$('#setup').addEventListener(t,()=>{dr=null}));
