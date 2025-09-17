import { NextResponse } from "next/server";
import OpenAI from "openai";
import { createClient } from "@supabase/supabase-js";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

export async function GET() {
  try {
    const topics = [
      "Why Solar Energy is the Future of Nigerian Homes",
      "How Small Businesses Can Cut Costs with Solar",
      "Top 5 Benefits of Installing Solar Panels in Nigeria"
    ];

    const randomTopic = topics[Math.floor(Math.random() * topics.length)];

    const prompt = `
      Write a detailed blog (500–700 words) on: "${randomTopic}".
      Audience: Nigerian homeowners and SMEs.
      Tone: Clear, persuasive, practical.
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 900,
    });

    const article = completion.choices[0].message.content;

    const imageRes = await openai.images.generate({
      model: "dall-e-3",
      prompt: `Realistic image of solar panels in Nigeria for: ${randomTopic}`,
      size: "1024x1024"
    });

    const imageUrl = imageRes.data[0].url;

    await supabase.from("blogs").insert([
      { title: randomTopic, content: article, image_url: imageUrl },
    ]);

    return NextResponse.json({ success: true, title: randomTopic });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Auto blog generation failed" }, { status: 500 });
  }
}