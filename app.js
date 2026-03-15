const state = {
  user: null,
  theme: localStorage.getItem('theme') || 'dark',
  route: 'Dashboard',
  toasts: [],
  searchInput: '',
  filters: {}
};

const demo = {
  users: [
    { name: 'Aline Martins', email: 'admin@nexxus.io', role: 'Administrador', status: 'Ativo', last: 'Agora' },
    { name: 'Bruno Sales', email: 'analista@nexxus.io', role: 'Analista', status: 'Ativo', last: '5 min' },
    { name: 'Carla Rocha', email: 'comercial@nexxus.io', role: 'Comercial', status: 'Ativo', last: '12 min' }
  ],
  searches: ['brinco feminino', 'colar prata 925', 'carteira feminina', 'pulseira aço inox', 'kit semijoias femininas'].map((k, i) => ({ name: `Pesquisa ${i + 1}`, keyword: k, platform: i % 2 ? 'Mercado Livre' : 'Shopee', category: 'Acessórios', price: '30-220', results: 110 - i * 12, user: 'Bruno Sales', date: `2026-03-1${i} 10:${i}0` })),
  listings: Array.from({ length: 8 }).map((_, i) => ({
    platform: i % 2 ? 'Mercado Livre' : 'Shopee',
    title: ['Brinco Argola Premium', 'Colar Prata 925 Italiano', 'Carteira Couro Eco', 'Pulseira Aço Inox Minimal'][i % 4],
    price: 39 + i * 17,
    originalPrice: 59 + i * 18,
    store: ['Lux Semijoias', 'Prata Bela', 'Urban Wallet', 'Aço Nobre'][i % 4],
    freeShip: i % 2 === 0,
    sales: `${120 + i * 34} vendas`,
    rep: i % 3 ? 'Alta' : 'Média',
    date: `2026-03-1${i}`,
    score: 28 + i * 9
  })),
  stores: Array.from({ length: 7 }).map((_, i) => ({
    name: ['Lux Semijoias', 'Prata Bela', 'Aço Nobre', 'Donna Acessórios', 'Moda Point', 'Nicho Glam', 'Seller Prime'][i],
    platform: i % 2 ? 'Mercado Livre' : 'Shopee',
    category: 'Acessórios',
    city: ['SP', 'RJ', 'BH', 'Curitiba'][i % 4],
    state: ['SP', 'RJ', 'MG', 'PR'][i % 4],
    reputation: i % 3 ? 'Alta' : 'Excelente',
    listings: 120 + i * 17,
    status: ['Novo', 'Em análise', 'Contatado', 'Parceiro potencial', 'Descartado'][i % 5],
    date: `2026-03-0${i + 1}`
  })),
  opportunities: Array.from({ length: 6 }).map((_, i) => ({
    title: i % 2 ? 'Loja Lux Semijoias' : 'Anúncio Colar Prata 925',
    type: i % 2 ? 'Loja' : 'Anúncio',
    reason: ['preço abaixo da média', 'nicho relevante', 'produto com boa dispersão de preço'][i % 3],
    score: 18 + i * 14,
    status: ['Aberta', 'Em avaliação', 'Aprovada'][i % 3],
    owner: ['Bruno', 'Carla', 'Aline'][i % 3],
    date: `2026-03-1${i}`
  }))
};

const routes = ['Dashboard', 'Busca', 'Resultados', 'Lojas', 'Funil Comercial', 'Oportunidades', 'Histórico de Pesquisas', 'Exportações', 'Usuários', 'Configurações'];

const app = document.getElementById('app');
const toastWrap = document.createElement('div'); toastWrap.className = 'toast-wrap'; document.body.appendChild(toastWrap);

function toast(msg) {
  const el = document.createElement('div'); el.className = 'toast'; el.textContent = msg; toastWrap.appendChild(el);
  setTimeout(() => el.remove(), 2600);
}

function applyTheme() {
  document.body.classList.toggle('light', state.theme === 'light');
}

function loginView() {
  app.innerHTML = `
  <section class="login-screen">
    <form class="login-card" id="loginForm">
      <div class="brand"><div class="logo">N</div><div><strong>Nexxus Scout</strong><div class="small">Inteligência comercial para marketplaces</div></div></div>
      <h2>Bem-vindo de volta</h2>
      <p class="subtitle">Acesse sua central de inteligência comercial</p>
      <label>E-mail</label><input class="input" type="email" id="email" placeholder="voce@empresa.com" />
      <label style="margin-top:.5rem;display:block;">Senha</label><input class="input" type="password" id="password" placeholder="••••••••" />
      <div id="err" class="error" style="min-height:20px;margin-top:.45rem"></div>
      <button class="btn" style="width:100%;margin-top:.3rem">Entrar</button>
      <button type="button" class="btn secondary" style="width:100%;margin-top:.5rem">Esqueci minha senha</button>
    </form>
  </section>`;

  document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const err = document.getElementById('err');
    err.textContent = '';
    if (!email || !password) return (err.textContent = 'E-mail ou senha inválidos');
    err.textContent = 'Entrando no sistema...';
    setTimeout(() => {
      state.user = demo.users.find(u => u.email === email) || demo.users[0];
      toast('Pesquisa concluída com sucesso');
      render();
    }, 750);
  });
}

function shell(content) {
  const kpis = [
    ['Pesquisas hoje', '28'], ['Anúncios monitorados', '1.940'], ['Lojas salvas', '312'], ['Oportunidades', '76'], ['Última atualização', 'há 2 min'], ['Plataformas', 'Mercado Livre + Shopee']
  ];
  return `
  <div class="layout">
    <aside class="sidebar">
      <div class="brand"><div class="logo">N</div><div><strong>Nexxus Scout</strong><div class="small">SaaS Intelligence</div></div></div>
      ${routes.map(r => `<div class="nav-item ${state.route===r?'active':''}" data-route="${r}">${r}</div>`).join('')}
    </aside>
    <main class="content">
      <header class="header">
        <div class="left">
          <input class="input search-global" placeholder="Busca global" value="${state.searchInput}" id="globalSearch" />
          <button class="btn" id="newSearch">Nova pesquisa</button>
        </div>
        <div class="right"><button class="btn ghost" id="themeToggle">${state.theme==='dark'?'Tema claro':'Tema escuro'}</button><span class="badge">${state.user?.name || ''}</span></div>
      </header>
      ${content}
    </main>
  </div>`;
}

function dashboard() {
  return `
  <section class="grid kpis">
    ${[['Pesquisas realizadas hoje','28'],['Anúncios monitorados','1.940'],['Lojas salvas','312'],['Oportunidades identificadas','76'],['Última atualização','há 2 min'],['Plataformas monitoradas','2']].map(k=>`<div class="card"><div class="small">${k[0]}</div><div class="kpi-value">${k[1]}</div></div>`).join('')}
  </section>
  <section class="grid" style="grid-template-columns:2fr 1fr;margin-top:.9rem;">
    <div class="card"><h3 class="section-title">Distribuição de anúncios por plataforma</h3><div class="progress"><span style="width:62%"></span></div><div class="small" style="margin-top:.5rem">Mercado Livre 62% / Shopee 38%</div></div>
    <div class="card"><h3 class="section-title">Top palavras pesquisadas</h3>${demo.searches.slice(0,4).map(s=>`<div class="small">• ${s.keyword}</div>`).join('')}</div>
    <div class="card"><h3 class="section-title">Últimas pesquisas</h3>${demo.searches.slice(0,4).map(s=>`<div class="small">${s.keyword} <span class="badge">${s.results}</span></div>`).join('')}</div>
    <div class="card"><h3 class="section-title">Alertas do sistema</h3><div class="small">Preço abaixo da média detectado em 14 anúncios.</div><div class="small">3 lojas com alta recorrência hoje.</div></div>
  </section>`;
}

function busca() {
  return `<div class="card"><h2 style="margin-top:0">Pesquisa de Mercado</h2><p class="small">Pesquise produtos, anúncios e vendedores estratégicos nos marketplaces monitorados.</p>
  <div class="form-grid">
    <input class="input" placeholder="Palavra-chave" id="keyword" />
    <select id="platform"><option>Mercado Livre</option><option>Shopee</option></select>
    <input class="input" placeholder="Categoria" />
    <input class="input" type="number" placeholder="Preço mínimo" />
    <input class="input" type="number" placeholder="Preço máximo" />
    <input class="input" placeholder="Região / Estado" />
    <select><option>Relevância</option><option>Menor preço</option><option>Maior preço</option></select>
    <input class="input" type="number" placeholder="Qtd. máxima" value="100" />
  </div>
  <div class="toolbar" style="margin-top:.8rem"><button class="btn" id="runSearch">Buscar</button><button class="btn secondary">Limpar filtros</button><button class="btn ghost" id="saveSearch">Salvar pesquisa</button><button class="btn ghost">Carregar pesquisa salva</button></div>
  <div class="small" id="searchMsg">Digite uma palavra-chave para iniciar</div>
  </div>`;
}

function results() {
  return `<div class="card"><div style="display:flex;justify-content:space-between;gap:.5rem;flex-wrap:wrap"><div><strong>Palavra pesquisada:</strong> colar prata 925 <span class="badge">${demo.listings.length} resultados</span></div><div class="toolbar"><button class="btn ghost">Exportar CSV</button><button class="btn ghost">Salvar pesquisa</button><button class="btn">Nova pesquisa</button></div></div>
  <div class="toolbar" style="margin-top:.8rem"><span class="badge">Apenas frete grátis</span><span class="badge">Alta reputação</span><span class="badge">Favoritados</span><span class="badge">Oportunidade</span></div>
  <div class="table-wrap"><table><thead><tr><th>Plataforma</th><th>Título</th><th>Preço atual</th><th>Preço original</th><th>Loja</th><th>Frete</th><th>Vendas</th><th>Reputação</th><th>Data</th><th>Ações</th></tr></thead><tbody>
  ${demo.listings.map(l=>`<tr><td>${l.platform}</td><td>${l.title}</td><td>R$ ${l.price}</td><td>R$ ${l.originalPrice}</td><td>${l.store}</td><td>${l.freeShip?'Sim':'Não'}</td><td>${l.sales}</td><td><span class="badge ${l.rep==='Alta'?'good':'warn'}">${l.rep}</span></td><td>${l.date}</td><td><button class="btn ghost detailBtn">Ver</button></td></tr>`).join('')}
  </tbody></table></div></div>`;
}

function listingDetail() {
  const l = demo.listings[1];
  return `<div class="grid" style="grid-template-columns:1.3fr 1fr;">
    <div class="card"><h3>${l.title}</h3><div class="small">${l.platform} • ${l.date}</div><p><strong>Preço atual:</strong> R$ ${l.price} <span class="badge good">-18% vs média</span></p><p><strong>Loja:</strong> ${l.store} • <span class="badge good">${l.rep}</span></p><div class="toolbar"><button class="btn">Salvar como oportunidade</button><button class="btn secondary">Salvar loja</button><button class="btn ghost">Favoritar</button></div></div>
    <div class="card"><h3 class="section-title">Análise estratégica</h3><div class="small">Preço abaixo da média observada</div><div class="small">Potencial para monitoramento</div><div class="small">Loja estratégica para prospecção</div><div class="progress" style="margin-top:.7rem"><span style="width:74%"></span></div><div class="small">Score de atratividade inicial: 74</div></div>
    <div class="card"><h3 class="section-title">Observações internas</h3><textarea rows="4" placeholder="Registrar nota estratégica..."></textarea></div>
    <div class="card"><h3 class="section-title">Relacionados</h3><div class="small">Anúncios similares e da mesma loja.</div></div>
  </div>`;
}

function lojas() {
  return `<div class="card"><h3 class="section-title">Lojas estratégicas</h3><div class="table-wrap"><table><thead><tr><th>Nome</th><th>Plataforma</th><th>Categoria</th><th>Cidade</th><th>Estado</th><th>Reputação</th><th>Anúncios</th><th>Status</th><th>Data</th></tr></thead><tbody>
  ${demo.stores.map(s=>`<tr><td>${s.name}</td><td>${s.platform}</td><td>${s.category}</td><td>${s.city}</td><td>${s.state}</td><td>${s.reputation}</td><td>${s.listings}</td><td><span class="badge">${s.status}</span></td><td>${s.date}</td></tr>`).join('')}
  </tbody></table></div></div>`;
}

function funnel() {
  const columns = ['Novo', 'Em análise', 'Contatado', 'Parceiro potencial', 'Descartado'];
  return `<div class="kanban">${columns.map(c=>`<div class="kan-col"><strong>${c}</strong>${demo.stores.filter(s=>s.status===c).map(s=>`<div class="kan-item"><div>${s.name}</div><div class="small">${s.platform} • ${s.category}</div><div class="small">Próxima ação: contato comercial</div></div>`).join('') || '<div class="empty">Sem cards</div>'}</div>`).join('')}</div>`;
}

function opportunities() {
  const classify = (s)=> s<=25?'baixa':s<=50?'média':s<=75?'alta':'excelente';
  return `<div class="card"><h3 class="section-title">Oportunidades</h3>${demo.opportunities.map(o=>`<div class="card" style="margin:.55rem 0"><div style="display:flex;justify-content:space-between"><strong>${o.title}</strong><span class="badge">${o.type}</span></div><div class="small">Motivo: ${o.reason} • Responsável: ${o.owner}</div><div class="progress" style="margin:.5rem 0"><span style="width:${o.score}%"></span></div><div class="small">Score ${o.score}/100 (${classify(o.score)})</div></div>`).join('')}</div>`;
}

function history() {
  return `<div class="card"><h3 class="section-title">Histórico de pesquisas</h3><div class="table-wrap"><table><thead><tr><th>Nome</th><th>Palavra-chave</th><th>Plataforma</th><th>Categoria</th><th>Faixa</th><th>Resultados</th><th>Usuário</th><th>Data e hora</th></tr></thead><tbody>
  ${demo.searches.map(s=>`<tr><td>${s.name}</td><td>${s.keyword}</td><td>${s.platform}</td><td>${s.category}</td><td>${s.price}</td><td>${s.results}</td><td>${s.user}</td><td>${s.date}</td></tr>`).join('')}
  </tbody></table></div></div>`;
}

function exportsView() {
  return `<div class="card"><h3 class="section-title">Exportações</h3><div class="form-grid"><select><option>Resultados da busca</option><option>Lojas</option><option>Oportunidades</option><option>Histórico</option></select><input class="input" type="date" /><input class="input" type="date" /><select><option>CSV</option><option>Excel</option></select></div><div class="toolbar" style="margin-top:.8rem"><button class="btn" id="exportBtn">Exportar</button></div><div class="small">Preparando exportação...</div></div>`;
}

function usersView() {
  return `<div class="card"><h3 class="section-title">Usuários</h3><div class="table-wrap"><table><thead><tr><th>Nome</th><th>E-mail</th><th>Perfil</th><th>Status</th><th>Última atividade</th></tr></thead><tbody>
  ${demo.users.map(u=>`<tr><td>${u.name}</td><td>${u.email}</td><td>${u.role}</td><td>${u.status}</td><td>${u.last}</td></tr>`).join('')}
  </tbody></table></div><div class="toolbar" style="margin-top:.8rem"><button class="btn">Criar usuário</button><button class="btn secondary">Redefinir senha</button></div></div>`;
}

function settings() {
  return `<div class="card"><h3 class="section-title">Configurações</h3><div class="toolbar"><span class="badge">Perfil</span><span class="badge">Aparência</span><span class="badge">Sistema</span><span class="badge">Score de oportunidade</span><span class="badge">Integrações futuras</span></div>
  <div class="form-grid"><input class="input" value="${state.user?.name || ''}" /><input class="input" value="${state.user?.email || ''}" /><select><option>Tema escuro</option><option>Tema claro</option></select><input class="input" value="Limite padrão de resultados: 100" /></div>
  <h4>Integrações futuras</h4><div class="small">Mercado Livre Connector • Shopee Connector • CRM • WhatsApp • Rotinas agendadas</div></div>`;
}

function contentForRoute() {
  const map = {
    'Dashboard': dashboard,
    'Busca': busca,
    'Resultados': results,
    'Lojas': lojas,
    'Funil Comercial': funnel,
    'Oportunidades': opportunities,
    'Histórico de Pesquisas': history,
    'Exportações': exportsView,
    'Usuários': usersView,
    'Configurações': settings
  };
  return `${map[state.route]()}${state.route==='Resultados'?listingDetail():''}`;
}

function bindShellEvents() {
  document.querySelectorAll('.nav-item').forEach(item => item.onclick = () => { state.route = item.dataset.route; render(); });
  document.getElementById('themeToggle').onclick = () => { state.theme = state.theme === 'dark' ? 'light' : 'dark'; localStorage.setItem('theme', state.theme); applyTheme(); render(); };
  document.getElementById('newSearch').onclick = () => { state.route = 'Busca'; render(); };
  const run = document.getElementById('runSearch');
  if (run) run.onclick = () => {
    const kw = document.getElementById('keyword').value.trim();
    const msg = document.getElementById('searchMsg');
    if (!kw) return msg.textContent = 'Digite uma palavra-chave para iniciar';
    msg.textContent = 'Buscando resultados...';
    setTimeout(() => { state.route = 'Resultados'; toast('Pesquisa concluída com sucesso'); render(); }, 400);
  };
  const save = document.getElementById('saveSearch');
  if (save) save.onclick = () => toast('Pesquisa salva com sucesso');
  const exportBtn = document.getElementById('exportBtn');
  if (exportBtn) exportBtn.onclick = () => toast('Arquivo gerado com sucesso');
}

function render() {
  applyTheme();
  if (!state.user) return loginView();
  app.innerHTML = shell(contentForRoute());
  bindShellEvents();
}

render();
