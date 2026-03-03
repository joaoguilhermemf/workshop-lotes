// workshop-lotes.js
// Hospede esse arquivo no GitHub Pages e chame via <script src="...">

(function() {

  var LOTES = [
    { lote:0, preco:'R$ 19', url:'https://pay.hotmart.com/L104722969X?off=k9mv7hjm&checkoutMode=10', inicio:new Date('2026-03-03T00:00:00'), fim:new Date('2026-03-08T00:00:00'), pct_inicio:5,  pct_fim:20  },
    { lote:1, preco:'R$ 29', url:'https://pay.hotmart.com/L104722969X?off=0dl3xdqh&checkoutMode=10', inicio:new Date('2026-03-08T00:00:00'), fim:new Date('2026-03-11T00:00:00'), pct_inicio:20, pct_fim:55  },
    { lote:2, preco:'R$ 39', url:'https://pay.hotmart.com/L104722969X?off=r19mpn7v&checkoutMode=10', inicio:new Date('2026-03-11T00:00:00'), fim:new Date('2026-03-14T00:00:00'), pct_inicio:55, pct_fim:80  },
    { lote:3, preco:'R$ 49', url:'https://pay.hotmart.com/L104722969X?off=yyio4t2h&checkoutMode=10', inicio:new Date('2026-03-14T00:00:00'), fim:new Date('2026-03-17T00:00:00'), pct_inicio:80, pct_fim:95  },
    { lote:4, preco:'R$ 59', url:'https://pay.hotmart.com/L104722969X?off=tgjo3np3&checkoutMode=10', inicio:new Date('2026-03-17T00:00:00'), fim:new Date('2026-03-20T23:59:00'), pct_inicio:95, pct_fim:106 }
  ];

  function calcularLote() {
    var agora = new Date();
    if (agora < LOTES[0].inicio) return { pct:LOTES[0].pct_inicio, preco:LOTES[0].preco, url:LOTES[0].url, lote:0 };
    if (agora >= LOTES[LOTES.length-1].fim) return { pct:106, preco:LOTES[LOTES.length-1].preco, url:LOTES[LOTES.length-1].url, encerrado:true };
    for (var i=0; i<LOTES.length; i++) {
      var l = LOTES[i];
      if (agora >= l.inicio && agora < l.fim) {
        var pct = l.pct_inicio + (l.pct_fim - l.pct_inicio) * ((agora - l.inicio) / (l.fim - l.inicio));
        return { pct:Math.round(pct), preco:l.preco, url:l.url, lote:l.lote };
      }
    }
    return { pct:5, preco:LOTES[0].preco, url:LOTES[0].url, lote:0 };
  }

  function atualizar() {
    var r = calcularLote();
    var enc = r.encerrado || false;
    var btnTxt = enc ? 'Ingressos esgotados' : 'Comprar ingresso | Lote 0' + r.lote;
    var lbl = enc ? '<strong>Ingressos esgotados.</strong>' : '<strong>' + r.pct + '%</strong> dos ingressos vendidos a ' + r.preco;
    var pn = r.preco ? r.preco.replace('R$ ','') : '19';

    var hf=document.getElementById('hero-progress-fill'),   hl=document.getElementById('hero-progress-label'),
        hc=document.getElementById('hero-cta-btn'),         hp=document.querySelector('#hero-price .hp-current');
    if(hf) hf.style.width=r.pct+'%'; if(hl) hl.innerHTML=lbl;
    if(hc){hc.textContent=btnTxt;hc.href='#comprar';} if(hp) hp.textContent='POR '+r.preco;

    var tf=document.getElementById('ticket-progress-fill'), tl=document.getElementById('ticket-progress-label'),
        tc=document.getElementById('ticket-cta'),           ta=document.querySelector('#ticket-price-row .tp-amount'),
        tf2=document.getElementById('ticket-from');
    if(tf) tf.style.width=r.pct+'%'; if(tl) tl.innerHTML=lbl;
    if(tc){tc.textContent=btnTxt;tc.href=r.url;} if(ta) ta.textContent=pn;
    if(tf2) tf2.innerHTML='DE <s>R$ 79,00</s> POR:';

    var sf=document.getElementById('sticky-progress-fill'), sl=document.getElementById('sticky-progress-label'),
        sc=document.getElementById('sticky-cta'),           sp=document.querySelector('#sticky-price .sp-current');
    if(sf) sf.style.width=r.pct+'%'; if(sl) sl.innerHTML=lbl;
    if(sc){sc.textContent=btnTxt;sc.href='#comprar';} if(sp) sp.textContent=r.preco;
  }

  atualizar();
  setInterval(atualizar, 60000);

})();
