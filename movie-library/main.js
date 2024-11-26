class Livro {
  constructor(titulo, autor, numeroPaginas, categorias = []) {
    this.titulo = titulo;
    this.autor = autor;
    this.numeroPaginas = numeroPaginas;
    this.emprestado = false;
    this.categorias = categorias;
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

  adicionarCategoria(categoria) {
    this.categorias.push(categoria);
  }

  exibirCategorias() {
    return this.categorias.map(categoria => categoria.nome).join(', ');
  }
}

class Biblioteca {
  static livros = [];

  static adicionarLivro(livro) {
    this.livros.push(livro);
    console.log('Livro adicionado:', livro); // Log quando um livro é adicionado
  }

  static listarLivros() {
    console.log('Listando todos os livros:', this.livros); // Log ao listar todos os livros
    return this.livros;
  }

  static listarLivrosPorCategoria(categoriaNome) {
    console.log('Filtrando livros pela categoria:', categoriaNome); // Log antes do filtro
    const livrosFiltrados = this.livros.filter(livro =>
      livro.categorias.some(categoria => categoria.nome === categoriaNome)
    );
    console.log('Livros filtrados:', livrosFiltrados); // Log após o filtro
    return livrosFiltrados;
  }
}

class Categoria {
  constructor(nome) {
    this.nome = nome;
  }

  exibirCategoria() {
    return `${this.nome}: ${this.descricao}`;
  }
}

const categoriasDisponiveis = [
  new Categoria('Aventura'),
  new Categoria('Infantil'),
  new Categoria('FiccaoCientifica'),
  new Categoria('Terror'),
  new Categoria('Romance')
];

class UI {
  static adicionarLivro(e) {
    e.preventDefault();

    const titulo = document.getElementById('titulo').value;
    const autor = document.getElementById('autor').value;
    const numeroPaginas = document.getElementById('numeroPaginas').value;

    const categoriasSelecionadas = [];
    document.querySelectorAll('.form-check-input:checked').forEach((checkbox) => {
      const categoriaNome = checkbox.value;
      const categoria = categoriasDisponiveis.find(c => c.nome === categoriaNome);
      if (categoria) {
        categoriasSelecionadas.push(categoria);
      }
    });

    const livro = new Livro(titulo, autor, numeroPaginas, categoriasSelecionadas);
    Biblioteca.adicionarLivro(livro);

    UI.limparCampos();
    UI.exibirLivros();
  }

  static limparCampos() {
    document.getElementById('titulo').value = '';
    document.getElementById('autor').value = '';
    document.getElementById('numeroPaginas').value = '';
    document.querySelectorAll('.form-check-input:checked').forEach((checkbox) => {
      checkbox.checked = false;
    });
  }

  static buscarLivros() {
    const searchTerm = document.getElementById('searchTerm').value.toLowerCase();
    console.log('Termo de busca:', searchTerm); // Log do termo de busca
    const livrosFiltrados = Biblioteca.listarLivros().filter(livro => {
      return livro.titulo.toLowerCase().includes(searchTerm) ||
             livro.autor.toLowerCase().includes(searchTerm);
    });
    console.log('Livros encontrados pela busca:', livrosFiltrados); // Log dos livros encontrados
    UI.exibirLivros(livrosFiltrados);
  }

  static buscarPorCategoria(categoriaSelecionada) {
    console.log(`Buscando livros pela categoria: ${categoriaSelecionada}`);
    const livrosFiltrados = Biblioteca.listarLivrosPorCategoria(categoriaSelecionada);
    console.log(`Livros encontrados: ${livrosFiltrados.length}`); // Log da quantidade de livros encontrados
    UI.exibirLivros(livrosFiltrados);
  }

  static inicializarEventos() {
    console.log('Inicializando eventos de dropdown'); // Log ao inicializar eventos
    document.getElementById('categoriaDropdown').addEventListener('click', function(event) {
      console.log('Dropdown clicado'); // Log ao clicar no dropdown
      if (event.target && event.target.matches('a.dropdown-item')) {
        const categoriaSelecionada = event.target.getAttribute('data-categoria');
        console.log(`Categoria selecionada: ${categoriaSelecionada}`); // Verificando captura do valor
        UI.buscarPorCategoria(categoriaSelecionada);
      } else {
        console.log('Elemento clicado não corresponde ao item de dropdown'); // Log para caso de falha
      }
    });
  }

  static exibirLivros(livros = Biblioteca.listarLivros()) {
    console.log('Exibindo livros:', livros); // Log dos livros exibidos
    const listaLivros = document.getElementById('listaLivros');
    listaLivros.innerHTML = '';

    livros.forEach((livro, index) => {
      const li = document.createElement('li');
      li.className = 'list-group-item d-flex justify-content-between align-items-center';
      li.innerHTML = `
        <div>
          <h5 class="mb-1">${livro.titulo}</h5>
          <small>${livro.autor}</small>
          <p class="mb-1">${livro.numeroPaginas} páginas</p>
          <p class="mb-1">Categoria(s): ${livro.exibirCategorias()}</p>
        </div>
        <button class="btn btn-sm ${livro.emprestado ? 'btn-warning' : 'btn-success'}" 
                id="btn-toggle-${index}">
          ${livro.emprestado ? 'Devolver' : 'Emprestar'}
        </button>
      `;
      listaLivros.appendChild(li);

      const btn = document.getElementById(`btn-toggle-${index}`);
      btn.addEventListener('click', () => UI.toggleEmprestimo(index));
    });
  }

  static toggleEmprestimo(index) {
    const livros = Biblioteca.listarLivros();
    const livro = livros[index];

    if (livro.emprestado) {
      livro.devolver();
    } else {
      livro.emprestar();
    }

    UI.exibirLivros();
  }
}

// Atribui o evento para o formulário
document.getElementById('livroForm').addEventListener('submit', UI.adicionarLivro);
UI.inicializarEventos();
UI.exibirLivros();
