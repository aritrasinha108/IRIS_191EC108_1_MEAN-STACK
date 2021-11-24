# IRIS_191EC108_MEAN-STACK

The recruitment task for IRIS Web Development team. The framework used is Node.js and the database is mongodb. This is a library management system with authentication using passport.js. The admins can upload any book they want to the website with a few preview images (they are also stored in the database using gridfs and multer). The students can issue the books after the admin's approval and return them back to the library. The students are not allowed to go to the admin's page and vice versa. All the implemented features are mentioned below. 
<br>
# **Installation and setup**
### 1. Clone the repo to your local device and open the folder on the terminal
### 2. <code>npm init </code>
### 3. <code>npm i </code> to install all the npm packages
### 4. <code>npm i -D </code> to install the dev Dependencies
### 5. <code>npm run dev </code> to run the server and go to [localhost:3000](http://localhost:3000/)
<br>
<img src="https://github.com/aritrasinha108/IRIS_191EC108_MEAN-STACK/blob/master/screenshots/auth/welcome.png" width="800" height="500"> 

# **Working**
## 1. Registration and Login
#### There are two ways one can register, as an admin or as a student..To register as an admin, the user needs a key, which has been set as <code>123456789</code> here

<img src="https://github.com/aritrasinha108/IRIS_191EC108_MEAN-STACK/blob/master/screenshots/auth/register.png" width="800" height="500">

#### To register as student, the user doesn't have to enter any key. In case the user enters the key and it turns out to be wrong, he or she will be redirected back to the registration page and asked to enter the correct key or don't enter a key at all.
<img src="https://github.com/aritrasinha108/IRIS_191EC108_MEAN-STACK/blob/master/screenshots/auth/login.png" width="800" height="500">

#### Once the validation is complete, he or she will be redirected to the login page, to sign in to the account. After entering the correct credentials, the user will be taken to the homepage of the website according to his postion (admin or a student).

## 2. Admin Page
### Dashboard
#### The dashboard page contains all the books that have been uploaded till now. The books have certain tags added to them which can be used to search for them in the search bar (Not case sensitive). An admin can delete, edit or view the book details and it's images from here.
<img src="https://github.com/aritrasinha108/IRIS_191EC108_MEAN-STACK/blob/master/screenshots/admin/dashboard.png" width="800" height="500">

### Edit details of a Book
#### The title, description, isbn and the quantity can be overwritten while new tags and images can be added here.
<img src="https://github.com/aritrasinha108/IRIS_191EC108_MEAN-STACK/blob/master/screenshots/admin/edit.png" width="800" height="500">

### Delete a book
#### Once you click the delete icon you can delete the book from the database.
### View Page
#### This page shows all the details and images of the book, for an admin, options for editing and deleting are also present here.
<img src="https://github.com/aritrasinha108/IRIS_191EC108_MEAN-STACK/blob/master/screenshots/admin/view.png" width="800" height="500">

### New Upload 
#### To upload a new book, got the new upload page where you need to enter the title, description, quantity aailable, images of the book, the isbn and a few search tags for the book. Once you click submit, the details will be validated and the book will be uploaded.
<img src="https://github.com/aritrasinha108/IRIS_191EC108_MEAN-STACK/blob/master/screenshots/admin/new.png" width="800" height="500">

### Requests
#### In the requests page, you get all issue requests that have been made by the students to borrow a book arranged according to the date (Latest request will be listed first). Here you can approve or decline a request made by a student. Once you approve the book will be lent to the student and the quantity will decrease by 1. Id declined, the book will not be issued to the student.
<img src="https://github.com/aritrasinha108/IRIS_191EC108_MEAN-STACK/blob/master/screenshots/admin/requests.png" width="800" height="500">

### Transanctions Page
#### This page shows all the requests made by admin and their status sorted according to the date (latest first)
<img src="https://github.com/aritrasinha108/IRIS_191EC108_MEAN-STACK/blob/master/screenshots/admin/transanctions.png" width="800" height="500">

## 3. Student Page
### Dashboard
#### The dashboard page contains all the books that have been uploaded till now and are availabe (quantity >0). Like the admin page, this page also has search functionality available. A student can create an issue request for or view any book.
<img src="https://github.com/aritrasinha108/IRIS_191EC108_MEAN-STACK/blob/master/screenshots/student/dashboard.png" width="800" height="500">

### Transanctions Page
#### This page shows all the requests made by the student and their status sorted according to the date (latest first)
<img src="https://github.com/aritrasinha108/IRIS_191EC108_MEAN-STACK/blob/master/screenshots/student/transanctions.png" width="800" height="500">

### My Books
#### This page shows all the books issued books by the student which have not been returned till now.
<img src="https://github.com/aritrasinha108/IRIS_191EC108_MEAN-STACK/blob/master/screenshots/student/mybooks.png" width="800" height="500">

### Return a Book
#### Once a user click on the return book icon, the book will be returned and the quantity of the book will be increased by 1.

## 4. Logout
### Once the user clicks logout, he is logged out of the account and redirected to the login page.


# Impementated Features
### 1. Authentication using passport.js for admin and a student with passwords stored after being hashed
### 2. CRUD operations can be performed on books by an admin with the images stored in the database using gridfs and multer
### 3. Issue requests can be created by a student for any book available and the same can be approved or declined by an admin.
### 4. The issued books can be returned by the student.
### 5. Page to show all the transanctions made by a student or and admin along with the issue dates and return dates (if any).
### 6. Page to show all the books borrowed by a student.
### 7. Restriction of students to go to admin's page and vice-versa.




