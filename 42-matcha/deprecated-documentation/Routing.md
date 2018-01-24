# 42-matcha-legacy - Routing

The front-end application routing and

> - /
> - /edit/account
> - /edit/profile
> - /forgot-password
> - /messages
> - /messages/{username}
> - /search
> - /user/{username}

## Header

The header is a global component who contains the **login form** if the user is a
guest or if it is not, it contains the user **account notifications**, the **profile
and account link**, and the **sign-out action link**.

## Landing page

> - /

This page allow the user to **register** if it isn't already done.

## Validation page

> - /confirmation

Just an advert about the **validation process** and the **email confirmation link**.

## Profile page

> - /user/{username}

Showing **public and private user informations**. (It depend on the `username` variable)
Also showing who has viewed the signed user profile.

## Users search

> - /search

The primary purpose of the view is to allow the signed user to make some **sortable**
and **filterable** search.
Also showing a bunch of **active users** based on a custom algorithm. (Can be based on
the signed user gender and orientation...)

## User profile edition (Public informations)

> - /edit/profile

This view purpose is about editing **public** profile informations like `gender`,
`bio`, and anything that **will be shown** to other users.

## User account edition (Private informations)

> - /edit/account

This view purpose is about editing **private** profile informations like `email`,
`password`, and anything that will **not be shown** to other users.
