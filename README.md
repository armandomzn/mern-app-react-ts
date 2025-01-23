## Job Tracking App

![MongoDB](https://img.shields.io/badge/mongoDB-%2347A248?style=for-the-badge&logo=mongoDB&logoColor=white) ![Express](https://img.shields.io/badge/Express-%23000000?style=for-the-badge&logo=Express&logoColor=white) ![React](https://img.shields.io/badge/react-%2361DAFB?style=for-the-badge&logo=react&color=black) ![Node.js](https://img.shields.io/badge/Node.js-%235FA04E?style=for-the-badge&logo=Node.js&logoColor=white&logoSize=auto) ![StyledComponents](https://img.shields.io/badge/styled-components-%23DB7093?style=for-the-badge&logo=styled-components&logoSize=auto) ![ReactQuery](https://img.shields.io/badge/React%20Query-%23FF4154?style=for-the-badge&logo=React%20Query&logoColor=white) ![ReactRouter](https://img.shields.io/badge/React%20Router-%23CA4245?style=for-the-badge&logo=React%20Router&logoColor=white) ![Mongoose](https://img.shields.io/badge/Mongoose-%23880000?style=for-the-badge&logo=Mongoose&logoColor=white) ![Axios](https://img.shields.io/badge/Axios-%235A29E4?style=for-the-badge&logo=Axios&logoColor=white) ![Cloudinary](https://img.shields.io/badge/Cloudinary-%233448C5?style=for-the-badge&logo=Cloudinary&logoColor=white) ![JWT](https://img.shields.io/badge/JSON%20Web%20Tokens-%23000000?style=for-the-badge&logo=JSON%20Web%20Tokens&logoColor=white)

The Job Tracking Application allows you to register a job to which you have applied, view the status of the job (pending, interview or declined), filter jobs through a form, job statistics, create, edit and delete jobs, test user, password reset and email verification.

The application was made using **MERN** stack (MongoDB, Express, React, Node.js).

For the frontend we used styled-components for styling, axios for API calls, for data optimization and react-query caching. For the backend, the database is stored in MongoDB, in the application the mongoose ORM is used to facilitate the creation and manipulation of objects in the database. Cloudinary for the storage of the user profile image, express and node.js for the API creation and finally the use of Json Web Tokens to store the user session which in turn uses refreshed tokens to update the session.

## Features

- User authentication and account management, including email confirmation for account verification (you will receive an activation email from d130e1dd975fa6 a.k.a mailtrap service)
- Password reset if you are authenticated in the application as well as if you are not.
- Updated some user parameters as well as the addition of an avatar that is saved in cloudinary.
- Creating, deleting and updating jobs.
- Dark theme in client application.
- Filtering of jobs by status, type or search with pagination, the limit is 6 although you can change the url parameters as well as the page option, you can also sort from a-z or z-a, descending or ascending.


## API Endpoints

The application endpoints are listed below:

| **Route**                      | **Method** | **Description**                                                                                                                                                                                                                                                                                                                                                                             | **Query Params** | **Body Example**                                                                                                                                             |
| ------------------------------ | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `/api/v1/auth/login`           | POST       | Receives the user name or email to log into the application, verifies in the database if the user exists and the password is correct, creates the access token and the refresh token and adds them to the cookies to maintain the user session.                                                                                                                                             | N/A              | **With email:** `{  "email": "testing@email.com",  "password": "Test123@" }` <br><br> **With userName:** `{ "userName": "testing", "password": "Test123@" }` |
| `/api/v1/auth/register`        | POST       | Register a user by email and username, if any already exists it does not register until a new one is entered, the password is hashed and a verification token is created to validate the account by email, the user can not access the application until the account is validated.                                                                                                          | N/A              | `{ "name": "test", "lastName": "testing", "location": "earth", "email": "testing@email.com", "userName": "testing", "password": "Test123@" }`                |
| `/api/v1/auth/logout`          | DELETE     | Removes all tokens associated with the user as well as the user's cookies for logout                                                                                                                                                                                                                                                                                                        | N/A              | N/A                                                                                                                                                          |
| `/api/v1/auth/verify-email`    | POST       | Verify the account by extracting the token from the url of the email, if it is already verified or the token does not match the current user an error is thrown, otherwise it is validated and updated information in the user's schema to validate the account and thus be able to enter the application.                                                                                  | N/A              | `{"email": "testing@email.com", "verificationToken":"939d02fbf29..."}`                     |
| `/api/v1/auth/forgot-password` | POST       | Receive an email or username, if one exists send an email to reset the current user's password, create a token with a 10 minutes expiration time.                                                                                                                                                                                                                                           | N/A              | **With email:** `{  "email": "testing@email.com" }` <br><br> **With userName:** `{ "userName": "testing" }`                                                  |
| `/api/v1/auth/reset-password`  | POST       | Reset the user's password, check if the expiration time of the token is greater than the current time, if so, we are within the time parameter to modify the password, check if the passwords match (the new ones) and if the expiration token of the email is the same as the one in the database. If everything is correct an email is sent that the password has been changed correctly. | N/A              | `{"token":"d24683a9c3187...","email":"testing@email.com", "newPassword":"Test123@","newPasswordConfirm":"Test123@"}`                                   |
| `/api/v1/jobs` | GET        | Retrieve a list of jobs, filtered by query parameters. Defaults: `limit=6`, `page=1`. Example URL: `/jobs?search=ix&jobStatus=all&jobType=all&sort=oldest`. **Requires user authentication.**  | - `search` (optional): Search term (e.g., `search=ix`). <br> - `jobStatus`: Job status filter. Options: `all`, `interview`, `declined`, `pending` (default: `all`). <br> - `jobType`: Job type filter. Options: `all`, `part time`, `full-time`, `internship` (default: `all`). <br> - `sort`: Sorting order. Options: `newest`, `oldest`, `a-z`, `z-a` (default: `newest`). <br> - `limit`: Number of results per page (default: `6`). <br> - `page`: Page number (default: `1`).| N/A              |              
|`/api/v1/jobs`| POST| Creates a job in the database. **Requires user authentication** | N/A | `{"company":"some company","position":"senior developer", "jobLocation":"mexico","jobStatus":"interview","jobType":"full-time"}`| 
|`/api/v1/jobs/:id`| GET |  Gets some job from the database by id. **Requires user authentication** | N/A | N/A | 
|`/api/v1/jobs/:id`| PATCH |  Updates a job in the database based on the id provided, all fields are mandatory. **Requires user authentication** | N/A | `{"company": "google", "position": "product owner", "jobStatus": "interview","jobType": "part-time","jobLocation": "mexico"}` | 
|`/api/v1/jobs/:id`| DELETE |  Eliminates a job by id from the database. **Requires user authentication** | N/A | N/A | 
|`/api/v1/jobs/stats`| GET |  Obtains information about rejected, interviewed and pending jobs, showing a graph over time in react application. **Requires user authentication** | N/A | N/A | 
|`/api/v1/user/current-user`| GET |  It obtains the current user, necessary to use different actions in the application, the middleware checks that it is the user who performs the actions. **Requires user authentication** | N/A | N/A | 
|`/api/v1/user/admin/app-stats`| GET |   It obtains the created users and total jobs in the application, only if the current user is an administrator, the first account that is created is the administrator account, in the user interface in react, this information is better visualized if it is an administrator. **Requires user authentication** | N/A | N/A | 
|`/api/v1/user/update-user`| PATCH |   Allows you to edit user information such as first name, last name, location as well as the avatar which is optional. **Requires user authentication** | N/A | `{"name": "John","lastName": "Doe","location": "mexico", "avatar": "https://example.com/avatar.jpg"}` <br><br> **Note:** `avatar` is optional. | 
|`/api/v1/user/delete-profile-image`| DELETE |   Remove avatar from profile. **Requires user authentication** | N/A | N/A | 
|`/api/v1/user/update-user-password`| PATCH |   Allows you to change the password of the user in his current session. **Requires user authentication** | N/A | `{"oldPassword": "Test123@","newPassword":"Testing123@","newPasswordConfirm": "Testing123@"}` | 

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
![mern-jobs-12](https://github.com/user-attachments/assets/a9e3cfab-1bad-481e-8687-6e7c09b1840e)

## Installation
