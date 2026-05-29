FROM tomcat:9.0-jdk8

# Limpiar apps por defecto
RUN rm -rf /usr/local/tomcat/webapps/*

# Copiar WARs
COPY ProyectoGestionAlmacen.war /usr/local/tomcat/webapps/almacen.war
COPY ProyectoProveedores1.war /usr/local/tomcat/webapps/proveedor1.war
COPY ProyectoProveedores2.war /usr/local/tomcat/webapps/proveedor2.war

EXPOSE 8080