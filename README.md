# Simple Note Taking API

## : Build a RESTful API for a simple note-taking application using Node.js and Express. This application will allow for creating, fetching, querying, and updating notes without user management..

### Setup

1. **Clone the Repository**

   First, clone the repository and switch to the `assignment/dev/amit` branch:

   ```bash
   git clone -b assignment/dev/amit https://github.com/amityadav2611/MarblesHealth.git

   Move into the project directory:
   cd MarblesHealth

2. **Dependencies Installation**: Install the required dependencies using npm:

   ```bash
    npm install
   ```

   **Dependencies**:

   ```yaml
   "dependencies": {
       "cors": "^2.8.5",
       "dotenv": "^16.4.5",
       "express": "^4.19.2",
       "mongoose": "^8.5.2"
   },
   "devDependencies": {
       "jest": "^29.7.0",
       "nodemon": "^3.1.4",
       "supertest": "^7.0.0"
   }
   ```

3. **Environment Variables**: Ensure that the necessary environment variables are set up. Create a `.env` file in the project root directory with the following content:

```dotenv
   PORT=3008
   MONGO_URL=<your_mongodb_connection_string>
   ```

   Replace `<your_mongodb_connection_string>` with your actual MongoDB connection string.

4. **Running the Application**: Start the server using the following command:

   ```bash
   npm start
   ```

   For development, you can use:

   ```bash
   npm run dev
   ```

   The server will start running on `http://localhost:3001`.


### Project Structure

- **app.js**: Entry point of the application. Sets up the Express server, connects to the database, and defines middleware and routes.
- **src/db/connect.js**: Contains the logic for connecting to the MongoDB database.
- **src/modules/notes/notes.model.js**: Defines the Mongoose schema and model for notes.
- **src/modules/notes/notes.controller.js**: Contains functions for creating, fetching, querying, and updating notes.
- **src/modules/notes/notes.route.js**: Defines the routes for note-related operations and maps them to controller functions.
- **src/routes/index.js**: Aggregates all application routes.
- **src/tests/test.js**: Contains integration tests for the API endpoints using Jest and Supertest.
- **.env**: Environment variables file for configuring the application.
- **package.json**: Lists the project dependencies and scripts.
- **README.md**: Documentation on how to set up and run the project.


## API Endpoints

- **POST /api/notes**: Creates a new note.
- **GET /api/notes/:id**: Fetches a note by ID.
- **GET /api/notes**: Queries notes by title substring.
- **PUT /api/notes/:id**: Updates an existing note.


## Testing the Application

To ensure that the API endpoints are working correctly and to verify their functionality, you can run integration tests using Jest and Supertest.

**Running Tests:**

1. **Install Dependencies**: Make sure you have installed all the required development dependencies.

   ```bash
   npm install
   ```

2. **Run Tests**: Execute the test suite to run the integration tests and generate coverage reports.

   ```bash
   npm test
   ```

   This command will run all the tests defined in `src/tests/test.js` using Jest. It will also generate a coverage report to show how much of your code is covered by the tests.

**Test File:**

- **src/tests/test.js**: Contains integration test cases for the API endpoints. The tests include:

   - **Creating a New Note**: Verifies that a note can be created successfully and returns the correct status and data.
   - **Fetching a Note by ID**: Checks if a note can be retrieved by its ID and ensures that the correct note is returned.
   - **Querying Notes by Title Substring**: Tests if notes can be queried based on a title substring and verifies the response format.
   - **Updating a Note**: Validates that a note can be updated correctly and checks the updated data.

**Example Test Case Output:**

Running `npm test` will produce output similar to this:
> jest

 PASS  src/tests/test.js
   ✓ Creating a New Note (20 ms)
   ✓ Fetching a Note by ID (15 ms)
   ✓ Querying Notes by Title Substring (10 ms)
   ✓ Updating a Note (25 ms)

Test Suites: 1 passed, 1 total
Tests:       4 passed, 4 total
Snapshots:   0 total
Time:        1.234 s
````