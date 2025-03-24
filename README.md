
# Mymovie App - Frontend

Mymovie is a web application that allows users to browse and book movie tickets. The frontend of the app is built using React, Redux, and Ant Design, providing a seamless and responsive user experience.

## Features

- **Browse Movies**: Users can browse a list of available movies, view details such as title, language, and poster.
- **Book Tickets**: Users can select a movie, choose a showtime, and book tickets by selecting their preferred seats.
- **User Profile**: Users can view their booking history and details in their profile.
- **Payment Integration**: Secure payment processing using Stripe.
- **Responsive Design**: The app is designed to be responsive and works well on both desktop and mobile devices.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Redux**: A predictable state container for JavaScript apps.
- **React Router**: A library for routing in React applications.
- **Ant Design**: A UI library for React with a set of high-quality components.
- **Axios**: A promise-based HTTP client for making API requests.
- **Stripe**: A payment processing platform.

UI Components
Home Page
Movie List: Displays a list of available movies with their posters, titles, and languages.
Search Bar: Allows users to search for movies by title.
Book Show Page
Show Details: Displays details of the selected show, including the movie title, language, theatre name, and address.
Seat Selection: Allows users to select seats for the show.
Payment: Integrates with Stripe for secure payment processing.
Profile Page
Booking History: Displays a list of past bookings with details such as movie title, theatre name, date, time, and seats.
Booking Details: Shows detailed information about each booking, including the booking ID and ticket price.
API Calls
The frontend makes API calls to the backend to fetch data and perform actions. The API calls are organized in the src/apicalls directory.

User API Calls
RegisterUser: Registers a new user.
LoginUser: Logs in a user.
GetCurrentUser: Fetches the current logged-in user's details.

