
# Wizard Illardi App

This project is a Vue-based application designed to implement a wizard with two screens for data collection and verification. The application uses Vuetify, Vee Validate, Pinia stores, TypeScript, and Vue Toastification. The Verify Code API is used to send and verify OTP codes, the Save Lead API is used to save user information, and the Get RUC Information API is used to retrieve business information based on the provided RUC.

## Project Setup

### Prerequisites

- Docker
- Node.js 20 LTS (If you want to run the project locally without Docker)

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
5. **Wait for the node_modules to install when this is completed the path and port will be shown**

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

### Screen 2: RUC Data Collection and Autocomplete

- URL: `http://localhost:5173/auth/register`
- Collects user's RUC information: RUC, Business Name, Email, etc.
- Autocompletes business information based on the provided RUC.
- Saves the user's information.

### Approval Message

- URL: `http://localhost:5173/auth/approval`
- Displays a message for the approval of all collected information.

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

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Run the development server:**
   ```sh
   npm run dev -- --port 5173
   ```

4. **Access the application:**
   Open your browser and navigate to `http://localhost:5173`.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License.