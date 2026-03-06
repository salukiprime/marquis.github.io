/**
 * Вспомогательные утилиты для приложения Marquis
 */

// Генерация уникального идентификатора
function generateId() {
    // Если доступно, используйте crypto, в противном случае откатитесь к Date.now и случайной строке
    if (window.crypto && window.crypto.randomUUID) {
        return window.crypto.randomUUID();
    }
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

// Форматирование даты для вывода
function formatDate(date) {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}
