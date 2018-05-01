#HYBRID MOBILE APP (IONIC) WITH REST BACKEND (PHP LUMEN) FOR#

## Vodocitanja REST API ##
Backend for mobile app for water meters reading. REST api writen in php (Lumen) in order to be deployable to php hosting.  
1. git clone https://github.com/MirzaAbazovic/water-meter-readings
2. cd vodoocitanja-api
3. docker-compose up
4. docker exec readings-webserver php artisan migrate
5. Try api (on http://localhost:81) using postman [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/b23e4142a3e5864d2b4e) or with file file api.rest in VS code using plugin https://marketplace.visualstudio.com/items?itemName=humao.rest-client 

## Vodocitanja IONIC GUI ##
1. git clone https://github.com/MirzaAbazovic/water-meter-readings
2. cd vodoocitanja-gui
3. npm install
4. npm start
5. http://localhost:8100