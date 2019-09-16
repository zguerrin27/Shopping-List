# Shopping-List
A Full-Stack, shopping list web app made for Bloc certificate. Made with MERN stack.

This app allows Users to register for, then sign into a shopping list. Once in the list you can Create Read Update and Destroy items. You can also mark them as purchased with a input check box. If you click the edit item button it will open a modal that allows you to enter the new text for the item. Each time you make an update to an item, it is sent to the mongodb database and saves the changes. In the future I will add more features like real-time updating with websockets.


For this assignment I was asked to create a shared grocery list web application. It is the first time that I have ever 
written a full-stack app, and throughout the process I learned a great deal. For my technology choices I went with Node and 
Express on the back end, and React on the front end. I also chose MongoDB hosted through mongodb atlas, for my database 
and Heroku for deployement. I chose MongoDB because I have less experience with non-relational databases and wanted to
gain a better understanding of how to implement them. I used Mongoose to create schemas for my DB. For user authentication,
I chose to use JSON web tokens. In the past I had only used Session-based auth with passport and the passport-local strategy,
but for this project I wanted to implement something new. It was a lot of fun but very challenging to get down the basics of
getting a token, saving it, and then passing it with each request to make sure my authentication would pass. To get my routes
working from React to my Node/express server I used Axios and a proxy in the package.json in my client folder. For styling,
I went with Reactstrap, which basicaly takes Bootstrap classes and alows you to use them as components in your render methods
in React. Another tool I used extensively was an App called Postman. I used it setting up my JSON API routes to test each 
endpoint and make sure I was build objects correctly in my front end.

Things I left out / Would and will change with more time: 

The two big things would be the real-time updating feature and my test suite. For the real-time updating feature...
I found a technology called socket.io that piggy-backs or mounts onto your node server and allows you to send and recieve 
events when your API end points are hit. Then you broadcast those events so that other users can see them. For Unit testing I 
was going to use Jest and a testing utility package called Enzyme. I chose those because they seemed to be two of the most
popular options for testing React and Node apps. The next big thing I would add is error handling. Right now if someone enters
information incorectly in say the log in or register field, it will not flash an error message etc. I would also display
success messages when a user is created successfully etc. The last thing I would change would be the styling and routes to pages etc. Right now I have a single page for Users to Register or Login...I would seperate those with ReactRouter. I would also add a strike through or light text effect to completed purchases. I would also take time to make the over-all styling of the project more appealing.


https://murmuring-wave-35705.herokuapp.com/


- Node.js 
- Express.js
- Express-Router
- Body-Parser 
- Concurrently - to run both react server and node server at the same time - npm run dev script
- MongoDB - Database
- Mongoose - Object Document Mapper for DB 
- Axios for http requests from React to node backend which pushes to mongoDB
- B-cryptjs - for hashing plain text passwords to store in DB
- Custom Middleware for Auth
- Json Web Tokens - for handling auth 
- config.js - for using default.json as a way to store config variables
- ReactStrap and Bootstrap for Styling





