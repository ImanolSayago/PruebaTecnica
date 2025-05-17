# PruebaTecnica
Este proyecto simula una plataforma de administración de eventos con autenticación de administrador. Para poder ejecutarlo correctamente, seguí los siguientes pasos:

# Dependencias necesarias
Instalá la librería de alertas SweetAlert2:
npm install sweetalert2.

# Inicialización del proyecto
Iniciar el servidor Angular con proxy:
ng serve --proxy-config proxy.conf.json

Simular la base de datos con JSON Server:
json-server --watch db/bdd.json --port 3000

✅ Acceso
Solo los administradores pueden iniciar sesión. Asegurate de usar credenciales válidas que estén cargadas en db/bdd.json.
