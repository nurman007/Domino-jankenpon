// Panel editor, tab, dan cetak
const q=s=>s.replace(/"/g,'&quot;'),on=x=>x?'on':'';
function pk(c,k){return`<div class="pk">${J.types.map(t=>`<button data-k="${k}" data-v="${t}" class="${on(c[k]===t)}">${J.icon(t)}<span>${J.label[t]}</span></button>`).join('')}</div>`}
const bgUI=c=>`<p>Latar sisa</p><div class="seg">${[['blur','Blur'],['putih','Putih'],['hitam','Hitam']].map(([v,t])=>`<button data-bg="${v}" class="${on(c.bg===v)}">${t}</button>`).join('')}</div><label class="chk"><input type="checkbox" id="all" ${S.allBg?'checked':''}> Terapkan ke semua kartu</label>`;
function drawEdit(){
 const c=S.cards[S.sel];
 const src=c.mode==='upload'?'<input type="file" id="file" accept="image/*">'
  :`<div class="row"><input type="url" id="url" placeholder="https://contoh.com/foto.jpg" value="${q(/^https?:/.test(c.src)?c.src:'')}"><button data-act="load">Muat</button></div><p class="hint">Gagal memuat? Banyak situs memblokir gambarnya dipakai di luar situs mereka. Simpan gambarnya, lalu pakai Upload foto.</p>`;
 $('#edit').innerHTML=`<div class="chips">${S.cards.map((_,i)=>`<button data-sel="${i}" class="${on(i===S.sel)}">${i+1}</button>`).join('')}</div>
<div class="prev">${card(c)}</div>
<h3>Janken kartu ${S.sel+1}</h3><p>Pojok kiri atas</p>${pk(c,'a')}<p>Pojok kanan bawah</p>${pk(c,'b')}
<div class="row"><button data-act="rnd">🎲 Acak kartu ini</button><button data-act="rndAll">🎲 Acak semua (6 kombinasi unik)</button></div>
<h3>Gambar kartu</h3><div class="seg"><button data-mode="upload" class="${on(c.mode==='upload')}">Upload foto</button><button data-mode="url" class="${on(c.mode==='url')}">URL</button></div>${src}
<div class="row"><button data-fit="cover" class="${on(c.fit==='cover')}">Isi penuh</button><button data-fit="contain" class="${on(c.fit==='contain')}">Utuh</button><button data-act="clear">Hapus gambar</button></div>${c.fit==='contain'?bgUI(c):''}`;
}
function refresh(){
 drawEdit();
 $('#sheets').innerHTML=`<div class="box box-front">${sheet(card)}</div><div class="box box-back" style="--ox:${S.off.x}mm;--oy:${S.off.y}mm">${sheet(back)}</div>`;
 $('#calib').innerHTML=[['x','Geser ke kanan'],['y','Geser ke bawah']].map(([a,t])=>`<div><span>${t}: ${S.off[a]} mm</span><button data-off="${a},-0.5">−</button><button data-off="${a},0.5">+</button></div>`).join('');
 fit();
}
function fit(){const k=Math.min(1,(innerWidth-24)/793.7);document.querySelectorAll('.box').forEach(b=>b.style.setProperty('--k',k))}
function setSrc(c,s){if(c.src.startsWith('blob:'))URL.revokeObjectURL(c.src);c.src=s}
function doPrint(m){document.body.classList.add('p-'+m);const done=()=>{document.body.classList.remove('p-'+m);removeEventListener('afterprint',done)};addEventListener('afterprint',done);print()}
document.addEventListener('click',e=>{
 const b=e.target.closest('button');if(!b)return;
 const d=b.dataset,c=S.cards[S.sel];
 if(d.t){document.body.dataset.tab=d.t;document.querySelectorAll('nav button').forEach(x=>x.classList.toggle('on',x===b));scrollTo(0,0);return}
 if(d.p){doPrint(d.p);return}
 if(d.sel!=null)S.sel=+d.sel;
 else if(d.k)setCorner(S.sel,d.k,d.v);
 else if(d.mode)c.mode=d.mode;
 else if(d.fit)c.fit=d.fit;
 else if(d.bg){if(S.allBg)S.cards.forEach(x=>x.bg=d.bg);else c.bg=d.bg}
 else if(d.off){const[a,s]=d.off.split(',');S.off[a]=+(S.off[a]+ +s).toFixed(1)}
 else if(d.act==='rnd')rnd(S.sel);
 else if(d.act==='rndAll')rndAll();
 else if(d.act==='clear')setSrc(c,'');
 else if(d.act==='load'){const u=$('#url').value.trim();if(u)setSrc(c,u)}
 else return;
 refresh();
});
document.addEventListener('change',e=>{
 if(e.target.id==='all'){S.allBg=e.target.checked;return}
 if(e.target.id!=='file'||!e.target.files[0])return;
 setSrc(S.cards[S.sel],URL.createObjectURL(e.target.files[0]));refresh();
});
