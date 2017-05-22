FROM nginx
MAINTAINER Niranjan Rajendran <niranjan94@yahoo.com>

COPY conf/nginx.conf /etc/nginx/nginx.conf
COPY conf/frontend.conf /etc/nginx/conf.d/default.conf
COPY conf/gzip.conf /etc/nginx/conf.d/gzip.conf

RUN mkdir /var/www

COPY deploy-dist/ /var/www

COPY docker-entrypoint.sh /usr/local/bin

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
