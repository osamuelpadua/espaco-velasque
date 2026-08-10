(function(){
  var reduz = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var nav=document.getElementById('nav'),prog=document.getElementById('progresso'),barra=document.getElementById('barraMob');
  function aoRolar(){
    var y=window.scrollY,h=document.documentElement.scrollHeight-window.innerHeight;
    nav.classList.toggle('solida',y>60);
    prog.style.width=(h>0?(y/h)*100:0)+'%';
    barra.classList.toggle('on',y>window.innerHeight*0.9);
  }
  window.addEventListener('scroll',aoRolar,{passive:true});aoRolar();

  var alvos=document.querySelectorAll('.rv');
  if('IntersectionObserver' in window && !reduz){
    var obs=new IntersectionObserver(function(es){
      es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('vis');obs.unobserve(e.target)}})
    },{threshold:.12,rootMargin:'0px 0px -8% 0px'});
    alvos.forEach(function(a){obs.observe(a)});
  } else {
    alvos.forEach(function(a){a.classList.add('vis')});
  }

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
  acordeao('#faqLista .faq-item','aberto','.faq-cab','.faq-corpo');
  window.addEventListener('resize',function(){
    document.querySelectorAll('.faq-item.aberto .faq-corpo').forEach(function(c){
      c.style.maxHeight=c.scrollHeight+'px';
    });
  });

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
