import { NextRequest, NextResponse } from 'next/server';

interface ImageResult {
  url: string;
  title: string;
  description: string;
  thumb: string;
  credit: {
    name: string;
    username: string;
    link: string;
  };
}

interface SearchResponse {
  query: string;
  images: ImageResult[];
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text, orientation = 'landscape' } = body;

    if (!text) {
      return NextResponse.json(
        { error: 'Missing text parameter' },
        { status: 400 }
      );
    }

    // Step 1: Generate search query using OpenRouter API
    let query = text;
    try {
      const openRouterResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY || ''}`,
          'HTTP-Referer': process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
          'X-Title': 'Ant Card AI'
        },
        body: JSON.stringify({
          model: 'mistralai/mixtral-8x7b-instruct',
          messages: [
            {
              role: 'system',
              content: 'You are a helpful assistant that generates concise image search queries based on user input. Your response should be a single search query string, no more than 100 characters, that captures the essence of the user\'s input for finding relevant images. Do not include any explanations or additional text.'
            },
            {
              role: 'user',
              content: text
            }
          ],
          max_tokens: 50
        })
      });

      if (openRouterResponse.ok) {
        const openRouterData = await openRouterResponse.json();
        const generatedQuery = openRouterData.choices?.[0]?.message?.content?.trim();
        if (generatedQuery) {
          query = generatedQuery.length > 100 ? generatedQuery.substring(0, 100) : generatedQuery;
        }
      }
    } catch (error) {
      console.warn('Failed to generate search query with AI, using original text:', error);
    }

    // Step 2: Search for images on Unsplash API
    if (!process.env.UNSPLASH_ACCESS_KEY) {
      return NextResponse.json(
        { error: 'Unsplash API key not configured' },
        { status: 500 }
      );
    }

    const unsplashResponse = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=6&orientation=${orientation}`,
      {
        headers: {
          'Authorization': `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`
        }
      }
    );

    if (!unsplashResponse.ok) {
      const errorData = await unsplashResponse.json();
      console.error('Unsplash API error:', errorData);
      return NextResponse.json(
        { error: 'Failed to search for images', details: errorData },
        { status: 500 }
      );
    }

    const unsplashData = await unsplashResponse.json();

    // Format the response
    const images: ImageResult[] = unsplashData.results.map((image: any) => ({
      url: image.urls.regular,
      title: image.description || image.alt_description || 'Unsplash Image',
      description: `Photo by ${image.user.name} on Unsplash`,
      thumb: image.urls.thumb,
      credit: {
        name: image.user.name,
        username: image.user.username,
        link: image.user.links.html
      }
    }));

    const response: SearchResponse = {
      query,
      images
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error in AI image search API:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}