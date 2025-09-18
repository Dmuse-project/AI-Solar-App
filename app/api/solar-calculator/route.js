// import { NextResponse } from "next/server";
// import OpenAI from "openai";

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// export async function POST(req) {
//   try {
//     const body = await req.json();
//     const { appliances, usage, budget } = body;

//     const prompt = `
//     You are a solar energy consultant in Nigeria. 
//     Based on the following info:
//     - Appliances: ${appliances}
//     - Daily Usage (hours): ${usage}
//     - Budget: ₦${budget}

//     Recommend an optimal solar system (panels, inverter capacity, battery size/quantity).
//     Keep it practical and affordable for Nigerian conditions.
//     Respond in a clear and professional way.
//     `;

//     const completion = await openai.chat.completions.create({
//       model: "gpt-4o-mini",
//       messages: [{ role: "user", content: prompt }],
//       max_tokens: 250,
//     });

//     const result = completion.choices[0].message.content;
//     return NextResponse.json({ recommendation: result });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
//   }
// }


import { NextResponse } from "next/server";
import OpenAI from "openai";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, phone, appliances, usage, budget } = body;

// Note: modified the prompt.
//     const prompt = `
//     You are a professional Nigerian solar consultant. Based on:
//     - Appliances: ${appliances}
//     - Daily Usage: ${usage} hours
//     - Budget: ₦${budget}
//     Recommend an optimal solar system (panels, inverter, batteries) make it concise brief and up to date with latests price in nigeria.
//     Format it like this:

// 1. **System Size**: (e.g. 2kVA inverter + 2 x 200Ah battery)
// 2. **Solar Panels Needed**: ...
// 3. **Batteries**: ...
// 4. **Inverter**: ...
// 5. **Estimated Cost**: ...
// 6. **Recommendation/Notes**: ...

// Keep it realistic, affordable  clear, structured, and easy to read.
//     `;


 

// const prompt = `  
// You are a **world-class Nigerian solar consultant** with expert knowledge of the local renewable energy market.  
// Your task is to provide an **accurate, practical, and cost-effective solar system design** based on the following inputs:  

// - Appliances: ${appliances}  
// - Average Daily Usage: ${usage} hours/day  
// - Maximum Budget: ₦${budget}  

// ### Output Requirements:  

// 1. **System Size & Configuration**  
//    - Clearly specify inverter size (e.g., 3.5 kVA hybrid inverter)  
//    - Battery bank sizing (capacity, number of units, chemistry, brand if common in Nigeria)  
//    - Solar panel array size (total watts, number of panels, brand/capacity).  

// 2. **Solar Panels**  
//    - List popular brands available in Nigeria (e.g., Jinko, Longi, Canadian Solar).  
//    - Include capacity per panel and number of panels required.  
//    - State approximate cost range in Naira.  

// 3. **Battery Bank**  
//    - Type (Lithium-ion, Lead-acid, Tubular, etc.), capacity (Ah), and recommended brands.  
//    - Price range in Naira.  

// 4. **Inverter / Charge Controller**  
//    - Specify inverter type (off-grid, hybrid, string).  
//    - Include charge controller rating (MPPT preferred) and efficiency.  
//    - State approximate cost range.  

// 5. **Estimated Total Cost (₦)**  
//    - Provide a breakdown of component costs + overall system cost.  
//    - Ensure values reflect the **latest Nigerian market prices** (2025).  

// 6. **Additional Notes / Recommendations**  
//    - Highlight installation tips, warranty considerations, and realistic system lifespan.  
//    - Suggest alternatives if budget is too low (e.g., smaller system, modular upgrades).  
//    - Mention cost-saving options without compromising quality.  

// ### Style Guidelines:  
// - Be **concise but structured** (use bullet points/tables where possible).  
// - Focus on **realistic availability** of products in Nigeria.  
// - Always ensure prices are **up-to-date and market-accurate**.  
// - Avoid generic global pricing; reference **local Nigerian solar market prices**.  

// `  


    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 250,
    });

    const recommendation = completion.choices[0].message.content;

    // Save to Supabase
    await supabase.from("solar_leads").insert([
      { name, email, phone, appliances, usage, budget, recommendation },
    ]);


    
// email integration
const resend = new Resend(process.env.RESEND_API_KEY);

// send email
await resend.emails.send({
  from: "Solar AI <onboarding@resend.dev>",
  to: "lordmuse057@gmail.com",  // change to your inbox
  subject: "New Solar Lead - Photon Code Innovations",
  html: `
    <h2>New Solar Calculator Lead</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone}</p>
    <p><strong>Appliances:</strong> ${appliances}</p>
    <p><strong>Usage:</strong> ${usage} hours/day</p>
    <p><strong>Budget:</strong> ₦${budget}</p>
    <h3>AI Recommendation</h3>
    <p>${recommendation}</p>
  `,
});

    return NextResponse.json({ recommendation });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
