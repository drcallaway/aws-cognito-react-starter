import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: "us-east-1_yiQUTePFP",
  ClientId: "342b61pt2vqsgmb7udhhdpj95c",
};

export default new CognitoUserPool(poolData);
