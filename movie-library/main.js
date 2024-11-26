
class Livro {
  constructor(titulo, autor, numeroPaginas, categorias=[]) {
      this.titulo = titulo;
      this.autor = autor;
      this.numeroPaginas = numeroPaginas;
      this.emprestado = false;
      this.categorias=categorias || []; 
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

  adicionarCategoria(categoria){
    this.categorias.push(categoria);
  }

    exibirCategorias(){
      return this.categorias.map(categoria=>categoria.nome).join(', ');
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

  static listarLivrosPorCategoria(){
    return this.livros.filter(livro=> 
      livro.categorias.some (categoria => categoria.nome === categoriaNome)
    );
  }
}

class Categoria{
constructor(nome){
  this.nome = nome; 
}

exibirCategoria(){
  return `${this.nome}: ${this.descricao}`
}
}

const categoriasDisponiveis = [
  new Categoria('Aventura'),
  new Categoria('Infantil'),
  new Categoria('Ficção científica'),
  new Categoria('Romance')
];

class UI {
  static adicionarLivro(e) {
    e.preventDefault();

    // Captura os valores dos campos do formulário
    const titulo = document.getElementById('titulo').value;
    const autor = document.getElementById('autor').value;
    const numeroPaginas = document.getElementById('numeroPaginas').value;

    // Captura as categorias selecionadas
    const categorias = [];
    document.querySelectorAll('.form-check-input:checked').forEach((checkbox) => {
      categorias.push(checkbox.value);
    });

    // Criação do objeto Livro
    const livro = new Livro(titulo, autor, numeroPaginas);

    // Atribuindo as categorias ao livro
    livro.categorias = categorias;

    // Adiciona o livro à biblioteca
    Biblioteca.adicionarLivro(livro);

    // Limpa os campos e exibe os livros novamente
    UI.limparCampos();
    UI.exibirLivros();
  }

  static limparCampos() {
    document.getElementById('titulo').value = '';
    document.getElementById('autor').value = '';
    document.getElementById('numeroPaginas').value = '';
    // Limpa os checkboxes
    document.querySelectorAll('.form-check-input:checked').forEach((checkbox) => {
      checkbox.checked = false;
    });
  }

  static buscarLivros() {
    // Obter o termo de pesquisa digitado pelo usuário
    const searchTerm = document.getElementById('searchTerm').value.toLowerCase();

    // Filtrar os livros com base no termo de pesquisa (no título ou autor)
    const livrosFiltrados = Biblioteca.listarLivros().filter(livro => {
      return livro.titulo.toLowerCase().includes(searchTerm) || 
             livro.autor.toLowerCase().includes(searchTerm);
    });

    // Exibir os livros filtrados
    UI.exibirLivros(livrosFiltrados);
  }

  static exibirLivros(livros = Biblioteca.listarLivros()) {
    const listaLivros = document.getElementById('listaLivros');
    listaLivros.innerHTML = '';  // Limpa a lista de livros antes de re-renderizar
  
    livros.forEach((livro, index) => {
      const li = document.createElement('li');
      li.className = 'list-group-item d-flex justify-content-between align-items-center';
      li.innerHTML = `
        <div>
          <h5 class="mb-1">${livro.titulo}</h5>
          <small>${livro.autor}</small>
          <p class="mb-1">${livro.numeroPaginas} páginas</p>
          <p class="mb-1">Categoria(s): ${livro.categorias.map(categoria => categoria.nome).join(', ')}</p>
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

    // Captura os valores dos campos do formulário
    const titulo = document.getElementById('titulo').value;
    const autor = document.getElementById('autor').value;
    const numeroPaginas = document.getElementById('numeroPaginas').value;

    const categoriasSelecionadas = []; // Variável para armazenar as categorias selecionadas

    // Iterar sobre todos os checkboxes selecionados
    document.querySelectorAll('.form-check-input:checked').forEach((checkbox) => {
        // Procurar a categoria correspondente ao valor do checkbox
        const categoriaNome = checkbox.value;
    
        // Encontrar a categoria correspondente da lista de categorias disponíveis
        const categoria = categoriasDisponiveis.find(c => c.nome === categoriaNome);
    
        // Se a categoria for encontrada, adicionar ao array de categorias selecionadas
        if (categoria) {
            categoriasSelecionadas.push(categoria);
        }
    });

    // Criação do objeto Livro com as categorias selecionadas
    const livro = new Livro(titulo, autor, numeroPaginas, categoriasSelecionadas);

    // Adiciona o livro à biblioteca
    Biblioteca.adicionarLivro(livro);

    // Limpa os campos do formulário e exibe os livros novamente
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

