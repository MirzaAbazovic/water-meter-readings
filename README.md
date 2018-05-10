# Hybrid mobile app (IONIC) with rest backend in PHP (LUMEN) for water meter readings (VODOCITANJA) #

## Vodocitanja REST API ##
Backend for mobile app for water meters reading. REST api writen in php (Lumen) in order to be deployable to php hosting.

0. Install Docker 
1. ```git clone https://github.com/MirzaAbazovic/water-meter-readings```
2. ```cd water-meter-readings\vodoocitanja-api\```
3. Run database and server containers ```docker-compose up```
4. Run ```docker exec readings-webserver composer install``` to install php dependencies
5. Run database migratons ```docker exec readings-webserver php artisan migrate```
6. Try api (on http://localhost:81/api) using postman [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/b23e4142a3e5864d2b4e) or with file file api.rest in VS code using plugin [rest-client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)

## Vodocitanja IONIC GUI ##
0. Install node
2. ```cd vodoocitanja-gui```
3. ```npm install```
4. ```npm run ionic:serve```
6. Go to http://localhost:8100/#/signup and register user. Click home icon then Click PRIJAVA to login.

App for android is on playstore https://play.google.com/store/apps/details?id=ba.smart_soft.readings

:smiley: