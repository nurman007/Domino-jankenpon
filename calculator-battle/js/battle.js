// Layar pertandingan: struktur digambar sekali, update() hanya mengubah angka/status/riwayat
function drawBattle(){
 const img=G.mode==='img',full=document.documentElement.requestFullscreen;
 $('#battle').innerHTML=`<div class="board"><div class="top"><div class="vs">VS</div><p class="tgt">Target: ${G.target} kemenangan</p><div class="champ" id="champ" hidden></div></div>
<div class="sides">${[0,1].map(i=>`<section class="side c${i}${img&&G.p[i].img?' hasimg':''}" id="s${i}" style="${cv(G.p[i])}">${img&&G.p[i].img?`<div class="bgph">${pimg(G.p[i])}</div>`:''}<h2>${h(nm(i))}</h2><div class="num" id="n${i}">0</div><small>dari ${G.target}</small><button class="plus" id="p${i}" data-add="${i}" aria-label="Tambah skor ${h(nm(i))}">+</button><button class="minus" id="m${i}" data-sub="${i}" aria-label="Kurangi skor ${h(nm(i))}">−</button></section>`).join('')}</div>
<div class="bot"><div class="tools"><button data-act="settings">⚙ Pengaturan</button>${full?'<button data-act="fs">⛶ Layar penuh</button>':''}</div><button class="rst" id="rst" data-act="reset">Reset skor</button><h3>Riwayat</h3><ul class="log" id="log"></ul></div></div>`;
 update();
}
function fs(){ // layar penuh + kunci landscape (bisa gagal di WebView, diabaikan)
 if(document.fullscreenElement){document.exitFullscreen();return}
 document.documentElement.requestFullscreen().then(()=>screen.orientation.lock('landscape')).catch(()=>{});
}
function update(){
 const w=win();
 [0,1].forEach(i=>{$('#n'+i).textContent=G.score[i];$('#s'+i).classList.toggle('won',w===i);$('#s'+i).classList.toggle('lost',w>=0&&w!==i);$('#p'+i).disabled=w>=0;$('#m'+i).disabled=!G.score[i]});
 const c=$('#champ');c.hidden=w<0;c.textContent=w<0?'':`🏆 ${nm(w)} menang!`;
 const r=$('#rst');r.textContent=G.armed?'Yakin reset? Tap lagi':'Reset skor';r.classList.toggle('armed',G.armed);
 $('#log').innerHTML=G.log.map(l=>`<li><time>${l.t}</time> ${h(l.m)}</li>`).join('');
}
$('#battle').addEventListener('click',e=>{
 const b=e.target.closest('button');if(!b||b.disabled)return;const d=b.dataset;
 if(d.act==='settings'){$('#back').click();return}
 if(d.act==='fs'){fs();return}
 clearTimeout(G.tm);
 if(d.act==='reset'){ // dua kali tap agar tidak kepencet
  if(G.armed){G.armed=false;reset()}else{G.armed=true;G.tm=setTimeout(()=>{G.armed=false;update()},2500)}
 }else{G.armed=false;if(d.add!=null)add(+d.add,1);else if(d.sub!=null)add(+d.sub,-1)}
 update();
});
