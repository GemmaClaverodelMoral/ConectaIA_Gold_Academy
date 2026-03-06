# Usamos nginx para servir contenido estático
FROM nginx:alpine

# Copiamos los archivos de tu carpeta actual al directorio de nginx
COPY . /usr/share/nginx/html

# Exponemos el puerto 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]