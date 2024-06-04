## Installation

To get started with the project, follow these steps:

1. Clone the repository:

    ```bash
    git clone <repository_url>
    ```

2. Install dependencies for the frontend:

    ```bash
    cd ./to-do-app-mern/frontend
    npm install
    ```

3. Install dependencies for the backend:

    ```bash
    cd ./to-do-app-mern/backend/src
    npm install
    ```
 4. Create a `.env` file in the root directory of the backend/src and add the following environment variables:

    ```plaintext
    PORT=5000
    DB_URI=mongodb://localhost:27017/mydatabase
    JWT_SECRET=
    NODEMAILER_EMAIL=
    NODEMAILER_PASS=
    ```

    Replace the values with your actual configuration.
## Usage

To run the project, use the following commands:

- Start the frontend development server:

    ```bash
    cd frontend
    npm start
    ```

- Start the backend server:

    ```bash
    cd backend/src
    npm run dev
    ```



