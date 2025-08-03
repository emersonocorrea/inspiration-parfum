// js/ui.js

/**
 * Renderiza a lista de produtos na grade da página.
 * @param {Array<object>} products - A lista de produtos a ser renderizada.
 */
function renderProducts(products) {
    const grid = document.getElementById('product-grid');
    if (!grid) return;

    // Limpa o conteúdo atual da grade (incluindo o spinner)
    grid.innerHTML = '';

    if (!products || products.length === 0) {
        grid.innerHTML = '<p>Nenhum produto encontrado no momento.</p>';
        return;
    }

    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.dataset.productId = product.id;

        // Converte o preço para o formato de moeda brasileiro
        const formattedPrice = Number(product.price).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });

        card.innerHTML = `
            <img src="${product.image_url}" alt="${product.name}" class="product-image" onerror="this.onerror=null;this.src='https://placehold.co/600x400/f9f6f2/c5a47e?text=Imagem+Indisponível';">
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <p class="product-price">${formattedPrice}</p>
                <button class="add-to-cart-btn">Adicionar ao Carrinho</button>
            </div>
        `;

        // Adiciona o evento de clique diretamente ao botão do card criado
        card.querySelector('.add-to-cart-btn').addEventListener('click', (event) => {
            event.stopPropagation(); // Impede a propagação do evento
            addToCart(product);
        });

        grid.appendChild(card);
    });
}

/**
 * Atualiza o contador visual do carrinho e a visibilidade do botão do WhatsApp.
 */
function updateCartUI() {
    const cartCountElement = document.getElementById('cart-count');
    const whatsappButton = document.getElementById('whatsapp-checkout');
    
    const totalItems = getTotalItemCount();

    if (cartCountElement) {
        cartCountElement.textContent = totalItems;
        // Adiciona uma pequena animação ao atualizar
        cartCountElement.style.transform = 'scale(1.2)';
        setTimeout(() => {
            cartCountElement.style.transform = 'scale(1)';
        }, 150);
    }

    if (whatsappButton) {
        // Adiciona ou remove a classe 'visible' para controlar a animação de aparição
        if (totalItems > 0) {
            whatsappButton.classList.add('visible');
        } else {
            whatsappButton.classList.remove('visible');
        }
    }
}
