import { createContext, useEffect, useState } from 'react';

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
	const [userInfo, setUserInfo] = useState({});

	const userData = localStorage.getItem('userData');

	useEffect(() => {
		setUserInfo(JSON.parse(userData));
	}, [userData]);

	const updateUserInfo = (data) => {
		setUserInfo(data);
		localStorage.setItem('userData', JSON.stringify(data));
	};

	return (
		<UserContext.Provider value={{ userInfo, updateUserInfo }}>
			{children}
		</UserContext.Provider>
	);
}
