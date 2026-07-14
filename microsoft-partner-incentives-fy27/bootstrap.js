(async function(){
  const host=document.getElementById('app');
  try{
    const files=["content-1.html", "content-2.html", "content-3.html"];
    const parts=await Promise.all(files.map(async file=>{
      const response=await fetch(file,{cache:'no-cache'});
      if(!response.ok) throw new Error(`Failed to load ${file}: ${response.status}`);
      return response.text();
    }));
    host.className='';
    host.innerHTML=parts.join('');
    for(const src of ['decision-data.js','rate-data.js','app.js']){
      await new Promise((resolve,reject)=>{
        const script=document.createElement('script');
        script.src=src;script.onload=resolve;script.onerror=reject;document.body.appendChild(script);
      });
    }
  }catch(error){
    console.error(error);
    host.className='';
    host.innerHTML='<main class="load-error"><h1>页面加载失败</h1><p>请刷新页面；若问题持续，请检查网络连接。</p></main>';
  }
})();
