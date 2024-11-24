import './style.css';

// Função para adicionar o livro à lista
function adicionarLivro() {
  const titulo = document.getElementById('titulo').value;
  const autor = document.getElementById('autor').value;
  const numeroPaginas = document.getElementById('numeroPaginas').value;
  let isAvailable = document.getElementById('isAvailable').checked; // Estado inicial do livro

  const lista = document.getElementById('listaLivros');
  const livro = document.createElement('li'); 
  
  // Monta o conteúdo do item do livro com o botão e o estado
  livro.innerHTML = `
    <div>
      ${titulo} (${autor}) - ${numeroPaginas} páginas - 
      <span class="status">${isAvailable ? 'Disponível' : 'Indisponível'}</span>
      <button onclick="alterarDisponibilidade(this)" data-available="${isAvailable}">
        ${isAvailable ? 'Emprestar' : 'Devolver'}
      </button>
    </div>
  `;
  
  // Adiciona o item de livro à lista
  lista.appendChild(livro);

  // Limpar campos
  document.getElementById('titulo').value = '';
  document.getElementById('autor').value = '';
  document.getElementById('numeroPaginas').value = '';
  document.getElementById('isAvailable').checked = false;
}

// Função para alternar a disponibilidade do livro
function alterarDisponibilidade(botao) {
  let isAvailable = botao.getAttribute('data-available') === 'true'; // Obtém o valor de isAvailable
  
  // Alterna o estado
  isAvailable = !isAvailable;
  botao.setAttribute('data-available', isAvailable); // Atualiza o atributo data-available

  const statusTexto = botao.parentElement.querySelector('.status');
  statusTexto.textContent = isAvailable ? 'Disponível' : 'Indisponível';
  botao.textContent = isAvailable ? 'Emprestar' : 'Devolver';
}

// Torne a função acessível globalmente
window.adicionarLivro = adicionarLivro;
window.alterarDisponibilidade = alterarDisponibilidade; // Agora a função alterarDisponibilidade é global
