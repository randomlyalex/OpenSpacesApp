Original Brief given [here](https://github.com/randomlyalex-codeclan/OpenSpacesApp/blob/main/openspaces_brief.md).

[Link to figma wireframe and planning](https://www.figma.com/files/project/25720481/OpenSpaces)

[Link to planing diagrams](https://github.com/randomlyalex-codeclan/OpenSpacesApp/tree/main/planning)

[10 Min Video Showcase for CodeClan](https://www.youtube.com/watch?v=vgtm01bFqb4)

## OpenSpacesApp Web App | Mongo, Java (Spring) and ReactJS

An App designed to help people find nice places to meet safely outside in Covid times.  Built over the space of 5 days from planning to presentation.

## Demo

TBC to deploy

## Built using

#### Front-end

- [ReactJS](https://reactjs.org/) - React Frontend framework 
- [React Router](https://reactrouter.com/) - Library for general routing & navigation
- [React Hook Form](https://react-hook-form.com/) - Library for flexible & extensible forms
- [Material-UI w/ lots of CSS customisations](https://material-ui.com/) - UI library
- [Leaflet.js](https://leafletjs.com/) - OpenSource MultiFramework compatible mapping solution.
- [Auth0](https://auth0.com/) - Library for outsourcing authetication by socials.

#### Back-end

- [Java v8](https://nodejs.org/en/) - Java 8
- [Spring Boot / MVC Mongo COnnection](https://spring.io/projects/spring-boot) - Spring boot framework makes process of building APIs easier & faster
- [MongoDB](https://www.mongodb.com/) - Opens-source noSQL/Document database to store data

## Features

- Authentication (login/register w/ username & passwordvia Auth0 and users socials)
- Once logged in abilty to filter your own rated, saved and created POI's
- CRUD functions for all, with ability to add POis of different types, comments, rating etc...
- Reuse of CRUD form and components, with switches and props to allow for differing functionality (for overall admin section).
- Ability for users to mark POI's for moderation

- Location aware design, with click and point to add POI.
- Fully responsive design, provided by MUI
- Loading spinners for fetching processes
- Dark mode toggle w/ local storage save
- Proper responsive UI for all screens


## Screenshots

#### Animated
![Use of main app](https://github.com/randomlyalex/OpenSpacesApp/blob/main/screenshots/mg9HuOX0mO.gif)

## Static
Homepage:

![Main Page](https://github.com/randomlyalex/OpenSpacesApp/blob/main/screenshots/Screenshot%202021-03-18%20at%2019.58.18.png)

Location Aware:

![Location Aware](https://github.com/randomlyalex/OpenSpacesApp/blob/main/screenshots/Screenshot%202021-03-18%20at%2019.59.24.png)

Side Drawer available to logged in users only:

![MUI Side Drawer](https://github.com/randomlyalex/OpenSpacesApp/blob/main/screenshots/Screenshot%202021-03-18%20at%2019.58.42.png)

Public main use overall filter:

![Main public use filter view](https://github.com/randomlyalex/OpenSpacesApp/blob/main/screenshots/Screenshot%202021-03-18%20at%2019.58.27.png)

Filter select your own, fav or rated POI's:

![Logged in Filter View](https://github.com/randomlyalex/OpenSpacesApp/blob/main/screenshots/Screenshot%202021-03-18%20at%2019.59.02.png?raw=true)



#### Client:

Cd into the client folder and install dependancies and run front end server for develpment:

```
cd frontend
npm install
npm start
```

#### Server:

Cd into the server folder and install dependancies and run server for develpment:

```
cd backend
update dependancies via pom.xml
run OpenspacesApplication.java
```

#### DB

This assumes a connection locally to mongoDB
Database name: open_spaces
Collecction: pois
Run the poi-json-seed if you want to build a quick database.

```
mongodb://localhost:27017
```





