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
    const prompt = `
    You are a professional Nigerian solar consultant. Based on:
    - Appliances: ${appliances}
    - Daily Usage: ${usage} hours
    - Budget: ₦${budget}
    Recommend an optimal solar system (panels, inverter, batteries) make it concise brief and up to date with latests price in nigeria.
    Format it like this:

1. **System Size**: (e.g. 2kVA inverter + 2 x 200Ah battery)
2. **Solar Panels Needed**: ...
3. **Batteries**: ...
4. **Inverter**: ...
5. **Estimated Cost**: ...
6. **Recommendation/Notes**: ...

Keep it realistic, affordable  clear, structured, and easy to read.
    `;

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
