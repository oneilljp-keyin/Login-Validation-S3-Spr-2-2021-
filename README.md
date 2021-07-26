Programmer: John O'Neill
Date Submitted: July 27, 2021
Project for Sprint Week #2

This is my submission for the Sprint Week #2 project.

To inintialized the database and tables, run all scripts in the database.sql file located in
the root directory in PGAdmin or the PSQL command line.

After the database is set up, run 'npm install' in the root directory to download all the
modules needed to run this application. Then start the application by running 'npm start'.

After starting the application, open a browser window and navigate to http://localhost/5000.
You will be brought to a welcome screen where you are ask to either sign up or sign-in. Of
course, at first you will have to create a new account, using your name, email, password, and
which security level you wish to have to navigate the site.

For the security levels, all visitors will have access to the welcome, sign-in, and sign-up
pages, as no security level has been defined because no sign-in has happened. The 3 levels are
Customer, Supervisor, and Administrator. A customer will have access to the profile page and
Example #1. A supervisor will have the same levels as a customer, plus access to
Example #2. An administrator will have access to all pages, including the admin and secret
pages. Anyone not logged in and/or doesn't have the proper security levels will be denied access
to certain pages.

This is the basics of a login, authentication and authorization program. Passport was used to
verify if a user is logged in with the proper credentials and a self-balancing binary search
tree was used to retrieve what routes/pages a user has access to based on their security level.
