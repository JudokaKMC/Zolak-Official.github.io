// --- Функция для переключения видимости контента (для кнопок "Подробнее"/"Свернуть") ---
function toggleContent(contentId, button) {
    const content = document.getElementById(contentId);
    if (content) {
        const isExpanded = content.style.display === "block"; // Проверяем, развернут ли уже контент

        // --- Сначала сворачиваем все остальные открытые блоки ---
        document.querySelectorAll('.collapsible-content').forEach(item => {
            // Проверяем, не является ли текущий блок тем, который мы пытаемся переключить
            // и развернут ли он
            if (item !== content && item.style.display === "block") {
                item.style.display = "none"; // Скрываем контент
                // Находим соответствующую кнопку для этого блока
                // Кнопка должна быть *перед* блоком контента в DOM
                const siblingButton = item.previousElementSibling; 
                if (siblingButton && siblingButton.classList.contains('toggle-button')) {
                    siblingButton.textContent = "Подробнее"; // Меняем текст кнопки обратно
                }
            }
        });

        // --- Теперь переключаем состояние текущего блока ---
        if (isExpanded) {
            // Если был развернут, сворачиваем
            content.style.display = "none";
            button.textContent = "Подробнее"; // Меняем текст кнопки на "Подробнее"
        } else {
            // Если был свернут, разворачиваем
            content.style.display = "block";
            button.textContent = "Свернуть"; // Меняем текст кнопки на "Свернуть"
        }
    }
}

// --- Функция для работы мобильного меню (гамбургер) ---
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.mobile-menu-toggle'); // Находим кнопку-гамбургер
    const navList = document.querySelector('.main-nav .nav-list'); // Находим сам список меню

    if (menuToggle && navList) {
        // Обработчик клика по кнопке меню (гамбургеру)
        menuToggle.addEventListener('click', () => {
            navList.classList.toggle('active'); // Переключаем класс 'active' для показа/скрытия меню
            menuToggle.classList.toggle('open'); // Переключаем класс для кнопки (для изменения вида, например, на крестик)
        });

        // Обработчик клика по ссылкам внутри меню
        navList.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                // Если меню активно (открыто), то при клике на ссылку
                // оно должно быть закрыто.
                if (navList.classList.contains('active')) {
                    navList.classList.remove('active'); // Скрываем меню
                    menuToggle.classList.remove('open'); // Убираем класс 'open' с кнопки
                }
            });
        });
    }
});

// --- Инициализация состояния при загрузке страницы ---
// Гарантируем, что при первой загрузке все блоки контента скрыты,
// а кнопки имеют текст "Подробнее".
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.toggle-button').forEach(button => {
        // Проверяем, не является ли эта кнопка уже открытой (маловероятно при первой загрузке, но для надежности)
        // Если кнопка имеет активный state, то текст должен быть "Свернуть"
        // В данном случае, при первой загрузке, все должны быть "Подробнее"
        button.textContent = "Подробнее"; 
    });
    document.querySelectorAll('.collapsible-content').forEach(content => {
        content.style.display = "none"; // Убеждаемся, что весь контент скрыт
    });
});
