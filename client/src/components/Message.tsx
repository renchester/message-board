import format from 'date-fns/format';

type MessageProps = {
  message: Message;
};

const Message = (props: MessageProps) => {
  const { message } = props;

  const formattedDate = format(
    new Date(message.date_created),
    'LL/dd/yyyy hh:mmaa',
  );

  const colors = ['E4BC7A', '7C98DE', 'FF9FE5', 'FFD4D4', 'FF858D'];
  const bgIndex = Math.floor(Math.random() * 5);

  const styles = {
    '--message-color': `#${colors[bgIndex]}`,
  } as React.CSSProperties;

  return (
    <div className="message">
      <div className="message__content" style={styles}>
        {message.message}
      </div>
      <div className="message__username">{message.username}</div>
      <small className="message__date">{formattedDate}</small>
    </div>
  );
};
export default Message;
