import 'react-native-gesture-handler';
import React from 'react';
import RootNav from './src/navigation/RootNavigation';
import ApolloClientProvider from './src/providers/ApolloClientProvider';
const App: React.FC = () => {
  return (
    <ApolloClientProvider>
      <RootNav />
    </ApolloClientProvider>
  );
}

export default App;
