// HTML kartu depan, belakang, dan lembar
const esc=s=>s.replace(/"/g,'%22');
const im=(c,k)=>`<img class="${k}" src="${esc(c.src)}" data-u="${esc(c.src)}" referrerpolicy="no-referrer" alt="" onerror="imgFail(this)">`;
const card=c=>`<div class="card"><div class="corner">${J.icon(c.a)}</div><div class="art ${c.fit} bg-${c.bg}">${c.src?(c.fit==='contain'&&c.bg==='blur'?im(c,'bgimg'):'')+im(c,'fg'):''}</div><div class="corner br">${J.icon(c.b)}</div></div>`;
const back=()=>'<div class="card back"></div>';
const sheet=f=>`<div class="sheet">${S.cards.map(c=>f(c)).join('')}</div>`;

// Gagal muat: coba sekali lewat proxy gambar (wsrv.nl), kalau masih gagal tandai "bad"
function imgFail(i){const u=i.dataset.u;if(!i.dataset.p&&/^https?:/.test(u)){i.dataset.p=1;i.src='https://wsrv.nl/?url='+encodeURIComponent(u);return}i.parentNode.classList.add('bad')}
