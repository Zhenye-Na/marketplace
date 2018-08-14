# Demo Marketplace

> You can refer to [this](https://demo-mkplc.herokuapp.com/) site for more information.

## About

Node.js based web application for my independent webdev project (demo version). I had developed a sample in which user can create and browser products. User can create an account, update product information, create comments and more features will be added in the next version.


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
    This function will automatically let you get a sample database.
- Make sure you have install all node packages in the root folder to deploy the project.
- Express server has to be initialed by npm manager on `localhost:27017 ` by prompting commnad "`npm start`".



## Project Core Features

- User Register / Signin: User need to create account to make any kind of edit, but to check projects does not require user to be logged in. First user need to be get registered and logged in to check for recent activities, transactions, access e-wallet and items cart. For creating account user need to click on signup button fulfill all the create an account form requirement to get registered with us. In case your wants to be logged in, he need to go to sign in and provide its credentials which has been set up with us. In case user has forgot its password, we provide an module to regenerate a new password. The link for forgot module it can be found in sign in.



- User Dashboard: **[TODO]** Change user information and other settings we have developed modules in dashboard panel but user can also find all these options on the top right corner of the page when user click on his/her name.
- Account Settings: This module provide a panel to change users profile and password information. 2.2 Payment Settings: This modules helps the user to store its card information with us for easy pay and order functionality. 2.3 Wallet Settings: In this module user can maintain its e-cash by adding more cash or purchasing items without using any card information. User can add cash from saved cards, or use other than save card but user can add maximum of $1000 at one transaction and overall $10000 are allowed. At the same time user can check for its wallet activities and details on the same page. 2.4 Order History: This feature helps the user to check all the past purchases and other details such as, date of purchase, products purchased, and payment information. 2.5 Newsletters: User can manage and subscribe or unsubscribe to our neweletters. 2.6 Logout: User can successfully loggout to avoid exploitation of its account.
- User Cart: User can add items or removed items or edit the quatity for each item (maximum 5 quantities per product is allowed). Here user can check for total payment information and proceed to checkout.
- Seach Product: User can seach by typing product's, id, name, brand, and category in the search bar that is present on the top of the page.
- Filtered Search: USer can refine its search according to price range and category. This feature will be available in search results.
- Category Search: User can directly search for products according to its category by selecting categories on the left top corner of the page right next to logo.
- Product Information: User can check for the product information by clicking on the heading or a given view button on each product thumbnail and discover more about the product and can add it to it's cart by clicking on Add to Cart button under the display picture of an item.
- Others: We have implemented fake gateway where user can select the mode of payment ie saved card, new card and wallet. User can pay for the amount by any of the listed modes and also and review its payment information at the bottom and then can pay and proceed to the final step which is confirmation where a confirmation message will be displayed and generate a transaction or order it (which would also be available in user dashboard).
