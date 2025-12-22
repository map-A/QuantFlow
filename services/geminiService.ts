
import { GoogleGenAI } from "@google/genai";

// NOTE: In a real app, do not expose keys on the client side if possible.
// The API key is obtained exclusively from the environment variable process.env.API_KEY.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getMarketAnalysis = async (symbol: string, priceData: any[]): Promise<string> => {
  try {
    const prompt = `
      请分析股票代码为 ${symbol} 的近期价格走势。
      以下是最近5个交易日的收盘价数据: ${JSON.stringify(priceData.slice(-5).map(d => d.close))}.
      请提供一个简明扼要的技术分析，识别关键趋势、支撑位/阻力位，并给出短期展望。
      请使用中文回答，保持专业，适合量化交易员阅读。字数限制在100字以内。
    `;

    // FIX: Using recommended model 'gemini-3-flash-preview' for text tasks
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text || "暂无分析数据。";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "无法获取 AI 分析。请检查您的 API 密钥和网络连接。";
  }
};

export const chatWithAnalyst = async (history: {role: 'user' | 'model', text: string}[], message: string): Promise<string> => {
    try {
        // FIX: Using recommended model 'gemini-3-flash-preview' for chat tasks
        const chat = ai.chats.create({
            model: 'gemini-3-flash-preview',
            history: history.map(h => ({
                role: h.role,
                parts: [{ text: h.text }]
            })),
            config: {
              systemInstruction: "你是一个专业的中国A股市场量化交易助手。请用中文回答，专注于A股市场、宏观经济政策 and 量化交易策略。"
            }
        });

        const result = await chat.sendMessage({ message });
        return result.text || "";
    } catch (e) {
        console.error(e);
        return "与 AI 分析师通信时出错。";
    }
}
