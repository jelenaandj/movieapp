json-server --watch db.json --port 3001

Movies App
Create a Single Page Application in React
 For data use JSON-Server (movies.json, genres.json)
 Design (Desktop layout provided, Tablet - 2 columns, Mobile - 1 column): https://www.figma.com/file/TJbaey4R7qE9kORG2CsiGe/Movie-Listing-Web-App---playground?type=design&node-id=401%3A6827&mode=design&t=gKhBi3pKs1Hi0gU4-1
 The application contains five pages:
All movies, Favorites, Add new movie, Preview page, 404
 ALL MOVIES: View all movies that are currently in the database.
Initially display 8 movies, and by clicking on the "Show more" button  add the next 8 movies to the list. 
Search field searches by movie name. 
Filter pills searches by genre. If the user presses the filter pill, the search field is cleared and then the search is related to the genre. If the user enters a value in the search (by movie name) filter pill "All Movies" becomes active.
FAVORITES: Shows all movies marked with a star (favorites)
 ADD NEW MOVIE: Form for adding a new movie.
Mandatory fields are marked with an asterisk, Img_url is not a mandatory field, and if it is not filled in, use a placeholder. 
Before submission, the form is validated and unfilled (mandatory) fields are marked as in the design. After successful form submission, the user is redirected to the ALL MOVIES page.
PREVIEW PAGE: Preview of the selected movie (url: /[movie-title])
 404: Use for non-existent routes.
 
- The "Favorites" button ) is clickable on every page (All Movies, Favorites, Preview)
Technologies (React / create-react-app, JSON-Server, Router, Redux, SCSS, Typescript)
 
BONUS TASKS:
 - List 6 movies on the tablet (instead of 8) and add the next 6 by clicking on "Show more".
 - Respect both types of filters when searching on the ALL MOVIES page
 - Edit button on the movie tab
 - Adding the "NEW" flag for the just added movie, lasting 10 minutes.
After ten minutes the flag disappears.
 
SUPER-EXTRA BONUS TASK:
 - Register and Login page:
 - Visitors cannot see Favorites and Add new movie (private routes).
 - Logged-in users: can see their own list of movies, as well as FAVORITES and ADD NEW MOVIE page.