// // index.js
// const { GoogleGenAI } = require('@google/genai');

// const apiKey = "AIzaSyBvjsCy0DSrbGpkW9rAc53tN0GC5ttzg0E";
// if (!apiKey) {
//   console.error('❌ Please set GEMINI_API_KEY');
//   process.exit(1);
// }

// const ai = new GoogleGenAI({ apiKey });

// async function main() {
//   try {
//     const resp = await ai.models.generateContent({
//       model: 'gemini-2.5-flash',
//       contents: 'Explain how a rainbow forms, in simple terms.'
//     });
//     console.log('Gemini says:', resp.text);
//   } catch (err) {
//     console.error('Error:', err);
//   }
// }

// main();
const machine = {
  water: true,
  beans: true,
  makeCoffee: function() {
    return "Here's your coffee!";
  }
};
console.log(machine)