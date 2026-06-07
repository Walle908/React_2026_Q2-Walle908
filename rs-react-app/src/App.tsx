import { Provider } from 'react-redux';
import UncontrolledForm from './components/features/uncontrolledForm/UncontrolledForm';
import { store } from '../src/store/store';

function App() {
  return (
    <Provider store={store}>
      <UncontrolledForm />;
    </Provider>
  );
}

export default App;
