import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
import { AIRequestData } from "@/lib/types";

export async function POST(req: NextRequest) {
  try {
    const { type, description, location }: AIRequestData = await req.json();
    
    const apiKey = process.env.GEMNI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Missing GEMINI_API_KEY" }, { status: 500 });
    }
    
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = `You are helping a Chicago resident write a professional request to their alderman. 

Request Type: ${type}
Description: ${description}
Location: ${location}

Please generate a professional, concise request letter that:
1. Is respectful and formal in tone
2. Clearly states the issue or request
3. Includes specific location details
4. Suggests potential solutions if applicable
5. Is appropriate for government communication
6. Is 2-3 paragraphs maximum

Format the response as a well-structured letter that the resident can send to their alderman.`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    
    return NextResponse.json({ 
      generatedText: text,
      success: true 
    }, { status: 200 });
    
  } catch (error) {
    console.error('Error generating request text:', error);
    return NextResponse.json({ 
      error: "Failed to generate request text",
      success: false 
    }, { status: 500 });
  }
}
