import { useState } from 'react';
import sendIcon from '/send-icon.svg';

type MessageFormProps = {
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
};

const MessageForm = (props: MessageFormProps) => {
  const { setMessages } = props;

  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');

  const messageUrl = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`${messageUrl}/api/messages`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          new_message: message,
        }),
      });
      const data = await response.json();
      const { messages } = data;

      if (messages) {
        setMessages(messages);
      }

      // Reset Form
      setMessage('');
      setUsername('');
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form__input-wrapper">
        <label htmlFor="username" className="form__label" hidden>
          Username:
        </label>
        <input
          type="text"
          name="username"
          id="username"
          className="form__input"
          minLength={1}
          maxLength={50}
          placeholder="Username"
          onChange={handleUsernameChange}
          value={username}
          required
        />
      </div>
      <div className="form__input-wrapper">
        <label htmlFor="new_message" className="form__label" hidden>
          Enter your message:
        </label>
        <input
          type="text"
          name="new_message"
          id="new_message"
          className="form__input"
          minLength={1}
          placeholder="Enter your message"
          onChange={handleMessageChange}
          value={message}
          required
        />
      </div>
      <button
        type="submit"
        className="form__btn"
        aria-label="Send message"
        title="Send message"
      >
        <img src={sendIcon} alt="Send icon" className="form__btn-icon" />
      </button>
    </form>
  );
};
export default MessageForm;
