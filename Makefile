start-frontend:
	make -C frontend start

start-backend:
	npx start-server

start:
	make start-backend & make start-frontend

lint:
	npx eslint --ext js,jsx --fix --no-eslintrc --config .eslintrc.json .
