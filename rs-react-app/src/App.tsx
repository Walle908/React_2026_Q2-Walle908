import { useState, type ReactNode } from 'react';
import { Provider } from 'react-redux';
import UncontrolledForm from './components/features/forms/uncontrolledForm/UncontrolledForm';
import ReactHookForm from './components/features/forms/reactHookForm/ReactHookForm';
import Modal from './components/ui/modal/Modal';
import Text from './components/ui/text/Text';
import Button from './components/ui/button/Button';
import { store } from '../src/store/store';
import styles from './App.module.css';
import CardList from './components/features/cards/cardList/CardList';

function App(): ReactNode {
  const [activeForm, setActiveForm] = useState<'uncontrolledForm' | 'hookForm' | null>(null);

  return (
    <Provider store={store}>
      <div className={styles.container}>
        <Text as="h1" size="xl" weight="bold" color="accent1">
          Hello! Please fill out a form!
        </Text>

        <div className={styles.buttonContainer}>
          <Button onClick={() => setActiveForm('uncontrolledForm')}>Open Uncontrolled Form</Button>
          <Button onClick={() => setActiveForm('hookForm')}>Open React Hook Form</Button>
        </div>

        <CardList />

        <Modal isOpen={activeForm !== null} onClose={() => setActiveForm(null)}>
          {activeForm === 'uncontrolledForm' && (
            <UncontrolledForm onClose={() => setActiveForm(null)} />
          )}
          {activeForm === 'hookForm' && <ReactHookForm onClose={() => setActiveForm(null)} />}
        </Modal>
      </div>
    </Provider>
  );
}

export default App;
