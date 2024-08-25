import { getChatCsvAction } from '@/app/dashboard/recorded-lectures/[roomId]/page';
import { useEffect, useState } from 'react';
import styles from './ShowChat.module.css'; // CSS module for styling

const ShowChat = ({ csvUrl }) => {
	const [messages, setMessages] = useState([]);

	useEffect(async () => {
		// Fetch and parse the CSV file
		if (csvUrl) {
			const { data } = await getChatCsvAction(csvUrl)
			console.log("data===>", data)
			// Papa.parse(csvData, {
			// 	header: true,
			// 	skipEmptyLines: true,
			// 	complete: (result) => {
			// 		setMessages(result.data); // Store the parsed CSV data as messages
			// 	},
			// });
		}

	}, [csvUrl]);

	return (
		<div className={styles.chatContainer}>
			{messages.map((message, index) => (
				<div
					key={index}
					className={
						message.sender === 'User1' ? styles.userMessage : styles.otherMessage
					}
				>
					<div className={styles.messageSender}>{message.sender}</div>
					<div className={styles.messageText}>{message.message}</div>
					<div className={styles.messageTimestamp}>{new Date(message.timestamp).toLocaleTimeString()}</div>
				</div>
			))}
		</div>
	);
};

export default ShowChat;
