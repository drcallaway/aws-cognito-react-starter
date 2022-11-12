# AWS Cognito React Starter
I created this repo to serve as a quick starter for new projects that need basic user authentication
functionality such as sign in, sign up, sign out, forgot password, and change password. It uses
[Vite](https://vitejs.dev/), [React](https://reactjs.org/), [MUI React](https://mui.com/), and
[AWS Cognito](https://aws.amazon.com/cognito/).

To use, first clone the repo to your own project:

```
git clone git@github.com:drcallaway/aws-cognito-react-starter.git my-new-project
```

Next, you'll need to create a new Cognito user pool in the AWS console. You'll then need to copy the
user pool ID and app client ID from the AWS console into the [userPool.ts](/src/auth/userPool.ts)
file. Run the project like this:

```
$ yarn
$ yarn dev
```

Thanks to [dbroadburst's repo](https://github.com/dbroadhurst/aws-cognito-react) from which I
borrowed some code to create this project.