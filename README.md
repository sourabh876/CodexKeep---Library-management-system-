# CodexKeep---Library-management-system-
This is a library management API backend for thr management of users and the books

## Routes and the endpoints

## /users

GET : get all the list of users in system
POST : create/register a new user

## /users/{id}

GET : get a user by their id
PUT : updating a user  by their id
DELETE : deleting a user by their id (check the user still has an issued book) && (is their any fine/penalty to be collected?)

## /users/subscription-details/{id}

GET : get subscription details of a user by their id
>> Date of subscription 
>> Valid till?
>> fine if any?

## /users/books

GET : Get all the books in system
POST : Add a new book to the system


## /books/{id}

GET : get a book by its id
PUT : update a book by its id
DELETE : delete a book by its id

## /books/issued

GET : get all the issued books

## /books/issued/withfine

GET : get all the issued books with their fine amount

## subscription types

>>basic plan(3 months)
>>standard plan(6 months)
>>premium plan (a year)

>if a user missed the renewal date, then user should be collected with $100.
>if a user misses his subsscription, then user is expected to pay $100.
>if user misses both renewal and subscription, then user should be collected with $200.