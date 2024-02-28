# valantis-store-list
React SPA application using for work with Valantis store API.

## Development server

Run `npm run start` for a dev server. Navigate to `http://localhost:3000/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate c component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory.

## About functionality of the app:

### RU

**Инструкция по запуску:**

1) Склонировать репозиторий - `git clone <repo name>`
2) Выполнить команду в консоли от корня приложения - `npm i`
3) Выполнить команду запуска приложения - `npm run start`
4) Перейти в Chrome на `http://localhost:3000/`
5) Чтобы проверить работоспособность пункта "Если API возвращает дубли по id, то следует их считать одним товаром и выводить только первый, даже если другие поля различаются" помимо видимого эффекта (отсутствия дублей) в самом ui можно перейти в файл `api.ts` к методу `getProductsIdsReq()` - там оставлен комментарий, указывающий на использование Set для ids, что убирает дубли.
6) Чтобы проверить работоспособность пункта "Если API возвращает ошибку, следует вывести идентификатор ошибки в консоль, если он есть и повторить запрос." в том же файле `api.ts` можно увидеть метод `apiWithRetries` в который оборачиваются методы апи. 
Используя цикл `while` и переменную `retries` (кол-во повторений запроса по дефолту выставленное в знаечение `1`) реализуют повторения запроса к серверу в случае ошибки указанное в `retries` кол-во раз.

### EN

**Start instructions:**

1) Clone the repository - `git clone <repo name>`
2) Run the command in the console from the root of the app - `npm i`
3) Run the app start command - `npm run start`
4) Go to Chrome to `http://localhost:3000/`
5) To check the functionality of the point "If the API returns duplicates by id, then res should be considered one product and output only the 1st one, even if the other fields differ" in addition to the visible effect (absence of duplicates) in the ui itself, you can go to the `api.ts` file to the `getProductsIdsReq()` method - there is a comment left indicating the use of Set for ids, which removes all duplicates.
6) To check the functionality of the point "If the API returns an error, you should output the error ID to the console, if there is one, and repeat the request." in the same `api.ts` file, you can see the `apiWithRetries` method in which api methods are wrapped.
Using the `while` loop and the `retries` variable (the number of repetitions of the request is set to `1` by default), it implements the repetition of the request to the server in case of an error, the number of repetitions specified in `retries` var.

