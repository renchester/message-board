import { useEffect, useRef } from 'react';
import Message from './Message';

type MessageBoardProps = {
  messages: Message[];
};

const MessageBoard = (props: MessageBoardProps) => {
  const { messages } = props;
  const boardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (boardRef.current) {
      boardRef.current.scrollTo({
        top: boardRef.current.scrollHeight,
      });
    }
  }, [messages]);

  return (
    <div className="message-board" ref={boardRef}>
      {messages.length > 0
        ? messages.map((val) => <Message message={val} key={val._id} />)
        : 'No messages yet'}

      <div className="message-board__anchor"></div>
    </div>
  );
};

export default MessageBoard;
