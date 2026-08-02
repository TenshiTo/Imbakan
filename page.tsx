"use client";

import { useMemo, useState } from "react";

type Section = "A" | "B" | "C";
type Question = { lessons:number[]; section:Section; prompt:string; answer:string|string[]; choices:string[]; aliases?:string[] };

const single=(lessons:number[],section:Section,prompt:string,answer:string,wrong:string[],aliases:string[]=[]):Question=>({lessons,section,prompt,answer,choices:[answer,...wrong],aliases});
const multi=(lessons:number[],prompt:string,answer:string[],wrong:string[]):Question=>({lessons,section:"B",prompt,answer,choices:[...answer,...wrong]});

const QUESTIONS:Question[]=[
single([1],"A","What does AAA stand for?","American Accounting Association",["American Institute of Certified Public Accountants","Accounting Standards Council","Board of Accountancy"]),
single([1],"A","What does AICPA stand for?","American Institute of Certified Public Accountants",["American Accounting Association","Association of International CPAs","Philippine Institute of Certified Public Accountants"]),
single([1],"A","What does ASC stand for?","Accounting Standards Council",["American Standards Committee","Accounting Systems Corporation","Auditing Standards Council"]),
single([1],"A","What does PICPA stand for?","Philippine Institute of Certified Public Accountants",["Philippine Institute of Chartered Professional Accountants","Public Institute of Certified Public Accountants","Philippine Insurance Commission of Public Accountants"]),
single([1],"A","What does GAAP stand for?","Generally Accepted Accounting Principles",["Government Accounting and Auditing Practices","Generally Applied Accounting Policies","Global Accounting and Auditing Principles"]),
single([1],"A","What does FRSC stand for?","Financial Reporting Standards Council",["Financial Regulation and Standards Committee","Fiscal Reporting Systems Council","Financial Records Standards Commission"]),
single([1],"A","What does PAS stand for?","Philippine Accounting Standards",["Philippine Auditing Standards","Public Accounting System","Philippine Association of Statisticians"]),
single([1,2],"A","What does CPA stand for?","Certified Public Accountant",["Chartered Public Accountant","Certified Private Auditor","Corporate Public Accountant"]),
single([1],"A","What does CA stand for?","Chartered Accountant",["Certified Accountant","Corporate Auditor","Chief Accountant"]),
single([1],"A","What does BOA stand for?","Board of Accountancy",["Bureau of Accounting","Board of Auditors","Bureau of Accountancy"]),
single([1],"A","What does RA stand for?","Republic Act",["Regulatory Act","Revenue Act","Registered Accountant"]),
single([1],"A","What does IASC stand for?","International Accounting Standards Committee",["International Auditing Standards Council","Institute of Accounting Standards and Compliance","International Association of Standard-Setters"]),
single([1],"A","What does IAS stand for?","International Accounting Standards",["International Auditing Standards","Institute of Accounting Studies","International Association of Standards"]),
single([1],"A","What does IFRS stand for?","International Financial Reporting Standards",["International Financial Regulation System","International Fiscal Reporting Standards","Institute of Financial Reporting Standards"]),
single([1,3],"A","What does SEC stand for?","Securities and Exchange Commission",["Standards and Ethics Commission","Securities and Exchange Council","State Exchange Commission"]),
single([1],"A","What does FASB stand for?","Financial Accounting Standards Board",["Federal Accounting Standards Bureau","Financial Auditing Standards Board","Foreign Accounting Standards Board"]),
single([2],"A","What does AIS stand for?","Accounting Information System",["Auditing Information Standard","Accounting Investment System","Accounting Internal Services"]),
single([2,3],"A","What does BIR stand for?","Bureau of Internal Revenue",["Board of Internal Revenue","Bureau of Income and Revenue","Bureau of Internal Regulation"]),
single([2],"A","What does GOCC stand for?","Government-Owned or Controlled Corporation",["Government Office for Corporate Compliance","General Oversight Committee on Corporations","Government-Operated Commercial Corporation"]),
single([2],"A","What does COA stand for?","Commission on Audit",["Council on Accounting","Commission on Accountancy","Committee on Auditing"]),
multi([1],"Give the four functions/aspects of accounting.",["Recording","Classifying","Summarizing","Interpreting"],["Budgeting","Auditing","Reporting"]),
multi([1],"Give the five descriptions of the nature of accounting.",["Systematic process","Art","Service activity","Information system","Means and not an end"],["Science","Profession","Legal requirement"]),
multi([1],"Give the three functions of accounting in business.",["Stewardship","Informed decisions","Daily operations"],["Tax compliance","Profit maximization","Auditing"]),
multi([1],"Give the five components of a complete set of financial statements under PAS 1.",["Statement of Comprehensive Income","Statement of Changes in Equity","Statement of Financial Position","Statement of Cash Flows","Notes"],["Trial Balance","Statement of Retained Earnings","Management Report"]),
multi([2],"Give the five main professional branches of accounting.",["Public Accounting","Private Accounting","Government Accounting","Accounting Education","Accounting Research"],["Forensic Accounting","International Accounting","Environmental Accounting"]),
multi([2],"Give the three services under public accounting.",["External Auditing","Tax Preparation and Planning Services","Management Advisory Services"],["Internal Auditing","Cost Accounting","Budgeting"]),
multi([2],"Give the six areas under private accounting.",["Financial Accounting","Cost Accounting","Accounting Information System","Budgeting","Tax Accounting","Internal Auditing"],["External Auditing","Forensic Accounting","Government Accounting"]),
multi([2],"Give the four specialized areas for CPAs.",["Forensic Accounting","Information Technology Services","Environmental Accounting","International Accounting"],["Cost Accounting","Public Accounting","Tax Accounting"]),
multi([3],"Give the three internal-user groups.",["Managers/Management","Employees/Labor Unions","Owners"],["Creditors","Suppliers","Regulators"]),
multi([3],"Give the seven external-user groups.",["Creditors and potential creditors","Government/Regulatory Bodies","Potential Investors","Customers","Suppliers","Tax Authorities","Public"],["Management","Owners","Employees"]),
single([1],"C","The process of identifying, measuring, and communicating economic information for informed judgments and decisions.","Accounting, according to AAA",["Bookkeeping","Auditing","The AICPA definition of accounting"],["accounting"]),
single([1],"C","The accounting function that writes transactions chronologically in the books of account.","Recording",["Classifying","Summarizing","Interpreting"]),
single([1],"C","The accounting function that sorts transactions into assets, liabilities, and owner’s equity.","Classifying",["Recording","Summarizing","Interpreting"]),
single([1],"C","The duty of management or owners to report transparently on business performance and standing.","Stewardship function",["Bookkeeping","Fiduciary accounting","Financial reporting"],["stewardship"]),
single([1],"C","The limited function concerned only with recording monetary transactions.","Bookkeeping",["Accounting","Auditing","Budgeting"]),
single([1],"C","The statement commonly called the balance sheet.","Statement of Financial Position",["Statement of Comprehensive Income","Statement of Cash Flows","Statement of Changes in Equity"],["balance sheet"]),
single([1],"C","The Father of Accounting.","Luca Pacioli",["Benedetto Cotrugli","Wang Mang","Matthew"],["pacioli"]),
single([1],"C","The person credited with the original idea of double-entry bookkeeping.","Benedetto Cotrugli",["Luca Pacioli","Dr. Gunter Dreyer","Zaccheus"],["cotrugli"]),
single([1],"C","The 1494 work that described bookkeeping and the accounting cycle.","Summa de Arithmetica, Geometrica, Proportioni et Proportionalita",["Particularis de Computis et Scripturiz","Della Mercatura et del Mercante Perfetto","The Statute of Westminster"],["summa de arithmetica","summa"]),
single([1],"C","The law that created the Philippine Board of Accountancy in 1923.","RA 3105",["RA 5166","The first Philippine income tax law (1913)","The Statute of Westminster"],["republic act 3105","ra3105"]),
single([2],"C","The branch that examines financial statements and issues an independent opinion.","External Auditing",["Internal Auditing","Tax Preparation and Planning","Management Advisory Services"]),
single([2],"C","The branch that accumulates manufacturing costs and determines inventory cost.","Cost Accounting",["Financial Accounting","Budgeting","Tax Accounting"]),
single([2],"C","The branch that collects and processes transaction data and designs manual or computerized systems.","Accounting Information System (AIS)",["Cost Accounting","Budgeting","Internal Auditing"],["ais","accounting information system"]),
single([2],"C","The branch that checks compliance with management policies and evaluates efficiency.","Internal Auditing",["External Auditing","Forensic Accounting","Government Accounting"]),
single([2],"C","The specialized field that investigates white-collar crime and may provide expert testimony.","Forensic Accounting",["Internal Auditing","International Accounting","Environmental Accounting"]),
single([3],"C","Users inside the reporting entity who manage daily operations.","Internal Users",["External Users","Direct Users","Indirect Users"]),
single([3],"C","Users outside the company whose decisions may significantly affect the business.","External Users",["Internal Users","Direct Users","Indirect Users"]),
single([3],"C","The management level composed of supervisors and team leaders.","Lower-level Management",["Top-level Management","Middle-level Management","Executive Management"],["lower level","lower-level"]),
single([3],"C","External users who assess creditworthiness and ability to pay obligations.","Creditors and Potential Creditors",["Suppliers","Tax Authorities","Potential Investors"],["creditors"]),
single([3],"C","External users who check tax-return credibility and correct tax payment.","Tax Authorities",["Government/Regulatory Bodies","Creditors","Public"]),
single([3],"C","Users who assess whether a supplier will remain stable and honor warranties.","Customers",["Suppliers","Creditors","Public"]),
single([3],"C","Users who represent direct users and protect their interests.","Indirect Users",["Direct Users","External Users","Internal Users"]),
single([3],"C","The regulatory body that oversees securities disclosures in the Philippines.","Securities and Exchange Commission (SEC)",["Bangko Sentral ng Pilipinas (BSP)","Bureau of Internal Revenue (BIR)","Commission on Audit (COA)"],["sec","securities and exchange commission"]),
single([3],"C","The government agency that collects taxes in the Philippines.","Bureau of Internal Revenue (BIR)",["Securities and Exchange Commission (SEC)","Commission on Audit (COA)","Department of Budget and Management (DBM)"],["bir","bureau of internal revenue"]),
single([2],"C","The branch responsible for training future accountants.","Accounting Education",["Accounting Research","Public Accounting","Private Accounting"]),
];

const labels={A:"Abbreviations",B:"Enumeration",C:"Identification"};
const stop=new Set(["the","a","an","of","and","or","in","to","for","on","as","is","are","its","that"]);
const norm=(s:string)=>s.toLowerCase().replace(/[()]/g," ").replace(/[^a-z0-9\s/-]/g,"").replace(/\s+/g," ").trim();
const fuzzy=(u:string,t:string)=>{const uw=norm(u).split(/[\s/-]+/).filter(w=>w.length>1&&!stop.has(w)); const tw=norm(t).split(/[\s/-]+/).filter(w=>w.length>1&&!stop.has(w)); return !!u.trim()&&(norm(u)===norm(t)||tw.filter(w=>uw.includes(w)).length/Math.max(1,tw.length)>=.65)};
const shuffled=<T,>(a:T[])=>a.map(v=>({v,r:Math.random()})).sort((x,y)=>x.r-y.r).map(x=>x.v);

export default function Home(){
 const [lesson,setLesson]=useState(1); const [mode,setMode]=useState<"typed"|"mcq">("typed"); const [stage,setStage]=useState<"intro"|"quiz"|"results">("intro");
 const pool=useMemo(()=>QUESTIONS.filter(q=>q.lessons.includes(lesson)),[lesson]);
 const [order,setOrder]=useState<Question[]>([]); const [at,setAt]=useState(0); const [answers,setAnswers]=useState<{value:string|string[];checked:boolean;correct:boolean}[]>([]); const [review,setReview]=useState(false); const [filter,setFilter]=useState("all");
 const start=()=>{const o=shuffled(pool);setOrder(o);setAnswers(o.map(()=>({value:mode==="typed"?"":[],checked:false,correct:false})));setAt(0);setReview(false);setStage("quiz")};
 const q=order[at], state=answers[at]; const score=answers.filter(a=>a.correct).length;
 const update=(value:string|string[])=>setAnswers(a=>a.map((x,i)=>i===at?{...x,value}:x));
 const check=()=>{if(!q||!state)return; let ok=false; if(mode==="mcq"){const v=state.value as string[]; const ca=Array.isArray(q.answer)?q.answer:[q.answer]; ok=v.length===ca.length&&ca.every(x=>v.includes(x));} else if(Array.isArray(q.answer)){const parts=(state.value as string).split(/[,;\n]+/).map(x=>x.trim()).filter(Boolean); ok=q.answer.every(x=>parts.some(p=>fuzzy(p,x)));} else {ok=fuzzy(state.value as string,q.answer)||(q.aliases||[]).some(a=>fuzzy(state.value as string,a));} setAnswers(a=>a.map((x,i)=>i===at?{...x,checked:true,correct:ok}:x));};
 const next=()=>at<order.length-1?setAt(at+1):setStage("results");
 const selectChoice=(c:string)=>{if(state.checked)return; if(Array.isArray(q.answer)){const v=state.value as string[];update(v.includes(c)?v.filter(x=>x!==c):[...v,c])}else update([c])};
 const counts=[1,2,3].map(l=>QUESTIONS.filter(q=>q.lessons.includes(l)).length);
 const lessonTitle=lesson===1?"Basic Accounting Environment":lesson===2?"Branches of Accounting":"Users of Accounting Information";
 return <main className="wrap">
  <header className="masthead"><p className="eyebrow">Lessons 1–3 · Practice Quiz</p><h1>Fundamentals of Accounting</h1><p className="subtitle">Work through one lesson at a time. Every question is filed under the lesson where the topic appears.</p></header>
  {stage==="intro"&&<section className="card">
   <p className="field-label">Choose your lesson</p><div className="lesson-grid">{[1,2,3].map((l,i)=><button key={l} className={`lesson-card ${lesson===l?"active":""}`} onClick={()=>setLesson(l)}><span className="lesson-no">Lesson {l}</span><strong>{l===1?"Basic Accounting Environment":l===2?"Branches of Accounting":"Users of Accounting Information"}</strong><small>{counts[i]} questions</small></button>)}</div>
   <div className="cover-stats"><div className="stat"><span className="num">{pool.length}</span><span className="label">Questions</span></div><div className="stat"><span className="num">3</span><span className="label">Parts</span></div><div className="stat"><span className="num">~{Math.max(5,Math.round(pool.length*.3))}</span><span className="label">Minutes</span></div></div>
   <p className="selection-copy"><b>Selected:</b> Lesson {lesson} — {lessonTitle}</p>
   <p className="field-label">Answer format</p><div className="segmented"><button className={mode==="typed"?"active":""} onClick={()=>setMode("typed")}>Type the answer</button><button className={mode==="mcq"?"active":""} onClick={()=>setMode("mcq")}>Multiple choice</button></div>
   <p className="mode-desc">{mode==="typed"?"Fill in each answer yourself. Wording, common abbreviations, and minor variations are accepted.":"Choose from the available answers — best for a quicker first pass."}</p><button className="btn" onClick={start}>Start Lesson {lesson}</button>
  </section>}
  {stage==="quiz"&&q&&state&&<section className="card">
   <div className="progress-row"><span className="progress-label">Q{at+1} / {order.length}</span><div className="progress-track"><div className="progress-fill" style={{width:`${((at+(state.checked?1:0))/order.length)*100}%`}}/></div><span className="progress-label">Score {score}</span></div>
   <div className="q-meta"><span className={`q-tag s${q.section}`}>Part {q.section} · {labels[q.section]}</span><span className="lesson-pill">Lesson {lesson}</span></div><p className="q-prompt">{q.prompt}</p>
   {mode==="typed"?(Array.isArray(q.answer)?<textarea className="type-input" value={state.value as string} disabled={state.checked} placeholder={`Type all ${q.answer.length} items, separated by commas`} onChange={e=>update(e.target.value)}/>:<input className="type-input" value={state.value as string} disabled={state.checked} placeholder="Type your answer…" onChange={e=>update(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&(state.value as string).trim())check()}}/>):<div className="options">{shuffled(q.choices).map(c=>{const selected=(state.value as string[]).includes(c);const right=(Array.isArray(q.answer)?q.answer:[q.answer]).includes(c);return <button key={c} disabled={state.checked} className={`option ${selected?"selected":""} ${state.checked&&right?"correct":""} ${state.checked&&selected&&!right?"incorrect":""}`} onClick={()=>selectChoice(c)}><span className="mark">✓</span><span>{c}</span></button>})}</div>}
   {state.checked&&<div className={`feedback show ${state.correct?"":"bad"}`}><b>{state.correct?"Correct.":"Not quite."}</b>{!state.correct&&<> Correct answer: {Array.isArray(q.answer)?q.answer.join(", "):q.answer}</>}</div>}
   <div className="nav-row"><button className="btn secondary" disabled={at===0} onClick={()=>setAt(at-1)}>Previous</button>{!state.checked?<button className="btn" disabled={Array.isArray(state.value)?state.value.length===0:!state.value.trim()} onClick={check}>Check answer</button>:<button className="btn" onClick={next}>{at===order.length-1?"See results":"Next question"}</button>}</div>
  </section>}
  {stage==="results"&&<section className="card"><div className="score-hero"><p className="eyebrow centered">Lesson {lesson} · Trial balance</p><div className="score-big">{score}<span>/{order.length}</span></div><p>{Math.round(score/order.length*100)}% correct</p><h2>{score===order.length?"Books balanced — perfect score.":score/order.length>=.7?"Solid ledger — review the missed entries.":"Re-open the lesson and try another pass."}</h2></div>
   <div className="btn-row center"><button className="btn" onClick={start}>Retry Lesson {lesson}</button><button className="btn secondary" onClick={()=>{setStage("intro");setReview(false)}}>Choose another lesson</button><button className="btn secondary" onClick={()=>setReview(!review)}>{review?"Hide":"Review"} answers</button></div>
   {review&&<><div className="filter-row">{["all","wrong","A","B","C"].map(f=><button key={f} className={`chip ${filter===f?"active":""}`} onClick={()=>setFilter(f)}>{f==="all"?"All":f==="wrong"?"Missed only":`Part ${f}`}</button>)}</div><div className="review-list">{order.map((x,i)=>({x,a:answers[i],i})).filter(o=>filter==="all"||(filter==="wrong"&&!o.a.correct)||o.x.section===filter).map(o=><article key={o.i} className={`review-item ${o.a.correct?"":"wrong"}`}><div className="r-top"><span>Lesson {lesson} · Q{o.i+1}</span><b>{o.a.correct?"Correct":"Missed"}</b></div><p>{o.x.prompt}</p><small><b>Answer:</b> {Array.isArray(o.x.answer)?o.x.answer.join(", "):o.x.answer}</small></article>)}</div></>}
  </section>}
  <footer>Prepared from the Lesson 1–3 Accounting reviewer · Answers stay on this page only.</footer>
 </main>
}
