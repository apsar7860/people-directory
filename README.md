# Two-Page Web App

This project is a two-page web application built using React, TanStack Table, React Hook Form, Zod, and styled with Tailwind CSS. The application features a Dashboard page and a People Directory page with a fully interactive table.

## Technologies Used

- **React**: JavaScript library for building user interfaces.
- **TanStack Table**: For creating the interactive table with sorting, filtering, and global search functionality.
- **React Hook Form**: For handling form submission and validation.
- **Zod**: For form validation.
- **Tailwind CSS**: For styling the application.
- **Faker**: For generating initial data.

## Features

### Page 1: Dashboard

- **Navbar and Sidebar**: Includes a responsive navbar and sidebar.
- **Welcome Message**: Displays a simple welcome message.

### Page 2: People Directory

- **Interactive Table**: Displays a list of people with the following features:
  - **Clickable Rows**: Clicking a row opens a side pane showing detailed information about the person.
  - **Sortable Columns**: Columns are sortable with three states (initial, ascending, descending).
  - **Editable Rows**: Each row includes an Edit button that opens a form to update the person’s details using React Hook Form and Zod.
  - **Filter Options**: Filter by role or team.
  - **Global Search**: A search bar for filtering rows based on a substring match.
  - **Add Member**: Opens a form to add a new entry to the table.
  - **Delete Entry**: Each row includes a Delete button to remove the entry.

### URL State Management

- **Search Query**: When searching for a name, the URL updates to reflect the query, e.g., `app.people.com/people?query=Olivia`.
- **Filter State**: URL updates based on selected filter options.

## Installation

To get started with this project, follow these steps:

1. **Clone the Repository**

   ```bash
   git clone https://github.com/apsar7860/people-directory
   cd people-directory

# This is the UI of Web App:

![Screenshot 2024-08-27 104159](https://github.com/user-attachments/assets/f2673e09-990e-4b2d-9ddf-bfd433df2cb2)

# This is People Directory:

![Screenshot 2024-08-27 104232](https://github.com/user-attachments/assets/1084a2d8-1f6f-4a48-b33e-d7b81acaa9f4)

# This is where you can Add, Edit, Delete, Update Members:

![Screenshot 2024-08-27 104256](https://github.com/user-attachments/assets/780662bc-d73a-450a-a6ff-c54d7cd57326)

# When the search bar is used to search for a name like 'Dana Cronin' 
The URL should reflect it as -> "http://localhost:3000/people?query=dana%20cronin"

![Screenshot 2024-08-27 104352](https://github.com/user-attachments/assets/b5650c03-8a03-44b7-8ea0-d4a9affd7bcf)
