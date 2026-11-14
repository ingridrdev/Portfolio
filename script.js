'use strict';
// Este guia funciona no navegador, com respostas locais. Não usa uma API de IA.
const launcher = document.querySelector('#chat-launcher');
const panel = document.querySelector('#assistente');
const closeButton = document.querySelector('#chat-close');
const input = document.querySelector('#chat-input');
const messages = document.querySelector('#chat-messages');
const responses = {
  sobre: { text: 'Ingrid é estudante de Análise e Desenvolvimento de Sistemas, com foco em Dados e BI. Também tem formação em Enfermagem e experiência em organização de informações, conferência de registros e trabalho em equipe.', target: 'sobre' },
  formacao: { text: 'Ingrid cursa ADS na Universidade Veiga de Almeida, com conclusão prevista para dezembro de 2028. É graduada em Enfermagem pela Estácio e possui especializações na área da saúde.', target: 'trajetoria' },
  habilidades: { text: 'Sua base inclui Python, SQL, Pandas, Power BI e Excel. Nos projetos pessoais, trabalha com preparação de dados, consultas, indicadores e dashboards. Também estuda cloud e qualidade de dados.', target: 'habilidades' },
  projetos: { text: 'Conheça o BeautyFinance Analytics, de análise financeira e comercial, e o BankSense, de análise de risco de transações. Ambos são projetos educacionais com dados fictícios e resultados simulados.', target: 'projetos' },
  contato: { text: 'Ingrid busca uma oportunidade de estágio em Dados e BI. Você pode entrar em contato pelo LinkedIn e explorar seus repositórios no GitHub.', target: 'contato' }
};
function setOpen(open) {
  panel.hidden = !open;
  launcher.setAttribute('aria-expanded', String(open));
  if (open) input.focus(); else launcher.focus();
}
function addMessage(text, user = false, target) {
  const bubble = document.createElement('p');
  bubble.className = user ? 'message user' : 'message';
  bubble.textContent = text;
  if (target) {
    const link = document.createElement('a');
    link.href = '#' + target;
    link.textContent = 'Ver seção ↗';
    link.addEventListener('click', () => {
      panel.hidden = true;
      launcher.setAttribute('aria-expanded', 'false');
      const heading = document.querySelector('#' + target + ' h2');
      heading.setAttribute('tabindex', '-1');
      heading.focus({ preventScroll: true });
    });
    bubble.append(link);
  }
  messages.append(bubble);
  // Limita o histórico para manter o guia leve durante conversas longas.
  while (messages.children.length > 30) messages.firstElementChild.remove();
  messages.scrollTop = messages.scrollHeight;
}
function answer(topic) {
  const response = responses[topic];
  addMessage(response.text, false, response.target);
}
launcher.hidden = false;
launcher.addEventListener('click', () => setOpen(panel.hidden));
closeButton.addEventListener('click', () => setOpen(false));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !panel.hidden) setOpen(false);
});
document.querySelectorAll('[data-topic]').forEach(button => {
  button.addEventListener('click', () => {
    addMessage(button.textContent, true);
    answer(button.dataset.topic);
  });
});
document.querySelector('#chat-form').addEventListener('submit', event => {
  event.preventDefault();
  const question = input.value.trim();
  if (!question) return;
  addMessage(question, true);
  input.value = '';
  const normalized = question.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const rules = [
    ['contato', /contato|linkedin|email|e-mail|oportunidade|disponibilidade|estagio|contratar|vaga/],
    ['projetos', /projeto|banksense|beautyfinance|github/],
    ['formacao', /formacao|faculdade|universidade|curso|enfermagem|trajetoria|historia/],
    ['habilidades', /habilidade|python|sql|power bi|excel|pandas|tecnologia|ferramenta|estuda/],
    ['sobre', /quem|sobre|ingrid|ola|oi\b/]
  ];
  const match = rules.find(([, pattern]) => pattern.test(normalized));
  if (match) answer(match[0]);
  else addMessage('Sou um guia com respostas programadas. Posso ajudar com apresentação, formação, habilidades, projetos e contato. Escolha um dos assuntos acima.');
});
