import React, { useEffect, useState } from 'react';
import { account, OAuthProvider } from '../../services/appwrite';

const Google: React.FC = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log(getUser);
    account.createOAuth2Session(OAuthProvider.Google);
  }, []);

  const logoutUser = async () => {
    try {
      await account.deleteSession('current');
    } catch (error) {
      console.error(error);
    }
  };

  const getUser = async () => {
    try {
      return await account.get();
    } catch (error) {
      console.error(error);
    }
  };

  return <div></div>;
};

export default Google;
