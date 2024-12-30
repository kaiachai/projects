import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, description, personality, walletAddress } = req.body
    
    try {
      const agent = await prisma.agent.create({
        data: {
          name,
          description,
          personality,
          walletAddress,
          status: 'ACTIVE'
        }
      })
      
      res.status(200).json(agent)
    } catch (error) {
      res.status(500).json({ error: 'Failed to create agent' })
    }
  }
} 