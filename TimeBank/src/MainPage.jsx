import { NavigationContainer } from '@react-navigation/native';
import { useState } from 'react';

import BankContext from './BankContext';
import Tabs from './navigation/Tabs';
import TimeStack from './navigation/TimeStack';
import LoginStack from './navigation/LoginStack';
import UserContext from './contexts/UserContext';

export default function MainPage(props) {
  const [bank, setBank] = useState();
  const [usernameData, setUsernameData] = useState("");

  return (
    <UserContext.Provider value={{usernameData, setUsernameData}}>
      <BankContext.Provider value={{bank, setBank}}>
        <NavigationContainer>
          <LoginStack />
        </NavigationContainer>
      </BankContext.Provider>
    </UserContext.Provider>
  );
}