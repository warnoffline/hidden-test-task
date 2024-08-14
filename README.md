# Тестовое задание на позицию React стажёр

## Задание
Сверстать и реализовать формы регистрации и авторизации. Для ускорения работы рекомендуется использовать библиотеку готовых компонентов Mantine. Дизайн и стили форм могут быть любыми, но должны быть удобными для использования. Верстка должна быть адаптивной. 

**Требования:** 

Форма регистрации: 
- Поля: электронная почта, пароль.
- Валидация на клиентской стороне

Форма авторизаии: 
- Поля: электронная почта, пароль.

После авторизации на странице должно быть указано, что вы авторизованы и
выводится имя пользователя.

## Описание

Сайт написан на `Vite React TypeScript` с использованием принципов FSD-архитектуры. Использован `react-router-dom` для маршрутизации, `react-redux` & `@reduxjs/toolkit` для описания глобального хранилища и реализации запросов к API. Также для реализации запросов была использована библиотека `axios`. В качестве UI библиотеки компонентов, а также для управления состоянием и валидации форм я впервые использовал `Mantine`. Для анимации использована библиотека `framer-motion`. А для облегчения написания стилей использован препроцессор `sass/scss`.

### Функционал

- Реализована регистрация.

1 шаг. Форма с полями: электронная почта, пароль, повторение пароля. Валидация на корректную электронную почту, пароль от 6 символов, а также на различие паролей. 

2 шаг. Форма с кодом подтверждения электронной почты: поле для ввода кода, кнопка для подтверждения, кнопка для повторной отправки кода.

3 шаг. Направление на форму авторизации.

- Реализована авторизация.

Форма с полями: электронная почта, пароль. Валидация на корректную электронную почту, поле пароля - не пустая строка.

После ответа от сервера об успешной авторизации - происходит шифрование `refresh` токена и добавление токенов в `localStorage`. Далее идёт запрос на `/auth/session-list/` для получения `user_id`, после идёт запрос на `/user/{user_id}/` для получения всей нужной информации и вывода на страницу авторизованного пользователя.

- Реализована страница авторизованного пользователя.

Страница с информацией о пользователе и кнопкой для выхода из аккаунта.

- Дополнительно

Все страницы имеют адаптивную версию для мониторов и мобильных телефонов.

## Локальный запуск

### Установка репозитория

Скопируйте и запустите команду в директории, откуда вы планируете запустить проект.

### `git clone https://github.com/warnoffline/hidden-test-task`

### Запуск локального сервера

Для установки зависимостей: 

### `yarn`

Для запуска локального сервера: 

### `yarn dev`

Данная команда запустит локальный сервер `localhost` на `:5173` порте
