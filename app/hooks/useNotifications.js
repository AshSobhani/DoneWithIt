import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import { useEffect } from "react";

import expoPushTokenApi from "../api/expoPushTokens";
import logger from "../utility/logger";

export const useNotifications = notificationListener => {
	useEffect(() => {
		registerForPushNotifications();

		if (notificationListener)
			Notifications.addListener(notificationListener);
	}, []);

	const registerForPushNotifications = async () => {
		try {
			const permission = await Permissions.askAsync(
				Permissions.NOTIFICATIONS
			);
			if (!permission.granted) return;

			const token = await Notifications.getExpoPushTokenAsync();
			expoPushTokenApi.register(token);
		} catch (error) {
			logger.log("Error getting push token.", error);
		}
	};
};
