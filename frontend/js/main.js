// js/main.js

let carouselInterval; // Variável para armazenar o intervalo do carrossel

/**
 * Inicializa a lógica do carrossel do cabeçalho.
 */
function initializeCarousel() {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.carousel-dot');
    if (slides.length === 0) return;

    let currentSlide = 0;

    function showSlide(index) {
        // Remove a classe 'active' de todos os slides e pontos
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // Adiciona a classe 'active' ao slide e ponto corretos
        slides[index].classList.add('active');
        dots[index].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    // Adiciona evento de clique para cada ponto de navegação
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const slideIndex = parseInt(dot.dataset.slideTo);
            currentSlide = slideIndex;
            showSlide(currentSlide);
            // Reinicia o intervalo quando o usuário navega manualmente
            clearInterval(carouselInterval);
            carouselInterval = setInterval(nextSlide, 5000); // Troca de slide a cada 5 segundos
        });
    });

    // Inicia a troca automática de slides
    clearInterval(carouselInterval); // Limpa qualquer intervalo anterior
    carouselInterval = setInterval(nextSlide, 5000);
}

/**
 * Simula uma chamada de API para buscar os produtos do arquivo mock.
 */
function fetchProducts() {
    console.log("Buscando produtos do arquivo mock...");
    return new Promise(resolve => {
        setTimeout(() => {
            console.log("Produtos carregados.");
            resolve(mockProducts);
        }, 1000); 
    });
}

/**
 * Configura o botão do WhatsApp para gerar e abrir o link com a mensagem do pedido.
 */
function setupWhatsAppButton() {
    const whatsappBtn = document.getElementById('whatsapp-checkout');
    if (!whatsappBtn) return;

    const phoneNumber = '5511912345678'; // SUBSTITUA PELO SEU NÚMERO

    whatsappBtn.addEventListener('click', (event) => {
        event.preventDefault();
        
        const items = getCartItems();
        if (items.length === 0) {
            alert('Seu carrinho está vazio!');
            return;
        }

        let message = 'Olá! Gostaria de fazer o seguinte pedido:\n\n';
        let totalPrice = 0;

        items.forEach(item => {
            const itemSubtotal = Number(item.price) * item.quantity;
            message += `*${item.name}*\n`;
            message += `  - Quantidade: ${item.quantity}\n`;
            message += `  - Subtotal: ${itemSubtotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}\n\n`;
            totalPrice += itemSubtotal;
        });

        message += `*Total do Pedido: ${totalPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}*`;

        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        
        window.open(whatsappUrl, '_blank');
    });
}

/**
 * Função principal que inicializa a aplicação.
 */
async function main() {
    document.addEventListener('cartUpdated', updateCartUI);
    setupWhatsAppButton();

    try {
        const products = await fetchProducts();
        
        // Renderiza os componentes da UI
        renderHeaderCarousel(products);
        renderProducts(products);

        // Inicializa a funcionalidade do carrossel depois que os elementos foram criados
        initializeCarousel();

    } catch (error) {
        console.error("Falha ao inicializar a aplicação:", error);
        const grid = document.getElementById('product-grid');
        if (grid) {
            grid.innerHTML = '<p>Ocorreu um erro ao carregar os produtos. Tente novamente mais tarde.</p>';
        }
    }
}

document.addEventListener('DOMContentLoaded', main);
