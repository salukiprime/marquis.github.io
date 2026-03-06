/**
 * details.js - Логика для страницы L'Atelier
 */

const modelData = {
    'pavillon': {
        name: 'Pavillon',
        taglineKey: 'tagline_pavillon',
        imageBg: 'var(--color-black)', // Можно заменить на реальный URL позже
        descriptionKey: 'text_pavillon',
        specs: {
            'V8 Biturbo': {
                '2026': [
                    { labelKey: 'spec_0_100', value: '4.2s' },
                    { labelKey: 'spec_top_speed', value: '250 km/h' },
                    { labelKey: 'spec_starting_price', value: '$112,000' }
                ],
                '2027': [
                    { labelKey: 'spec_0_100', value: '4.1s' },
                    { labelKey: 'spec_top_speed', value: '255 km/h' },
                    { labelKey: 'spec_starting_price', value: '$115,500' }
                ]
            },
            'V6 Hybrid': {
                '2026': [
                    { labelKey: 'spec_0_100', value: '4.8s' },
                    { labelKey: 'spec_top_speed', value: '240 km/h' },
                    { labelKey: 'spec_starting_price', value: '$105,000' }
                ],
                '2027': [
                    { labelKey: 'spec_0_100', value: '4.6s' },
                    { labelKey: 'spec_top_speed', value: '245 km/h' },
                    { labelKey: 'spec_starting_price', value: '$108,000' }
                ]
            }
        },
        engines: [
            { value: 'V8 Biturbo', labelKey: 'eng_v8_pow' },
            { value: 'V6 Hybrid', labelKey: 'eng_v6_hyb' }
        ]
    },
    'belvedere': {
        name: 'Belvédère',
        taglineKey: 'tagline_belvedere',
        imageBg: '#111',
        descriptionKey: 'text_belvedere',
        specs: {
            'Electric/EV': {
                '2026': [
                    { labelKey: 'spec_range', value: '620 km' },
                    { labelKey: 'spec_0_100', value: '4.5s' },
                    { labelKey: 'spec_starting_price', value: '$125,000' }
                ],
                '2027': [
                    { labelKey: 'spec_range', value: '645 km' },
                    { labelKey: 'spec_0_100', value: '4.3s' },
                    { labelKey: 'spec_starting_price', value: '$128,500' }
                ]
            },
            'Electric/EV Performance': {
                '2026': [
                    { labelKey: 'spec_range', value: '580 km' },
                    { labelKey: 'spec_0_100', value: '3.8s' },
                    { labelKey: 'spec_starting_price', value: '$145,000' }
                ],
                '2027': [
                    { labelKey: 'spec_range', value: '600 km' },
                    { labelKey: 'spec_0_100', value: '3.6s' },
                    { labelKey: 'spec_starting_price', value: '$150,000' }
                ]
            }
        },
        engines: [
            { value: 'Electric/EV', labelKey: 'eng_dual_ev' },
            { value: 'Electric/EV Performance', labelKey: 'eng_tri_ev' }
        ]
    },
    'mistral': {
        name: 'Mistral',
        taglineKey: 'tagline_mistral',
        imageBg: '#222',
        descriptionKey: 'text_mistral',
        specs: {
            'V8 Biturbo': {
                '2026': [
                    { labelKey: 'spec_0_100', value: '3.6s' },
                    { labelKey: 'spec_drag', value: '0.22 Cd' },
                    { labelKey: 'spec_starting_price', value: '$180,000' }
                ],
                '2027': [
                    { labelKey: 'spec_0_100', value: '3.4s' },
                    { labelKey: 'spec_drag', value: '0.21 Cd' },
                    { labelKey: 'spec_starting_price', value: '$188,000' }
                ]
            },
            'V6 Hybrid': {
                '2026': [
                    { labelKey: 'spec_0_100', value: '4.0s' },
                    { labelKey: 'spec_weight', value: '50:50' },
                    { labelKey: 'spec_starting_price', value: '$165,000' }
                ],
                '2027': [
                    { labelKey: 'spec_0_100', value: '3.8s' },
                    { labelKey: 'spec_weight', value: '49:51' },
                    { labelKey: 'spec_starting_price', value: '$169,500' }
                ]
            }
        },
        engines: [
            { value: 'V8 Biturbo', labelKey: 'eng_v8_track' },
            { value: 'V6 Hybrid', labelKey: 'eng_v6_high' }
        ]
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const contentDiv = document.getElementById('model-content');
    const formSection = document.getElementById('atelier-form-section');
    if (!contentDiv || !formSection) return;

    // Получаем ID модели из URL
    const urlParams = new URLSearchParams(window.location.search);
    const modelId = urlParams.get('model');

    const data = modelData[modelId];

    if (!data) {
        contentDiv.innerHTML = `
            <div class="container not-found">
                <h2>Model Not Found</h2>
                <p>Please return to La Collection and select a valid vehicle to configure.</p>
                <br>
                <a href="catalog.html" class="btn btn-primary btn-black">Back to La Collection</a>
            </div>
        `;
        return;
    }

    // Регистрация роскошных цветов (общие для всех)
    const luxuryColors = [
        { key: 'color_obsidian', fallback: 'Obsidian Black' },
        { key: 'color_sapphire', fallback: 'Deep Sapphire' },
        { key: 'color_pearl', fallback: 'Pearl White' },
        { key: 'color_scarlet', fallback: 'Marquis Scarlet' },
        { key: 'color_emerald', fallback: 'Imperial Emerald' },
        { key: 'color_silver', fallback: 'Tungsten Silver' }
    ];

    // Отрисовываем подробный контент
    contentDiv.innerHTML = `
        <div class="details-hero details-hero-override" style="background: ${data.imageBg};">
            <h1 class="details-title">Marquis ${data.name}</h1>
            <p class="details-tagline">${t(data.taglineKey)}</p>
        </div>

        <div class="container">
            <div class="details-content" style="display: block; margin-bottom: 4rem;">
                <div class="details-text" style="max-width: 800px; margin: 0 auto 3rem auto; text-align: center;">
                    <h3 style="font-size: 2.5rem; margin-bottom: 1.5rem;">${t('atelier_experience_title')}</h3>
                    <p style="font-size: 1.25rem; line-height: 1.8; color: #444; margin-bottom: 2rem;">
                        ${t(data.descriptionKey)}
                        The Marquis ${data.name} merges uncompromising performance with avant-garde luxury. 
                        Every curve and angle is sculpted to perfection, designed not just to move you physically, 
                        but to stir your soul. From the meticulously hand-stitched interiors to the heart-pounding 
                        roar of its refined powertrain, the ${data.name} represents the absolute pinnacle of 
                        automotive artistry. Discover a driving experience that transcends boundaries.
                    </p>
                    <p style="font-size: 1.125rem; font-weight: 500; text-transform: uppercase; letter-spacing: 0.1em; color: var(--color-scarlet);">${t('atelier_configure_msg')}</p>
                </div>
                ${modelId === 'belvedere' ? `
                <div class="details-gallery" style="border-radius: var(--radius-sm); overflow: hidden; box-shadow: 0 15px 40px rgba(0,0,0,0.15);">
                    <div style="background-image: url('images/Marquis%20Belvédère.png'); background-size: cover; background-position: center; min-height: 500px; width: 100%;"></div>
                </div>
                ` : modelId === 'pavillon' ? `
                <div class="details-gallery" style="border-radius: var(--radius-sm); overflow: hidden; box-shadow: 0 15px 40px rgba(0,0,0,0.15);">
                    <div style="background-image: url('images/Marquis%20Pavillon%20.png'); background-size: cover; background-position: center; min-height: 500px; width: 100%;"></div>
                </div>
                ` : `
                <div class="details-gallery" style="display: grid; grid-template-columns: 2fr 1fr; gap: 1rem; border-radius: var(--radius-sm); overflow: hidden; box-shadow: 0 15px 40px rgba(0,0,0,0.15);">
                    <div style="background-image: url('images/${modelId}_detail.webp'); background-size: cover; background-position: center; min-height: 500px;"></div>
                    <div style="display: grid; grid-template-rows: 1fr 1fr; gap: 1rem;">
                        <div style="background-image: url('images/hero-concept.png'); background-size: cover; background-position: center; background-color: #111;"></div>
                        <div style="background-image: url('images/l_art_de_detail.png'); background-size: cover; background-position: center; background-color: #222;"></div>
                    </div>
                </div>
                `}
            </div>
        </div>
    `;

    // Настройка Формы (L'Atelier)
    formSection.style.display = 'block';
    
    // Устанавливаем скрытое поле модели
    document.getElementById('model').value = data.name;

    // Заполняем варианты двигателей
    const engineSelect = document.getElementById('engine');
    data.engines.forEach(engine => {
        const option = document.createElement('option');
        option.value = engine.value;
        option.textContent = t(engine.labelKey);
        engineSelect.appendChild(option);
    });

    // Заполняем варианты цветов
    const colorSelect = document.getElementById('color');
    luxuryColors.forEach(color => {
        const option = document.createElement('option');
        option.value = color.fallback;
        option.textContent = t(color.key) !== color.key ? t(color.key) : color.fallback;
        colorSelect.appendChild(option);
    });

    // Функция обновления характеристик (динамическая замена)
    function updateSpecs() {
        const selectedYear = document.getElementById('year').value;
        const selectedEngine = engineSelect.value;
        const specsContainer = document.getElementById('dynamic-specs-container');
        
        if (!selectedEngine || !selectedYear) {
            specsContainer.innerHTML = '';
            return;
        }
        
        // Ensure data exists for combination
        if(data.specs[selectedEngine] && data.specs[selectedEngine][selectedYear]){
            const specsHtml = data.specs[selectedEngine][selectedYear].map(spec => `
                <div class="spec-item">
                    <span class="spec-label">${t(spec.labelKey)}</span>
                    <span>${spec.value}</span>
                </div>
            `).join('');

            specsContainer.innerHTML = `
                <div class="details-specs" style="background-color: var(--color-black); color: var(--color-white); padding: 3rem; border-radius: var(--radius-sm); height: 100%; box-shadow: 0 20px 40px rgba(0,0,0,0.2);">
                    <h4 class="details-specs-header" style="color: var(--color-scarlet); font-size: 1.5rem; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 2rem;">${t('key_specs_title')}</h4>
                    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
                        ${specsHtml}
                    </div>
                </div>
            `;
        } else {
             specsContainer.innerHTML = '';
        }
    }

    // Привязываем слушатели для динамического обновления
    document.getElementById('year').addEventListener('change', updateSpecs);
    engineSelect.addEventListener('change', updateSpecs);

    // Первоначальная отрисовка требует чтобы был выбран двигатель, поэтому выберем первый по умолчанию.
    engineSelect.value = data.engines[0].value;
    updateSpecs();

    // Валидация отправки формы
    const form = document.getElementById('vehicle-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const modelName = document.getElementById('model').value;
        const year = document.getElementById('year').value;
        const engine = document.getElementById('engine').value;
        const color = document.getElementById('color').value;

        // Ручная валидация JS, соответствующая правилам задания
        if (!year || !engine) {
            alert(t('err_mandatory'));
            return;
        }

        // Сохранить в LocalStorage
        const vehicleData = {
            model: modelName,
            year: parseInt(year),
            engine: engine,
            color: color
        };

        addVehicle(vehicleData);

        // Переадресация в Le Garage (index.html)
        alert(`Marquis ${modelName} ${t('success_config')}`);
        window.location.href = 'index.html';
    });
});
