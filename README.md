## projeto_soa_games_community
### Chat
### *Rodando aplicação SEM o docker*
#### Crie um ambiente virtual com comando: *"virtualenv amb"*
#### Ative o ambiente virtual executando o arquivo que ficará em amb/Scripts/activate.ps1 (PELO TERMINAL) COPIA E COLA .\amb\Scripts\activate.ps1
#### No diretorio do arquivo requirements.txt execute
#### *"pip install -r requirements.txt"*
#### *"python manage.py makemigrations"*
#### *"python manage.py migrate"*
#### *"python manage.py runserver"*
#### Acesse: *"localhost:8000"*

### *Rodando aplicação COM o docker*
#### *"docker-compose up --build"*
#### Acesse: *"localhost:8000"*
    
-----------------------------------------------------------------
## Games Library
### ⏯ Inicializando o Sistema

#### npm i
###### Instalar as dependências do projeto 
###### __________________________________________________________________________________
#### npm i -g @nestjs/cli
###### Caso não tenha o nestJS instalado globalmente
###### __________________________________________________________________________________
#### npm install --save @nestjs/swagger swagger-ui-express
###### Instalar as dependências do Swagger
###### __________________________________________________________________________________
#### npx prisma migrate dev
###### Iniciar as migrações do sistema
###### __________________________________________________________________________________
#### npx prisma db seed
###### caso o banco de dados não seja populado automaticamente ao executar as migrações
###### Popular o banco de dados
###### __________________________________________________________________________________
#### npm run start:dev
###### Execução do crud de games na porta 7000

-----------------------------------------------------------------

## ✅    Swagger Games Library

Acesse: http://localhost:000/swagger

-----------------------------------------------------------------
