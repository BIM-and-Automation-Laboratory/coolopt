# Environment Variables Config

You need to place your environment variables in a `.env` file at the root of `/server` and then require it at the start of the server entry point (`server.js`).

Make sure you have a locally set system variable: NODE_ENV = development because we use this to check whether we are in development or production for the require in our server entry point.

```javascript
if (process.env.NODE_ENV == 'development'){
  require('dotenv').config();
}
```

You can also place the `.env` file anywhere else provide the location path during the require  

```javascript
if (process.env.NODE_ENV == 'development'){
  require('dotenv').config({ path: '/full/custom/path/to/your/env/vars'});
}
```



