document.addEventListener('DOMContentLoaded', () => {
    // Запускаем этот скрипт только если существует сетка коллекции (на index.html)
    const grid = document.getElementById('collection-grid');
    if (!grid) return;

    const countDisplay = document.getElementById('collection-count');
    
    // Отрисовка коллекции
    function renderCollection() {
        const collection = getCollection();
        countDisplay.textContent = collection.length;
        
        grid.innerHTML = ''; // Очистить текущее состояние
        
        if (collection.length === 0) {
            grid.innerHTML = `
                <div class="empty-state">
                    <p>${t('empty_garage_msg')}</p>
                </div>
            `;
            return;
        }

        collection.forEach(vehicle => {
            const card = document.createElement('div');
            card.className = 'car-card';
            card.innerHTML = `
                <div class="card-header">
                    <span class="card-status">
                        <input type="checkbox" class="status-toggle" 
                               data-id="${vehicle.id}" 
                               ${vehicle.status === 'active' ? 'checked' : ''} 
                               title="Toggle Active/Stored status">
                        <span>${vehicle.status === 'active' ? t('garage_active') : t('garage_stored')}</span>
                    </span>
                    <button class="btn btn-danger btn-delete" data-id="${vehicle.id}" title="Remove Vehicle">
                        X
                    </button>
                </div>
                <div class="card-body">
                    <div class="card-title">Marquis ${vehicle.model}</div>
                    <div class="card-subtitle">${vehicle.year}</div>
                    <div class="card-details">
                        <div class="detail-item">
                            <span class="detail-label">${t('garage_engine')}</span>
                            <span>${t(vehicle.engine) || vehicle.engine}</span> <!-- Можно переводить название двигателя, если оно существует в словаре -->
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">${t('garage_color')}</span>
                            <span>${vehicle.color || 'Standard'}</span>
                        </div>
                    </div>
                </div>
            `;
            grid.appendChild(card);
        });

        attachEventListeners();
    }

    // Привязываем слушатели событий к вновь созданным элементам
    function attachEventListeners() {
        // Переключатели изменения статуса
        const toggles = document.querySelectorAll('.status-toggle');
        toggles.forEach(toggle => {
            toggle.addEventListener('change', (e) => {
                const id = e.target.getAttribute('data-id');
                const newStatus = toggleVehicleStatus(id);
                
                // Обновляем текст рядом с переключателем
                const statusText = e.target.nextElementSibling;
                statusText.textContent = newStatus === 'active' ? t('garage_active') : t('garage_stored');
            });
        });

        // Удаление машин
        const deleteBtns = document.querySelectorAll('.btn-delete');
        deleteBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.target.getAttribute('data-id');
                const confirmDelete = confirm(t('confirm_sell'));
                if (confirmDelete) {
                    deleteVehicle(id);
                    renderCollection(); // Перерисовать после удаления
                }
            });
        });
    }

    // Первичная отрисовка
    renderCollection();
});
