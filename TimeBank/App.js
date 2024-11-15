import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MainPage from './src/MainPage';
import LoginStack from './src/navigation/LoginStack';

export default function App() {
  return (
    <View style={styles.container}>
      <MainPage />
      <StatusBar style="auto"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
