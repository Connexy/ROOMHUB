// import React, { useEffect, useState } from 'react';
// import io from 'socket.io-client';

// const socket = io('http://localhost:5000', {
//     transports: ['websocket', 'polling'], // Specify transport methods
// });

// export default function ChatOwner() {
//     const [messages, setMessages] = useState([]);
//     const [newMessage, setNewMessage] = useState('');
//     const homeownerId = localStorage.getItem('userId');
//     const userType = localStorage.getItem('userType');
//     const bookingId = `room-${localStorage.getItem("bookingId")}`; // Consistent room naming

//     useEffect(() => {
//         if (!bookingId || bookingId === 'room-null') {
//             console.error('Invalid bookingId');
//             return;
//         }

//         // Join the room
//         socket.emit('joinRoom', { bookingId, userId: homeownerId, userType: 'homeowner' });

//         const handleNewMessage = (newMessage) => {
//             console.log('New message received:', newMessage); // Debugging
//             setMessages((prevMessages) => {
//                 // Check if the message already exists
//                 if (prevMessages.some(msg => msg.timestamp === newMessage.timestamp)) {
//                     return prevMessages;
//                 }
//                 return [...prevMessages, newMessage]; // Append the new message
//             });
//         };

//         socket.on('message', handleNewMessage);

//         return () => {
//             socket.emit('leaveRoom', { bookingId });
//             socket.off('message', handleNewMessage); // Cleanup listener
//         };
//     }, [homeownerId, bookingId, userType]);

//     const sendMessage = () => {
//         if (newMessage.trim() === '') return;

//         const message = {
//             sender: homeownerId,
//             text: newMessage,
//             timestamp: new Date().toISOString(),
//         };

//         socket.emit('chatMessage', { bookingId, message }, () => {
//             setMessages((prevMessages) => {
//                 // Check if the message already exists
//                 if (prevMessages.some(msg => msg.timestamp === message.timestamp)) {
//                     return prevMessages;
//                 }
//                 return [...prevMessages, message];
//             });
//             setNewMessage('');
//         });
//     };

//     return (
//         <div className="chat-page">
//             <h2>Chat with User</h2>
//             <div className="chat-window">
//                 <div className="chat-messages">
//                     {messages.map((msg, index) => (
//                         <div
//                             key={index}
//                             className={`message ${msg.sender === homeownerId ? 'sent' : 'received'}`}
//                         >
//                             <p>{msg.text}</p>
//                             <span>
//                                 {new Date(msg.timestamp).toLocaleTimeString([], {
//                                     hour: '2-digit',
//                                     minute: '2-digit',
//                                 })}
//                             </span>
//                         </div>
//                     ))}
//                 </div>
//                 <div className="chat-input">
//                     <input
//                         type="text"
//                         placeholder="Type a message..."
//                         value={newMessage}
//                         onChange={(e) => setNewMessage(e.target.value)}
//                         onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
//                     />
//                     <button onClick={sendMessage}>Send</button>
//                 </div>
//             </div>
//         </div>
//     );
// }