// Inicializar localStorage
if (!localStorage.getItem('produtos-selecionados')) {
    localStorage.setItem('produtos-selecionados', JSON.stringify([]));
}

let cesto = JSON.parse(localStorage.getItem('produtos-selecionados'));

// Espera que o DOM esteja carregado
document.addEventListener('DOMContentLoaded', () => {
    carregarProdutos(produtos);
    atualizarCesto();
});

// Carregar produtos da loja
function carregarProdutos(produtos) {
    const listaProdutos = document.getElementById('lista-produtos');
    produtos.forEach(produto => {
        const artigo = criarProduto(produto);
        listaProdutos.append(artigo);
    });
}

// Criar produto da loja
function criarProduto(produto) {
    const artigo = document.createElement('article');
    artigo.classList.add('produto-item');

    const h3 = document.createElement('h3');
    h3.textContent = produto.title;
    artigo.append(h3);

    const img = document.createElement('img');
    img.src = produto.image;
    img.alt = produto.title;
    artigo.append(img);

    const descricao = document.createElement('p');
    descricao.textContent = produto.description;
    artigo.append(descricao);

    const preco = document.createElement('p');
    preco.textContent = `Preço: € ${produto.price.toFixed(2)}`;
    artigo.append(preco);

    const btn = document.createElement('button');
    btn.textContent = '+ Adicionar ao Cesto';
    artigo.append(btn);

    btn.addEventListener('click', () => {
        cesto.push(produto);
        localStorage.setItem('produtos-selecionados', JSON.stringify(cesto));
        atualizarCesto();
    });

    return artigo;
}

// Atualizar Cesto
function atualizarCesto() {
    const cestoDiv = document.getElementById('lista-cesto');
    const totalSpan = document.getElementById('total-cesto');
    cesto = JSON.parse(localStorage.getItem('produtos-selecionados')) || [];
    cestoDiv.innerHTML = '';

    let total = 0;

    cesto.forEach((produto, index) => {
        total += produto.price;
        const artigo = criaProdutoCesto(produto, index);
        cestoDiv.append(artigo);
    });

    totalSpan.textContent = total.toFixed(2);
    document.getElementById('contador-cesto').textContent = cesto.length;
}

// Criar produto no Cesto
function criaProdutoCesto(produto, index) {
    const artigo = document.createElement('article');
    artigo.classList.add('cesto-item');

    const h3 = document.createElement('h3');
    h3.textContent = produto.title;
    artigo.append(h3);

    const preco = document.createElement('p');
    preco.textContent = `Preço: € ${produto.price.toFixed(2)}`;
    artigo.append(preco);

    const btnRemover = document.createElement('button');
    btnRemover.textContent = 'Remover';
    artigo.append(btnRemover);

    btnRemover.addEventListener('click', () => {
        cesto.splice(index, 1);
        localStorage.setItem('produtos-selecionados', JSON.stringify(cesto));
        atualizarCesto();
    });

    return artigo;
}
