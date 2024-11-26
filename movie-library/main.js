class Livro {
  constructor(titulo, autor, numeroPaginas, categorias = []) {
    // Inicializa os atributos do livro com os valores passados
    this.titulo = titulo; 
    this.autor = autor; 
    this.numeroPaginas = numeroPaginas; 
    this.emprestado = false; // Estado inicial do livro como não emprestado
    this.categorias = categorias; // Lista de categorias associadas ao livro
  }

  emprestar() {
    if (!this.emprestado) {
      this.emprestado = true; // Marca o livro como emprestado
      return true; // Retorna sucesso no empréstimo
    }
    return false; // Caso já esteja emprestado, retorna falso
  }

  devolver() {
    if (this.emprestado) {
      this.emprestado = false; // Marca o livro como devolvido
      return true; // Retorna sucesso na devolução
    }
    return false; // Caso não esteja emprestado, retorna falso
  }

  adicionarCategoria(categoria) {
    this.categorias.push(categoria); // Adiciona uma nova categoria à lista de categorias
  }

  exibirCategorias() {
    // Retorna os nomes das categorias separados por vírgula
    return this.categorias.map(categoria => categoria.nome).join(', ');
  }
}

class Biblioteca {
  static livros = []; // Coleção estática de livros na biblioteca

  static adicionarLivro(livro) {
    this.livros.push(livro); // Adiciona o livro à coleção de livros
    console.log('Livro adicionado:', livro); // Log para indicar que o livro foi adicionado
  }

  static listarLivros() {
    console.log('Listando todos os livros:', this.livros); // Log para listar todos os livros
    return this.livros; // Retorna a lista de livros
  }

  static listarLivrosPorCategoria(categoriaNome) {
    console.log('Filtrando livros pela categoria:', categoriaNome); // Log para indicar o início do filtro
    // Filtra os livros que possuem a categoria especificada
    const livrosFiltrados = this.livros.filter(livro =>
      livro.categorias.some(categoria => categoria.nome === categoriaNome)
    );
    console.log('Livros filtrados:', livrosFiltrados); // Log para os livros encontrados
    return livrosFiltrados; // Retorna os livros filtrados
  }
}

class Categoria {
  constructor(nome) {
    this.nome = nome; // Nome da categoria
  }

  exibirCategoria() {
    // Exibe o nome e a descrição da categoria
    return `${this.nome}: ${this.descricao}`;
  }
}

const categoriasDisponiveis = [
  // Lista pré-definida de categorias disponíveis na biblioteca
  new Categoria('Aventura'),
  new Categoria('Infantil'),
  new Categoria('FiccaoCientifica'),
  new Categoria('Terror'),
  new Categoria('Romance')
];

class UI {
  static adicionarLivro(e) {
    e.preventDefault(); // Impede o comportamento padrão de recarregar a página no submit do formulário

    const titulo = document.getElementById('titulo').value; // Obtém o título do livro
    const autor = document.getElementById('autor').value; // Obtém o autor do livro
    const numeroPaginas = document.getElementById('numeroPaginas').value; // Obtém o número de páginas do livro

    const categoriasSelecionadas = []; // Inicializa a lista de categorias selecionadas
    document.querySelectorAll('.form-check-input:checked').forEach((checkbox) => {
      // Itera sobre os checkboxes marcados para selecionar as categorias
      const categoriaNome = checkbox.value;
      const categoria = categoriasDisponiveis.find(c => c.nome === categoriaNome); // Encontra a categoria correspondente
      if (categoria) {
        categoriasSelecionadas.push(categoria); // Adiciona a categoria à lista
      }
    });

    const livro = new Livro(titulo, autor, numeroPaginas, categoriasSelecionadas); // Cria um novo livro
    Biblioteca.adicionarLivro(livro); // Adiciona o livro à biblioteca

    UI.limparCampos(); // Limpa os campos do formulário
    UI.exibirLivros(); // Atualiza a exibição dos livros na interface
  }

  static limparCampos() {
    // Reseta os campos do formulário e os checkboxes selecionados
    document.getElementById('titulo').value = '';
    document.getElementById('autor').value = '';
    document.getElementById('numeroPaginas').value = '';
    document.querySelectorAll('.form-check-input:checked').forEach((checkbox) => {
      checkbox.checked = false;
    });
  }

  static buscarLivros() {
    const searchTerm = document.getElementById('searchTerm').value.toLowerCase(); // Obtém o termo de busca e converte para minúsculas
    console.log('Termo de busca:', searchTerm); // Log para o termo de busca
    // Filtra os livros que correspondem ao termo no título ou autor
    const livrosFiltrados = Biblioteca.listarLivros().filter(livro => {
      return livro.titulo.toLowerCase().includes(searchTerm) ||
             livro.autor.toLowerCase().includes(searchTerm);
    });
    console.log('Livros encontrados pela busca:', livrosFiltrados); // Log para os livros encontrados
    UI.exibirLivros(livrosFiltrados); // Atualiza a interface com os livros encontrados
  }

  static buscarPorCategoria(categoriaSelecionada) {
    console.log(`Buscando livros pela categoria: ${categoriaSelecionada}`); // Log da categoria selecionada
    const livrosFiltrados = Biblioteca.listarLivrosPorCategoria(categoriaSelecionada); // Obtém os livros da categoria
    console.log(`Livros encontrados: ${livrosFiltrados.length}`); // Log do número de livros encontrados
    UI.exibirLivros(livrosFiltrados); // Atualiza a interface com os livros encontrados
  }

  static inicializarEventos() {
    console.log('Inicializando eventos de dropdown'); // Log para inicializar eventos
    document.getElementById('categoriaDropdown').addEventListener('click', function(event) {
      if (event.target && event.target.matches('a.dropdown-item')) {
        const categoriaSelecionada = event.target.getAttribute('data-categoria'); // Obtém a categoria selecionada
        UI.buscarPorCategoria(categoriaSelecionada); // Busca livros pela categoria
      }
    });
  }

  static exibirLivros(livros = Biblioteca.listarLivros()) {
    console.log('Exibindo livros:', livros); // Log para os livros exibidos
    const listaLivros = document.getElementById('listaLivros'); // Obtém o elemento onde os livros serão listados
    listaLivros.innerHTML = ''; // Limpa a lista de livros

    livros.forEach((livro, index) => {
      const li = document.createElement('li'); // Cria um elemento de lista para cada livro
      li.className = 'list-group-item d-flex justify-content-between align-items-center'; // Adiciona classes para estilo
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
      listaLivros.appendChild(li); // Adiciona o livro à lista exibida

      const btn = document.getElementById(`btn-toggle-${index}`); // Obtém o botão de ação
      btn.addEventListener('click', () => UI.toggleEmprestimo(index)); // Adiciona evento de clique ao botão
    });
  }

  static toggleEmprestimo(index) {
    const livros = Biblioteca.listarLivros(); // Obtém a lista de livros
    const livro = livros[index]; // Seleciona o livro pelo índice

    if (livro.emprestado) {
      livro.devolver(); // Marca o livro como devolvido
    } else {
      livro.emprestar(); // Marca o livro como emprestado
    }

    UI.exibirLivros(); // Atualiza a exibição da interface
  }
}

// Atribui o evento de submit ao formulário
document.getElementById('livroForm').addEventListener('submit', UI.adicionarLivro);
UI.inicializarEventos(); // Inicializa os eventos na interface
UI.exibirLivros(); // Exibe os livros iniciais
