import { getMessaging } from "firebase-admin/messaging";

// Function to send notification when a news article is added
export const sendNewsNotification = async (fcmToken, newsTitle, newsDescription) => {
  try {
    const message = {
      notification: {
        title: newsTitle,  // Title of the news
        body: newsDescription,  // Description of the news
      },
      data: {
        newsTitle: newsTitle,
        newsDescription: newsDescription,
      },
      token: fcmToken,
    };

    const response = await getMessaging().send(message);
    console.log("Successfully sent Notification:", response);

    return true;
  } catch (error) {
    console.error("Error while sending notification:", error.message || error);
    return false;
  }
};
