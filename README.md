# CLICK

## Features

- Signup/Login - MVP
- Authentication - MVP
- Requested services/ Accepted services/ Pending services - MVP
- Rating/Comments - MVP
- Categories/Day filter – MVP
- Images and uploading files– MVP
- Notifications only by toggleling icon - MVP

- Dates filter - BACKLOG
- Show request details - BACKLOG
- Social media connection -BACKLOG
- Distance - Location -BACKLOG
- Calendar - Availability -BACKLOG
- Payment platform –BACKLOG
- Private message and contact – BACKLOG
- Notifications by email - BACKLOG
- OTP - One time password -BACKLOG


## Description

This is an app that connects familily´s children who need support with academic services of providers.

## User Stories

-  **404:** As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault
-  **User Signup:** As an anon I can sign up in the platform so that I can start creating and managing my profile
-  **User Login:** As a user I can login to the platform so that I can start creating and managing my profile
-  **User Logout:** As a user I can logout from the platform so no one else can modify my information
-  **User Profile CRUD:** As a user I can see and edit my profile.
-  **Provider Profile CRUD:** As a provider I can see and edit my profile.
-  **Provider Signup:** As an anon I can sign up in the platform so that I can start creating and managing my profile
-  **Provider Login:** As a user I can login to the platform so that I can start creating and managing my profile
-  **Provider Logout:** As a user I can logout from the platform so no one else can modify my information
-  **User Requested Service** As a user I can request a services to the provider
-  **User Accepted Requested Service** As a user I am able to see accepted services.
-  **Provider Requested Service** As a provider I can see a request of the user.
-  **Provider Accepted Service** As a provider I able to accept/decline services that are pending.
-  **Provider Accepted Requested Service** As a provider I am able to see accepted services.
-  **User Ratings** As a user/provider I can rate the service
-  **Provider Ratings** As a user/provider I can rate the client

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

- LoginPage/annon view

- HomePage/annon view

- UserSignupPage/annon view
- ProviderSignupPage/annon view

- FooterBarAnnon
          </Login>
          </SignupUSer>
          </SignupProvider>
          </About>
 - FooterBarPrivateUSer
          </Feed>
          </RequestedService>
          </Userprofile>
          </Setting>
 - FooterBarPrivateProvider
          </Feed>
          </RequestedService>
          </Userprofile>
          </Setting> 
          
- UserProfile
          </header>
          </about>
          </reviews>
          </Editbutton>
          </footer>
- ProviderProfile
          </header>
          </about>
          </aptitudes>
          </reviews>
          </Editbutton>
          </footer>
- UserProfileEditing
- ProviderProfileEditing

- UserRequesedServices
          <shearchform>
          </listRequestedservice> 
                    </SingleRequestedservice> 
- ProviderRequesedServices
          <shearchform>
          </listRequestedservice>
                    </SingleRequestedservice>     


- Feed//UserPrivate
- About//Annon

- UserAskForm//UserPrivate

- Review
          </Ratings>


## configs

  - Claudinary.config.js
  - Db.config.js


## Services

- User Auth Service
  - auth.login(user)
  - auth.signup(user)
  - auth.logout(user)
  
- Provider Auth Service
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
    firtName: { type: String, required: true, maxlength: 20 },
    lastName: { type: String, required: true, maxlength: 20 },
    email: { type: String, required: true },
    passwordHash: { type: String, required: true, minlength: 6 },
    address: { type: String, required: true, maxlength: 30 },
    about: { type: String, maxlength: 200},
    imageUrl: String,
  },
  {
    timestamps: true,
  }
);
```

PROVIDER model

```javascript
  {
    firtName: { type: String, required: true, maxlength: 20 },
    lastName: { type: String, required: true, maxlength: 20 },
    email: { type: String, required: true },
    passwordHash: { type: String, required: true, minlength: 6 },
    address: { type: String, required: true, maxlength: 30 },
    about: { type: String, maxlength: 200},
    lessonType:{
      type: String,
      enum: [
      "On line",
      "face to face",
        ],
     required: [true],
   },
    imageUrl: String,
    serviceCat: {
      type: String,
      enum: [
        "academic support",
        "informatics",
        "guitar lessons",
        "piano lessons",
        "english lessons",
        "math lessons",
        "baby sitting",
        ],
      required: [true],
    },
    aptitudes: {
      type: String,
      enum: [
        "driving licence",
        "animal lover",
        "first aid",
        "sports",
        ],
      required: [true],
    },
    rate: { 
     type: Number,
     required: [true],
  },
  facebookUrl: String,
  {
    timestamps: true,
  }
);
```

REQUESTED SERVICE model

```javascript
  {
    userId: { type: mongoose.ObjectId, ref: "User", required: true },
    providerId: { type: mongoose.ObjectId, ref: "Provider", required: true },
    quantity: { 
    type: Number, default: 0,
        },
    day: { 
     type: Number,
      enum: [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "23",
        "24",
        "25",
        "26",
        "27",
        "28",
        "29",
        "30",
        "31",
        ],
        },
     month: { 
     type: String,
      enum: [
        "Jan",
        "Feb",
        "March",
        "April",
        "May",
        "June",
        "July",
        "Aug",
        "Sept",
        "Oct",
        "Nov",
        "Dec",
        ],
        }
      year: { 
     type: Number,
      enum: [
        "2020",
        "2021",
        ],
        }       
     hours: Number,
      enum: [
        "1",
        "2",
        "3",
        "4",
        "5",
        ],
        }       
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);
```

ACCEPTED SERVICE model

```javascript
  {
    requestedserviceId: { type: mongoose.ObjectId, ref: "RequestedService", required: true },
    totalPrice: type: number,
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);
```

SESSION

const{ObjectId}=schema.types.OjectId,
  {
    userId: {type:ObjectId, ref:"User"},
    createdAt: {
        type: Date,
        default: Date.now(),
        index: {expires: 60*1000*60} //One hour
    }
  }
);

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
