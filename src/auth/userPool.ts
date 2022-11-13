import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: "REPLACE_WITH_USER_POOL_ID",
  ClientId: "REPLACE_WITH_APP_CLIENT_ID",
};

export default new CognitoUserPool(poolData);
