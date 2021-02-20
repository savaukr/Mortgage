# Mortgage
Mortgage calculator - це застосунок для розрахунку іпотеки по різних банках.
Банки створюються користувачами застосунку, з окремими умовами видічі позики: максимальна сума позики,
мінімальний перший платіж, термін позики, річна відсоткова ставка.


1) Для запуску проукту на локальносу сервері спочатку склонуйте репозиторій і виконайте команди:

			git clone https://github.com/savaukr/Mortgage.git

			cd mortgage
			npm install
			cd client 
			npm install

			cd ..


2) Створіть файл .env по шаблону

			#file .env.example copy to  file .env in root of project
			# APPLICATION

			# APP_PORT - default. own preference might be used
			APP_PORT=5000
			# SOCKET_PORT - default. own preference might be used
			SOCKET_PORT=5002

			#
			# PostgreSQL DATABASE Config
			DB_NAME=
			DB_USERNAME=
			DB_PASSWORD=
			DB_HOST=localhost
			DB_PORT=5432
			DB_Name=postgres
			#
			# AUTHENTICATION
			JWT_SECRET = secret_word

4) Створити у СУБД  PostgresSql  базу даних для проекту під назвою 'mortgage' . У файлі sql/template.sql.txt знаходяться шаблони для створення таблиць базы даних PostgresSql

5) Запустіть в корні проекту
			npm run dev