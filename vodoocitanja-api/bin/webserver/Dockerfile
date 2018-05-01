FROM php:7.1.10-apache

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

RUN apt-get update && apt-get install -y g++ wget\
		libfreetype6-dev libjpeg62-turbo-dev libmcrypt-dev \
		libpng12-dev zlib1g-dev libpng-dev libicu-dev libcurl4-openssl-dev libxml2-dev

RUN docker-php-ext-install mysqli pdo_mysql mbstring zip intl mcrypt curl json iconv xml xmlrpc tokenizer 

RUN docker-php-ext-configure gd --with-freetype-dir=/usr/include/ --with-jpeg-dir=/usr/include/ \
    && docker-php-ext-install -j$(nproc) gd

RUN pecl install xdebug \
    && docker-php-ext-enable xdebug
# add xdebug configurations
RUN { \
        echo '[xdebug]'; \
        echo 'xdebug.remote_enable=on'; \
        echo 'xdebug.remote_autostart=on'; \
        echo 'xdebug.remote_connect_back=off'; \
        echo 'xdebug.remote_handler=dbgp'; \
        echo 'xdebug.profiler_enable=off'; \
        echo 'xdebug.profiler_output_dir="/var/www/html"'; \
        echo 'xdebug.remote_port=9000'; \
        echo 'xdebug.remote_host=192.168.1.6'; \
    } > /usr/local/etc/php/conf.d/php.ini


# Enable apache modules
RUN a2enmod rewrite headers