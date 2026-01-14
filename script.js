// Itens
const initialItems = [
    "2 kilos de anti-materia",
    "Banana",
    "Manjericão",
    "Melância"
];

// Elementos do DOM
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const alertDiv = document.getElementById('alert');
const alertMessage = document.getElementById('alert-message');

// Inicializar lista com itens pré-cadastrados
function initializeList() {
    itemList.innerHTML = '';
    initialItems.forEach(itemText => {
        addItemToList(itemText, false);
    });
}

// Adicionar item à lista
function addItemToList(itemText, isNew = true) {
    const li = document.createElement('li');
    li.className = 'item';
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'item-checkbox';
    checkbox.onclick = function() {
        toggleItemCompleted(this);
    };
    
    const span = document.createElement('span');
    span.className = 'item-name';
    span.textContent = itemText;
    
    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-button';
    deleteButton.onclick = function() {
        removeItem(this);
    };
    
    const deleteIcon = document.createElement('img');
    deleteIcon.src = './icons/Frame-3.svg';
    deleteIcon.alt = 'Excluir';
    
    deleteButton.appendChild(deleteIcon);
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteButton);
    
    if (isNew) {
        itemList.prepend(li); // Adiciona no início
    } else {
        itemList.appendChild(li); // Adiciona no final
    }
}

// Adicionar novo item
function addItem() {
    const itemText = itemInput.value.trim();
    
    // Validar se o campo não está vazio
    if (!itemText) {
        showAlert('Por favor, digite um item para adicionar à lista!', 'warning');
        return;
    }
    
    // Adicionar item à lista
    addItemToList(itemText);
    
    // Limpar campo de input
    itemInput.value = '';
    
    // Dar foco ao input novamente
    itemInput.focus();
    
    // Mostrar mensagem de sucesso
    showAlert('Item adicionado com sucesso!');
}

// Remover item
function removeItem(button) {
    const li = button.parentElement;
    const itemName = li.querySelector('.item-name').textContent;
    
    // Remover item da lista
    li.remove();
    
    // Mostrar alerta
    showAlert(`"${itemName}" foi removido da lista`);
}

// Alternar estado do item (concluído/não concluído)
function toggleItemCompleted(checkbox) {
    const li = checkbox.parentElement;
    const itemName = li.querySelector('.item-name');
    
    if (checkbox.checked) {
        itemName.classList.add('completed');
    } else {
        itemName.classList.remove('completed');
    }
}

// Mostrar alerta
function showAlert(message, type = 'success') {
    alertMessage.textContent = message;
    
    // Mudar cor do alerta baseado no tipo
    if (type === 'warning') {
        alertDiv.style.backgroundColor = '#f59e0b';
    } else if (type === 'success') {
        alertDiv.style.backgroundColor = '#10b981';
    } else {
        alertDiv.style.backgroundColor = 'var(--color-danger)';
    }
    
    alertDiv.classList.remove('hidden');
    
    // Esconder alerta automaticamente após 3 segundos
    setTimeout(() => {
        closeAlert();
    }, 3000);
}

// Fechar alerta
function closeAlert() {
    alertDiv.classList.add('hidden');
}

// Botão "Voltar" (simulado)
function backlink() {
    // Voltar à página anterior
    showAlert('Funcionalidade "Voltar" ativada.', 'warning');
}

// Adiciona evento de tecla Enter ao input
itemInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addItem();
    }
});

// Inicializa a lista quando a página carregar
window.onload = function() {
    initializeList();

    
    // Foca no input automaticamente
    itemInput.focus();
};