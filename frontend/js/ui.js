// js/ui.js

/**
 * Renderiza o carrossel no cabeçalho da página com os 3 primeiros produtos.
 * @param {Array<object>} products - A lista completa de produtos.
 */
function renderHeaderCarousel(products) {
    const slidesContainer = document.getElementById('header-carousel-slides');
    const dotsContainer = document.getElementById('header-carousel-dots');
    if (!slidesContainer || !dotsContainer) return;

    // Pega os 3 primeiros produtos para o carrossel
    const carouselProducts = products.slice(0, 3);

    slidesContainer.innerHTML = '';
    dotsContainer.innerHTML = '';

    carouselProducts.forEach((product, index) => {
        // Cria o slide
        const slide = document.createElement('div');
        slide.className = 'carousel-slide';
        // Define a imagem de fundo do slide
        slide.style.backgroundImage = `url(${product.image_url})`;
        // O primeiro slide começa como ativo
        if (index === 0) {
            slide.classList.add('active');
        }
        slidesContainer.appendChild(slide);

        // Cria o ponto de navegação
        const dot = document.createElement('span');
        dot.className = 'carousel-dot';
        dot.dataset.slideTo = index; // Armazena o índice do slide correspondente
        // O primeiro ponto começa como ativo
        if (index === 0) {
            dot.classList.add('active');
        }
        dotsContainer.appendChild(dot);
    });
}


/**
 * Renderiza a lista de produtos na grade da página.
 * @param {Array<object>} products - A lista de produtos a ser renderizada.
 */
function renderProducts(products) {
    const grid = document.getElementById('product-grid');
    if (!grid) return;

    grid.innerHTML = '';

    if (!products || products.length === 0) {
        grid.innerHTML = '<p>Nenhum produto encontrado no momento.</p>';
        return;
    }

    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.dataset.productId = product.id;

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

        card.querySelector('.add-to-cart-btn').addEventListener('click', (event) => {
            event.stopPropagation();
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
        cartCountElement.style.transform = 'scale(1.2)';
        setTimeout(() => {
            cartCountElement.style.transform = 'scale(1)';
        }, 150);
    }

    if (whatsappButton) {
        if (totalItems > 0) {
            whatsappButton.classList.add('visible');
        } else {
            whatsappButton.classList.remove('visible');
        }
    }
}
