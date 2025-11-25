// Функция для переключения видимости контента
function toggleContent(contentId, button) {
    const content = document.getElementById(contentId);
    if (content) {
        const isHidden = content.style.display === "none" || content.style.display === "";
        
        // Скрываем весь предыдущий открытый контент
        document.querySelectorAll('.collapsible-content').forEach(item => {
            if (item !== content && item.style.display === "block") {
                item.style.display = "none";
                // Находим соответствующую кнопку и меняем текст
                const correspondingButton = item.nextElementSibling; 
                if (correspondingButton && correspondingButton.classList.contains('toggle-button')) {
                    correspondingButton.textContent = "Подробнее";
                }
            }
        });

        // Переключаем текущий контент
        if (isHidden) {
            content.style.display = "block";
            button.textContent = "Свернуть"; // Меняем текст кнопки на "Свернуть"
        } else {
            content.style.display = "none";
            button.textContent = "Подробнее"; // Меняем текст кнопки обратно на "Подробнее"
        }
    }
}

// Функция для мобильного меню
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navList = document.querySelector('.main-nav .nav-list');

    if (menuToggle && navList) {
        menuToggle.addEventListener('click', () => {
            navList.classList.toggle('active'); // Переключаем класс 'active' для показа/скрытия меню
            menuToggle.classList.toggle('open'); // Опционально: для изменения вида самой кнопки меню
        });

        // Закрываем меню при клике на ссылку внутри него (для SPA, если используется)
        // Или просто для лучшего UX, чтобы меню схлопывалось после выбора пункта
        navList.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navList.classList.contains('active')) {
                    navList.classList.remove('active');
                    menuToggle.classList.remove('open');
                }
            });
        });
    }
});

// Сброс состояния кнопок при загрузке страницы, чтобы все было в исходном состоянии
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.toggle-button').forEach(button => {
        button.textContent = "Подробнее";
    });
    document.querySelectorAll('.collapsible-content').forEach(content => {
        content.style.display = "none";
    });
});


