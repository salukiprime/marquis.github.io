/**
 * catalog.js - Логика для страницы La Collection
 */

const modelsMap = [
    {
        id: 'pavillon',
        name: 'Pavillon',
        descKey: 'desc_pavillon',
        bgId: 'catalog-bg-pavillon'
    },
    {
        id: 'belvedere',
        name: 'Belvédère',
        descKey: 'desc_belvedere',
        bgId: 'catalog-bg-belvedere'
    },
    {
        id: 'mistral',
        name: 'Mistral',
        descKey: 'desc_mistral',
        bgId: 'catalog-bg-mistral'
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('catalog-grid');
    if (!grid) return;

    modelsMap.forEach(model => {
        const card = document.createElement('div');
        card.className = 'catalog-card';
        card.innerHTML = `
            <div class="catalog-img-placeholder" id="${model.bgId}">
                MARQUIS ${model.name.toUpperCase()}
            </div>
            <div class="catalog-card-body">
                <h3>${model.name}</h3>
                <p>${t(model.descKey)}</p>
                <a href="details.html?model=${model.id}" class="btn btn-primary btn-black">${t('btn_explore_atelier')}</a>
            </div>
        `;
        grid.appendChild(card);
    });
});
