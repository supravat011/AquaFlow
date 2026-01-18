import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateAIResponse = async (userMessage: string): Promise<string> => {
  if (!apiKey) {
    return "Demo Mode: API Key missing. I can help you understand your water bill or provide conservation tips once connected.";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userMessage,
      config: {
        systemInstruction: `You are AquaBot, a helpful virtual assistant for a municipal water supply board. 
        Your goal is to assist consumers with:
        1. Understanding water bills and tariffs.
        2. Providing water conservation tips.
        3. Explaining common plumbing issues or service interruptions.
        4. Translating technical water quality data into simple terms.
        
        Keep answers concise, friendly, and helpful. Use emoji sparingly where appropriate.`,
        temperature: 0.7,
      }
    });

    return response.text || "I'm having trouble connecting to the water knowledge base right now.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I am currently unavailable. Please try again later.";
  }
};