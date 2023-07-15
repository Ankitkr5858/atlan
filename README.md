# Project Setup

### Install all dependencies

npm i

### Install Quasar CLI

npm i -g @quasar/cli

### Run project

quasar dev

### Build project

quasar build




# Available Functions

There are four different collections added into the project:

- CITIES
- COUNTRIES
- POSTS
- TASKS

  There are four functions a user can run on these,

- SELECT \* FROM COLLECTION (returns all items from given collection)
- SELECT key FROM COLLECTION (returns all items with given key)
- SELECT key, key2, key3 FROM COLLECTION (returns multiple keys)
- SELECT TOP 20 FROM COLLECTION (returns top items from collection based on user input)

- Collection names are not case sensitive, neither is rest of the query. However, the keys of the objects are case sensitive.

# Framework

This app has been made in Vue 3 using Quasar CLI. Quasar was added to this project for easier component rendering
and the ease of possiblity of switching it to a mobile app or executable using capacitor or electron respectively. Quasar
also has its own components such as inputs and tables which helped this project.

# Hosting

The project is currently hosted on firebase at the link:
https://sql-converter-132.web.app/#/

# Loading Time

The page loads almost instantly initially, taking (`837ms` for initial loading using `gtmetrix.com` and `0.2 seconds` using `browserstack.com/speedlab`) with the loading speed depending entirely on the user internet speed. Most data comes out instantly, however if you view large amount of records, there is a slight load time of around `1.2 seconds` using stopwatch which is due to quasar table rendering all the data. The function to filter data based on query does not take time.

# External Libraries / Packages

There were no other dependencies added into the project except quasar and vue. Quasar plugin `Notify` was used to notify user in case of a wrongly formatted query.
