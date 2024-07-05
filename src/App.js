import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Amplify, { Hub } from 'aws-amplify';
import awsExports from './aws-exports';
import React, { useEffect, useState } from 'react';
import './App.css';
import { getUserItems, deleteItem, addItem } from './api/db';
import TableCard from './components/TableCard';
import NavBar from './components/NavBar';
import AddItemCard from './components/AddItemCard';
import PredictionsCard from './components/PredictionsCard';
import AboutCard from './components/AboutCard';
import { Grid } from '@material-ui/core';

Amplify.configure(awsExports);

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setItems(await getUserItems());
  }

  Hub.listen('auth', (data) => {
    if (data.payload.event === 'signIn') {
      fetchData();
    }
  });

  return (
    <div className="app">
      <NavBar />
      <div className="content">
        <Grid container spacing={3}>
          <AboutCard text="This is a shopping list application integrated with AWS!" />
          <AddItemCard 
            addAction={async (itemName) => {
              const response = await addItem(itemName);
              if (response) {
                setItems([...items, { timestamp: new Date().getTime(), itemName }]);
              }
            }} 
          />
          <PredictionsCard 
            addAction={async (itemName) => {
              const response = await addItem(itemName);
              if (response) {
                setItems([...items, { timestamp: new Date().getTime(), itemName }]);
              }
            }} 
          />
          <TableCard 
            data={items}
            removeAction={async (timestamp) => {
              const response = await deleteItem(timestamp);
              if (response) {
                setItems(items.filter(item => item.timestamp !== timestamp));
              }
            }} 
          />
        </Grid>
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.unregister();

export default App;
