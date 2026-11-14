// Data 6 kartu + aturan janken (kiri atas != kanan bawah)
const S={cards:[],sel:0,off:{x:0,y:0},allBg:true};
const pick=a=>a[Math.random()*a.length|0];
function rnd(i){const a=pick(J.types),b=pick(J.types.filter(t=>t!==a));Object.assign(S.cards[i],{a,b})}
function rndAll(){ // 6 kombinasi berbeda, urutan diacak
 const all=[];J.types.forEach(a=>J.types.forEach(b=>a!==b&&all.push([a,b])));
 for(let i=all.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[all[i],all[j]]=[all[j],all[i]]}
 S.cards.forEach((c,i)=>{[c.a,c.b]=all[i]})}
function setCorner(i,k,v){const c=S.cards[i],o=k==='a'?'b':'a';if(c[o]===v)c[o]=c[k];c[k]=v} // bentrok → saling tukar
for(let i=0;i<6;i++){S.cards.push({a:'',b:'',src:'',fit:'cover',mode:'upload',bg:'blur'});rnd(i)}
