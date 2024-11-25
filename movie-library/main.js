// Define a classe Livro que representa um livro com propriedades e métodos
class Livro {
  constructor(titulo, autor, numeroPaginas, categorias = []) {
      this.titulo = titulo;  // Atribui o título do livro
      this.autor = autor;    // Atribui o autor do livro
      this.numeroPaginas = numeroPaginas;  // Atribui o número de páginas do livro
      this.emprestado = false;  // Inicializa o livro como não emprestado
      this.categorias = categorias || [];  // Atribui as categorias ou um array vazio caso não haja
  }

  // Método para emprestar o livro
  emprestar() {
      if (!this.emprestado) {  // Verifica se o livro não está emprestado
          this.emprestado = true;  // Marca o livro como emprestado
          return true;  // Retorna verdadeiro, indicando que o livro foi emprestado com sucesso
      }
      return false;  // Retorna falso, se o livro já estava emprestado
  }

  // Método para devolver o livro
  devolver() {
      if (this.emprestado) {  // Verifica se o livro está emprestado
          this.emprestado = false;  // Marca o livro como devolvido
          return true;  // Retorna verdadeiro, indicando que o livro foi devolvido
      }
      return false;  // Retorna falso, se o livro não estava emprestado
  }

  // Método para adicionar uma categoria ao livro
  adicionarCategoria(categoria) {
    this.categorias.push(categoria);  // Adiciona a categoria ao array de categorias do livro
  }

  // Método para exibir as categorias do livro
  exibirCategorias() {
    return this.categorias.map(categoria => categoria.nome).join(', ');  // Retorna uma string com as categorias separadas por vírgula
  }
}

// Define a classe Biblioteca que gerencia uma coleção de livros
class Biblioteca {
  static livros = [];  // Cria um array estático de livros

  // Método estático para adicionar um livro à biblioteca
  static adicionarLivro(livro) {
      this.livros.push(livro);  // Adiciona o livro ao array de livros
  }

  // Método estático para listar todos os livros na biblioteca
  static listarLivros() {
      return this.livros;  // Retorna o array de livros
  }

  // Método estático para listar livros por categoria
  static listarLivrosPorCategoria() {
    return this.livros.filter(livro => 
      livro.categorias.some(categoria => categoria.nome === categoriaNome)  // Filtra os livros que possuem uma categoria correspondente
    );
  }
}

// Define a classe Categoria que representa uma categoria de livro
class Categoria {
  constructor(nome, descricao) {
    this.nome = nome;  // Atribui o nome da categoria
    this.descricao = descricao;  // Atribui a descrição da categoria
  }

  // Método para exibir a categoria no formato "Nome: Descrição"
  exibirCategoria() {
    return `${this.nome}: ${this.descricao}`;  // Retorna uma string com o nome e a descrição da categoria
  }
}

// Define a classe UI que gerencia a interface do usuário
class UI {
  // Método estático que adiciona um livro ao clicar no formulário
  static adicionarLivro(e) {
    e.preventDefault();  // Previne o envio padrão do formulário (evita recarregamento da página)

    // Captura os valores dos campos do formulário
    const titulo = document.getElementById('titulo').value;  // Captura o valor do campo 'titulo'
    const autor = document.getElementById('autor').value;  // Captura o valor do campo 'autor'
    const numeroPaginas = document.getElementById('numeroPaginas').value;  // Captura o valor do campo 'numeroPaginas'

    // Captura as categorias selecionadas
    const categorias = [];  // Cria um array vazio para armazenar as categorias
    document.querySelectorAll('.form-check-input:checked').forEach((checkbox) => {
      categorias.push(checkbox.value);  // Adiciona o valor de cada checkbox selecionado ao array de categorias
    });

    // Criação do objeto Livro com os valores do formulário
    const livro = new Livro(titulo, autor, numeroPaginas);

    // Atribui as categorias ao livro
    livro.categorias = categorias;  // Atribui as categorias capturadas ao livro

    // Adiciona o livro à biblioteca
    Biblioteca.adicionarLivro(livro);

    // Limpa os campos e exibe os livros novamente
    UI.limparCampos();  // Chama o método para limpar os campos do formulário
    UI.exibirLivros();  // Chama o método para exibir a lista de livros atualizada
  }

  // Método para limpar os campos do formulário
  static limparCampos() {
    document.getElementById('titulo').value = '';  // Limpa o campo 'titulo'
    document.getElementById('autor').value = '';  // Limpa o campo 'autor'
    document.getElementById('numeroPaginas').value = '';  // Limpa o campo 'numeroPaginas'
    
    // Limpa os checkboxes
    document.querySelectorAll('.form-check-input:checked').forEach((checkbox) => {
      checkbox.checked = false;  // Desmarca todos os checkboxes
    });
  }

  // Método para exibir os livros na interface
  static exibirLivros() {
    const listaLivros = document.getElementById('listaLivros');  // Seleciona o elemento de lista onde os livros serão exibidos
    listaLivros.innerHTML = '';  // Limpa a lista de livros antes de re-renderizar

    // Para cada livro da biblioteca, cria um item na lista
    Biblioteca.listarLivros().forEach((livro, index) => {
      const li = document.createElement('li');  // Cria um novo item de lista
      li.className = 'list-group-item d-flex justify-content-between align-items-center';  // Adiciona classes para estilo com Bootstrap
      li.innerHTML = `
        <div>
          <h5 class="mb-1">${livro.titulo}</h5>  <!-- Exibe o título do livro -->
          <small>${livro.autor}</small>  <!-- Exibe o autor do livro -->
          <p class="mb-1">${livro.numeroPaginas} páginas</p>  <!-- Exibe o número de páginas -->
          <p class="mb-1">Categoria(s): ${livro.categorias.join(', ')}</p>  <!-- Exibe as categorias do livro -->
        </div>
        <button class="btn btn-sm ${livro.emprestado ? 'btn-warning' : 'btn-success'}" 
                id="btn-toggle-${index}">  <!-- Exibe um botão para emprestar ou devolver o livro -->
          ${livro.emprestado ? 'Devolver' : 'Emprestar'}
        </button>
      `;
      listaLivros.appendChild(li);  // Adiciona o item à lista de livros

      // Adiciona o evento de clique para cada botão
      const btn = document.getElementById(`btn-toggle-${index}`);  // Seleciona o botão correspondente ao índice do livro
      btn.addEventListener('click', () => UI.toggleEmprestimo(index));  // Atribui um evento para alternar o estado de emprestado/devolvido do livro
    });
  }

  // Método para alternar o estado de emprestado do livro (emprestar ou devolver)
  static toggleEmprestimo(index) {
    const livros = Biblioteca.listarLivros();  // Obtém todos os livros da biblioteca
    const livro = livros[index];  // Seleciona o livro baseado no índice

    if (livro.emprestado) {
        livro.devolver();  // Se o livro estiver emprestado, devolve o livro
    } else {
        livro.emprestar();  // Se o livro não estiver emprestado, empresta o livro
    }

    UI.exibirLivros();  // Atualiza a lista de livros para refletir o novo estado
  }
}

// Atribui o evento de envio do formulário para adicionar o livro
document.getElementById('livroForm').addEventListener('submit', UI.adicionarLivro);

// Exibe os livros ao carregar a página, para que a lista inicial seja mostrada
UI.exibirLivros();
