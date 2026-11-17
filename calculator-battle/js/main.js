// Pindah layar + mulai
function show(s){$('#setup').hidden=s!=='setup';$('#battle').hidden=s!=='battle';$('#back').hidden=s!=='battle';document.body.classList.toggle('battle',s==='battle');scrollTo(0,0)}
$('#back').addEventListener('click',()=>{drawSetup();show('setup')});
drawSetup();show('setup');
