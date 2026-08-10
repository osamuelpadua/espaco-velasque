(function(){
  var reduz = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- nav + progresso + barra mobile ---- */
  var nav=document.getElementById('nav'),prog=document.getElementById('progresso'),barra=document.getElementById('barraMob');
  function aoRolar(){
    var y=window.scrollY,h=document.documentElement.scrollHeight-window.innerHeight;
    nav.classList.toggle('solida',y>60);
    prog.style.width=(h>0?(y/h)*100:0)+'%';
    barra.classList.toggle('on',y>window.innerHeight*0.9);
  }
  window.addEventListener('scroll',aoRolar,{passive:true});aoRolar();

  /* ---- reveal ---- */
  var alvos=document.querySelectorAll('.rv');
  if('IntersectionObserver' in window && !reduz){
    var obs=new IntersectionObserver(function(es){
      es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('vis');obs.unobserve(e.target)}})
    },{threshold:.12,rootMargin:'0px 0px -8% 0px'});
    alvos.forEach(function(a){obs.observe(a)});
  } else {
    alvos.forEach(function(a){a.classList.add('vis')});
  }

  /* ---- checklist ---- */
  var itens=document.querySelectorAll('#lista .item-check'),
      anel=document.getElementById('anel'),
      num=document.getElementById('contaNum'),
      txt=document.getElementById('contaTxt'),
      saida=document.getElementById('saida'),
      TOTAL=itens.length, VOLTA=207;
  function atualiza(){
    var n=0;
    itens.forEach(function(i){if(i.getAttribute('aria-pressed')==='true')n++});
    num.textContent=n;txt.textContent=n;
    anel.style.strokeDashoffset=VOLTA-(VOLTA*(n/TOTAL));
    anel.style.stroke = n>=3 ? '#A8431A' : '#D2652C';
    saida.classList.toggle('ativa',n>=3);
  }
  itens.forEach(function(i){
    i.addEventListener('click',function(){
      i.setAttribute('aria-pressed', i.getAttribute('aria-pressed')==='true'?'false':'true');
      atualiza();
    });
  });
  atualiza();

  /* ---- disco saudável x hérnia ---- */
  var bS=document.getElementById('btnSaudavel'),bH=document.getElementById('btnHernia'),
      cS=document.getElementById('camSaudavel'),cH=document.getElementById('camHernia'),
      leg=document.getElementById('legendaDisco');
  var textos={
    s:'Entre uma vértebra e outra existem discos que ajudam a absorver impacto e distribuir carga.',
    h:'Quando parte do conteúdo do disco se desloca e irrita ou comprime uma raiz nervosa, a dor pode sair da lombar e irradiar para a perna.'
  };
  function mostra(qual){
    var eH = qual==='h';
    cH.classList.toggle('on',eH); cS.classList.toggle('on',!eH);
    bH.classList.toggle('on',eH); bS.classList.toggle('on',!eH);
    bH.setAttribute('aria-pressed',eH); bS.setAttribute('aria-pressed',!eH);
    leg.textContent = eH ? textos.h : textos.s;
    if(eH) acendeTrajeto();
  }
  bS.addEventListener('click',function(){mostra('s')});
  bH.addEventListener('click',function(){mostra('h')});

  /* ---- trajeto da dor ---- */
  var pontos=document.querySelectorAll('#trajeto .trajeto-item');
  function acendeTrajeto(){
    pontos.forEach(function(p,i){
      p.classList.remove('acesa');
      setTimeout(function(){p.classList.add('acesa')}, reduz?0:i*260);
    });
  }
  if('IntersectionObserver' in window){
    var obs2=new IntersectionObserver(function(es){
      es.forEach(function(e){if(e.isIntersecting){acendeTrajeto();obs2.disconnect()}})
    },{threshold:.35});
    if(document.getElementById('trajeto')) obs2.observe(document.getElementById('trajeto'));
  }

  /* ---- acordeões (mitos + faq) ---- */
  function acordeao(seletorItem, classeAberto, seletorCab, seletorCorpo){
    document.querySelectorAll(seletorItem).forEach(function(item){
      var cab=item.querySelector(seletorCab), corpo=item.querySelector(seletorCorpo);
      cab.addEventListener('click',function(){
        var aberto=item.classList.contains(classeAberto);
        document.querySelectorAll(seletorItem).forEach(function(o){
          o.classList.remove(classeAberto);
          o.querySelector(seletorCorpo).style.maxHeight=null;
          o.querySelector(seletorCab).setAttribute('aria-expanded','false');
        });
        if(!aberto){
          item.classList.add(classeAberto);
          corpo.style.maxHeight=corpo.scrollHeight+'px';
          cab.setAttribute('aria-expanded','true');
        }
      });
    });
  }
  acordeao('#mitos .mito','aberto','.mito-cab','.mito-corpo');
  acordeao('#faqLista .faq-item','aberto','.faq-cab','.faq-corpo');
  window.addEventListener('resize',function(){
    document.querySelectorAll('.mito.aberto .mito-corpo, .faq-item.aberto .faq-corpo').forEach(function(c){
      c.style.maxHeight=c.scrollHeight+'px';
    });
  });

  /* ---- passos ---- */
  var passos=document.querySelectorAll('#passos .passo');
  if('IntersectionObserver' in window){
    var obs3=new IntersectionObserver(function(es){
      es.forEach(function(e){if(e.isIntersecting)e.target.classList.add('acesa')})
    },{threshold:.6});
    passos.forEach(function(p){obs3.observe(p)});
  } else {
    passos.forEach(function(p){p.classList.add('acesa')});
  }
})();
