import React, { useEffect } from 'react';
import { account, OAuthProvider } from '../../services/appwrite';

const Google: React.FC = () => {
  useEffect(() => {
    account.createOAuth2Session(
      OAuthProvider.Google,
      'http://localhost:5173',
      'http://localhost:5173/auth/signin',
    );
  }, []);

  return <div></div>;
};

export default Google;
