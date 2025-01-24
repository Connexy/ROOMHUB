// import React, { useState, useEffect } from 'react';
// import io from 'socket.io-client';

// const socket = io('http://localhost:5000', {
//     transports: ['websocket', 'polling'], // Specify transport methods
// });

// export default function Chat() {
//     const bookingId = `room-${localStorage.getItem("bookingId")}`; // Consistent room naming
//     const userId = localStorage.getItem("userId");
//     const userType = localStorage.getItem("userType");

//     const [messages, setMessages] = useState([]); // List of messages
//     const [message, setMessage] = useState(''); // Current input message
//     const [isSending, setIsSending] = useState(false); // Track sending state

//     useEffect(() => {
//         if (!bookingId || !userId || !userType) {
//             console.error('Missing bookingId, userId, or userType');
//             return;
//         }

//         // Join the chat room
//         socket.emit('joinRoom', { bookingId, userId, userType });

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

//         // Listen for incoming messages
//         socket.on('message', handleNewMessage);

//         return () => {
//             socket.emit('leaveRoom', { bookingId });
//             socket.off('message', handleNewMessage); // Cleanup listener
//         };
//     }, [bookingId, userId, userType]);

//     const handleSendMessage = () => {
//         if (message.trim() === '' || isSending) return; // Prevent empty or duplicate sends

//         setIsSending(true); // Lock sending
//         console.log('Sending message:', message); // Debugging

//         const newMessage = {
//             sender: userId,
//             text: message,
//             timestamp: new Date().toISOString(),
//         };

//         // Emit the message to the server with acknowledgment
//         socket.emit('chatMessage', { bookingId, message: newMessage }, () => {
//             console.log('Callback executed, unlocking sending state'); // Debugging
//             setIsSending(false); // Unlock sending
//             setMessages((prevMessages) => {
//                 // Check if the message already exists
//                 if (prevMessages.some(msg => msg.timestamp === newMessage.timestamp)) {
//                     return prevMessages;
//                 }
//                 return [...prevMessages, newMessage]; // Update local state
//             });
//             setMessage(''); // Clear input
//         });
//     };

//     return (
//         <div className="chat-page">
//             <h2>Chat with your Home Owner</h2>

//             {/* Chat messages display */}
//             <div className="chat-window">
//                 <div className="chat-messages">
//                     {messages.length === 0 && <p>No messages yet.</p>}
//                     {messages.map((msg, index) => (
//                         <div
//                             key={index}
//                             className={`message ${msg.sender === userId ? 'sent' : 'received'}`}
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

//                 {/* Chat input */}
//                 <div className="chat-input">
//                     <input
//                         type="text"
//                         value={message}
//                         onChange={(e) => setMessage(e.target.value)}
//                         placeholder="Type your message..."
//                     />
//                     <button onClick={handleSendMessage} disabled={isSending}>
//                         {isSending ? 'Sending...' : 'Send'}
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }