(()=>{const e="https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/8CJbUotFazwQ3FpCyxsp/scores",t=e=>e.map((e=>`<li class="list-group-item d-flex justify-content-between align-items-start">${e.user}:${e.score}</li>`)).join(""),n=async e=>{const t=await fetch(e);return await t.json()},s=document.querySelector("#form"),a=document.querySelector("#scoreList"),c=document.querySelector("#refreshBtn"),o=document.querySelector("#name"),r=document.querySelector("#score");s.addEventListener("submit",(async e=>{e.preventDefault();const t={user:o.value,score:r.value};await(async(e,t)=>{const n=await fetch("https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/8CJbUotFazwQ3FpCyxsp/scores",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});return await n.json()})(t),o.value="",r.value=""})),c.addEventListener("click",(async()=>{const s=await n(e);a.innerHTML=t(s.result)})),window.addEventListener("DOMContentLoaded",(async()=>{const s=await n(e);a.innerHTML=t(s.result)}))})();