// Data pertandingan + aturan skor
const $=s=>document.querySelector(s);
const h=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const on=x=>x?'on':'';
const G={mode:'simple',target:3,armed:false,score:[0,0],log:[],p:[{name:'Pemain 1',img:'',url:false,x:50,y:50,z:1},{name:'Pemain 2',img:'',url:false,x:50,y:50,z:1}]};
const nm=i=>G.p[i].name.trim()||`Pemain ${i+1}`;
const win=()=>G.score.findIndex(s=>s>=G.target); // -1 = belum ada pemenang
const note=m=>G.log.unshift({t:new Date().toLocaleTimeString('id-ID',{hour12:false}),m});
function start(){G.score=[0,0];G.log=[];note(`Mulai: ${nm(0)} vs ${nm(1)} (target ${G.target} kemenangan)`)}
function add(i,d){
 if(d>0&&win()>=0||d<0&&!G.score[i])return; // + terkunci setelah ada pemenang, − tidak di bawah 0
 G.score[i]+=d;note(`${nm(i)} ${d>0?'+1':'−1'} (${G.score[0]}–${G.score[1]})`);
 if(win()===i)note(`🏆 ${nm(i)} menang!`);
}
function reset(){G.score=[0,0];note('Skor direset (0–0)')}
