start-frontend:
	make -C frontend start

start-backend:
	npx start-server

start:
	make start-frontend & make start-backend

deploy:
	git push heroku main