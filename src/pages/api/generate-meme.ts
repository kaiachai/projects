import { NextApiRequest, NextApiResponse } from 'next'
import { Configuration, OpenAIApi } from 'openai'
import sharp from 'sharp'
import axios from 'axios'
import { redis } from '@/lib/redis'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { prompt, template } = JSON.parse(req.body)

    // Validate inputs
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' })
    }

    // Check cache
    const cacheKey = `meme:${prompt}:${template || 'none'}`
    const cached = await redis.get(cacheKey)
    if (cached) {
      return res.status(200).json({ url: cached, cached: true })
    }

    // Generate image with better prompt engineering
    const response = await openai.createImage({
      prompt: `high quality meme style image: ${prompt}, professional quality, viral meme aesthetic`,
      n: 1,
      size: "1024x1024",
      response_format: 'url'
    })

    const imageUrl = response.data.data[0].url
    
    if (template) {
      try {
        const [generatedImage, templateImage] = await Promise.all([
          axios.get(imageUrl, { 
            responseType: 'arraybuffer',
            timeout: 5000 
          }),
          axios.get(template, { 
            responseType: 'arraybuffer',
            timeout: 5000 
          })
        ])

        const finalImage = await sharp(templateImage.data)
          .composite([{ 
            input: generatedImage.data, 
            blend: 'overlay',
            gravity: 'center'
          }])
          .jpeg({ quality: 90 })
          .toBuffer()

        // Store in cache
        await redis.setex(cacheKey, 3600, imageUrl)
        return res.status(200).json({ url: imageUrl })
      } catch (error) {
        console.error('Template processing error:', error)
        return res.status(200).json({ url: imageUrl, warning: 'Template processing failed' })
      }
    }

    // Store in cache
    await redis.setex(cacheKey, 3600, imageUrl)
    return res.status(200).json({ url: imageUrl })
  } catch (error: any) {
    console.error('Meme generation error:', error)
    return res.status(500).json({ 
      error: 'Failed to generate meme',
      details: error.message,
      code: error.code || 'UNKNOWN_ERROR'
    })
  }
} 