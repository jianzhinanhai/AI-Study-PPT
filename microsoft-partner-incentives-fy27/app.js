document.querySelectorAll('.decision-btn').forEach(btn=>btn.addEventListener('click',()=>{
      document.querySelectorAll('.decision-btn').forEach(b=>b.classList.remove('active'));btn.classList.add('active');renderDecision(btn.dataset.decision);
    }));
    renderDecision('delivery');

    let currentRate='security', currentMarket='B';

    function fmt(v){if(typeof v==='number')return '$'+v.toLocaleString('en-US');return v;}
    function renderRate(){
      const d=rateData[currentRate];
      const switcher=document.getElementById('marketSwitch');
      switcher.style.display=['security','azure','cooprate'].includes(currentRate)?'flex':'none';
      if(currentRate==='azure' && currentMarket==='C'){currentMarket='B';document.querySelectorAll('.market-btn').forEach(b=>b.classList.toggle('active',b.dataset.market==='B'));}
      document.querySelector('[data-market="C"]').style.display=currentRate==='azure'?'none':'inline-block';
      let html=`<div class="rate-summary"><div class="summary-card"><b>当前模块</b><strong>${d.title}</strong><div style="font-size:12px;color:var(--muted);margin-top:4px">${d.description}</div></div>`;
      d.highlight.forEach(x=>html+=`<div class="summary-card"><b>关键点</b><strong>${x}</strong></div>`); html+='</div>';
      d.groups.forEach(g=>{
        let columns=[...g.columns], rows=g.rows;
        if(!g.marketIndependent && ['security'].includes(currentRate)){
          const marketIdx={A:2,B:3,C:4}[currentMarket];
          columns=[columns[0],columns[1],`Market ${currentMarket}`,columns[5]];
          rows=rows.map(r=>[r[0],r[1],r[marketIdx],r[5]]);
        } else if(!g.marketIndependent && currentRate==='azure' && g.name==='Pre-sales'){
          const idx=currentMarket==='A'?2:3;columns=[columns[0],columns[1],`Market ${currentMarket}`,columns[4]];rows=rows.map(r=>[r[0],r[1],r[idx],r[4]]);
        } else if(currentRate==='azure' && g.marketPair){
          const pairIdx=currentMarket==='A'?0:1;
          rows=rows.map(r=>[r[0],...r.slice(1,6).map(v=>String(v).split(' / ')[pairIdx]),r[6]]);
          columns=[columns[0],...columns.slice(1,6).map(c=>`${c} · Market ${currentMarket}`),columns[6]];
        } else if(!g.marketIndependent && currentRate==='cooprate' && g.name==='人员 / 资源最高报销费率'){
          const idx={A:1,B:2,C:3}[currentMarket];
          columns=[columns[0],`Market ${currentMarket}`];
          rows=rows.map(r=>[r[0],r[idx]]);
        }
        html+=`<h3 style="margin:20px 0 9px;font-size:16px">${g.name}</h3><div class="mobile-scroll-hint">左右滑动查看完整表格</div><div class="table-wrap"><table><thead><tr>${columns.map(c=>`<th>${c}</th>`).join('')}</tr></thead><tbody>`;
        rows.forEach(r=>{html+='<tr>'+r.map((c,i)=>`<td class="${typeof c==='number'||String(c).startsWith('$')||String(c).endsWith('%')?'money':''} ${i===r.length-1?'note':''}">${fmt(c)}</td>`).join('')+'</tr>';});
        html+='</tbody></table></div>';
      });
      html+=`<div class="rate-foot"><span class="tag orange">注意</span><span>收入、ACR、MAU、MPU、seat 等门槛不是 payout。未显示费率的项目不得用门槛金额代替奖金。</span></div>`;
      document.getElementById('rateContent').innerHTML=html;
    }
    document.querySelectorAll('.tab').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.tab').forEach(b=>b.classList.remove('active'));btn.classList.add('active');currentRate=btn.dataset.rate;renderRate();}));
    document.querySelectorAll('.market-btn').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.market-btn').forEach(b=>b.classList.remove('active'));btn.classList.add('active');currentMarket=btn.dataset.market;renderRate();}));
    renderRate();

    const gates=[
      ['MCI enrolled','协议、税务、银行与收款 profile 完成'],['Partner qualification','授权、designation / specialization 满足'],['Customer / territory eligible','客户类型与授权区域合格'],['Product / transaction eligible','产品、订阅、交易结构与 COCP 合格'],['Size threshold reached','seat / ACR / MAU / MPU 达到门槛'],['Customer consent received','在规定响应窗口内完成同意'],['Delivered within deadline','90 / 120 / 200 / 260 天内交付'],['POE complete','证明、调查、发票与专项证据完整'],['Performance on track','Portfolio rate / ACR / ratio 满足'],['Program cap available','项目预算与 active claim capacity 可用'],['No compliance issue','无重复 claim、欠款、拆单、虚报市场等问题']
    ];
    const gateList=document.getElementById('gateList');
    gates.forEach((g,i)=>{gateList.innerHTML+=`<label class="gate-item"><input type="checkbox" data-gate="${i}"><div><b>${g[0]}</b><span>${g[1]}</span></div></label>`;});
    function updateGates(){const checked=document.querySelectorAll('#gateList input:checked').length,total=gates.length,p=Math.round(checked/total*100);document.getElementById('gatePct').textContent=p+'%';document.getElementById('gateRing').style.background=`conic-gradient(#39A9F9 ${p}%, rgba(255,255,255,.18) ${p}%)`;const title=document.getElementById('gateTitle'),text=document.getElementById('gateText');if(p===100){title.textContent='Eligible for Payment Review';text.textContent='全部硬闸门已通过，可进入审核与 committed revenue 评估。';}else if(p>=70){title.textContent='Conditional Pipeline';text.textContent=`仍有 ${total-checked} 个硬闸门未通过，只能作为概率加权 pipeline。`;}else{title.textContent='Payout Blocked';text.textContent=`仍有 ${total-checked} 个硬闸门未通过，预算不得计入 committed revenue。`;}}
    document.querySelectorAll('#gateList input').forEach(x=>x.addEventListener('change',updateGates));updateGates();

    const sections=[...document.querySelectorAll('main section[id]')];
    const navLinks=[...document.querySelectorAll('#nav a')];
    const mobileNavLinks=[...document.querySelectorAll('#mobileNavLinks a')];
    const observer=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){
      const target='#'+e.target.id;
      navLinks.forEach(a=>a.classList.toggle('active',a.getAttribute('href')===target));
      mobileNavLinks.forEach(a=>a.classList.toggle('active',a.getAttribute('href')===target));
    }})},{rootMargin:'-35% 0px -55% 0px'});sections.forEach(s=>observer.observe(s));

    const menuBtn=document.getElementById('mobileMenuBtn');
    const menuPanel=document.getElementById('mobileNavPanel');
    const menuBackdrop=document.getElementById('mobileNavBackdrop');
    const menuClose=document.getElementById('mobileNavClose');
    function setMobileMenu(open){
      document.body.classList.toggle('menu-open',open);
      menuBtn.setAttribute('aria-expanded',String(open));
      menuPanel.setAttribute('aria-hidden',String(!open));
      menuBackdrop.setAttribute('aria-hidden',String(!open));
      if(open) menuClose.focus(); else menuBtn.focus();
    }
    menuBtn.addEventListener('click',()=>setMobileMenu(true));
    menuClose.addEventListener('click',()=>setMobileMenu(false));
    menuBackdrop.addEventListener('click',()=>setMobileMenu(false));
    mobileNavLinks.forEach(a=>a.addEventListener('click',()=>setMobileMenu(false)));
    document.addEventListener('keydown',e=>{if(e.key==='Escape'&&document.body.classList.contains('menu-open'))setMobileMenu(false)});
    window.addEventListener('resize',()=>{if(innerWidth>860&&document.body.classList.contains('menu-open'))setMobileMenu(false)});

    const backToTop=document.getElementById('backToTop');
    function updateScrollUI(){
      const h=Math.max(document.documentElement.scrollHeight-innerHeight,1);
      document.getElementById('progress').style.width=(scrollY/h*100)+'%';
      backToTop.classList.toggle('visible',scrollY>520);
    }
    window.addEventListener('scroll',updateScrollUI,{passive:true});
    backToTop.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
    updateScrollUI();
