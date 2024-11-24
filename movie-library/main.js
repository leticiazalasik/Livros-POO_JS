import './style.css';

function adicionarLivro() {
  const titulo = document.getElementById('titulo').value;
  const autor = document.getElementById('autor').value;

  const lista = document.getElementById('listaLivros');
  const livro = document.createElement('li'); // Corrigi 'livro' para usar uma tag válida (li)

  livro.innerHTML = `
    <div>${titulo} (${autor})</div>
  `;

  lista.appendChild(livro);

  // Limpar campos
  document.getElementById('titulo').value = '';
  document.getElementById('autor').value = '';
}

// Torne a função acessível globalmente
window.adicionarLivro = adicionarLivro;
