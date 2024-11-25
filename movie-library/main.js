
class Livro {
  constructor(titulo, autor, numeroPaginas) {
      this.titulo = titulo;
      this.autor = autor;
      this.numeroPaginas = numeroPaginas;
      this.emprestado = false;
  }

  emprestar() {
      if (!this.emprestado) {
          this.emprestado = true;
          return true;
      }
      return false;
  }

  devolver() {
      if (this.emprestado) {
          this.emprestado = false;
          return true;
      }
      return false;
  }
}

class Biblioteca {
  static livros = [];

  static adicionarLivro(livro) {
      this.livros.push(livro);
  }

  static listarLivros() {
      return this.livros;
  }
}

class UI {
  static exibirLivros() {
      const listaLivros = document.getElementById('listaLivros');
      listaLivros.innerHTML = '';  // Limpar a lista de livros antes de re-renderizar

      Biblioteca.listarLivros().forEach((livro, index) => {
          const li = document.createElement('li');
          li.className = 'list-group-item d-flex justify-content-between align-items-center';
          li.innerHTML = `
              <div>
                  <h5 class="mb-1">${livro.titulo}</h5>
                  <small>${livro.autor}</small>
                  <p class="mb-1">${livro.numeroPaginas} páginas</p>
              </div>
              <button class="btn btn-sm ${livro.emprestado ? 'btn-warning' : 'btn-success'}" 
                      id="btn-toggle-${index}">
                  ${livro.emprestado ? 'Devolver' : 'Emprestar'}
              </button>
          `;
          listaLivros.appendChild(li);

          // Adiciona o evento de clique para cada botão
          const btn = document.getElementById(`btn-toggle-${index}`);
          btn.addEventListener('click', () => UI.toggleEmprestimo(index));  // Atribuindo o evento de clique
      });
  }

  static adicionarLivro(e) {
      e.preventDefault();

      const titulo = document.getElementById('titulo').value;
      const autor = document.getElementById('autor').value;
      const numeroPaginas = document.getElementById('numeroPaginas').value;

      const livro = new Livro(titulo, autor, numeroPaginas);
      Biblioteca.adicionarLivro(livro);

      UI.limparCampos();
      UI.exibirLivros();
  }

  static toggleEmprestimo(index) {
      const livros = Biblioteca.listarLivros();
      const livro = livros[index];
      
      if (livro.emprestado) {
          livro.devolver();
      } else {
          livro.emprestar();
      }

      UI.exibirLivros();  // Atualizar a lista de livros
  }

  static limparCampos() {
      document.getElementById('titulo').value = '';
      document.getElementById('autor').value = '';
      document.getElementById('numeroPaginas').value = '';
  }
}

// Atribui o evento para o formulário
document.getElementById('livroForm').addEventListener('submit', UI.adicionarLivro);

// Exibe os livros ao carregar a página
UI.exibirLivros();
