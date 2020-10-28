# OnlineStore
OnlineStore website with ReactJS, Redux, NodeJS, and MongoDB.

# Overview
This is a general online store. Whereby, you can create your own Store, add items to it, review other peoples items. This project uses Google OAuth 2.0 for logging / creating your account. Whenever you buy an item, the owner will be notified about your need for that item.

The FrontEnd and backend are seperated. So they both run on the same IP address but the ports are different. In order to optimize the integration process. The FrontEnd runs at PORT 3000 and the Backend runs at PORT 5000. *You can change the backend port in the config.env file.*

# API's
Basically, on the backend side there are 12 routes.

__Admin Routes are:__
> METHOD PATH DESC
* [GET, DELETE] /api/users: For all the users
* [GET, POST, DELETE] /api/store: For all the stores
* [GET, POST, DELETE] /api/items: For all the Items
* [GET, POST, DELETE] /api/reviews: For all the reviews

__General User Routes are:__
> METHOD API PATH DESC
* [GET, DELETE] /api/users/userId: For an user
* [POST] /api/users/userId/cart: For adding an item in the users' cart
* [DELETE] /api/users/userId/cart/cartItemId: To remove an item from the user's cart
* [POST] /api/users/userId/notifications: To create a notification for the user
* [DELETE] /api/users/userId/notifications/notificationsId: To delete a notification
* [GET, DELETE, PUT] /api/store/storeId: For a store
* [GET, DELETE, PUT] /api/items/itemId: For an item
* [GET, DELETE, PUT] /api/reviews/reviewId: For a review

FrontEnd Details can be automatically understood from the folder structure.  [here](https://github.com/joshibhaumik/OnlineStore/tree/master/client/src/components)

# Installation
__You would be needing Google OAuth 2.0 Credentials & MongoDB Atlas URI.__
*You have to add that in the config.env file.*

__Also you would be needing a server to upload your item images, you can create an account at [Cloudinary](https://cloudinary.com/users/register/free) and use their api to upload your images.__ *you have to add the api uri and the details [here](https://github.com/joshibhaumik/OnlineStore/blob/master/client/src/components/Screens/CreateItem.js)*

```
yarn install

yarn start

cd client

yarn install

yarn start
```
