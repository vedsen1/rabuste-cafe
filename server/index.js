

const express = require('express');
const cors = require('cors');
const { Resend } = require('resend');
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Configure dotenv to read from root if local .env is missing or doesn't have the key
require('dotenv').config({ path: '../.env' });
// Also try standard config in case it's in server/.env
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.VITE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-flash-latest",
  systemInstruction: "You are a helpful and charming AI assistant for Rabuste Cafe. Your goal is to help customers choose coffee, explain the menu, and assist with art gallery or workshop inquiries. You should be polite, enthusiastic, and knowledgeable about coffee. \n\nIMPORTANT: If the user asks for a recommendation or you suggest a specific item, you MUST include a JSON block at the end of your response like this:\n```json\n{\n  \"type\": \"recommendation\",\n  \"data\": {\n    \"itemName\": \"Name of Item\",\n    \"price\": 150,\n    \"imageUrl\": \"URL_TO_IMAGE\"\n  }\n}\n```\nFor the image URL, use a placeholder like 'https://images.unsplash.com/photo-1509042239860-f550ce710b93' if you don't have a specific one, or describe it. Actually, just use standard unsplash placeholder URLs for coffee if unsure. Current menu items include: Espresso (150), Cappuccino (220), Latte (240), Croissant (180). Use these prices."
});

app.use(cors());
app.use(express.json());

// Chat Endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const chat = model.startChat({
      history: history || [],
      generationConfig: {
        maxOutputTokens: 500,
      },
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    res.json({ text });
  } catch (error) {
    console.error('Gemini API Error:', error);
    // Check for specific error types if needed
    if (error.message?.includes('429')) {
      return res.status(429).json({ error: 'Too many requests. Please try again later.' });
    }
    res.status(500).json({ error: 'Failed to process chat message' });
  }
});

// Helper to fetch workshop (Optional: if we want to trust client data, we can skip fetching from Firestore here. 
// For simplicity, we'll trust the client sends correct titles/schedules or we could use firebase-admin to verify,
// but the prompt asked to stick to Client SDK for data. So we'll accept details in body.)

app.post('/api/send-confirmation', async (req, res) => {
  const { workshopId, name, email, phone, title, schedule } = req.body;

  // We are relying on Firestore transaction on client side for the seat check.
  // This endpoint is purely a side-effect for email.

  console.log(`Sending confirmation email to ${name} (${email}) for workshop ${workshopId || 'Unknown'}`);

  if (!process.env.RESEND_API_KEY) {
    console.error('Missing RESEND_API_KEY');
    return res.status(200).json({ message: 'Email skipped (missing key)' });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { data, error } = await resend.emails.send({
      from: 'Rabuste Cafe <onboarding@resend.dev>',
      to: [email],
      subject: `Confirmation: ${title || 'Workshop Registration'}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: 'Georgia', serif; color: #2b1b16; background-color: #f6f1e8; padding: 40px; }
            .container { max-width: 600px; margin: 0 auto; background: #ffffff; padding: 40px; border-radius: 8px; box-shadow: 0 4px 20px rgba(0,0,0,0.05); }
            h1 { font-family: 'Georgia', serif; font-style: italic; color: #895b60; font-weight: normal; margin-bottom: 20px; }
            p { line-height: 1.6; font-size: 16px; color: #4a3b36; }
            .details { background-color: #f9f5f0; padding: 20px; border-left: 4px solid #C9A24D; margin: 20px 0; }
            .details p { margin: 5px 0; font-size: 15px; }
            .footer { margin-top: 40px; font-size: 12px; color: #888; text-align: center; border-top: 1px solid #eee; padding-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Your spot is saved.</h1>
            <p>Hello ${name},</p>
            <p>We are delighted to confirm your registration for an upcoming creative session at Rabuste.</p>
            
            <div class="details">
              <p><strong>Workshop:</strong> ${title || 'Upcoming Workshop'}</p>
              <p><strong>When:</strong> ${schedule || 'Check our website for date'}</p>
            </div>

            <p>We'll have the coffee brewing and the materials ready. All you need to bring is yourself.</p>
            <p>If you have any questions or need to reschedule, please reply to this email.</p>
            
            <p style="margin-top: 30px;">
              Warmly,<br/>
              Team Rabuste
            </p>
          </div>
          <div class="footer">
            <p>Rabuste Cafe • Art, Coffee & Community</p>
          </div>
        </body>
        </html>
      `
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(500).json({ error: 'Email delivery failed' });
    }

    res.status(200).json({ message: 'Email sent', id: data?.id });

  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
