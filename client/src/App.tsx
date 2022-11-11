import logo from './logo.svg';
import { GREETER } from '@tamiyo/shared';
import './App.css';
import { gql, useQuery } from '@apollo/client';

function App() {
  const { loading, data, error } = useQuery(gql(`
    query SayHello {
      hello
    }
  `))

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {GREETER}: {loading ? 'Loading' : data?.hello || error?.message}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
