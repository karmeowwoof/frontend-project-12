import React from 'react';

const Message = ({ content }) => (
  <div className="text-break mb-2">
    <b>{content.username}</b>: {content.body}
  </div>
);

export default Message;
