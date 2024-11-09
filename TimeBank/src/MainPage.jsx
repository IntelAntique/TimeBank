import { NavigationContainer } from '@react-navigation/native';
import { useState } from 'react';

import BankContext from './BankContext';
import Tabs from './navigation/Tabs';

export default function MainPage(props) {
  const [bank, setBank] = useState();

  return (
    <>
      <BankContext.Provider value={{bank, setBank}}>
        <NavigationContainer>
          <Tabs />
        </NavigationContainer>
      </BankContext.Provider>
    </>
  );
}