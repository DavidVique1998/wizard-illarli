
# Wizard Illardi App

This project is a Vue-based application designed to implement a wizard with two screens for data collection and verification. The application uses Vuetify, Vee Validate, Pinia stores, TypeScript, and Vue Toastification. The Verify Code API is used to send and verify OTP codes, the Save Lead API is used to save user information, and the Get RUC Information API is used to retrieve business information based on the provided RUC.

## Project Setup

### Prerequisites

- Docker
- Node.js 22 LTS (If you want to run the project locally without Docker)
- Gestor de paquetes npm (If you want to run the project locally without Docker)

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/DavidVique1998/wizard-illarli.git
   cd wizard-illardi
   cd app
   ```

2. **Copy the .env file:**
   ```sh
   cp .env.example .env
   ```

3. **Update the .env file:**
   ```
   VITE_API_URL=https://test.wanqara.com
   ```

4. **Build and run the Docker Compose:**
   ```sh
   cd ..
   docker-compose up --build
   ```
5. **Wait for the Dockerfile commands to finish, this install dependencies and run the application in development mode, will be shown: "Container wizardillarli-vue-1  Started"**

6. **Access the application:**
   Open your browser and navigate to `http://localhost:5173`.

## Project Structure

- **app/src/**: Source code for the application
- **app/public/**: Public assets
- **app/package.json**: Project metadata and dependencies
- **docker-compose.yml**: Docker Compose configuration file

## Technologies Used

- **Vue.js**: JavaScript framework for building user interfaces
- **Vuetify**: Material Design component framework for Vue.js
- **Vee Validate**: Form validation library for Vue.js
- **Pinia**: State management library for Vue.js
- **TypeScript**: Typed superset of JavaScript
- **Vue Toastification**: Toast notifications library for Vue.js

## Wizard Functionality

### Screen 1: Data Collection and OTP Verification

- URL: `http://localhost:5173/auth/login`
- Collects user's personal information: Name, Surname, and Phone Number.
- Sends OTP to the provided phone number.
- Verifies the OTP. If successful, the user proceeds to the next screen.

![Screen 1](images/wizard-illarli-1.png)

### Screen 2: RUC Data Collection and Autocomplete

- URL: `http://localhost:5173/auth/register`
- Collects user's RUC information: RUC, Business Name, Email, etc.
- Autocompletes business information based on the provided RUC.
- Saves the user's information.

![Screen 2](images/wizard-illarli-2.png)

### Approval Message

- URL: `http://localhost:5173/auth/approval`
- Displays a message for the approval of all collected information.

![Screen 3](images/wizard-illarli-3.png)

## API Endpoints

- **Send Code**: `GET http://test.wanqara.com/api/send-code`
- **Verify Code**: `POST http://test.wanqara.com/api/verify-code`
- **Save Lead**: `POST http://test.illarli.com/api/lead`
- **Get RUC Information**: `GET https://test.wanqara.com/api/ruc/{ruc}`

## Development

To run the project locally without Docker:

1. **Navigate to the app directory:**
   ```sh
   cd app
   ```

2. **Install dependencies:**Espere a que el node_modules se instale cuando esto se complete se mostrará la ruta y el puerto que se mostrará
   ```sh
   npm install
   ```

3. **Run the development server:**
   ```sh
   npm run dev -- --port 5173
   ```

4. **Access the application:**
   Open your browser and navigate to `http://localhost:5173`.


## Documentation

This is the resolution of a Full stack developer test. For more detailed information about OTP code support and RUC support, please refer to the [documentation](docs/wizard_test_front_end.pdf).

## License

This project is licensed under the MIT License.