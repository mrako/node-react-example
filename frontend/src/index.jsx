/* DO NOT DELETE THESE LINES */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './assets/stylesheets/style.css';

const baseURL = process.env.ENDPOINT;

/* ADD YOUR CODE AFTER THIS LINE */

const getChats = async () => {
  try {
    const url = `${baseURL}/chats`;
    const response = await fetch(url);
    return response.json();
  } catch (error) {
    console.error(error); // eslint-disable-line no-console
  }
  return { greeting: 'Could not get chats from backend' };
};

const Chats = (props) => {
  const { chats } = props;

  const ChatList = chats.map(c => <li>{c.message}</li>);

  return (
    <div>
      <h1>Chats:</h1>
      <ul>{ChatList}</ul>
    </div>
  );
};

class App extends Component {
  state = { chats: [] }

  async componentWillMount() {
    const response = await getChats();
    this.setState({ chats: response.results });
  }

  render() {
    const { chats } = this.state;

    return <Chats chats={chats} />;
  }
}

/* DO NOT DELETE AFTER THIS LINE */

ReactDOM.render(
  <App />,
  document.getElementById('root'),
);
