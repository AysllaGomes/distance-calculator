# Projeto de Cálculo de Viagens

Este projeto é uma API para calcular detalhes de uma viagem, incluindo tempo de viagem, custo de combustível, emissões de carbono e condições meteorológicas ao longo da rota.

## Funcionalidades

- Calcular a distância e o tempo de viagem entre dois locais.
- Calcular o custo de combustível da viagem.
- Calcular as emissões de carbono da viagem com base no tipo de combustível.
- Obter condições meteorológicas no ponto de origem e no destino.

## Tecnologias Utilizadas

- [NestJS](https://nestjs.com/)
- [Google Maps API](https://developers.google.com/maps)
- [OpenWeatherMap API](https://openweathermap.org/)

## Pré-requisitos

- Node.js v14 ou superior
- NPM ou Yarn
- Conta e chave de API do Google Maps

## Instalação

1. Clone o repositório:
```bash
   git clone https://github.com/AysllaGomes/distance-calculator.git
   cd seu-repositorio
```

2. Instale as dependências:

```bash
    npm install
```

3. Configure a chave da API do Google Maps. Crie um arquivo .environment.ts na config do projeto e adicione a sua chave da API:

```bash
    GOOGLE_MAPS_API_KEY=your_google_maps_api_key
    OPEN_WEATHER_MAP_API_KEY=your_open_weather_map_key
```

4. Para iniciar o servidor de desenvolvimento:

```bash
    npm run start:dev
```

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

   ```
     "origin": "Local de origem",
     "destination": "Local de destino",
   ```

## Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo [LICENSE](./LICENSE) para mais detalhes.
