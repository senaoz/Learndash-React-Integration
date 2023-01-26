# LearnDash Progress App

This application is built using React that displays the user's progress data and a list of active courses from a LearnDash enabled WordPress site.

## Installation

Clone the repository
```
git clone https://github.com/<username>/learndash-progress-app.git
```
Install the dependencies

```
npm install
```
Create a .env file in the root directory and add the following environment variables:
```
REACT_APP_USERNAME=<your_api_username>
REACT_APP_PASS=<your_api_password>
REACT_APP_URL=<your_wordpress_site_url>
```

Run the app
```
npm start
```

## Features

- Displays a table of user progress data.
- Displays a list of active courses.
- Includes a search filter feature for the active course table.
- The app uses the WordPress REST API and the LearnDash plugin API

## Note
This application assume that you have already installed the LearnDash plugin on your WordPress site, and that the appropriate configuration has been done.

