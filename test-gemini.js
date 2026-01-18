import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const apiKey = process.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
    console.error("Error: VITE_GEMINI_API_KEY is not set in .env file");
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

// List of potential models to try
const candidateModels = [
    "gemini-flash-latest",
    "gemini-1.5-flash",
    "gemini-1.5-flash-001",
    "gemini-1.5-flash-002",
    "gemini-1.5-flash-8b",
    "gemini-2.0-flash",
    "gemini-2.0-flash-lite-preview-02-05",
    "gemini-pro",
    "gemini-1.5-pro",
    "gemini-1.5-pro-001"
];

async function testModel(modelName) {
    console.log(`\nTesting model: ${modelName} ...`);
    try {
        const model = genAI.getGenerativeModel({
            model: modelName,
            systemInstruction: "You are a helpful and charming AI assistant for Rabuste Cafe. Your goal is to help customers choose coffee, explain the menu, and assist with art gallery or workshop inquiries. You should be polite, enthusiastic, and knowledgeable about coffee. \n\nIMPORTANT: If the user asks for a recommendation or you suggest a specific item, you MUST include a JSON block at the end of your response like this:\n```json\n{\n  \"type\": \"recommendation\",\n  \"data\": {\n    \"itemName\": \"Name of Item\",\n    \"price\": 150,\n    \"imageUrl\": \"URL_TO_IMAGE\"\n  }\n}\n```\nFor the image URL, use a placeholder like 'https://images.unsplash.com/photo-1509042239860-f550ce710b93' if you don't have a specific one, or describe it. Actually, just use standard unsplash placeholder URLs for coffee if unsure. Current menu items include: Espresso (150), Cappuccino (220), Latte (240), Croissant (180). Use these prices."
        });
        const chat = model.startChat({
            history: [],
            generationConfig: { maxOutputTokens: 100 }
        });
        const result = await chat.sendMessage("Hello, just say 'ok'.");
        const response = await result.response;
        console.log(`✅ SUCCESS with ${modelName}:`, response.text().trim());
        return { model: modelName, success: true };
    } catch (error) {
        let status = "Unknown Error";
        if (error.message.includes("404")) status = "404 Not Found";
        else if (error.message.includes("429")) status = "429 Quota Exceeded";
        else if (error.message.includes("403")) status = "403 Forbidden";
        else status = error.message.split('\n')[0]; // First line of error

        console.error(`❌ FAILED with ${modelName}: ${status}`);
        return { model: modelName, success: false, error: status };
    }
}

async function run() {
    console.log("Starting comprehensive model test...");
    const results = [];

    for (const model of candidateModels) {
        results.push(await testModel(model));
    }

    console.log("\n--- Summary ---");
    const working = results.filter(r => r.success);
    const failed = results.filter(r => !r.success);

    console.log(`Working Models: ${working.length}`);
    working.forEach(w => console.log(` - ${w.model}`));

    console.log(`Failed Models: ${failed.length}`);
    fs.writeFileSync('model_test_results.json', JSON.stringify(results, null, 2));
}

run();
