<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="500" alt="Nest Logo" /></a>
</p>

# Teslo API
1. Clonar el proyecto
```
git clone https://github.com/garySZA/teslo-shop-nest.git
```
2. Instalar las dependencias
```
yarn install
```
3. Clonar el archivo __.env.template__ y renombrar la copia a __env.__
4. Llenar las variables de entorno definidas en el archivo ```.env```
5. Levantar la base de datos - PostgreSQL
```
  docker-compose up -d
```
6. Ejecutar SEED
```
  http://localhost:3000/api/v1/seed
```
[!NOTE]
El puerto para ejecutar el seed dependerá del que se haya asignado en __.env__

7. Levantar en modo Dev
```
yarn start:dev
```