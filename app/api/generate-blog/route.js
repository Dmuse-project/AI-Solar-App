import { NextResponse } from "next/server";
import OpenAI from "openai";
import { createClient } from "@supabase/supabase-js";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

export async function POST(req) {
  try {
    const { topic } = await req.json();

    const prompt = `
    Write a detailed, professional blog article (500–800 words) about: "${topic}".
    Audience: Nigerian homeowners and small businesses.
    Tone: Clear, practical, persuasive.
    Structure: 
    - Introduction
    - 3–4 main sections with headings
    - Conclusion + Call to Action (encouraging solar adoption in Nigeria).
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 900,
    });

    const article = completion.choices[0].message.content;

//     const imageRes = await openai.images.generate({
//   model: "dall-e-3",
//   prompt: `An inspiring, realistic image of solar panels powering a Nigerian home or small business. Blog Topic: ${topic}`,
//   size: "1024x1024"
// });

// const imageUrl = imageRes.data[0].url;

    // Save to Supabase
    const { data, error } = await supabase.from("blogs").insert([
      { title: topic, content: article,  },
    //   { title: topic, content: article, image_url:imageUrl },
    ]);


    return NextResponse.json({ title: topic, content: article });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Blog generation failed" }, { status: 500 });
  }
}