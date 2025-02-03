## Job Tracking App

![MongoDB](https://img.shields.io/badge/mongoDB-%2347A248?style=for-the-badge&logo=mongoDB&logoColor=white) ![Express](https://img.shields.io/badge/Express-%23000000?style=for-the-badge&logo=Express&logoColor=white) ![React](https://img.shields.io/badge/react-%2361DAFB?style=for-the-badge&logo=react&color=black) ![Node.js](https://img.shields.io/badge/Node.js-%235FA04E?style=for-the-badge&logo=Node.js&logoColor=white&logoSize=auto) ![StyledComponents](https://img.shields.io/badge/styled-components-%23DB7093?style=for-the-badge&logo=styled-components&logoSize=auto) ![ReactQuery](https://img.shields.io/badge/React%20Query-%23FF4154?style=for-the-badge&logo=React%20Query&logoColor=white) ![ReactRouter](https://img.shields.io/badge/React%20Router-%23CA4245?style=for-the-badge&logo=React%20Router&logoColor=white) ![Mongoose](https://img.shields.io/badge/Mongoose-%23880000?style=for-the-badge&logo=Mongoose&logoColor=white) ![Axios](https://img.shields.io/badge/Axios-%235A29E4?style=for-the-badge&logo=Axios&logoColor=white) ![Cloudinary](https://img.shields.io/badge/Cloudinary-%233448C5?style=for-the-badge&logo=Cloudinary&logoColor=white) ![JWT](https://img.shields.io/badge/JSON%20Web%20Tokens-%23000000?style=for-the-badge&logo=JSON%20Web%20Tokens&logoColor=white)

# Job Tracking Application

The Job Tracking Application allows users to register jobs they have applied to, view the status of each job (pending, interview, or declined), filter jobs through a form, and access job statistics. Users can also create, edit, and delete jobs, reset their password, and verify their email. There is also functionality for a test user to interact with the application in a demo mode. 

The application is deployed on Render: [https://mern-app-react-ts.onrender.com](https://mern-app-react-ts.onrender.com).


For the frontend, we used **styled-components** for styling, **axios** for making API calls, and **react-query** for data optimization and caching. Additionally, we leverage **react-router-dom** for route management, using loaders to fetch data and actions to handle form submissions. On the backend, the database is powered by **MongoDB**, with **Mongoose ORM** facilitating the creation and manipulation of database objects. **Cloudinary** is used for storing user profile images, while **Express** and **Node.js** are used to build the API. Finally, **JSON Web Tokens (JWT)** are employed for managing user sessions, utilizing refresh tokens to keep sessions up to date.

--- 

## Tech Stack

The application was built using the **MERN** stack (MongoDB, Express, React, Node.js).

---

## Features
- **User authentication and account management**: Includes email confirmation for account verification (you will receive an activation email from armandomm98@hotmail.com using the turboSMTP service).
- **Password reset**: Available whether you are authenticated in the application or not.
- **Update user properties**: Allows updating various user properties, including the avatar, which is stored in Cloudinary.
- **Job management**: Create, delete, and update jobs.
- **Dark theme**: Available in the client application for a better user experience.
- **Job filtering**: Filter jobs by status, type, or search, with pagination (limit of 6, but you can modify the URL parameters, including the page option). You can also sort jobs from A-Z, Z-A, or in descending/ascending order.
- **Token invalidation**: If necessary, the administrator role can invalidate refresh tokens directly from the database or using MongoDB Compass, ensuring security and control over user sessions.
---

## API Endpoints

The application endpoints are listed below:

| **Route**                           | **Method** | **Description**                                                                                                                                                                                                                                                                                                                                                                             | **Query Params**                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | **Body Example**                                                                                                                                             |
| ----------------------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `/api/v1/auth/login`                | POST       | Receives the username or email to log into the application, verifies the user's existence and checks if the password is correct in the database. Upon successful authentication, it generates an access token and a refresh token, which are then stored in the cookies to maintain the user's session.                                                                                                                                             | N/A                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | **With email:** `{  "email": "testing@email.com",  "password": "Test123@" }` <br><br> **With userName:** `{ "userName": "testing", "password": "Test123@" }` |
| `/api/v1/auth/register`             | POST       | Registers a user with an email and username. If either already exists, the registration process is halted until a unique one is provided. The password is hashed, and a verification token is generated to validate the account via email. The user cannot access the application until their account is successfully verified.                                                                                                          | N/A                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | `{ "name": "test", "lastName": "testing", "location": "earth", "email": "testing@email.com", "userName": "testing", "password": "Test123@" }`                |
| `/api/v1/auth/logout`               | DELETE     | Removes all tokens associated with the user and clears the user's cookies to log them out.                                                                                                                                                                                                                                                                                                        | N/A                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | N/A                                                                                                                                                          |
| `/api/v1/auth/verify-email`         | POST       | Verifies the account by extracting the token from the email URL. If the account is already verified or the token does not match the current user, an error is thrown. Otherwise, the token is validated, and the user's schema is updated to mark the account as verified, allowing the user to access the application.                                                                                  | N/A                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | `{"email": "testing@email.com", "verificationToken":"939d02fbf29..."}`                                                                                       |
| `/api/v1/auth/forgot-password`      | POST       | Receives an email or username, and if one exists, sends an email to reset the current user's password. A token is created with a 10-minute expiration time.                                                                                                                                                                                                                                           | N/A                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | **With email:** `{  "email": "testing@email.com" }` <br><br> **With userName:** `{ "userName": "testing" }`                                                  |
| `/api/v1/auth/reset-password`       | POST       | Resets the user's password by checking if the token's expiration time is later than the current time, ensuring the password can be modified within the allowed timeframe. It also verifies that the new passwords match and that the token from the email matches the one in the database. If all conditions are met, an email is sent confirming that the password has been successfully changed. | N/A                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | `{"token":"d24683a9c3187...","email":"testing@email.com", "newPassword":"Test123@","newPasswordConfirm":"Test123@"}`                                         |
| `/api/v1/jobs`                      | GET        | Retrieves a list of jobs filtered by query parameters. Default values are limit=6 and page=1. Example URL: `/jobs?search=ix&jobStatus=all&jobType=all&sort=oldest`. **User authentication is required.**                                                                                                                                                                                               | - `search` (optional): Search term (e.g., `search=ix`). <br> - `jobStatus`: Job status filter. Options: `all`, `interview`, `declined`, `pending` (default: `all`). <br> - `jobType`: Job type filter. Options: `all`, `part time`, `full-time`, `internship` (default: `all`). <br> - `sort`: Sorting order. Options: `newest`, `oldest`, `a-z`, `z-a` (default: `newest`). <br> - `limit`: Number of results per page (default: `6`). <br> - `page`: Page number (default: `1`). | N/A                                                                                                                                                          |
| `/api/v1/jobs`                      | POST       | Creates a new job in the database. **Requires user authentication**                                                                                                                                                                                                                                                                                                                             | N/A                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | `{"company":"some company","position":"senior developer", "jobLocation":"mexico","jobStatus":"interview","jobType":"full-time"}`                             |
| `/api/v1/jobs/:id`                  | GET        | Retrieves a job from the database by its ID. **Requires user authentication**                                                                                                                                                                                                                                                                                                                     | N/A                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | N/A                                                                                                                                                          |
| `/api/v1/jobs/:id`                  | PATCH      | Updates a job in the database based on the provided ID. All fields are required. **Requires user authentication**                                                                                                                                                                                                                                                                          | N/A                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | `{"company": "google", "position": "product owner", "jobStatus": "interview","jobType": "part-time","jobLocation": "mexico"}`                                |
| `/api/v1/jobs/:id`                  | DELETE     | Deletes a job from the database by its ID. **Requires user authentication**                                                                                                                                                                                                                                                                                                                  | N/A                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | N/A                                                                                                                                                          |
| `/api/v1/jobs/stats`                | GET        | Fetches data about rejected, interviewed, and pending jobs, displaying a graph over time in the React application. **Requires user authentication**                                                                                                                                                                                                                                          | N/A                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | N/A                                                                                                                                                          |
| `/api/v1/user/current-user`         | GET        | Fetches the current user, which is necessary to perform different actions within the application. The middleware ensures that the correct user is performing the actions. **Requires user authentication**                                                                                                                                                                                                    | N/A                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | N/A                                                                                                                                                          |
| `/api/v1/user/admin/app-stats`      | GET        | Fetches the total number of users and jobs in the application, but only if the current user is an administrator. The first account created is the administrator account. In the React user interface, this information is displayed more effectively for administrators. **Requires user authentication**                                                                             | N/A                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | N/A                                                                                                                                                          |
| `/api/v1/user/update-user`          | PATCH      | Allows editing of user information, including first name, last name, and location, as well as the optional avatar. **Requires user authentication**                                                                                                                                                                                                                                       | N/A                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | `{"name": "John","lastName": "Doe","location": "mexico", "avatar": "https://example.com/avatar.jpg"}` <br><br> **Note:** `avatar` is optional.               |
| `/api/v1/user/delete-profile-image` | DELETE     | Removes the avatar from the user's profile. **Requires user authentication**                                                                                                                                                                                                                                                                                                                                | N/A                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | N/A                                                                                                                                                          |
| `/api/v1/user/update-user-password` | PATCH      | Allows the user to change their password within the current session. **Requires user authentication**                                                                                                                                                                                                                                                                                      | N/A                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | `{"oldPassword": "Test123@","newPassword":"Testing123@","newPasswordConfirm": "Testing123@"}`                                                                |
---

## Job Tracking App Preview

![mern-jobs-1](https://github.com/user-attachments/assets/705931d8-e34b-43ea-acb6-06666ac6b432)
![mern-jobs-2](https://github.com/user-attachments/assets/f3df1824-a915-4a34-9e57-a87ba6ab85bf)
![mern-jobs-3](https://github.com/user-attachments/assets/cf0fccbd-cdd0-483b-985b-833d00feda01)
![mern-jobs-4](https://github.com/user-attachments/assets/836040db-5b56-4d7e-ac9e-ded3ee7b247d)
![mern-jobs-5](https://github.com/user-attachments/assets/b26b3cfa-6782-4c41-a30b-bbab651cd82f)
![mern-jobs-6](https://github.com/user-attachments/assets/a05a183b-e87a-4e14-9c90-37dfafc1fc8e)
![mern-jobs-7](https://github.com/user-attachments/assets/40db0eb6-ba6d-4394-8aa2-25cfc4626356)
![mern-jobs-8](https://github.com/user-attachments/assets/9029a47e-3d00-439f-a874-315e50599885)
![mern-jobs-9](https://github.com/user-attachments/assets/b91b8a60-2d59-4c94-9100-2cc9a5435fc0)
![mern-jobs-9 5](https://github.com/user-attachments/assets/e46a0a23-377d-4b22-a7a7-e71064ee9bc2)
![mern-jobs-10](https://github.com/user-attachments/assets/a9bfcf55-f05a-4b36-87fa-93b0f873626d)
![mern-jobs-11](https://github.com/user-attachments/assets/4cb9a642-29b3-47d6-8fbc-aa85083e2d3d)

> Admin Page
> ![mern-jobs-12](https://github.com/user-attachments/assets/a9e3cfab-1bad-481e-8687-6e7c09b1840e)

---

## Installation

1. Clone the repository to your local machine or download and extract it into a folder:

```sh
https://github.com/armandomzn/mern-app-react-ts
```

2. Install the dependencies, the main root of the project is the backend, the client is located in the client folder.

```bash
# At the root of the project (backend)
npm install

# In the client folder
cd client
npm install
```

3. Create the **.env** file to declare the following environment variables in the backend (root of the project). Below is an example of environment variables followed by a message that provides more information about the environment variable, delimited by a **#** which you must delete when you implement these variables.

```sh
PORT=5001 # This is the port on which the application (express) will be listening, you can modify it at your convenience, ex, 5000, 3000, 8000, etc.
NODE_ENV=development # This property accepts two values, development and production, if it is in development mode then it shows more information about the requests using the morgan module and set the secure property in the cookies to false, so they are not sent through https because it is in development mode.
MONGO_URL=mongodb+srv://username:password@cluster0.mongodb.net/my_database?retryWrites=true&w=majority # Use the following connection string to connect to your MongoDB Atlas cluster / Replace `<username>`, `<password>`, and `<my_database>` with your actual MongoDB Atlas credentials and database name.
JWT_SECRET=$$dbfa?0s5_&f%*=8zk9a5p3i+oe!te_)-kej^f4@3ty$)m+b3 #This is an example of a password that you can set for the access JWTs but you can set anything you like.
JWT_SECRET_REFRESH_TOKEN=ehl_vjwxm!0h)()vh@$)+)&yn5)(a3n!fp*$em05!0hg&t!s*x #This is an example of a key that you can set for the refresh JWTs but you can set anything you like.
JWT_ACCESS_TOKEN_EXPIRES_IN=5m # This is the time in which the access token expires, you can define it as string or numeric values, ex, “2 days”, “10h”, “7d” if you decide to use a numeric value like 60 it interprets it as milliseconds or 60ms, for this value we recommend something very short for security and to refresh.
JWT_REFRESH_TOKEN_EXPIRES_IN=1d # This is the time at which the refresh token expires, this token is responsible for extending the duration of the user session by renewing the access token for resource access, a longer duration than the accessToken is recommended.
COOKIES_SECRET=kisc8t%!0g07i6y_czd@&v+8yov6rlb2m&=ra0w*udyrf+5f&1 # This key is for the cookies to be signed by the server.
CLOUD_NAME=d4k3r19lf # This is a credential that cloudinary gives you when you create your account and where it will store your resources.
CLOUD_API_KEY=ab12cd34ef56gh78ij90kl01mn23op45 # This is your api key provided by cloudinary, which will allow you to perform operations to save resources in your cloud.
CLOUD_API_SECRET=zxy9876wvuts5432mnopqr1abcdefg23 # This is the password of your api key that cloudinary gives you for this specific resource (you can have other api keys because it generates a new one for each project you create in the platform).
HOST_MAIL_TRANSPORTER=pro.turbo-smtp.com # smtp.mailtrap.io, smtp.resend.com, etc. You can use another email transporter, however, I recommend this one because it is free and offers good service without additional configurations like mailtrap.
PORT_MAIL_TRANSPORTER=587 # The port on which it is sent, depends on the SMTP provider's configuration 465, 25025 support SSL and ports 25, 587, 2525 are non-SSL.
USER_MAIL_TRANSPORTER=smtp.your-email-provider.com # Replace with your provider's SMTP host
USER_PASSWORD_MAIL_TRANSPORTER=your_email_password # Your email password or app-specific password
```

4. This project includes a script for seeding data into MongoDB. If you want to use the seed data, you need to provide your own MongoDB User ID. This file is located in the root of the project (backend) and is called **populate.ts**.

   ### Steps to Use the Seed:

   1. **Find your MongoDB User ID**:

      - You can get your MongoDB User ID by querying your `UserSchema` in the database.
      - Example:
        ```javascript
        const user = await UserSchema.findOne({
          /* your criteria here */
        });
        console.log(user._id);
        ```
      - Alternatively, if you're using **MongoDB Atlas**, you can find your User ID in the **Users** collection:

      1. Log in to **MongoDB Atlas**.
      2. Navigate to the **Cluster** where your database is hosted.
      3. Go to the **Collections** tab.
      4. Open the `users` collection (or the name of your collection where users are stored).
      5. Find the user you want to use and note down the `_id` field (which will look like a long string of characters, e.g., `5f50c31e7d345a001f1b7e3b`).

   2. **Edit the `populate.ts` Script**:

      - The `seedData.json` file is located in the **`src/helpers`** folder of the project.
      - Open the `populate.ts` script file (located in the root or appropriate directory).
      - In the script, replace the following line with your own MongoDB User ID:
        ```javascript
        const user = (await UserSchema.findOne({
        _id: "YOUR_MONGODB_USER_ID",  // Replace this with your actual MongoDB User ID
        })) as mongoose.Document;
        ```

   3. **Run the Seed Script**:

   - Ensure you have the necessary environment variables set up (e.g., `MONGO_URL` in your `.env` file).
   - Run the `populate.ts` script using `ts-node` or after compiling it to JavaScript:
     ```sh
     ts-node populate.ts
     ```

   4. **Verify the Seed Data**:

   - Once the script runs successfully, it will populate your database with job entries. You can verify it by querying the `JobSchema` in MongoDB.

   ### Notes:

   - Make sure your MongoDB instance is running and accessible before executing the script.
   - If you don't want to use your own MongoDB User ID, you can modify the script to work with a different user.

---

## Project Authentication Middleware

This project includes an authentication middleware to validate user sessions. The middleware checks the presence of `ACCESS_TOKEN` and `REFRESH_TOKEN` cookies, validates their authenticity, and attaches the user information to the request. The middleware also allows you to mark a user as a "test user" based on their `userId`.
### Middleware Location
The `authenticateUser` middleware is located in the following path:
`root/src/middleware/authMiddleware.ts`
### How to Configure the Test User
Within the `authenticateUser` function, there is a section of code that determines whether a user is a "test user" based on their `userId`. By default, the middleware checks if the `userId` matches `"65d7d158fb173fc998d49247"`, which is a hardcoded value for a test user.

The relevant code is:
```ts
req.user = {
  userId,
  role,
  userName,
  testUser: userId.toString() === "65d7d158fb173fc998d49247"
};
```
and 
```ts
req.user = {
  userId: payload.userId,
  role: user.role,
  userName: user.userName,
  testUser: user._id.toString() === "65d7d158fb173fc998d49247",
};
```
### How to Change the Test User

Find the Test User's userId: You can obtain the userId of your test user from your database.

Update the Code: Replace the hardcoded userId value `("65d7d158fb173fc998d49247")` with the actual userId of your test user. For example:
```ts
req.user = {
  userId,
  role,
  userName,
  testUser: userId.toString() === "NEW_USER_ID",
};
```
and
```ts
req.user = {
  userId: payload.userId,
  role: user.role,
  userName: user.userName,
  testUser: user._id.toString() === "NEW_USER_ID",
};
```
Where `"NEW_USER_ID"` is the `userId` of your test user.

### Relating userId with Seed Data

You can relate the userId from this middleware to the one used in your seed data. When you seed your database with initial data, make sure that the userId of the test user matches the one used in the middleware so that the middleware can correctly identify them as a test user.
### Considerations
- Ensure the userId you use is unique and corresponds to the correct test user in your system.
- This change will not affect the normal authentication process; it will only flag your specific test user for special handling in the middleware.
- **Test User Limitations**: The test user will not be able to perform any CRUD operations in the system. This user is meant for demo purposes only and is intended to showcase how the application works without making any changes to the system's data.
- **Modifying Test User Behavior:** If you want to allow the test user to perform CRUD operations, you need to modify the behavior of the checkForTestUser middleware. This middleware currently blocks any requests from the test user that attempt to modify data. To bypass this restriction:
  1. Remove or comment out the `checkForTestUser` middleware from the routes where you want the test user to be able to modify data. For example:
  ```ts
  // In the following example, the `POST` method for the test user account will be blocked by the `checkForTestUser` middleware.
  router.route(“/”)
  .get(getAllJobs)
  .post(checkForTestUser, validateJobInput, createJob);
  // To allow the test user to perform the POST request, you need to remove the `checkForTestUser` middleware.
  router.route("/")
  .get(getAllJobs)
  .post(validateJobInput, createJob);
  ```

  2. The checkForTestUser middleware is located in the following path (`root/src/middleware/authMiddleware.ts`):
  ```ts
  const checkForTestUser = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
  ) => {
    if (req.user.testUser) {
      throw new BadRequestError("Demo User, Read Only!");
    }
    next();
  };
  ```
  3. You can remove it from the route handlers where you want to allow data modification for the test user.

---- 

## Usage

### 1. Set up and run the server

In the root directory of the project, open a terminal and run the following command to connect to the database and start the server:

```sh
# At the root of the project
npm run dev
```

### 2. Set up and run the client

Open a new terminal, navigate to the client directory, and run the following command:

```sh
# In the client directory
cd client
npm run dev
```

The terminal will display the development URL for the client (typically http://localhost:5173/). Copy and paste this URL into your browser to view the application in development mode.

### 3. Running in Production Mode (Optional)

**Server**

To run the production files on the server:

1. First, build the project to transpile .ts files to .js by running:
   ```sh
   # At the root of the project
   npm run build
   ```
2. Then, start the server with the following command:
   ```sh
    npm run start
   ```
**Client**

To run the production files for the client:

1. Navigate to the client folder and run the build command to transpile .ts files to .js:
   ```sh
   # In the client folder
   cd client
   npm run build
   ```
2. Once the build process is complete, run the preview command to start the production client:
   ```sh
   npm run preview
   ```
   The terminal will show the production URL for the client, typically http://localhost:4173/.

### 4. Register and Start Using the Application

1. Register an account in the application.
2. Confirm your account via email.
3. Log in to the application and begin creating your projects.

---

## Using React Query DevTools

If you want to see the cache stored in the client, you can enable the React Query DevTools to inspect your queries.

Follow these steps:

1. Navigate to the `client` folder in your project.

2. Open the `App.tsx` file and import the `ReactQueryDevtools` component from `@tanstack/react-query-devtools`:

   ```tsx
   import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
   ```

3. Wrap your `RouterProvider` component inside the `QueryClientProvider` and add the `ReactQueryDevtools` component. Make sure to set `initialIsOpen={false}` to prevent the DevTools from opening by default:

   ```tsx
   import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
   import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

   const queryClient = new QueryClient({
     defaultOptions: {
       queries: {
         staleTime: 1000 * 60 * 15, // Example stale time
       },
     },
   });

   function App() {
     return (
       <QueryClientProvider client={queryClient}>
         <ReactQueryDevtools initialIsOpen={false} />
         <RouterProvider router={router} />
       </QueryClientProvider>
     );
   }

   export default App;
   ```

4. Once you've added this, you'll be able to view the React Query DevTools interface. The DevTools will help you inspect cached data, query statuses, and more, making it easier to debug your queries and mutations during development.

5. Run your app with `npm run dev` and open the browser to start interacting with the DevTools.

---

## Contact

- If you have any questions, comments, or have encountered a bug in the application, feel free to contact me at the following email address: armandomm98@hotmail.com

----
