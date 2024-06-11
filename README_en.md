# Travel Calculation Project

This project is an API for calculating details of a trip, including travel time, fuel cost, carbon emissions, and weather conditions along the route.

## Features

- Calculate distance and travel time between two locations.
- Calculate fuel cost for the trip.
- Calculate carbon emissions for the trip based on fuel type.
- Obtain weather conditions at the origin and destination points.

## Technologies Used

- [NestJS](https://nestjs.com/)
- [Google Maps API](https://developers.google.com/maps)
- [OpenWeatherMap API](https://openweathermap.org/)

## Prerequisites

- Node.js v14 or higher. You can download it [here](https://nodejs.org/en/blog/release/v14.17.3) 
- NPM. You can install it by following the instructions [here](https://docs.npmjs.com/getting-started) para NPM. 
- Google Maps API account and key. You can obtain a Google Maps API key by following the instructions [here](https://cloud.google.com/apis/)

## API Documentation
The API documentation is automatically generated by Swagger.
After starting the server, you can access the interactive documentation at http://localhost:3000/api-docs.

## Installation

1. Clone the repository:
```bash
   git clone https://github.com/AysllaGomes/distance-calculator.git
   cd seu-repositorio
```

2. Install dependencies:

```bash
    npm install
```

3. Configure the Google Maps API key. Create a .environment.ts file in the project config and add your API key:

```bash
    GOOGLE_MAPS_API_KEY=your_google_maps_api_key
    OPEN_WEATHER_MAP_API_KEY=your_open_weather_map_key
```

4. To start the development server:

```bash
    npm run start:dev
```

5. Endpoint:


## Calculate Trip:

### URL: `/calculate-trip`
## Method: POST
## Body:

   ```
   {
        "origin": "Planaltina, Goiás, Brasil",
        "destination": "Conceição da Aparecida, Minas Gerais, Brasil",
        "fuelConsumption": 10,
        "fuelPrice": 5.80,
        "averageSpeed": 77,
        "drivingStartTime": "09:00",
        "drivingEndTime": "18:00",
        "departureDate": "2024-06-07",
        "fuelTankSize": 50, // optional
        "restTime": 3,  // optional
        "fuelType": "ethanol" // optional
    }
   ```

## Generate Map Link:

### URL: `/calculate-trip/map-link`

## Method: GET

## Parameters:

   ```
     "origin": "Origin location"
     "destination": "Destination location"
   ```

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more details.