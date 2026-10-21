const NAME='K.M. 6.5 NUESTRA SENORA CHILD DEVELOPMENT CENTER';
const seed=()=>({
 settings:{address:'[School address – to be provided]',phone:'[Contact number – to be provided]',email:'[School email – to be provided]',hours:'[Operating hours – to be provided]'},
 teachers:[{id:'T01',name:'Ms. Maria Santos',phone:'0900-000-0001',email:'teacher@demo',cls:'Sunflower',sched:'Morning',active:true},{id:'T02',name:'Ms. Ana Reyes',phone:'0900-000-0002',email:'ana@demo',cls:'Daisy',sched:'Afternoon',active:true}],
 students:[{id:'S001',name:'Liam Dela Cruz',dob:'2021-03-14',cls:'Sunflower',sched:'Morning',teacher:'T01',guardian:'Rosa Dela Cruz',contact:'0900-111-0001',active:true},
  {id:'S002',name:'Mia Garcia',dob:'2021-06-02',cls:'Sunflower',sched:'Afternoon',teacher:'T01',guardian:'Pedro Garcia',contact:'0900-111-0002',active:true},
  {id:'S003',name:'Noah Lim',dob:'2020-11-21',cls:'Sunflower',sched:'Morning',teacher:'T01',guardian:'Grace Lim',contact:'0900-111-0003',active:true},
  {id:'S004',name:'Ella Cruz',dob:'2021-01-09',cls:'Daisy',sched:'Afternoon',teacher:'T02',guardian:'Ben Cruz',contact:'0900-111-0004',active:true}],
 grades:[{id:1,title:'Number Recognition 1–10',score:'Very Good',fb:'Counts well with objects.',seen:false,ts:''},{id:2,title:'Letter Sounds A–E',score:'Good',fb:'Practice the letter D at home.',seen:false,ts:''}],
 acts:[{id:1,title:'Color Day Drawing',desc:'Draw your favorite colors.',date:'2026-10-26',instr:'Bring crayons.',seen:false},{id:2,title:'Story Circle',desc:'Listen and retell a short story.',date:'2026-10-28',instr:'Read one book at home.',seen:false}],
 assigns:[{id:1,title:'Trace the Letters A–C',instr:'Trace each letter 3 times.',date:'2026-10-20',due:'2026-10-27',notes:'Use a pencil. Sample worksheet: [link]',seen:false}],
 reminders:[{id:1,title:'Printing materials needed',msg:'Please send worksheets fee on or before Oct 30.',date:'2026-10-20',prio:'Important'}],
 events:[{id:1,name:'Parent Meeting',when:'2026-10-30 9:00 AM',desc:'Class progress discussion.'},{id:2,name:'Costume Day',when:'2026-11-05',desc:'Children wear simple costumes.'}],
 expenses:[{id:1,cat:'Food Expenses',desc:'Snack/meal contribution (EXAMPLE)',amt:'Amount to be announced',due:'',status:'Information only'},{id:2,cat:'Printing Materials',desc:'Worksheets (EXAMPLE)',amt:'Amount to be announced',due:'2026-10-30',status:'Information only'},{id:3,cat:'Donations (optional)',desc:'Classroom and event support',amt:'Any amount, optional',due:'',status:'Optional'}],
 announcements:[{id:1,title:'Enrollment reminder',msg:'Ask the school office about available slots.',date:'2026-10-15'}],
 msgs:[],log:['System seeded with sample data']});
let D;try{D=JSON.parse(localStorage.getItem('kmd'))}catch(e){}D=D||seed();
const save=()=>{try{localStorage.setItem('kmd',JSON.stringify(D))}catch(e){}};
let ui={page:'home',role:null,tab:'Overview',q:'',f:'All',pw:false,err:'',pick:'parent',open:null};
const ACC={parent:'parent@demo',teacher:'teacher@demo',admin:'admin@demo'};
const TABS={parent:['Overview','My Child','Grades','Activities','Assignments','Messages','Events','Expenses','Account'],
 teacher:['Overview','My Students','Reminders','Activities','Assignments','Parent Messages','Events','Schedule'],
 admin:['Overview','Students','Teachers','Parent Links','Grades','Activities','Assignments','Announcements','Events','Expenses','Website Settings']};
const $=s=>document.querySelector(s),esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const now=()=>new Date().toLocaleString(),today=()=>new Date().toISOString().slice(0,10);
const me=()=>D.students.find(s=>s.id==='S001'),tch=()=>D.teachers.find(t=>t.id==='T01');
const mine=()=>D.students.filter(s=>s.teacher==='T01'&&s.active);
function toast(t){const e=document.createElement('div');e.className='toast';e.setAttribute('role','status');e.textContent=t;document.body.append(e);setTimeout(()=>e.remove(),2600)}
const seenB=o=>o.seen?`<span class="badge ok">Seen by Parent ${o.ts?'('+esc(o.ts)+')':''}</span>`:'<span class="badge wait">Not Yet Seen</span>';
function kid(c,hat,cls){return `<svg class="kid ${cls}" viewBox="0 0 140 170" aria-hidden="true"><rect x="40" y="80" width="46" height="62" rx="20" fill="${c}"/><circle cx="63" cy="52" r="30" fill="#f4d3b3"/><path d="M33 46q4-28 30-28t30 28q-20-12-60 0z" fill="${hat}"/><circle cx="53" cy="55" r="3" fill="#4a4038"/><circle cx="73" cy="55" r="3" fill="#4a4038"/><path d="M55 66q8 7 16 0" stroke="#4a4038" fill="none" stroke-width="2.5" stroke-linecap="round"/><rect x="48" y="140" width="10" height="24" rx="5" fill="#8a7b6a"/><rect x="68" y="140" width="10" height="24" rx="5" fill="#8a7b6a"/><g class="wave"><rect x="82" y="40" width="12" height="44" rx="6" fill="#f4d3b3" transform="rotate(-30 88 84)"/></g></svg>`}
