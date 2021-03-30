# moodify :purple_heart:	
## *Soul food for every mood*

### About

**moodify** is a React based web app which takes the input on how you feel at the moment (by either typing in the keyword(s) or selecting one of the moods from the list) and returns Spotify playlists based on your mood.

You can access the web app using the [following link](https://moodify-webapp.herokuapp.com/) or check how the app works in the gif below.

![](moodify.gif)

### Technologies & stuff

- This project was bootstrapped with [create-react-app](https://github.com/facebook/create-react-app)

- We created a **developer app** on Spotify and used the **client credentials flow** to obtain app authorization (for that matter an **environment variable** was used to safely store sensitive data)

- By playing around with **Spotify's Search API** we managed to access the playlists and extract and display the image, title and creator of each playlist

- We managed to get the **Search API query** to dynamically change based on the value of the search state which is changed when a user types the words in the input field or clicks on the mood buttons

- To get that nice and responsive layout we used a few tricks from the **CSS Grid** sleeve

- Finally, we sucessfully deployed our web app to Heroku