import { Provider } from 'react-redux';
import UncontrolledForm from './components/features/forms/UncontrolledForm';
import { store } from '../src/store/store';
import ReactHookForm from './components/features/forms/ReactHookForm';

function App() {
  return (
    <Provider store={store}>
      <div style={{ display: 'flex' }}>
        <UncontrolledForm />;
        <ReactHookForm />
      </div>
    </Provider>
  );
}

export default App;
