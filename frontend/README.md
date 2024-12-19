# Student Management System

This project is a simple Student Management System built using React and Supabase. It allows users to add, search, and delete student records.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Components](#components)
- [Supabase Setup](#supabase-setup)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/student-management-system.git
   ```
2. Navigate to the project directory:
   ```sh
   cd student-management-system
   ```
3. Install the dependencies:
   ```sh
   npm install
   ```

## Usage

1. Start the development server:
   ```sh
   npm start
   ```
2. Open your browser and navigate to `http://localhost:3000`.

## Components

### Redux Store

The `store.js` file sets up the Redux store for state management. It uses Redux Toolkit's `configureStore` method to combine reducers.

### StudentSlice

The `studentSlice.js` file contains the Redux slice for managing student state. It includes actions and reducers for adding, deleting, and fetching students.
### Header

The `Header` component includes a search bar and user profile information. It also contains a button to add a new student.

### StudentTable

The `StudentTable` component displays a list of students fetched from Supabase. It includes functionality to search and delete students.

### Sidebar

The `Sidebar` component provides navigation links to different sections of the application.

### NotFound

The `NotFound` component displays a 404 error message for undefined routes.

## Supabase Setup

1. Create a Supabase account and project at [supabase.io](https://supabase.io/).
2. Obtain your Supabase URL and Anon Key from the project settings.
3. Replace the placeholders in `supabaseClient.js` with your Supabase project details:
   ```javascript
   const SUPABASE_URL = "your-supabase-url";
   const SUPABASE_ANON_KEY = "your-supabase-anon-key";
   ```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License.
