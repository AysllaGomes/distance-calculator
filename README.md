# Distance Calculator API

Este é um projeto de API utilizando NestJS que calcula a distância, custo de combustível, tempo de viagem e fornece um link para um mapa embutido mostrando a rota entre dois pontos.

## Funcionalidades

- Calcular a distância entre duas localidades usando a API do Google Maps.
- Calcular o custo de combustível com base no consumo e preço do combustível.
- Calcular o tempo total de viagem considerando pausas para descanso.
- Gerar um link para um mapa embutido mostrando a rota.

## Tecnologias Utilizadas

- [NestJS](https://nestjs.com/)
- [Google Maps API](https://developers.google.com/maps)
- [Axios](https://github.com/axios/axios)
- [class-validator](https://github.com/typestack/class-validator) e [class-transformer](https://github.com/typestack/class-transformer) para validação de dados.

## Pré-requisitos

- Node.js v14 ou superior
- NPM ou Yarn
- Conta e chave de API do Google Maps

## Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/distance-calculator-api.git
   cd distance-calculator-api
   
2. Instale as dependências:

   ```bash
    npm install

3. Configure a chave da API do Google Maps. Crie um arquivo .env na raiz do projeto e adicione a sua chave da API:

   ```bash
    GOOGLE_MAPS_API_KEY=your_google_maps_api_key

4. Para iniciar o servidor de desenvolvimento:

   ```bash
    npm run start:dev

5. Endpoint:


   ## Calcular Viagem para calcular a viagem:

   ### URL: `/calculate-trip`
   ## Método: POST
   ## Body:

   ```
   {
     "origin": "Conceição da Aparecida, Minas Gerais, Brasil",
     "destination": "Planaltina, Goiás, Brasil",
     "fuelConsumption": 14,
     "fuelPrice": 5.80,
     "averageSpeed": 77,
     "drivingStartTime": "09:00",
     "drivingEndTime": "18:00",
     "departureDate": "2024-06-06",
     "fuelTankSize": 55 // Opcional, padrão é 55
   }
   ```

   ## Gerar Link de Mapa:

   ### URL: `/calculate-trip/map-link`

   ## Método: GET
   
   ## Parâmetros:
   
   #### origin: Local de origem
   #### destination: Local de destino
   #### apiKey: Chave da API do Google Maps
