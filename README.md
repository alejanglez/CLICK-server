# CLICK

## HANDICAPS

- Signup/Login - MVP
- Authentication - MVP
- Requested services/ Accepted services/ Pending services - MVP
- Rating/Comments - MVP
- Categories filter – MVP
- Images and uploading files– MVP
- Social media connection -BACKLOG
- Distance -BACKLOG
- OTP -BACKLOG
- Calendar -BACKLOG
- Payment platform –BACKLOG
- Private message and contact – BACKLOG


## Description

This is an app that conecting familily´s children who need support with academic services of providers.

## User Stories

-  **404:** As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault
-  **User Signup:** As an anon I can sign up in the platform so that I can start creating and managing my profile
-  **User Login:** As a user I can login to the platform so that I can start creating and managing my profile
-  **User Logout:** As a user I can logout from the platform so no one else can modify my information
-  **Provider Signup:** As an anon I can sign up in the platform so that I can start creating and managing my profile
-  **Provider Login:** As a user I can login to the platform so that I can start creating and managing my profile
-  **Provider Logout:** As a user I can logout from the platform so no one else can modify my information
-  **User Requested Service** As a user I can request a services to the provider
-  **User Accepted Service** As a user I am able to see accept/decline services that are pending.
-  **User Old Requested Service** As a user I am able to see accept/decline services that are pending.
-  **Provider Requested Service** As a provider I can see a request to the provider
-  **Provider Accepted Service** As a provider I able to accept/decline services that are pending.
-  **Provider Old Service** As a provider I am able to see request that are pending.
-  **User Ratings** As a user/provider I can rate the service or the client
-  **Provider Ratings** As a user/provider I can rate the service or the client

<br>


# Client / Frontend

## React Router Routes (React App)
| Path                      | Component                      | Permissions | Behavior                                                     |
| ------------------------- | --------------------           | ----------- | ------------------------------------------------------------ |
| `/`                       | SplashPage                     | public `<Route>`            | Home page                                        |
| `/signup`                 | SignupPage                     | anon only  `<AnonRoute>`    | Signup form, link to login, navigate to homepage after signup |
| `/login`                  | LoginPage                      | anon only `<AnonRoute>`     | Login form, link to signup, navigate to homepage after login  |
| `/logout`                 | n/a                            | user only `<PrivateRoute>`  | Navigate to homepage after logout, expire session             |
| `/profile/series`         | NavBar, ElementList, FooterBar | user only `<PrivateRoute>`  | Shows all tv series on backlog                                |
| `/profile/films`          | NavBar, ElementList, FooterBar | user only `<PrivateRoute>`  | Shows all films on backlog                                    |
| `/profile/games`          | NavBar, ElementList, FooterBar | user only `<PrivateRoute>`  | Shows all games on backlog                                    |
| `/search/series`          | SearchForm, SearchResults      | user only  `<PrivateRoute>` | Search a tv series to be added                                |
| `/search/films`           | SearchForm, SearchResults      | user only `<PrivateRoute>`  | Search a film to be added                                     |
| `/search/games`           | SearchForm, SearchResults      | user only `<PrivateRoute>`  | Search a game to be added                                     |
| `/add/:id`                | ElementInfo                    | user only `<PrivateRoute>`  | Add an element to the backlog                                 |
| `/profile`                | Profile, Stats                 | user only  `<PrivateRoute>` | Check profile with stat information                           |
| `/done/series`            | Done list for Series           | user only  `<PrivateRoute>` | Shows all tv series finished                                  |
| `/done/films`             | Done list for films            | user only `<PrivateRoute>`  | Shows all films finished                                      |
| `/done/games`             | Done list for games            | user only `<PrivateRoute>`  | Shows all videogames finished                                 |
          

## Components

- LoginPage

- SignupPage

- NavBar

- FooterBar

- BackBar

- ElementList

- SearchForm

- SearchResults

- ElementInfo

- Stats

## configs

  - Claudinary.config.js
  - Db.config.js
  - Session.config.js


## Services

- Auth Service
  - auth.login(user)
  - auth.signup(user)
  - auth.logout(user)
  - auth.login(provider)
  - auth.signup(provider)
  - auth.logout(provider)
  

- profile Service
  - profile.filter(type, status) 
  - profile.detail(id)
  - profile.delete(id)
  - profile.update(id)
  
- External API
  - API for location
  - API for calendar

<br>


# Server / Backend


## Models

USER model

```javascript
{
  username: {type: String, required: true, unique: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  platform: [platforms]
  elements: [{type: Schema.Types.ObjectId,ref:'Media'}]
}
```

PROVIDER model

```javascript
{
  username: {type: String, required: true, unique: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  platform: [platforms]
  elements: [{type: Schema.Types.ObjectId,ref:'Media'}]
}
```

REQUESTED SERVICE model

```javascript
 {
   title: {type: String, required: true},
   type: {type: String, required: true},
   done: {type: Boolean, required: true},
   platform: {type: String, required: true},
   image: {type: String, required: true}
   description: {type, String, required: true}
   user: {type: Schema.Types.ObjectId,ref:'User'},
 }
```

ACCEPTED SERVICE model

```javascript
 {
   title: {type: String, required: true},
   type: {type: String, required: true},
   done: {type: Boolean, required: true},
   platform: {type: String, required: true},
   image: {type: String, required: true}
   description: {type, String, required: true}
   user: {type: Schema.Types.ObjectId,ref:'User'},
 }
```


<br>


## API Endpoints (backend routes)

| HTTP Method | URL                           | Request Body                 | Success status | Error Status | Description                                                  |
| ----------- | ---------------------------   | ---------------------------- | -------------- | ------------ | ------------------------------------------------------------ |
| GET         | `/auth/profile    `           | Saved session                | 200            | 404          | Check if user is logged in and return profile page           |
| POST        | `/auth/signup`                | {name, email, password}      | 201            | 404          | Checks if fields not empty (422) and user not exists (409), then create user with encrypted password, and store user in session |
| POST        | `/auth/login`                 | {username, password}         | 200            | 401          | Checks if fields not empty (422), if user exists (404), and if password matches (404), then stores user in session    |
| POST        | `/auth/logout`                | (empty)                      | 204            | 400          | Logs out the user                                            |
| GET         | `/profile`                    |                              |                | 400          | Show series elements                                         |
| GET         | `/profile/:id`                |                              |                |              | Show specific element                                 
| PUT         | `/profile/:id`                |                              | 200            | 400          | edit element                                                 |
| DELETE      | `/profile/:id`                |                              | 201            | 400          | delete element                                               |
| POST        | `/ask`                        |                              | 204            | 400          | Ask for service                                              |
| GET         | `/ask/succeed`                |                              | 204            | 400          | Succeed                                                      |
| GET         | `/requestedservice/list/:id`  |                              | 204            | 400          | Show specific element                                        |
| GET         | `/requestedservice/list       |                              | 204            | 400          | Show series elements                                         |
| POST        | `/acceptedservice/list/:id`   |                              | 204            | 400          | Show specific element                                        |
| GET         | `/acceptedservice/list        |                              | 204            | 400          | Show series elements                                         |
<br>


## Links


### Trello


### Git

The url to your repository and to your deployed project

[Client repository Link]

[Server repository Link]

[Deployed App Link]

### Slides

The url to your presentation slides/wire frames:
https://www.figma.com/file/Ct8RS0DhspWB4R8swQ0jx7/Project-3-%7C-Click?node-id=0%3A1
