const go=p=>{ui.page=p;ui.err='';render()};
const tbl=(k)=>D[k];
const A={
 go:e=>go(e.dataset.p),pick:e=>{ui.pick=e.dataset.k;ui.err='';render()},fill:e=>{$('#u').value=ACC[ui.pick];$('#p').value='demo123'},
 tab:e=>{ui.tab=e.dataset.t;ui.q='';ui.f='All';render()},
 logout:()=>{ui.role=null;ui.page='login';render();toast('You are logged out')},
 close:closeModal,
 seen:e=>{const o=D[e.dataset.k].find(x=>x.id==e.dataset.i);o.seen=true;o.ts=now();D.log.push('Parent acknowledged: '+(o.title));save();render();toast('Marked as Seen')},
 inquire:()=>openModal('Enrollment inquiry',[['name','Parent name',0,1],['contact','Phone or email',0,1],['msg','Your question','textarea',1]],{},v=>{closeModal();toast('Inquiry noted. In the real site the school office would receive it.')}),
 contact:()=>openModal('Contact Teacher',[['reason','Reason','select:Question or inquiry,Excuse letter,Student absence,Request for clarification,Other concern',1],['date','Relevant date','date'],['text','Your message','textarea',1]],{},v=>{D.msgs.push({id:Date.now(),sid:'S001',reason:v.reason,date:v.date,status:'Awaiting reply',thread:[{from:'Parent',text:v.text,ts:now()}]});D.log.push('Parent message sent');save();closeModal();render();toast('Message sent to the teacher')}),
 reply:e=>openModal('Reply to parent',[['text','Your reply','textarea',1]],{},v=>{const m=D.msgs.find(x=>x.id==e.dataset.i);m.thread.push({from:'Teacher',text:v.text,ts:now()});m.status='Replied';save();closeModal();render();toast('Reply sent')}),
 view:e=>{const s=D.students.find(x=>x.id===e.dataset.i);$('#ov').innerHTML=`<div class="modal"><div class="card"><h2>${esc(s.name)}</h2><p>ID ${s.id} · Born ${s.dob}<br>${esc(s.cls)} · ${s.sched}<br>Guardian: ${esc(s.guardian)} (${esc(s.contact)})</p>${ui.role==='teacher'?`<h3>Progress</h3>${D.grades.map(g=>`<p>${esc(g.title)}: <b>${esc(g.score)}</b></p>`).join('')}`:''}<button class="btn" data-a="close">Close</button></div></div>`},
 add:e=>{const k=e.dataset.k,f=F[k];openModal('Add '+k.replace(/s$/,''),f,{},v=>{if((k==='students'||k==='teachers')&&D[k].some(x=>x.id===v.id))return 'That ID is already used.';const o={...v,id:(k==='students'||k==='teachers')?v.id:Date.now()};if(k==='students'||k==='teachers')o.active=true;if(k==='acts'||k==='assigns'||k==='grades')o.seen=false;D[k].push(o);D.log.push('Added to '+k);save();closeModal();render();toast('Saved')})},
 edit:e=>{const k=e.dataset.k,o=D[k].find(x=>x.id==e.dataset.i);openModal('Edit '+k.replace(/s$/,''),F[k],o,v=>{Object.assign(o,v,{id:o.id});D.log.push('Edited '+k);save();closeModal();render();toast('Changes saved')})},
 del:e=>{if(confirm('Delete this item? This cannot be undone.')){const k=e.dataset.k;const i=D[k].findIndex(x=>x.id==e.dataset.i);if(k==='teachers'){D[k][i].active=false}else D[k].splice(i,1);D.log.push('Removed from '+k);save();render();toast('Done')}},
 deact:e=>{const o=D.students.find(x=>x.id===e.dataset.i);if(confirm(o.active?'Deactivate this student record?':'Permanently remove this record?')){if(o.active)o.active=false;else D.students.splice(D.students.indexOf(o),1);D.log.push('Student record changed');save();render();toast('Done')}},
 reset:()=>{if(confirm('Reset all sample data?')){D=seed();save();ui.tab='Overview';render();toast('Sample data reset')}}};
document.addEventListener('click',e=>{const t=e.target.closest('[data-a]');if(t&&A[t.dataset.a]){e.preventDefault();A[t.dataset.a](t)}});
document.addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target.matches('a[data-a]'))e.target.click()});
document.addEventListener('input',e=>{if(e.target.id==='q'){ui.q=e.target.value;const p=e.target.selectionStart;render();const n=$('#q');n.focus();n.setSelectionRange(p,p)}});
document.addEventListener('change',e=>{if(e.target.id==='ff'){ui.f=e.target.value;render()}if(e.target.id==='sp'){const u=$('#u').value;ui.pw=e.target.checked;render();$('#u').value=u}});
document.addEventListener('submit',e=>{e.preventDefault();const f=e.target;
 if(f.id==='lf'){const u=$('#u').value.trim(),p=$('#p').value;if(!u||!p){ui.err='Please enter your username and password.';return render()}
  const key=u.toLowerCase().replace(/@demo$/,'');if(!ACC[key]||p.trim()!=='demo123'){ui.err='Wrong username or password. Use '+ACC[ui.pick]+' and demo123, or press "Fill in for me".';return render()}
  ui.role=key;ui.tab='Overview';ui.page='dash';ui.err='';render();toast('Welcome!')}
 else if(f.id==='mf'){const v={};f.querySelectorAll('[name]').forEach(i=>v[i.name]=i.value.trim());const miss=ui.open.fields.filter(x=>x[2]===1||x[3]===1).find(x=>!v[x[0]]);
  if(miss)return $('#me').textContent='Please fill in: '+miss[1];const r=ui.open.cb(v);if(typeof r==='string')$('#me').textContent=r}
 else if(f.id==='sf'){f.querySelectorAll('input').forEach(i=>D.settings[i.name]=i.value.trim());save();toast('Changes saved')}});
render();
