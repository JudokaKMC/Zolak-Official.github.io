// --- Функция для переключения видимости контента (кнопки "Подробнее"/"Свернуть") ---
function toggleContent(button) {
    const targetId = button.getAttribute('data-target'); // Получаем ID блока из атрибута data-target
    const content = document.getElementById(targetId);

    if (content) {
        const section = button.closest('.collapsible-section'); // Находим родительский блок секции
        const isExpanded = section.classList.contains('expanded'); // Проверяем, есть ли класс 'expanded'

        // --- Сворачиваем все остальные блоки ---
        document.querySelectorAll('.collapsible-section').forEach(item => {
            if (item !== section && item.classList.contains('expanded')) {
                item.classList.remove('expanded');
                const otherButton = item.querySelector('.toggle-button');
                if (otherButton) {
                    otherButton.setAttribute('aria-expanded', 'false'); // Обновляем ARIA
                    // Можно также менять текст кнопки, если он есть
                    // if (otherButton.querySelector('span')) otherButton.querySelector('span').textContent = "Подробнее";
                }
                const otherContent = item.querySelector('.collapsible-content');
                if (otherContent) {
                    otherContent.style.display = "none";
                }
            }
        });

        // --- Переключаем текущий блок ---
        if (isExpanded) {
            // Если был развернут, сворачиваем
            section.classList.remove('expanded');
            content.style.display = "none";
            button.setAttribute('aria-expanded', 'false'); // Обновляем ARIA
            // if (button.querySelector('span')) button.querySelector('span').textContent = "Подробнее";
        } else {
            // Если был свернут, разворачиваем
            section.classList.add('expanded');
            content.style.display = "block";
            button.setAttribute('aria-expanded', 'true'); // Обновляем ARIA
            // if (button.querySelector('span')) button.querySelector('span').textContent = "Свернуть";
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
            menuToggle.classList.toggle('open'); // Переключаем класс для кнопки (для изменения вида)
            
            // Обновляем ARIA-атрибут для доступности
            const isExpanded = navList.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
        });

        // Обработчик клика по ссылкам внутри меню
        navList.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                // Если меню активно (открыто), то при клике на ссылку
                // оно должно быть закрыто.
                if (navList.classList.contains('active')) {
                    navList.classList.remove('active'); // Скрываем меню
                    menuToggle.classList.remove('open'); // Убираем класс 'open' с кнопки
                    menuToggle.setAttribute('aria-expanded', 'false'); // Обновляем ARIA
                }
            });
        });
    }
    
    // --- Инициализация интерактивности кнопок "Подробнее"/"Свернуть" ---
    document.querySelectorAll('.toggle-button').forEach(button => {
        button.addEventListener('click', function() {
            toggleContent(this);
        });
        // Устанавливаем начальное состояние ARIA-атрибута
        button.setAttribute('aria-expanded', 'false'); 
    });

    // --- Начальная инициализация состояний при загрузке ---
    // Убеждаемся, что все блоки контента скрыты, а кнопки не отмечены как раскрытые.
    document.querySelectorAll('.collapsible-section').forEach(section => {
        const button = section.querySelector('.toggle-button');
        const content = section.querySelector('.collapsible-content');
        
        if (section.classList.contains('expanded')) { // Если каким-то образом блок уже был раскрыт (не должно быть при первой загрузке)
            button.setAttribute('aria-expanded', 'true');
            content.style.display = 'block';
            // if (button.querySelector('span')) button.querySelector('span').textContent = "Свернуть";
        } else {
            button.setAttribute('aria-expanded', 'false');
            content.style.display = 'none';
            // if (button.querySelector('span')) button.querySelector('span').textContent = "Подробнее";
        }
    });
    
    // Начальное состояние ARIA для кнопки меню, если она есть
    if (menuToggle) {
        menuToggle.setAttribute('aria-expanded', 'false');
    }
});

