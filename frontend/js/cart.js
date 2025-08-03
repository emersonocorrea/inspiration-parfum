// js/cart.js

// Estado do carrinho (armazenado em memória)
const cartState = {
    items: [],
};

/**
 * Adiciona um produto ao carrinho. Se o produto já existir, incrementa a quantidade.
 * @param {object} product - O objeto do produto a ser adicionado.
 */
function addToCart(product) {
    const existingItem = cartState.items.find(item => item.id === product.id);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        // Adiciona o produto com quantidade inicial 1
        cartState.items.push({ ...product, quantity: 1 });
    }
    
    // Dispara um evento customizado para notificar outras partes do código
    // que o carrinho foi atualizado. Isso desacopla a lógica.
    document.dispatchEvent(new CustomEvent('cartUpdated'));
}

/**
 * Retorna todos os itens atualmente no carrinho.
 * @returns {Array<object>} Uma cópia da lista de itens.
 */
function getCartItems() {
    return [...cartState.items];
}

/**
 * Calcula e retorna a quantidade total de unidades no carrinho.
 * @returns {number} O número total de itens.
 */
function getTotalItemCount() {
    // Usa reduce para somar a quantidade de cada item no carrinho
    return cartState.items.reduce((total, item) => total + item.quantity, 0);
}
