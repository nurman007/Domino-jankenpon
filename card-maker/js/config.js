// Konstanta + ikon janken (PNG dari ../assets, fallback SVG)
const $=s=>document.querySelector(s);
const J={
 types:['gunting','batu','kertas'],png:{},
 label:{gunting:'Gunting',batu:'Batu',kertas:'Kertas'},
 svg:{
  batu:'<path d="M14 42 24 18l20-6 18 10 6 22-14 18H28z" fill="#9aa5b1" stroke="#33414e" stroke-width="4" stroke-linejoin="round"/>',
  kertas:'<rect x="16" y="10" width="48" height="60" rx="4" fill="#fff" stroke="#33414e" stroke-width="4"/><path d="M26 28h28M26 40h28M26 52h18" stroke="#33414e" stroke-width="4" stroke-linecap="round"/>',
  gunting:'<path d="M22 10l36 44M58 10L22 54" stroke="#33414e" stroke-width="6" stroke-linecap="round"/><circle cx="24" cy="64" r="9" fill="none" stroke="#e5484d" stroke-width="5"/><circle cx="56" cy="64" r="9" fill="none" stroke="#e5484d" stroke-width="5"/>'},
 icon(t){return J.png[t]?`<img src="../assets/${t}.png" alt="${J.label[t]}">`:`<svg viewBox="0 0 80 80">${J.svg[t]}</svg>`},
 probe(){return Promise.all(J.types.map(t=>new Promise(r=>{const i=new Image();i.onload=()=>r(J.png[t]=true);i.onerror=()=>r(J.png[t]=false);i.src=`../assets/${t}.png`})))}
};
