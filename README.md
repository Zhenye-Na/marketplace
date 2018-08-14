# Demo Marketplace

> You can refer to [project website](https://demo-mkplc.herokuapp.com/) for more information.  
> *THIS PROJECT IS STILL ONGOING*.

## About

`Node.js` based web application for my independent web-dev project (demo version). I had developed a sample website which user can create accounts, add products, update product information, create comments and so forth. More features will be added in the next version.


### Github repo

[https://github.com/Zhenye-Na/marketplace](https://github.com/Zhenye-Na/marketplace)


### Technology Stack

- Frontend Languages: HTML, CSS, and **Embedded JavaScript**
- Frontend Framework: **Bootstrap**
- Frontend Library: **jQuery**
- Backend Framework: **Node.js**, **Express.js** and NPM
- Database: **MongoDB**
- Version control: Git
- Deployment: Heroku


### Dependencies

```json
  "dependencies": {
    "body-parser": "^1.18.3",
    "connect-flash": "^0.1.1",
    "ejs": "^2.6.1",
    "express": "^4.16.3",
    "express-session": "^1.15.6",
    "method-override": "^3.0.0",
    "mongoose": "^5.2.6",
    "passport": "^0.4.0",
    "passport-local": "^1.0.0",
    "passport-local-mongoose": "^5.0.1"
  }
```

## Project Initialization


- Un-comment the statement in `app.js` to run `seedDB();`

    ```js
    seedDB();
    ```
    This function will automatically let you get a sample database so you can play around with it without creating sample products data.
- Make sure you have install all node packages in the root folder to deploy the project.
- Express server has to be initialed by npm manager on `localhost:27017 ` by prompting commnad "`npm start`".



## Project Core Features

1. **User Register / Signin**: User need to create account to make any kind of edit. Checking out this project does not require users to be logged in.
    1. **Creating account**: users need to click on `signup` button and fulfill all the required information to get registered with us.
    1. **Logging in**: users need to click on `login` button and type in the correct username/email and password.
    1. **[TODO]** In case user has forgot its password, we provide an module to regenerate a new password.

2. **User Dashboard**: **[TODO]** Change user information and other settings.
    1. **[TODO]** Account Settings: This module provide a panel to change users profile and password information. 
    2. **[TODO]** Items History: This feature helps the user to check all the past purchases and other details such as, date of purchase, products purchased, and payment information. 
    3. **Logout**: User can successfully loggout to avoid exploitation of its account.

3. **[TODO]** Seach Product: user can seach by typing product's, id, name, brand, and category in the search bar that is present on the top of the page.
    1. **Filtered Search**: user can refine its search according to price range and category. This feature will be available in search results.
    1. **Category Search**: user can directly search for products according to its category by selecting categories.
    1. **Product Information**: user can check for the product information by clicking on the `More Info` button on each product thumbnail.

