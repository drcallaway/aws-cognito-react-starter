# AWS Cognito React Starter
I created this repo to serve as a quick starter for new projects that need basic user authentication
functionality such as sign in, sign up, sign out, forgot password, and change password. It uses
[Vite](https://vitejs.dev/), [React](https://reactjs.org/), [Material UI](https://mui.com/), and
[AWS Cognito](https://aws.amazon.com/cognito/).

To use, first clone the repo to your own project:

```
git clone git@github.com:drcallaway/aws-cognito-react-starter.git YOUR_PROJECT
```

Then create a new GitHub repo and point your local project to it:

```
cd YOUR_PROJECT
git remote set-url origin git@github.com:YOUR_USERNAME/YOUR_REPO
git push
```

Next, you'll need to create a new Cognito user pool in the AWS console and note the user pool ID and
app client ID. You'll then create a new file named `.env.local` in the project root composed of the
following two lines:

```
VITE_COGNITO_USER_POOL_ID=<REPLACE WITH USER POOL ID>
VITE_COGNITO_APP_CLIENT_ID=<REPLACE WITH APP CLIENT ID>
```

Finally, install the dependencies and run the project like this:

```
yarn && yarn dev
```

Thanks to [dbroadburst](https://github.com/dbroadhurst/aws-cognito-react) from whom I borrowed some
of the code to create this project.