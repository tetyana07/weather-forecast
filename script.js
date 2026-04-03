"use strict";

document.addEventListener("DOMContentLoaded", () => {

    const burger = document.getElementById('burger');
    const nav = document.getElementById('nav');
    const overlay = document.querySelector('.menu-overlay');

    if (burger && nav && overlay) {

        burger.addEventListener('click', () => {
            burger.classList.toggle('active');
            nav.classList.toggle('active');
            overlay.classList.toggle('active');

            document.body.style.overflow =
                nav.classList.contains('active') ? 'hidden' : '';
        });

        overlay.addEventListener('click', () => {
            burger.classList.remove('active');
            nav.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });

        document.querySelectorAll('.header__link').forEach(link => {
            link.addEventListener('click', () => {
                burger.classList.remove('active');
                nav.classList.remove('active');
                overlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = '🌙';

    themeToggle.style.cssText = `
        position: fixed; 
        bottom: 25px; 
        right: 25px; 
        width: 58px; 
        height: 58px;
        border-radius: 50%; 
        border: none; 
        font-size: 28px;
        background: rgba(255,255,255,0.12); 
        backdrop-filter: blur(12px);
        cursor: pointer; 
        z-index: 1000; 
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
    `;

    document.body.appendChild(themeToggle);

    function setTheme(isDark) {
        if (isDark) {
            document.body.classList.add('dark');
            themeToggle.innerHTML = '☀️';
        } else {
            document.body.classList.remove('dark');
            themeToggle.innerHTML = '🌙';
        }
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }

    if (
        localStorage.getItem('theme') === 'dark' ||
        (!localStorage.getItem('theme') &&
            window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
        setTheme(true);
    } else {
        setTheme(false);
    }

    themeToggle.addEventListener('click', () => {
        setTheme(!document.body.classList.contains('dark'));
    });

   
    const feedbackLink = document.querySelector('.header__link:last-child');

    if (feedbackLink) {
        feedbackLink.addEventListener('click', function(e) {
            e.preventDefault();
            showFeedbackModal();
        });
    }

});


function showFeedbackModal() {
    const modal = document.createElement('div');
    modal.className = 'modal modal-feedback';

    modal.innerHTML = `
        <div class="modal__overlay"></div>
        <div class="modal__content">
            <h3 class="modal__title">Залишити відгук</h3>
            <p class="modal__subtitle">Напишіть вашу думку про сайт</p>
            
            <textarea class="modal__textarea" placeholder="Ваш відгук..." rows="6"></textarea>
            
            <div class="modal__buttons">
                <button class="modal__btn modal__btn-cancel">Скасувати</button>
                <button class="modal__btn modal__btn-send">Надіслати</button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('show'), 10);

    const textarea = modal.querySelector('.modal__textarea');
    const sendBtn = modal.querySelector('.modal__btn-send');
    const cancelBtn = modal.querySelector('.modal__btn-cancel');
    const overlay = modal.querySelector('.modal__overlay');

    function closeModal() {
        modal.classList.remove('show');
        setTimeout(() => modal.remove(), 300);
    }

    sendBtn.addEventListener('click', () => {
        const text = textarea.value.trim();

        if (text.length < 5) {
            alert("Відгук занадто короткий!");
            return;
        }

        modal.innerHTML = `
            <div class="modal__overlay"></div>
            <div class="modal__content">
                <h3 class="modal__title">Дякуємо!</h3>
                <button class="modal__close-btn">Закрити</button>
            </div>
        `;

        modal.querySelector('.modal__close-btn').addEventListener('click', closeModal);
    });

    cancelBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);
}


function showFeedbackModal() {
    const modal = document.createElement('div');
    modal.className = 'modal modal-feedback';

    modal.innerHTML = `
        <div class="modal__overlay"></div>
        <div class="modal__content">
            <h3 class="modal__title">Залишити відгук</h3>
            <p class="modal__subtitle">Напишіть вашу думку про сайт</p>
            
            <textarea class="modal__textarea" placeholder="Ваш відгук..." rows="6"></textarea>
            
            <div class="modal__buttons">
                <button class="modal__btn modal__btn-cancel">Скасувати</button>
                <button class="modal__btn modal__btn-send">Надіслати</button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('show'), 10);

    const textarea = modal.querySelector('.modal__textarea');
    const sendBtn = modal.querySelector('.modal__btn-send');
    const cancelBtn = modal.querySelector('.modal__btn-cancel');
    const overlay = modal.querySelector('.modal__overlay');

    function closeModal() {
        modal.classList.remove('show');
        setTimeout(() => modal.remove(), 300);
    }

    
    sendBtn.addEventListener('click', () => {
        const text = textarea.value.trim();
        
        if (text.length < 5) {
            alert("Відгук занадто короткий! Напишіть хоча б 5 символів.");
            return;
        }

        console.log("Відгук надіслано:", text);
        
        modal.innerHTML = `
            <div class="modal__overlay"></div>
            <div class="modal__content">
                <div class="modal__icon"></div>
                <h3 class="modal__title">Дякуємо!</h3>
                <p class="modal__text">Ваш відгук успішно надіслано <br>Ми його обов'язково прочитаємо.</p>
                <button class="modal__close-btn">Закрити</button>
            </div>
        `;

        modal.querySelector('.modal__close-btn').addEventListener('click', closeModal);
    });

    cancelBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);
}

