import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: 'us-east-1_EvDWxWHG2',
  ClientId: '45jsnct3itj828e6gesn9v8ab1',
};

export const UserPool = new CognitoUserPool(poolData);
