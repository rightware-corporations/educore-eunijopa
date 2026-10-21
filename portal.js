const roles = {
  student: {
    label: 'Aluno',
    greeting: 'O seu percurso, organizado num só lugar.',
    stats: [['8','Disciplinas'],['92%','Presenças'],['3','Próximas tarefas'],['14.6','Média demo']],
    list: ['Matemática · exercício de consolidação','Português · leitura orientada','Agenda · actividade extracurricular']
  },
  guardian: {
    label: 'Encarregado',
    greeting: 'Acompanhe o percurso do seu educando com clareza.',
    stats: [['2','Educandos'],['92%','Presenças'],['1','Aviso novo'],['3','Próximos eventos']],
    list: ['Resumo semanal do educando','Próxima reunião escolar','Documento disponível para consulta']
  },
  teacher: {
    label: 'Professor',
    greeting: 'Turmas, avaliações e acompanhamento em contexto.',
    stats: [['4','Turmas'],['86','Alunos'],['2','Avaliações'],['5','Pendências']],
    list: ['Registar presenças da turma','Lançar notas da avaliação','Publicar material de apoio']
  },
  pedagogy: {
    label: 'Pedagogia',
    greeting: 'Coordenação académica com visão de conjunto.',
    stats: [['12','Turmas'],['18','Professores'],['4','Alertas'],['3','Aprovações']],
    list: ['Rever mapa de assiduidade','Validar plano de avaliação','Acompanhar turmas sinalizadas']
  },
  executive: {
    label: 'Direcção',
    greeting: 'Indicadores essenciais para decisões rápidas.',
    stats: [['284','Alunos'],['18','Professores'],['94%','Assiduidade'],['7','Indicadores']],
    list: ['Resumo académico mensal','Situação de inscrições','Relatório de actividade escolar']
  },
  secretary: {
    label: 'Secretaria',
    greeting: 'Matrículas, alunos e documentos num fluxo simples.',
    stats: [['21','Inscrições'],['9','Pendentes'],['6','Documentos'],['12','Turmas']],
    list: ['Rever candidatura pendente','Emitir declaração escolar','Actualizar processo do aluno']
  },
  finance: {
    label: 'Finanças',
    greeting: 'Tesouraria e pagamentos com melhor visibilidade.',
    stats: [['24','Pagamentos'],['5','Pendentes'],['92%','Regularidade'],['8','Recibos']],
    list: ['Validar pagamento recebido','Emitir recibos do dia','Rever mapa de regularidade']
  }
};

let selectedRole = 'student';
const roleCards = document.querySelectorAll('[data-role]');
const enterButton = document.querySelector('[data-enter]');
const loginPanel = document.querySelector('[data-login-panel]');
const brandPanel = document.querySelector('.portal-brand-panel');
const dashboard = document.querySelector('[data-dashboard]');

function selectRole(role) {
  selectedRole = role;
  roleCards.forEach((card) => card.classList.toggle('selected', card.dataset.role === role));
  enterButton.textContent = `Entrar como ${roles[role].label}`;
}
roleCards.forEach((card) => card.addEventListener('click', () => selectRole(card.dataset.role)));

enterButton.addEventListener('click', () => {
  const data = roles[selectedRole];
  loginPanel.hidden = true;
  brandPanel.hidden = true;
  dashboard.hidden = false;
  document.querySelector('[data-role-kicker]').textContent = data.label;
  document.querySelector('[data-role-title]').textContent = 'Visão geral';
  document.querySelector('[data-demo-greeting]').textContent = data.greeting;
  document.querySelector('[data-demo-stats]').innerHTML = data.stats.map(([value,label]) => `<article><strong>${value}</strong><span>${label}</span></article>`).join('');
  document.querySelector('[data-demo-list]').innerHTML = data.list.map((item, index) => `<div><span>${String(index + 1).padStart(2,'0')}</span><p>${item}</p><b>→</b></div>`).join('');
  window.scrollTo({ top: 0, behavior: 'auto' });
});
