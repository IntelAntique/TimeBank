import { NavigationContainer } from '@react-navigation/native';
import { useState } from 'react';

import BankContext from './BankContext';
import Tabs from './navigation/Tabs';

export default function MainPage(props) {
  const [prefs, setPrefs] = useState({});

  return (
    <>
      <BankContext.Provider value={{prefs, setPrefs}}>
        <NavigationContainer>
          <Tabs />
        </NavigationContainer>
      </BankContext.Provider>
    </>
  );
}