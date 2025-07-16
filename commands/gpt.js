// src/commands/gpt.js

import { getAiResponse } from '../src/services/aiService.js';
// The warning message as a constant
const WARNING_MESSAGE = `⚠️ NOTICE FROM ERNEST TECH HOUSE

Before we continue, please read this carefully:

📌 This AI is powered by a third-party API (not managed or owned by Ernest Tech House).  
🚫 DO NOT share any sensitive or private data (passwords, API keys, secrets, personal info).  
✅ Your message is processed externally and may be logged by the AI provider.

By continuing, you agree to use this AI responsibly.

Now processing your request... 🧠✨`;

// Modified function signature to accept 'args'
export default async function gpt(sock, msg, from, args) {
    // Prompt is now obtained by joining the 'args' array
    const prompt = args.join(' ').trim();
    if (!prompt) {
        await sock.sendMessage(from, { text: 'Please provide a prompt after the /gpt command. Example: /gpt What is the capital of France?' });
        return;
    }

    // --- Send the Warning Message First ---
    await sock.sendMessage(from, { text: WARNING_MESSAGE });

    // --- Add a 2-second delay ---
    await new Promise(resolve => setTimeout(resolve, 2000)); // 2000 milliseconds = 2 seconds

    await sock.sendMessage(from, { text: 'Thinking... (GPT)' }); // This message comes *after* the warning and delay

    try {
        const response = await getAiResponse('gpt', prompt);
        await sock.sendMessage(from, { text: response });
    } catch (error) {
        console.error("Error in /gpt command:", error);
        await sock.sendMessage(from, { text: 'An error occurred while trying to get a response from GPT. Please try again later.' });
    }
}

gpt.description = "Get a response from ChatGPT.";
gpt.emoji = "💬";
gpt.category = "AI";