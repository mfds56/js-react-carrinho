const produtosLista = [
    {
        id: 'abc123',
        nome: 'Pet da Fotudona',
        descricao: 'Tosa e banho',
        preco: '150',
        imagem: 'https://girabetim.com.br/wp-content/uploads/2019/02/gato-cachorro2.png'
    },
    {
        id: 'bbc123',
        nome: 'Pet da Fox',
        descricao: 'Corte das Unhas',
        preco: '50',
        imagem: 'https://www.petsa.com.br/source/files/c/11104/800-472-0-0.jpg'
    },
    {
        id: 'cbc123',
        nome: 'Pet da Fotuda',
        descricao: 'Limpeza dos Dentes',
        preco: '100',
        imagem: 'https://vetloscolorados.com/wp-content/uploads/2016/11/pets_big.png'
    }

];

function ProdutoComponent(props) {
    return (
        React.createElement('div', {className: 'col-sm-4 mb-3'},
            React.createElement('div', {className: 'card loja_item'},
                React.createElement('img', {
                    className: 'card-img-top',
                    src: props.item.imagem
                }),
                React.createElement('div', {className: 'card-body'},
                    React.createElement('h5', {className: 'card-title'}, props.item.nome),
                    React.createElement('small', null, `R$${props.item.preco}`),
                    React.createElement('p', {className: 'card-text'}, props.item.descricao),
                    React.createElement("button", {
                        className: 'btn btn-primary', onClick:
                        props.onAddCarrinho.bind(null, props.item)
                    }, 'adicionar')
                )
            )
        )
    )
}

function ListaProdutosComponent(props) {
    return (
        React.createElement('div', {className: 'row loja'},
            props.children

        )
    )
}

function valorTotal(carrinhoItens) {

    const total = Object.keys(carrinhoItens).reduce(function (acc, produtoId) {
        return acc + (carrinhoItens[produtoId].preco * carrinhoItens[produtoId].quantidade)
    }, 0);

    if (Object.keys(carrinhoItens).length === 0) {
        return React.createElement('strong', {className: 'fas fa-cart-arrow-down'},
                'Carrinho Vazio')
    } else {
        return React.createElement('h6', null, `Total: R$${total}`)
    }


}

function CarrinhoComponent(props) {
    return (
        React.createElement('div', {className: 'carrinho'},
            React.createElement('div', {className: 'carrinho_itens'},
                Object.keys(props.itens).map(function(produtoId, index) {
                    return (
                        React.createElement('div', {
                                className: 'card carrinho_item',
                                key: `item-carrinho-${index}`
                            },
                            React.createElement('div', {className: 'card-body'},
                                React.createElement('h5', {className: 'card-title'},
                                    props.itens[produtoId].nome),
                                React.createElement('p', {className: 'card-text'}, `Preço Unidade: 
                                R$ ${props.itens[produtoId].preco} | Quantidade:${props.itens[produtoId].quantidade}`),
                                React.createElement('p', {className: 'card-text'}, `Valor: R$  
                                ${props.itens[produtoId].preco * props.itens[produtoId].quantidade}`),
                                React.createElement('button', { onClick:
                                        props.onRemoveItemCarrinho.bind(null, produtoId),
                                    className:
                                        'btn btn-danger btn-sm'
                                }, 'Remover')
                            )
                        )
                    )
                })
            ),

            React.createElement('div', {className: 'carrinho_total mt-2 p-3'},
                valorTotal(props.itens)
            )
        )
    )
}

function AppComponent() {
   const[carrinhoItens, addItemCarrinho] = React.useState({});

   function addCarrinho(produto) {

        if(!carrinhoItens[produto.id]) {
            addItemCarrinho({
                ...carrinhoItens,
                [produto.id]: {
                    ...produto,
                    quantidade: 1

                }
            })
        }else {
            addItemCarrinho({
                ...carrinhoItens,
                [produto.id]: {
                    ...produto,
                    quantidade: ++carrinhoItens[produto.id].quantidade

                }
            })

        }
   }
   function removeItemCarrinho(produtoId) {
       if(carrinhoItens[produtoId].quantidade <= 1) {
           delete carrinhoItens[produtoId];
           addItemCarrinho({...carrinhoItens});
       }else {
           addItemCarrinho({
               ...carrinhoItens,
               [produtoId]: {
                   ...carrinhoItens[produtoId],
                   quantidade: --carrinhoItens[produtoId].quantidade
               }
           })
       }


   }


    return (
        React.createElement(React.Fragment, null,
            React.createElement('div', {className: 'col-sm-8'},
                React.createElement(ListaProdutosComponent, null,
                    produtosLista.map(function (produto,index) {
                            return React.createElement(ProdutoComponent, {item: produto, onAddCarrinho:
                            addCarrinho, key: `produto-${index}`})
                    })
                    )
            ),
            React.createElement('div', {className: "col-sm-4"},
                React.createElement(CarrinhoComponent, {itens: carrinhoItens,
                onRemoveItemCarrinho: removeItemCarrinho}),
            ),
        )
    )
}

ReactDOM.render(
    React.createElement(AppComponent),
    document.getElementById('app')
);


