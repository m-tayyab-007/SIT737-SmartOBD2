# Smart-OBD2
Smart-OBD2 for sit725
This application aims to help users check car health and alert security issues to users when they are driving. 
The data provided to the user consists of three parts so far:
1.  Health information of multiple car parts.
2.  Real-time status monitoring on engine temperature,  brake performance, and fuel consumption.
3.  Alarm message for potential accident detected on both the car of users themselves and other users nearby.

# Simulated Sensor
We use node-red to simulate our sensors to continuously update randomized data.
We will showcase our project by using three users, thus we have set a docker to run three ports for three node-red instances.
The JSON file of all node-red instances is in the node-red-data folders.

# Database
We use MongoDB to store users' information and driving data updated by the sensor.
Collection 'users' for user data.
Collection 'simulate' for sensor data.

# REST API
/api/user: Register button in the register page will send a POST of this api to finish validation and updating of a new user. Send GET to get users' information from the database and store it in the api.
/api/data: Send GET to get driving data from the collection 'simulate' and store it in the api. Also, use authenticated to make sure just get data updated by the current user.

# Routes
Default: login page
Register: register page
Homepage: accessed by POST request in the login page, or from other pages after logging in. Can store user's session. Needs authentication if accessing directly with URL.
HealthReport: accessed from the homepage and other pages after logging in. Can share user's session. Needs authentication if accessing directly with URL.
Monitor: accessed from the homepage and other pages after logging in. Can share user's session. Needs authentication if accessing directly with URL.
TripAnalysis: accessed from the homepage and other pages after logging in. Can share user's session. Needs authentication if accessing directly with URL.
Logout: No views but can be accessed by clicking the logout button on the navbar to log the user out.
Delete: No views but can be accessed by clicking the delete user button on the navbar to delete user and trip information from the database.

# Functionality
Login: Use passport to find matched user. Redirect to the homepage if matched, otherwise, refresh and show the reason for failure. 
Register: Use mongoose to define the User model, then upload new user information into the database. Redirect to login page if succeeded, otherwise, refresh and show the reason for failure. 
Homepage: Use the session to show the homepage with information from the current user and provide a portal to other pages.
HealthCheck: Show health information of the car of the current user.
Monitor: Show real-time data detected by the sensor once the user clicked the car-on button. If abnormal data is detected, show alarm. Stop generating data by clicking car-off. If detected potential accident, then emit to other users driving in the same location, vice-versa, show alarm from other users driving in the same location.
TripAnalysis: Generating trip button by detecting users' trips in the database. The number of the trip button means the number of trips detected. Then show general information by analyzing the trip.

# Socket io
For monitor: Only the sender's client will show current data and normal alarm. If a potential accident is detected, only clients in the same room excluding the sender will show the alarm with the sender's information(registration number of the car).
For analysis: Only the sender's client will show the trip button and trip information. 

# Docker
For project: We produced a docker image of our project.
For node-red: We produced three containers in a docker image to represent three sensors for three users.


