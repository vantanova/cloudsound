<h1 align="center">
CloudSound
</h1>


---

**CloudSound** is a clone of **[SoundCloud](https://www.soundcloud.com/)**.
It is a clone made with React and Redux that utilizes session store to carry information throughout
the application. 
* Users can **log in** or **sign up** to access some functionality the site.
* A logged in user has the ability to **post songs and create a profile**.
* Posted songs can be **commented on**.  
* Images and audio are uploaded to **aws**.

<p align="center">
<img src="https://user-images.githubusercontent.com/70561117/106428050-315deb80-641d-11eb-9f6a-4a18fc5ba099.PNG">
</p>

<h2>Try the site live: <a href=https://cloud-sound-react.herokuapp.com//>Here</a> <b>|</b> Check out <a href="https://github.com/vantanova/cloudsound/wiki">documentation</a></h2>

## How to run the site locally

- Clone the repo
- ```cd``` into both the back and front end
- Use the command ```npm install``` to install all dependencies 
- Make a copy of the .env.example file and edit to match local db configuration
- Create the database and user in psql
  * Run all migrations with ```npx dotenv sequelize db:migrate```
  * Seed all data with ```npx dotenv sequelize db:seed:all```
- Use the start script ```npm start``` to run the server on both back and frontend 
- Setup aws with own user and access keys. 

## Technologies used in CloudSound
<p align="left">
<a href="https://sequelize.org/">
<img src="https://img.shields.io/badge/Sequelize-v6.3.5-blue">
<a/>

<a href="https://expressjs.com/">
<img src="https://img.shields.io/badge/Express-v4.17.1-blue">
<a/>
   
<a href="https://pugjs.org/api/getting-started.html">
<img src="https://img.shields.io/badge/Pug-v3-blue">
<a/>
  
<a href="https://reactjs.org/">  
<img src="https://img.shields.io/badge/React-v17.0.1-blue">
<a/>

<a href="https://www.heroku.com/">
<img src="https://img.shields.io/badge/Heroku-hosting-blue">
<a/>
</p>

**Sequelize** was used to store and easily manage data with its amazing 
data models and migrations.

**Express JS** was the framework and it reduced a ton of boiler plate 
code, freeing time to implement more features. 

**npm** was the software registry, and within it we installed many packages;
some notable examples include:
* morgan, 
* express-validator,
* *and more* 

**React** was used to render the frontend with functional components. 

**Heroku** is the web hosting app of choice that allowed us to 
run our app on the cloud! 

**Honorable Mentions** are the developement tools that made life 
much more enjoyable! 
* Postman made route testing very easy and fun!
* Postbird, its wonderful GUI made all the difference!

## Developer

<table style="width:100%">
  <tr>
    <th><a href="https://github.com/vantanova" rel="nofollow"><img src="https://avatars1.githubusercontent.com/u/70561117?s=460&u=85a68af6fc136866eb4f33ee657aeb751aba9935&v=4" height="auto" width="100"></a></th>
  </tr>
  <tr>
    <td>Antonio A.</td>

  </tr>
  <tr>
    <td><a href="https://github.com/vantanova">@vantanova</a></td>
  </tr>
</table>

<p> <i>Thank you for reading the project README ❤️</i> </p>

