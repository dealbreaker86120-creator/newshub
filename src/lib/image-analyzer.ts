import OpenAI from 'openai';
import crypto from 'crypto';

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface ImageTags {
  objects: string[];
  people: string[];
  themes: string[];
  emotions: string[];
  colors: string[];
  concepts: string[];
  description: string;
}

// Generate SHA-256 hash for duplicate detection
export function generateImageHash(imageUrl: string): string {
  return crypto
    .createHash('sha256')
    .update(imageUrl)
    .digest('hex');
}

// Main AI tagging function with GPT-4o Vision
export async function analyzeImageWithAI(
  imageUrl: string,
  options?: {
    customPrompt?: string;
  }
): Promise<ImageTags> {
  // Check if OpenAI API key is configured
  if (!process.env.OPENAI_API_KEY) {
    console.warn('OpenAI API key not configured, using mock tags');
    return generateMockTags();
  }

  const systemPrompt = `You are an expert image analyst specializing in generating searchable, categorized tags for news images. 
Analyze images and return comprehensive tags organized by category. 
Be specific and avoid generic terms. Focus on actionable, indexable keywords relevant to news and journalism.`;

  const userPrompt = options?.customPrompt || `Analyze this news image and provide categorized tags in JSON format.
  
For each category, provide 3-5 specific, searchable terms:
- objects: tangible items visible in the image (buildings, vehicles, equipment, etc.)
- people: any people, roles, or character descriptions (reporters, officials, protesters, etc.)
- themes: overall mood, genre, or narrative themes (breaking news, politics, sports, etc.)
- emotions: emotional tone or atmosphere conveyed (urgent, celebratory, somber, etc.)
- colors: dominant and accent colors (use descriptive color names)
- concepts: abstract ideas or larger concepts depicted (democracy, crisis, innovation, etc.)

Also provide a 1-2 sentence description suitable for alt text and search purposes.

Return ONLY valid JSON matching this exact schema:
{
  "objects": ["item1", "item2"],
  "people": ["description1"],
  "themes": ["theme1"],
  "emotions": ["emotion1"],
  "colors": ["color1"],
  "concepts": ["concept1"],
  "description": "brief description"
}`;

  try {
    const response = await client.chat.completions.create({
      model: 'gpt-4o-mini', // Cost-effective option: $0.15 per 1M input tokens
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },
        {
          role: 'user',
          content: [
            {
              type: 'image_url',
              image_url: {
                url: imageUrl,
                detail: 'auto', // Auto-detects optimal detail level
              },
            },
            {
              type: 'text',
              text: userPrompt,
            },
          ],
        },
      ],
      temperature: 0.3, // Lower for consistency
      max_tokens: 500,
      response_format: { type: 'json_object' },
    });

    const content = response.choices[0].message.content;
    if (!content || typeof content !== 'string') {
      throw new Error('Invalid API response format');
    }

    const tags = JSON.parse(content) as ImageTags;
    
    // Validate the response structure
    if (!tags.objects || !tags.people || !tags.themes || !tags.emotions || !tags.colors || !tags.concepts || !tags.description) {
      console.warn('Incomplete AI response, using mock tags');
      return generateMockTags();
    }
    
    return tags;
  } catch (error) {
    console.error('OpenAI Vision API error:', error);
    console.warn('Falling back to mock tags');
    return generateMockTags();
  }
}

// Generate mock tags for fallback or testing
export function generateMockTags(): ImageTags {
  const objectsPool = ['microphone', 'camera', 'podium', 'building', 'vehicle', 'laptop', 'smartphone', 'document', 'flag', 'sign'];
  const peoplePool = ['journalist', 'reporter', 'news anchor', 'official', 'spokesperson', 'crowd', 'interviewer', 'photographer'];
  const themesPool = ['breaking news', 'press conference', 'journalism', 'media coverage', 'news reporting', 'current events', 'investigation'];
  const emotionsPool = ['serious', 'professional', 'urgent', 'focused', 'engaged', 'determined', 'concerned', 'informative'];
  const colorsPool = ['navy blue', 'charcoal gray', 'white', 'black', 'red accent', 'light blue', 'neutral tones'];
  const conceptsPool = ['communication', 'information', 'transparency', 'media', 'truth', 'journalism ethics', 'public interest'];

  const randomCount = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
  const randomItems = (pool: string[], count: number) => {
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  return {
    objects: randomItems(objectsPool, randomCount(2, 5)),
    people: randomItems(peoplePool, randomCount(1, 3)),
    themes: randomItems(themesPool, randomCount(2, 4)),
    emotions: randomItems(emotionsPool, randomCount(1, 3)),
    colors: randomItems(colorsPool, randomCount(2, 4)),
    concepts: randomItems(conceptsPool, randomCount(2, 3)),
    description: 'A professional news setting capturing a moment of journalism and information dissemination with notable details and context.'
  };
}

// Batch processing for multiple images
export async function analyzeMultipleImages(
  imageUrls: string[]
): Promise<Map<string, ImageTags>> {
  const results = new Map<string, ImageTags>();

  // Process in parallel with rate limiting
  const chunks = chunkArray(imageUrls, 3); // 3 concurrent requests to avoid rate limits
  
  for (const chunk of chunks) {
    const promises = chunk.map((url) =>
      analyzeImageWithAI(url)
        .then((tags) => ({ url, tags }))
        .catch((err) => {
          console.error(`Error analyzing ${url}:`, err);
          return { url, tags: generateMockTags() };
        })
    );

    const chunkResults = await Promise.all(promises);
    chunkResults.forEach((result) => {
      results.set(result.url, result.tags);
    });

    // Rate limiting: wait between batches
    if (chunks.indexOf(chunk) < chunks.length - 1) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  return results;
}

function chunkArray<T>(arr: T[], size: number): T[][] {
  return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, (i + 1) * size)
  );
}
