import { useEffect, useState } from 'react';
import MessageBoard from './components/MessageBoard';
import MessageForm from './components/MessageForm';
import Loading from './components/Loading';

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    async function getMessages() {
      const messageUrl = import.meta.env.VITE_API_URL;

      setLoading(true);
      const response = await fetch(`${messageUrl}/api/messages`, {
        mode: 'cors',
      });

      const data = await response.json();
      const { messages } = data;

      if (messages) {
        setMessages(messages);
        setLoading(false);
      }
    }

    getMessages();
  }, []);

  return (
    <div className="container">
      <div className="board">
        <h1 className="title">Message Board</h1>
        {isLoading ? (
          <Loading message="Loading messages..." />
        ) : (
          <MessageBoard messages={messages} />
        )}
        <MessageForm setMessages={setMessages} />
      </div>
    </div>
  );
}

export default App;
