// workshop-lotes.js
// Hospede esse arquivo no GitHub Pages e chame via <script src="...">

(function() {

  // ── CONFIGURAÇÃO DOS LOTES ──────────────────────────────
  var LOTES = [
    { lote:1, preco:'R$ 29', url:'https://pay.hotmart.com/I104567019B?off=a4pc1tvn', inicio:new Date('2026-02-23T00:00:00'), fim:new Date('2026-02-26T00:00:00'), pct_inicio:20, pct_fim:55 },
    { lote:2, preco:'R$ 39', url:'https://pay.hotmart.com/I104567019B?off=g8h6flst', inicio:new Date('2026-02-26T00:00:00'), fim:new Date('2026-03-01T00:00:00'), pct_inicio:55, pct_fim:80 },
    { lote:3, preco:'R$ 49', url:'https://pay.hotmart.com/I104567019B?off=758mj6bz', inicio:new Date('2026-03-01T00:00:00'), fim:new Date('2026-03-04T00:00:00'), pct_inicio:80, pct_fim:95 },
    { lote:4, preco:'R$ 59', url:'https://pay.hotmart.com/I104567019B?off=6ixh2oio', inicio:new Date('2026-03-04T00:00:00'), fim:new Date('2026-03-06T23:59:00'), pct_inicio:95, pct_fim:106 }
  ];
  // ───────────────────────────────────────────────────────

  function calcularLote() {
    var agora = new Date();
    if (agora < LOTES[0].inicio) return { pct: LOTES[0].pct_inicio, preco: LOTES[0].preco, url: LOTES[0].url, lote: 1 };
    if (agora >= LOTES[LOTES.length-1].fim) return { pct: 106, preco: LOTES[LOTES.length-1].preco, url: LOTES[LOTES.length-1].url, encerrado: true };
    for (var i = 0; i < LOTES.length; i++) {
      var l = LOTES[i];
      if (agora >= l.inicio && agora < l.fim) {
        var pct = l.pct_inicio + (l.pct_fim - l.pct_inicio) * ((agora - l.inicio) / (l.fim - l.inicio));
        return { pct: Math.round(pct), preco: l.preco, url: l.url, lote: l.lote };
      }
    }
    return { pct: 20, preco: LOTES[0].preco, url: LOTES[0].url, lote: 1 };
  }

  function atualizar() {
    var r = calcularLote();
    var labelTxt = r.encerrado ? 'Ingressos esgotados.' : r.pct + '% dos ingressos vendidos a ' + r.preco;
    var labelHtml = r.encerrado ? '<strong>Ingressos esgotados.</strong>' : '<strong>' + r.pct + '%</strong> dos ingressos vendidos a ' + r.preco;
    var btnTxt = r.encerrado ? 'Ingressos esgotados' : 'Comprar ingresso | Lote 0' + (r.lote || 1);

    // ── HERO ──
    var heroFill  = document.getElementById('hero-progress-fill');
    var heroLabel = document.getElementById('hero-progress-label');
    var heroCta   = document.getElementById('hero-cta-btn');
    var heroPreco = document.querySelector('#hero-price .hp-current');
    var heroFrom  = document.querySelector('#hero-price .hp-from');
    if (heroFill)  heroFill.style.width  = r.pct + '%';
    if (heroLabel) heroLabel.innerHTML   = labelHtml;
    if (heroCta)  { heroCta.textContent = btnTxt; heroCta.href = r.url; }
    if (heroPreco) heroPreco.textContent = 'POR ' + r.preco;
    if (heroFrom)  heroFrom.textContent  = 'DE R$ 79';

    // ── TICKET ──
    var ticketFill   = document.getElementById('ticket-progress-fill');
    var ticketLabel  = document.getElementById('ticket-progress-label');
    var ticketCta    = document.getElementById('ticket-cta');
    var ticketAmount = document.querySelector('#ticket-price-row .tp-amount');
    var ticketFrom   = document.getElementById('ticket-from');
    var precoNum     = r.preco ? r.preco.replace('R$ ','') : '29';
    if (ticketFill)   ticketFill.style.width  = r.pct + '%';
    if (ticketLabel)  ticketLabel.innerHTML   = labelHtml;
    if (ticketCta)   { ticketCta.textContent  = btnTxt; ticketCta.href = r.url; }
    if (ticketAmount) ticketAmount.textContent = precoNum;
    if (ticketFrom)   ticketFrom.innerHTML    = 'DE <s>R$ 79,00</s> POR:';

    // ── STICKY BAR ──
    var stickyFill    = document.getElementById('sticky-progress-fill');
    var stickyLabel   = document.getElementById('sticky-progress-label');
    var stickyCta     = document.getElementById('sticky-cta');
    var stickyPreco   = document.querySelector('#sticky-price .sp-current');
    if (stickyFill)  stickyFill.style.width   = r.pct + '%';
    if (stickyLabel) stickyLabel.innerHTML    = labelHtml;
    if (stickyCta)  { stickyCta.textContent   = btnTxt; stickyCta.href = r.url; }
    if (stickyPreco) stickyPreco.textContent  = r.preco;
  }

  // Roda imediatamente e depois a cada minuto
  atualizar();
  setInterval(atualizar, 60000);

})();
