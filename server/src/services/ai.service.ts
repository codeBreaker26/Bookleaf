import { GoogleGenerativeAI } from "@google/generative-ai";
import { buildTicketPrompt } from "../prompts/ticketPrompt";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
console.log(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

interface AIResponse {
  category:
    | "Royalty & Payments"
    | "ISBN & Metadata Issues"
    | "Printing & Quality"
    | "Distribution & Availability"
    | "Book Status & Production Updates"
    | "General Inquiry";

  priority:
    | "Critical"
    | "High"
    | "Medium"
    | "Low";

  draftResponse: string;
}

export const analyzeTicket = async (
  subject: string,
  description: string
): Promise<AIResponse> => {
  try {
    // Build optimized prompt
    const prompt = buildTicketPrompt(subject, description);

    // Gemini API call
    const result = await model.generateContent(prompt);

    const responseText = result.response.text();

    // Remove markdown if Gemini returns ```json
    const cleanedResponse = responseText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    // Parse AI response
    const parsedResponse = JSON.parse(cleanedResponse);

    return {
      category: parsedResponse.category || "General Inquiry",
      priority: parsedResponse.priority || "Medium",
      draftResponse:
        parsedResponse.draftResponse ||
        "Thank you for reaching out to BookLeaf support.",
    };
  } catch (error) {
    console.error("AI Service Error:", error);

    // Graceful degradation
    return {
      category: "General Inquiry",
      priority: "Medium",
      draftResponse:
        "Thank you for contacting BookLeaf support. Our team will review your query and get back to you shortly.",
    };
  }
};