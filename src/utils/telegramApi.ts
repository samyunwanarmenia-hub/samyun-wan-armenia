export const sendTelegramMessage = async (message: string) => {
  try {
    const response = await fetch("/.netlify/functions/sendTelegramMessage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });
    const data = await response.json();
    if (data.success) {
      console.log("Telegram message sent successfully:", data);
      return data; // Return data on success
    } else {
      console.error("Failed to send Telegram message:", data);
      throw new Error(data.error || "Failed to send Telegram message."); // Throw error
    }
  } catch (error: any) {
    console.error("Error in sendTelegramMessage:", error);
    throw new Error("An unexpected error occurred while sending message."); // Re-throw a generic error
  }
};