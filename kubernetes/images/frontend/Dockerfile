FROM nginx
MAINTAINER Niranjan Rajendran <niranjan94@yahoo.com>

RUN echo "daemon off;" >> /etc/nginx/nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

ENV WEB_ROOT /var/www

RUN mkdir $WEB_ROOT

COPY deploy-dist/ $WEB_ROOT

COPY start-container.sh /usr/local/bin/start-container

ENTRYPOINT ["start-container"]

CMD ["nginx -g 'daemon off;'"]
