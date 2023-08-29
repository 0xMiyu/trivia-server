import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const useSocket = (url: string): Socket | null => {
	const [socket, setSocket] = useState<Socket | null>(null);

	useEffect(() => {
		const initializeSocket = async () => {
			const session = await getSession();
			const newSocket = io(url, {
				query: {
					publicKey: session?.user.publicKey,
					userName: session?.user.userName,
				},
			});
			setSocket(newSocket);

			return () => {
				newSocket.disconnect();
			};
		};

		initializeSocket();
	}, [url]);

	return socket;
};

export default useSocket;
