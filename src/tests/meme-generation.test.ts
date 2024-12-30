import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { createMockContext } from '@/tests/helpers'
import handler from '@/pages/api/generate-meme'

describe('Meme Generation API', () => {
  it('should validate input prompt', async () => {
    const { req, res } = createMockContext({
      method: 'POST',
      body: JSON.stringify({ template: 'test.jpg' })
    })

    await handler(req, res)
    expect(res._getStatusCode()).toBe(400)
    expect(JSON.parse(res._getData())).toHaveProperty('error', 'Prompt is required')
  })

  it('should handle successful meme generation', async () => {
    const { req, res } = createMockContext({
      method: 'POST',
      body: JSON.stringify({ 
        prompt: 'test meme', 
        template: 'test.jpg' 
      })
    })

    await handler(req, res)
    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData())).toHaveProperty('url')
  })
}) 