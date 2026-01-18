interface ChatResponse {
  text: string;
  type?: 'text' | 'recommendation';
  data?: {
    itemName: string;
    price: number;
    imageUrl: string;
  };
}

export const sendChatMessage = async (message: string, token: string | null, history: any[] = []): Promise<ChatResponse> => {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${token}` // Optional: if we want to protect the route later
      },
      body: JSON.stringify({ message, history })
    });

    if (!response.ok) {
      if (response.status === 429) {
        throw new Error('Too many requests. Please try again in a moment.');
      }
      throw new Error('Failed to fetch response from server');
    }

    const data = await response.json();
    let text = data.text;

    // Check for JSON block for recommendation
    // Note: The backend returns raw text, so we still parse it here on the client for UI handling
    let type: 'text' | 'recommendation' = 'text';
    let recommendationData = undefined;

    const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/);
    if (jsonMatch) {
      try {
        const parsed = JSON.parse(jsonMatch[1]);
        if (parsed.type === 'recommendation') {
          type = 'recommendation';
          recommendationData = parsed.data;
          // Remove the JSON block from the displayed text
          text = text.replace(jsonMatch[0], '').trim();
        }
      } catch (e) {
        console.error("Failed to parse JSON recommendation", e);
      }
    }

    return {
      text,
      type,
      data: recommendationData
    };

  } catch (error) {
    console.error("Error sending message to Gemini:", error);
    throw error;
  }
};