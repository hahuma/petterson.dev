FROM nginx:1.27-alpine

RUN rm -rf /usr/share/nginx/html/* \
    && rm /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/nginx.conf
COPY --chmod=644 index.html /usr/share/nginx/html/
COPY --chmod=644 styles.css /usr/share/nginx/html/
COPY --chmod=644 script.js /usr/share/nginx/html/

EXPOSE 8080 8443

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:8080/health || exit 1

CMD ["nginx", "-g", "daemon off;"]
