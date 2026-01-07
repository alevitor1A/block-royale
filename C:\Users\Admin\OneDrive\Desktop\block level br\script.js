const db = {
    saldo: 0.00,
    videos: 0,
    vip: false,
    historico: []
};

// Carregar dados ao iniciar
document.addEventListener('DOMContentLoaded', () => {
    const salvo = localStorage.getItem('ad_db');
    if(salvo) Object.assign(db, JSON.parse(salvo));
    atualizarUI();
});

function salvar() {
    localStorage.setItem('ad_db', JSON.stringify(db));
    atualizarUI();
}

function atualizarUI() {
    const grana = (v) => v.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
    
    document.getElementById('saldo-header').innerText = grana(db.saldo);
    document.getElementById('saldo-saque').innerText = grana(db.saldo);
    document.getElementById('total-acumulado').innerText = grana(db.saldo);
    document.getElementById('total-videos').innerText = db.videos;

    if(db.vip) {
        document.getElementById('badge-vip').innerText = "CONTA VIP LIBERADA";
        document.getElementById('badge-vip').style.background = "#f59e0b";
        document.getElementById('status-dash').innerText = "Ativo";
    }

    renderizarListas();
}

function navegar(tela) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.sidebar-pc button, .mobile-nav button').forEach(b => b.classList.remove('active'));
    
    document.getElementById(tela).classList.add('active');
    document.getElementById(`btn-pc-${tela}`).classList.add('active');
    document.getElementById(`btn-mob-${tela}`).classList.add('active');
}

let emVideo = false;
function iniciarAnuncio() {
    if(emVideo) return;
    emVideo = true;
    
    const btn = document.getElementById('btn-assistir');
    const bar = document.getElementById('barra-progresso');
    btn.disabled = true;
    btn.innerText = "Carregando...";

    let p = 0;
    const int = setInterval(() => {
        p += 2;
        bar.style.width = p + "%";
        if(p >= 100) {
            clearInterval(int);
            finalizar();
        }
    }, 60);
}

function finalizar() {
    db.saldo += 0.10;
    db.videos++;
    db.historico.unshift({t: 'Ganho', v: 0.10, d: new Date().toLocaleTimeString()});
    if(db.historico.length > 5) db.historico.pop();
    
    emVideo = false;
    document.getElementById('barra-progresso').style.width = "0%";
    document.getElementById('btn-assistir').disabled = false;
    document.getElementById('btn-assistir').innerText = "ASSISTIR ANÚNCIO (+R$ 0,10)";
    
    salvar();
    alert("Você ganhou R$ 0,10!");
}

function renderizarListas() {
    const html = db.historico.map(i => `<li><span>${i.t} - ${i.d}</span><strong>R$ ${i.v.toFixed(2)}</strong></li>`).join('');
    document.getElementById('lista-atividades-dash').innerHTML = html;
    document.getElementById('lista-historico').innerHTML = html;
}

function abrirVip() { document.getElementById('modal-vip').style.display = 'flex'; }
function fecharVip() { document.getElementById('modal-vip').style.display = 'none'; }

function solicitarSaque() {
    if(document.getElementById('input-pix').value.length < 5) return alert("Chave PIX inválida.");
    if(!db.vip) return abrirVip();
    if(db.saldo < 50) return alert("Mínimo R$ 50,00.");
    
    db.historico.unshift({t: 'Saque', v: db.saldo, d: new Date().toLocaleTimeString()});
    db.saldo = 0;
    salvar();
    alert("Saque solicitado!");
}
