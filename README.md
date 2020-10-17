# IRIS_191EC108_MEAN-STACK
The recruitment task for IRIS Web Development team.
<br>
# **Installation and setup**
### 1. Clone the repo to your local device and open the folder on the terminal
### 2. <code>npm init </code>
### 3. <code>npm i </code> to install all the npm packages
### 4. <code>npm i -D </code> to install the dev Dependencies
### 5. <code>npm run dev </code> to run the server and go to [localhost:3000](http://localhost:3000/)
<br>
 
# **Working**
## 1. Registration and Login
#### There are two ways one can register, as an admin or as a student..To register as an admin, the user needs a key, which has been set as <code>123456789</code> here
#### To register as student, the user doesn't have to enter any key. In case the user enters the key and it turns out to be wrong, he or she will be redirected back to the registration page and asked to enter the correct key or don't enter a key at all.
#### Once the validation is complete, he or she will be redirected to the login page, to sign in to the account. After entering the correct credentials, the user will be taken to the homepage of the website according to his postion (admin or a student).

## 2. Admin Page
### Dashboard
#### The dashboard page contains all the books that have been uploaded till now. The books have certain tags added to them which can be used to search for them in the search bar (Not case sensitive). An admin can delete, edit or view the book details and it's images from here.
### Edit details of a Book
#### The title, description, isbn and the quantity can be overwritten while new tags and images can be added here.
### Delete a book
#### Once you click the delete icon you can delete the book from the database.
### View Page
#### This page shows all the details and images of the book, for an admin, options for editing and deleting are also present here.
### New Upload 
#### To upload a new book, got the new upload page where you need to enter the title, description, quantity aailable, images of the book, the isbn and a few search tags for the book. Once you click submit, the details will be validated and the book will be uploaded.
### Requests
#### In the requests page, you get all issue requests that have been made by the students to borrow a book arranged according to the date (Latest request will be listed first). Here you can approve or decline a request made by a student. Once you approve the book will be lent to the student and the quantity will decrease by 1. Id declined, the book will not be issued to the student.

## 3. Student Page
### Dashboard
#### The dashboard page contains all the books that have been uploaded till now and are availabe (quantity >0). Like the admin page, this page also has search functionality available. A student can create an issue request for or view any book.
### Transanctions Page
#### This page shows all the requests made by students and their stattus sorted according to the date (latest first)
### My Books
#### This page shows all the books issued books by the student which have not been returned till now.
### Return a Book
#### Once a user click on the return book icon, the book will be returned and the quantity of the book will be increased by 1. 

## 4. Logout
### Once the user clicks logout, he is logged out of the account and redirected to the login page.


# Impementated Features
### 1. Authentication using passport.js for admin and a student with passwords stored after being hashed
### 2. CRUD operations can be performed on books by an admin
### 3. Issue requests can be created by a student for any book available and the same can be approved or declined by an admin.
### 4. The issued books can be returned by the student.
### 5. Page to show all the transanctions made by a student.
### 6. Page to show all the books borrowed by a student.




