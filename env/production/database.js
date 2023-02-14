structure convention.

To do this:
 - Create an env folder in the config folder at the root of your Strapi project folder.
 - Create a production folder in our created env folder (Because you're configuring for the production environment).
 - Create a database.js file in the new production folder (Since we're defining a database configuration) i.e ./config/env/production/database.js
The content of your new database.js file should look similar to the code block below:
module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: env('PGHOST', '127.0.0.1'),
      port: env.int('PGPORT', 5931),
      database: env('PGDATABASE', 'railway'),
      user: env('PGUSER', 'postgres'),
      password: env('PGPASSWORD', 'password'),
      ssl: env.bool(true),
    },
  },
});
To confirm everything goes well, run a production build with:
# npm
ENV_PATH=./.env.production NODE_ENV=production npm run start

# yarn
ENV_PATH=./.env.production NODE_ENV=production yarn start
If everything goes well, you should be able to open the admin panel at http://0.0.0.0:1337/admin:
Serving Production mode of Strapi locally Screenshot

The next step is to make your Strapi project a git repository and push to Github. So that we can deploy on Railway from our repo.

Go back to your project on Railway, Click on the New button, choose the Github Repo option, then you should choose your Strapi app repo.

At this point, the build will fail for two reasons:
 - Because Railway resolved to a node version that Strapi doesn't support. (Strapi doesn't support odd-number releases of Node e.g. v13, v15. From the log, Strapi is picking up v15. Yikes).

- We haven't added our environment variables to Railway. Strapi needs these to run.

Build Failure on Railway

To fix the first issue, change the loose node version specified by default in package.json of your Strapi project.
//package.json
"engines": {
  "node": ">=12.x.x <=16.x.x",
  "npm": ">=6.0.0"
 },
To something more specific like v16.4.2 (a LTS version of Node)
//package.json
"engines": {
  "node": "16.14.2",
  "npm": ">=6.0.0"
 },
Now commit and push. Railway auto deploys on new git commits, our build will still fail as you haven't provided the necessary enviroment variables.

Go to the Variables tab of the Strapi deployment on Railway. Click on the 'Bulk Import' button. Paste in all the contents of the .env.production file you created earlier.
Image description

If everything goes well, our build should now be successful. You should be assigned a Service domain like project-name.up.railway.app. which you can go on to customize.

Strapi deploy screenshot

Resources
Database configuration
Configuration using environment variables
Railwa docs - NodeJS
Top comments (5)

Subscribe
pic
Add to the discussion


imcorentin profile image
Corentin Bernadou
•
Jan 15

Hey Yinka, thanks for your tutorial!
I'm encountering a problem when I run the production build with:
ENV_PATH=./.env.production NODE_ENV=production yarn start
Strapi tells me…

An error occurred while requesting the API

Do you have a solution? Thanks again!


1
Like


fpigeonjr profile image
Frank Pigeon Jr. 🇵🇦🇺🇸
•
Dec 29 '22

This was perfect for what I was looking for. Thanks for sharing.
Now i have connected my strapi app to the database and my data is persisting in between builds...except for images. Guess we need to use cloudinary for that.


1
Like


cmario92 profile image
cmario
•
Jan 8

hey, how do you persist data between local development and production on Railway? can you please explain?


1
Like


fpigeonjr profile image
Frank Pigeon Jr. 🇵🇦🇺🇸
•
Jan 8

hi Mario,
Well once I setup the production build of Strapi I use that to build out the frontend. I am not using the same data on production and my local instance of Strapi.


1
Like


arod1207 profile image
Armando Rodriguez
•
Jan 22

I followed all the steps and deployment was successful, I just dont get a Service domain. It only shows 0.0.0.0:1337. Any help would be appreciated


1
Like
Code of Conduct • Report abuse
The Complete Guide to Full Stack Web3 Development


>> Check out this classic DEV post <<

Read next
tomastrajan profile image
Jest ESM — Total Guide To More Than 100% Faster Testing For Angular⚡
Tomas Trajan 🇨🇭 - Jan 10

surajondev profile image
How to Write an Awesome Readme
Suraj Vishwakarma - Dec 28 '22

alakkadshaw profile image
Axios GET and POST examples
alakkadshaw - Jan 9

jszutkowski profile image
Maximize Your Web Development Potential With Real-Time Communication Between Frontend And Backend
Jarosław Szutkowski - Jan 9


Yinka Adedire
Follow
Frontend Developer.
JOINED
Apr 19, 2018
Trending on DEV Community 👩‍💻👨‍💻
CAST AI profile image
Kubernetes Load Balancer: Expert Guide With Examples
#kubernetes #cloud #devops #tutorial
Corentin Doue profile image
5 control points to implement serverless integration tests like a boss 👔
#aws #serverless #testing #node
Michael Tharrington (he/him) profile image
What was your win this week?
#discuss #weeklyretro
module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: env('PGHOST', '127.0.0.1'),
      port: env.int('PGPORT', 5931),
      database: env('PGDATABASE', 'railway'),
      user: env('PGUSER', 'postgres'),
      password: env('PGPASSWORD', 'password'),
      ssl: env.bool(true),
    },
  },
});
