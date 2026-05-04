import { Component, type ReactNode } from 'react';
import Page from './components/Page/Page';
import './App.css';

class App extends Component {
  override render(): ReactNode {
    return <Page />;
  }
}

export default App;
