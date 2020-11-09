# CLICK-server

## Features

- Signup/Login - MVP
- Authentication - MVP
- Requested services/ Accepted services/ Pending services (decline) - MVP
- Rating/Comments - MVP
- Categories filter – MVP
- Images and uploading files– MVP
- Notifications only by toggleling icon - MVP

- OTP - One time password -BACKLOG
- Dates filter - BACKLOG
- Show request details - BACKLOG
- Social media connection -BACKLOG
- Distance - Location -BACKLOG
- Calendar - Availability -BACKLOG
- Payment platform –BACKLOG
- Private message and contact – BACKLOG
- Notifications by email - BACKLOG

## Description

This is an app that connects familily´s children who need support with academic services of providers.

## User Stories

- **404:** As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault
- **User Signup:** As an anon I can sign up in the platform so that I can start creating and managing my profile
- **User Login:** As a user I can login to the platform so that I can start creating and managing my profile
- **User Logout:** As a user I can logout from the platform so no one else can modify my information
- **User Profile CRUD:** As a user I can see and edit my profile.
- **Provider Profile CRUD:** As a provider I can see and edit my profile.
- **Provider Signup:** As an anon I can sign up in the platform so that I can start creating and managing my profile
- **Provider Login:** As a user I can login to the platform so that I can start creating and managing my profile
- **Provider Logout:** As a user I can logout from the platform so no one else can modify my information
- **User Requested Service** As a user I can request a services to the provider
- **User Accepted Requested Service** As a user I am able to see accepted services.
- **Provider Requested Service** As a provider I can see a request of the user.
- **Provider Accepted Service** As a provider I able to accept/decline services that are pending.
- **Provider Accepted Requested Service** As a provider I am able to see accepted services.
- **User Ratings** As a user/provider I can rate the service
- **Provider Ratings** As a user/provider I can rate the client

<br>

# Client / Frontend

## React Router Routes (React App)

| Path                            | Component                                   | Permissions                    | Behavior                                                      |
| ------------------------------- | ------------------------------------------- | ------------------------------ | ------------------------------------------------------------- |
| `/`                             | Welcome                                     | public `<Route>`               | Home page                                                     |
| `/user/signup`                  | SignupPage                                  | anon only `<AnonRoute>`        | Signup form, link to login, navigate to homepage after signup |
| `/user/login`                   | LoginPage                                   | anon only `<AnonRoute>`        | Login form, link to signup, navigate to homepage after login  |
| `/user/logout`                  | LogOut                                      | user only `<PrivateRoute>`     | Navigate to homepage after logout, expire session             |
| `/provider/signup`              | SignupPage                                  | anon only `<AnonRoute>`        | Signup form, link to login, navigate to homepage after signup |
| `/provider/login`               | LoginPage                                   | anon only `<AnonRoute>`        | Login form, link to signup, navigate to homepage after login  |
| `/provider/logout`              | LogOut                                      | provider only `<PrivateRoute>` | Navigate to homepage after logout, expire session             |
| `/provider/profile/:id`         | Header, About, Reviews, Edit button, footer | provider only `<PrivateRoute>` | Shows single provider profile                                 |
| `/provider/profile/:id/edit`    | Form, footer                                | provider only `<PrivateRoute>` | Edit provider profile                                         |
| `/provider/requestedservice`    | ElementList, Footer                         | provider only `<PrivateRoute>` | Shows all requested services                                  |
| `/provider/acceptedservice`     | ElementList, Footer                         | provider only `<PrivateRoute>` | Shows all accepted services                                   |
| `/user/profile/:id`             | Header, About, Reviews, Edit button, footer | user only `<PrivateRoute>`     | Shows single user profile                                     |
| `/user/profile/:id/edit`        | Form, footer                                | user only `<PrivateRoute>`     | Edit user profile                                             |
| `/user/profiles/list-providers` | shearchform, ElementList, Footer            | user only `<PrivateRoute>`     | Shows all profiles from providers                             |
| `/user/requestedservice`        | ElementList, Footer                         | user only `<PrivateRoute>`     | Shows all requested services                                  |
| `/user/acceptedservice`         | ElementList, Footer                         | user only `<PrivateRoute>`     | Shows all accepted services                                   |
| `/user/requestservice`          | Form, footer                                | user only `<PrivateRoute>`     | Show the form to request a sevice                             |
| `/user/requestservice/success`  | Text                                        | user only `<PrivateRoute>`     | Show success message after requesting                         |
| `/about`                        | Text                                        | public `<Route>`               | About page                                                    |

## Components

- LoginPage/annon view

- HomePage/annon view

- UserSignupPage/annon view
- ProviderSignupPage/annon view

- FooterBarAnnon

  - `</Login>`
  - `</SignupUSer>`
  - `</SignupProvider>`
  - `</About>`

- FooterBarPrivateUSer

- `</Feed>`
- `</RequestedService>`
- `</Userprofile>`
- `</Setting>`
- FooterBarPrivateProvider
- `</Feed>`
- `</RequestedService>`
- `</Userprofile>`
- `</Setting>`
- UserProfile
  - `</header>`
  - `</about>`
  - `</reviews>`
  - `</Editbutton>`
  - `</footer>`
- ProviderProfile
  - `</header>`
  - `</about>`
  - `</aptitudes>`
  - `</reviews>`
  - `</Editbutton>`
  - `</footer>`
- UserProfileEditing
- ProviderProfileEditing

- UserRequesedServices
  - `<shearchform>`
  - `</listRequestedservice>`
  - `</SingleRequestedservice>`
- ProviderRequesedServices

  - <shearchform>
          - ```</listRequestedservice>```
          - ```</SingleRequestedservice>```

- Feed//UserPrivate
- About//Annon

- UserAskForm//UserPrivate

- Review
  - </Ratings>

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
- User profile Service

  - profile.detail(id)
  - profile.delete(id) - private
  - profile.update(id) - private

- Provider profile Service

- profile.filter(type, status)
- profile.detail(id)
- profile.delete(id)- private
- profile.update(id)- private

- Requested services
  - RequestedServices.create(type, status)
  - RequestedServices.list(id)
  - RequestedServices.detail(id)
- Accepted services
- AcceptedServices.create(type, status)
- AcceptedServices.list(id)
- AcceptedServices.detail(id)

- External API
  - API for location
  - API for calendar

<br>

# Server / Backend

## Models

USER model

```javascript
{
    firstName: { type: String, required: true, maxlength: 20 },
    lastName: { type: String, required: true, maxlength: 20 },
    email: { type: String, required: true },
    passwordHash: { type: String, required: true, minlength: 6 },
    address: { type: String, required: true, maxlength: 30 },
    about: { type: String, required: true, maxlength: 200 },
    imageUrl: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png",
    },
    role: { type: String, default: "user" },
  },
  {
    timestamps: true,
  }
```

PROVIDER model

```javascript
  {
    firstName: { type: String, required: true, maxlength: 20 },
    lastName: { type: String, required: true, maxlength: 20 },
    email: { type: String, required: true },
    passwordHash: { type: String, required: true, minlength: 6 },
    address: { type: String, required: true, maxlength: 30 },
    about: { type: String, required: true, maxlength: 200 },
    imageUrl: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png",
    },
    lessonType: { type: String, enum: ["Online", "In-person"] },
    serviceCat: {
      type: String,
      required: [true],
      enum: [
        "Academic Support",
        "Informatics",
        "Guitar Lessons",
        "Piano Lessons",
        "English Lessons",
        "Math Lessons",
        "Baby Sitting",
      ],
    },
    aptitudes: [
      {
        type: String,
        enum: ["driving licence", "animal lover", "first aid", "sports"],
      },
    ],
    rate: {
      type: Number,
      default: 0,
    },
    facebookUrl: {
      type: String,
    },
    // role: { type: String, default: "provider" },
  },
  {
    timestamps: true,
  }
```

REQUESTED SERVICE model

```javascript
  {
    userId: { type: mongoose.ObjectId, ref: "User", required: true },
    providerId: { type: mongoose.ObjectId, ref: "Provider", required: true },
    quantity: { type: Number, default: 0 },
    decline: { type: Boolean, default: false, required: true },
  },
  {
    timestamps: true,
  }
```

ACCEPTED SERVICE model

```javascript
 {
    userId: { type: String, required: true },
    providerId: { type: String, required: true },
    requestedServiceId: {
      type: mongoose.ObjectId,
      ref: "RequestedService",
      required: true,
    },
    quantity: { type: Number, default: 0 },
    serviceCat: {
      type: String,
      required: [true],
      enum: [
        "Academic Support",
        "Informatics",
        "Guitar Lessons",
        "Piano Lessons",
        "English Lessons",
        "Math Lessons",
        "Baby Sitting",
      ],
    },
    lessonType: { type: String, enum: ["Online", "In-person"] },
    rate: { type: Number, default: 0 },
    totalPrice: { type: Number, default: 0 },
    userFirstName: { type: String, required: true, maxlength: 20 },
    userLastName: { type: String, required: true, maxlength: 20 },
    providerFirstName: { type: String, required: true, maxlength: 20 },
    providerLastName: { type: String, required: true, maxlength: 20 },
    userImageUrl: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png",
    },
    providerImageUrl: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png",
    },
  },
  {
    timestamps: true,
  }
```

SESSION

const{ObjectId}=schema.types.OjectId,
{
userId: { type: ObjectId, ref: "User" },
providerId: { type: ObjectId, ref: "Provider" },
createdAt: {
type: Date,
default: Date.now(),
index: { expires: 60 _ 60 _ 24 },
},
}

<br>

## API Endpoints (backend routes)

| HTTP Method | URL                                          | Request Body            | Success status | Error Status | Description                                                                                                                     |
| ----------- | -------------------------------------------- | ----------------------- | -------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| GET         | `/provider/session/:accessToken `            | Saved session           | 200            | 404          | Check if user is logged in and return profile page                                                                              |
| POST        | `/provider/signup`                           | {name, email, password} | 201            | 404          | Checks if fields not empty (422) and user not exists (409), then create user with encrypted password, and store user in session |
| POST        | `/provider/login`                            | {username, password}    | 200            | 401          | Checks if fields not empty (422), if user exists (404), and if password matches (404), then stores user in session              |
| POST        | `/provider/logout`                           | (empty)                 | 204            | 400          | Logs out the user                                                                                                               | POST | `/provider/image` | (image) | 204 | 400 | upload image |
| GET         | `/user/session/:accessToken `                | Saved session           | 200            | 404          | Check if user is logged in and return profile page                                                                              |
| POST        | `/user/signup`                               | {name, email, password} | 201            | 404          | Checks if fields not empty (422) and user not exists (409), then create user with encrypted password, and store user in session |
| POST        | `/user/login`                                | {username, password}    | 200            | 401          | Checks if fields not empty (422), if user exists (404), and if password matches (404), then stores user in session              |
| POST        | `/user/logout`                               | (empty)                 | 204            | 400          | Logs out the user                                                                                                               | POST | `/user/image` | (image) | 204 | 400 | upload image |
| GET         | `/provider/profile/list`                     |                         | 200            | 500          | Show series elements                                                                                                            |
| GET         | `/provider/profile/list/:Shearch`            |                         | 200            | 500          | Show Provider Feed                                                                                                              |
| GET         | `/provider/profile/list/:providerid`         |                         | 200            | 500          | Show specific element                                                                                                           |
| PUT         | `/provider/profile/:id`                      |                         | 200            | 500          | Edit specific element                                                                                                           |
| DELETE      | `/provider/profile/:id`                      |                         | 201            | 500          | delete element                                                                                                                  |  |
| GET         | `/provider/profile/:providerid`              |                         |                |              | Show specific element                                                                                                           |
| PUT         | `/provider/profile/:providerid`              |                         | 200            | 500          | Edit specific element                                                                                                           |
| PUT         | `/provider/profile/:providerid/editpassword` |                         | 200            | 500          | Edit specific password                                                                                                          |
| DELETE      | `/provider/profile/:providerid`              |                         | 201            | 500          | delete element                                                                                                                  |
| GET         | `/user/profile/list`                         |                         | 200            | 500          | Show series elements                                                                                                            |
| GET         | `/user/profile/list/:Userid`                 |                         | 200            | 500          | Show specific element                                                                                                           |
| PUT         | `/user/profile/:id`                          |                         | 200            | 500          | Edit specific element                                                                                                           |
| DELETE      | `/user/profile/:id`                          |                         | 201            | 500          | delete element                                                                                                                  |
| GET         | `/user/profile/:Userid`                      |                         |                |              | Show specific element                                                                                                           |
| PUT         | `/user/profile/:Userid`                      |                         | 200            | 500          | Edit specific element                                                                                                           |
| PUT         | `/user/profile/:Userid/editpassword`         |                         | 200            | 500          | Edit specific password                                                                                                          |
| DELETE      | `/user/profile/:Userid`                      |                         | 201            | 500          | delete element                                                                                                                  |
| POST        | `/requestedservice/create`                   |                         | 204            | 500          | Ask for service, and create requested service.                                                                                  |
| GET         | `/requestservice`                            |                         | 204            | 500          | Show ask service page                                                                                                           |
| GET         | `/requestedservice/:requestedServiceId`      |                         | 204            | 500          | Show specific requestedservice                                                                                                  |
| GET         | `/requestedservice/provider/list/:providerId |                         | 204            | 500          | Show series requestedservice                                                                                                    |
| GET         | `/requestedservice/user/list/:userId         |                         | 204            | 500          | Show series requestedservice                                                                                                    |
| POST        | `/requestedservice/create`                   |                         | 204            | 500          | Accept for service, and create requested service.                                                                               |
| PUT         | `/requestedservice/:requestedServiceId/edit` |                         | 204            | 500          | Edit requested service                                                                                                          |
| GET         | `/acceptedservice/:acceptedServiceId`        |                         | 204            | 500          | Show specific acceptedservice                                                                                                   |
| GET         | `/acceptedservice/provider/list/:providerId  |                         | 204            | 500          | Show series acceptedservice                                                                                                     |
| GET         | `/acceptedservice/user/list/:userId          |                         | 204            | 500          | Show series acceptedservice                                                                                                     |
| POST        | `/acceptedService/create`                    |                         | 204            | 500          | create a review                                                                                                                 |
| POST        | `/review/create`                             |                         | 204            | 500          | create a review                                                                                                                 |
| GET         | `/review/:reviewid`                          |                         | 204            | 500          | Show specific review                                                                                                            |
| GET         | `/review/provider/list/:providerId`          |                         | 204            | 500          | Show series review                                                                                                              |
| GET         | `/review/user/list/:userId`                  |                         | 204            | 500          | Show series review                                                                                                              |

<br>

## Links

### Trello

https://trello.com/b/e4Cr0GR6/project-3reactapp-click

### Git

The url to your repository and to your deployed project

[Client repository Link] https://github.com/alejanglez/CLICK-client/

[Server repository Link] https://github.com/alejanglez/CLICK-server/

[Deployed App Link]

### Slides

The url to your presentation slides/wire frames:
https://www.figma.com/file/Ct8RS0DhspWB4R8swQ0jx7/Project-3-%7C-Click?node-id=0%3A1
