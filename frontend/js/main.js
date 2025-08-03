// js/main.js

/**
 * Simula uma chamada de API para buscar os produtos do arquivo mock.
 * @returns {Promise<Array>} Uma promessa que resolve com a lista de produtos.
 */
function fetchProducts() {
    console.log("Buscando produtos do arquivo mock...");
    return new Promise(resolve => {
        // Simula um atraso de rede de 1 segundo para que o spinner seja visível
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

    // IMPORTANTE: Substitua pelo seu número de WhatsApp no formato internacional (sem +, - ou espaços)
    const phoneNumber = '5511912345678'; 

    whatsappBtn.addEventListener('click', (event) => {
        event.preventDefault(); // Impede o comportamento padrão do link
        
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

        // Codifica a mensagem para ser usada em uma URL de forma segura
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        
        // Abre o link em uma nova aba para não fechar o site
        window.open(whatsappUrl, '_blank');
    });
}

/**
 * Função principal que inicializa a aplicação.
 */
async function main() {
    // Ouve o evento 'cartUpdated' para atualizar a UI sempre que o carrinho mudar
    document.addEventListener('cartUpdated', updateCartUI);

    // Configura os botões e outros elementos interativos
    setupWhatsAppButton();

    try {
        // Busca os produtos e, quando retornarem, renderiza na tela
        const products = await fetchProducts();
        renderProducts(products);
    } catch (error) {
        console.error("Falha ao buscar produtos:", error);
        const grid = document.getElementById('product-grid');
        if (grid) {
            grid.innerHTML = '<p>Ocorreu um erro ao carregar os produtos. Tente novamente mais tarde.</p>';
        }
    }
}

// Garante que o DOM está completamente carregado antes de executar o script principal
document.addEventListener('DOMContentLoaded', main);
