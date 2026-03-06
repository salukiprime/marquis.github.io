/**
 * Обработка хранилища localStorage для управления коллекцией
 */

const STORAGE_KEY = 'marquis_collection';

// Первичные данные (mock-данные) для показа функционала, если гараж пуст
const DUMMY_DATA = [
    {
        id: generateId(),
        model: 'Pavillon',
        year: 2024,
        engine: 'V8 Biturbo',
        color: 'Obsidian Black',
        status: 'active', // 'active' или 'stored'
        dateAdded: new Date().toISOString()
    },
    {
        id: generateId(),
        model: 'Belvédère',
        year: 2023,
        engine: 'Electric/EV',
        color: 'Arctic White',
        status: 'active',
        dateAdded: new Date().toISOString()
    }
];

// Получить все автомобили из хранилища
function getCollection() {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
        // Инициализация мок-данными при первой загрузке
        saveCollection(DUMMY_DATA);
        return DUMMY_DATA;
    }
    try {
        return JSON.parse(data);
    } catch (e) {
        console.error('Error parsing storage data', e);
        return [];
    }
}

// Сохранить всю коллекцию обратно в хранилище (localStorage)
function saveCollection(collection) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(collection));
}

// Добавить новый автомобиль в коллекцию
function addVehicle(vehicleData) {
    const collection = getCollection();
    const newVehicle = {
        id: generateId(),
        status: 'active', // статус по умолчанию
        dateAdded: new Date().toISOString(),
        ...vehicleData
    };
    collection.push(newVehicle);
    saveCollection(collection);
    return newVehicle;
}

// Обновить статус для конкретного автомобиля
function toggleVehicleStatus(id) {
    const collection = getCollection();
    const index = collection.findIndex(v => v.id === id);
    if (index !== -1) {
        const currentStatus = collection[index].status;
        collection[index].status = currentStatus === 'active' ? 'stored' : 'active';
        saveCollection(collection);
        return collection[index].status;
    }
    return null;
}

// Удалить автомобиль из коллекции
function deleteVehicle(id) {
    let collection = getCollection();
    collection = collection.filter(v => v.id !== id);
    saveCollection(collection);
}
