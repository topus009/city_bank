
document.addEventListener('DOMContentLoaded', function(){
    
    var select = document.getElementById('select_ul');
    var select_li = document.querySelector('#select_ul li');
    var select_li_all = document.querySelectorAll('#select_ul li');
    var x_btns = document.querySelectorAll('.banner .form .reset');
    var email_x_btn = document.querySelector('.banner .form #email_form .reset');
    var name_x_btn = document.querySelector('.banner .form #name_form .reset');
    var links = document.querySelectorAll('a');    
    var input_country = document.getElementById('country');
    var input_email = document.getElementById('email');
    var input_name = document.getElementById('name');
    var input_checkbox = document.getElementById('checkbox');
    var checkbox_label = document.querySelector('.checkbox_label');
    var form_email = document.getElementById('email_form');
    var form_name = document.getElementById('name_form');
    var form_arr = [form_email, form_name];
    var required_fields = [input_email, input_name];
    var x_btns_arr = [email_x_btn, name_x_btn];
    var submit_btn = document.getElementById('submit');
    var modal_win = document.getElementById('modal_win');
    var modal_win_buttons = document.querySelectorAll('#modal_win button, #modal_win .close');
    var email_regexp = /^[a-zёа-яA-ZЁА-ЯA-Za-z0-9](([a-zёа-яA-ZЁА-Яa-zA-Z0-9,=\.!\-#|\$%\^&\*\+/\?_`\{\}~]+)*)@(?:[a-zёа-яA-ZЁА-Я0-9a-zA-Z-]+\.)+[a-zёа-яA-ZЁА-Яa-zA-Z]{2,9}$/;
    var userName_regexp = /^[a-zа-яёA-ZА-ЯЁ]+([ -]?[a-zа-яёA-ZА-ЯЁ])*$/;

    // СЛУШАТЕЛЬ ССЫЛОК
    for (let i = 0; i < links.length; i++ ) {
        links[i].addEventListener('click', function(e) {
            e.preventDefault();
            modal_win.classList.add('display_block');
        });
    }
    // СЛУШАТЕЛЬ КНОПОК ПОПАПА
    for (let i = 0; i < modal_win_buttons.length; i++ ) {
        modal_win_buttons[i].addEventListener('click', function(e) {
            e.preventDefault();
            modal_win.classList.remove('display_block');
        });
    }
    // ОТКРЫТИЕ И ЗАКРЫТИЕ ДРОПДАУНА + ИЗМЕНЕНИЕ НАПРАВЛЕНИЯ СТРЕЛКИ
    select.addEventListener('click', function() {
        // ЕСЛИ СПИСОК ЗАКРЫТ
        if (select.classList.contains('closed_select')) {
            select.classList.remove('closed_select');
            select.classList.add('opened_select');
            input_country.classList.remove('error_color');
            input_country.parentNode.classList.remove('error_color');
            for (var i = 0; i < select_li_all.length; i++) {
                select_li_all[i].classList.add('opened_li');
                select_li_all[i].classList.remove('closed_li');
            }
        }
        // ЕСЛИ СПИСОК ОТКРЫТ
        else {
            for (var i = 0; i < select_li_all.length; i++) {
                select_li_all[i].addEventListener('click', function(e) {
                    var value = e.target.innerText;
                    input_country.innerHTML = value;
                    input_country.classList.add('colored_select');
                });
                select.classList.remove('opened_select');
                select.classList.add('closed_select');
                select_li_all[i].classList.remove('opened_li');
                select_li_all[i].classList.add('closed_li');
            }
        }
    });
    // ПЕРЕМЕЩЕНИЕ ЛЭЙБЛА НАВЕРХ
    for (let i = 0; i < required_fields.length; i++) {
        required_fields[i].addEventListener("keyup", function(e) {
            // ТРИГГЕР РЕСЕТА
            x_btns[i].classList.add('display_block');
            x_btns[i].classList.remove('reset_error');    
            // ==============
            form_arr[i].classList.add('typing');
            required_fields[i].classList.remove('error_color');
            form_arr[i].classList.remove('error_color');
            if(e.target.value.length == 0) {
                form_arr[i].classList.remove('typing', 'error_color');
                // ТРИГГЕР РЕСЕТА
                x_btns[i].classList.remove('display_block', 'reset_error');
                // ==============
            }
        });
    }
    // СТИРАНИЕ СТРОКИ ПО РЕСЕТУ
    for (let i = 0; i < x_btns_arr.length; i++) {
        x_btns_arr[i].addEventListener('click', function(e) {
            required_fields[i].value = '';
            required_fields[i].classList.remove('error_color');
            form_arr[i].classList.remove('typing', 'error_color');
            x_btns[i].classList.remove('display_block');
        });
    }
    // НАЖАТИЕ КНОПКИ САБМИТ + ВАЛИДАЦИЯ
    submit_btn.addEventListener('click', function(e) {
        e.preventDefault();
        // COUNTRY
        if (input_country.innerText == 'Select your country') {
            input_country.classList.add('error_color');
            input_country.parentNode.classList.add('error_color');
        }
        // NAME
        if (input_name.value.trim().length == 0) {
            input_name.classList.add('error_color');
            input_name.parentNode.classList.add('error_color');
            name_x_btn.classList.add('display_block');            
            name_x_btn.classList.add('reset_error');
        }
        if (input_name.value.trim().length > 0 && !userName_regexp.test(input_name.value.trim())) {
            input_name.classList.add('error_color');
            input_name.parentNode.classList.add('error_color');
            name_x_btn.classList.add('reset_error');
        }
        if (input_name.value.trim().length > 0 && userName_regexp.test(input_name.value.trim())) {
            input_name.classList.remove('error_color');
            input_name.parentNode.classList.remove('error_color');
            name_x_btn.classList.remove('reset_error');
        }
        // E-MAIL
        if (input_email.value.trim().length == 0) {
            input_email.classList.add('error_color');
            input_email.parentNode.classList.add('error_color');
            email_x_btn.classList.add('display_block');            
            email_x_btn.classList.add('reset_error');
        }
        if (input_email.value.trim().length > 0 && !email_regexp.test(input_email.value.trim())) {
            input_email.classList.add('error_color');
            input_email.parentNode.classList.add('error_color');
            email_x_btn.classList.add('reset_error');
        }
        if (input_email.value.trim().length > 0 && email_regexp.test(input_email.value.trim())) {
            input_email.classList.remove('error_color');
            input_email.parentNode.classList.remove('error_color');
            email_x_btn.classList.remove('reset_error');
        }
        // CHECK-BOX
        if (!input_checkbox.checked) {
            checkbox_label.classList.add('error_color');
            input_checkbox.addEventListener('click', function(e) {
                checkbox_label.classList.remove('error_color');                
            });
        }
        if (input_checkbox.checked) {
            checkbox_label.classList.remove('error_color');
        }
    });
});



