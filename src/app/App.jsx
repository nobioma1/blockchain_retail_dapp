import Web3Provider from '@contexts/Web3Provider';
import Header from '@/components/Header';

const App = () => {
  return (
    <Web3Provider>
      <Header />
    </Web3Provider>
  );
};

export default App;
