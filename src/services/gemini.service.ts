import { Injectable } from '@angular/core';

// This service is now a mock for product demo purposes.
// It simulates the Gemini API responses without making any actual API calls.

@Injectable({ providedIn: 'root' })
export class GeminiService {
  constructor() {
    console.log(
      '%c--- Gemini Design Studio: Product Demo Mode ---',
      'background: #4f46e5; color: #fff; font-size: 14px; padding: 0.5rem; border-radius: 0.25rem;'
    );
    console.log('GeminiService is using mock data. No real API calls will be made.');
  }

  /**
   * Waits for a specified duration to simulate network latency.
   * @param duration Milliseconds to wait.
   */
  private artificialDelay(duration: number = 1500): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, duration));
  }

  async generateText(prompt: string, useProModel: boolean): Promise<string> {
    await this.artificialDelay(2000);
    const modelUsed = useProModel ? 'Pro (mocked)' : 'Flash (mocked)';
    return `
\`\`\`html
<!-- Generated with ${modelUsed} model for prompt: "${prompt}" -->
<div class="max-w-sm rounded-lg overflow-hidden shadow-2xl bg-gray-700/50 p-6 backdrop-blur-sm">
  <div class="w-full h-48 bg-gray-600 rounded-md animate-pulse"></div>
  <div class="mt-4">
    <div class="font-bold text-xl mb-2 text-white">Mocked Blog Post Title</div>
    <p class="text-gray-300 text-base">
      This is a mocked component generated for demo purposes. It showcases a responsive card with placeholder elements, styled with Tailwind CSS to match your request.
    </p>
  </div>
  <div class="mt-6 flex items-center">
    <div class="w-12 h-12 bg-gray-600 rounded-full animate-pulse"></div>
    <div class="ml-4">
      <p class="text-white font-semibold">Demo User</p>
      <p class="text-gray-400 text-sm">Frontend Developer</p>
    </div>
  </div>
</div>
\`\`\`
    `;
  }

  async generateImage(prompt: string, aspectRatio: string, numberOfImages: number): Promise<string[]> {
    await this.artificialDelay(2500);

    // Special mock for the style transfer result
    if (prompt.includes('MOCK_STYLE_TRANSFER_PROMPT')) {
      // Generated from "A beautiful oil painting of a cat, in the style of Van Gogh's Starry Night"
      const remixedImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAfASURBVHhe7Zt5bBxFFMd/q4tLgIRAgFggIERA3CIgQYtLgEgRBBQP5cFD8FDBHhAQAQ+igh4E8VAQTxA8KAoKAioeFUDxYAnYIiAELGyrY7EtNhZ77MXes/Z8M9Odu947s/eN23d+yc8mmd2d+eacmTkzm8UUK1GgG/1tqEv9E/S3oX70V9AABf1V8hNINy8K8N+qCvgXqjC5i1HqT3Y3H8gq4uI38gC5a86F6Z8yKjN/iFk9vFf/cTvg29C3j4z/DkL9f9n5wZ85TqB6W3o37I7+H9dDcyF/yE2g7j9/S+Yh/uD4L5+e1n+3qM0/k/10GkM7VvYv2P7Y37g+A+H+2o64V4f64mU9eH+P/W/f7q/G+k59eH+G8DkH9wYV7n9y3M/z+6m43oW8fGf4U8n+H8gq4uP3P9E9D+2E7rO/P6E5d3XGfzT/0eD/4N9k/X/7+X/Rk0H/n8P2w2z/3+gM3lUo+9tS/z3U9/xS83d09QeW9v4v8lH+b+6P3l4/l9k71+qD1/u8+vV3+X8LzYfR//n7/bX95/w3z/P/N/9bVv67/v56j/rP+X/Z/RkL/r7n/iP+m6p/5/w//6H+O+/Y/b/L/x+Wf99/P+n6/r/+H+/v+K/O/7P/9H/j/v4/v+v5/7Vf8//1//8H+5/1P3//x///1+w//n+P66//u7//P+P/z/3f/1+s/3v+//f8f8P//9/f+H/7z/z/n+H//f8f8//3//3/H//f8f/9/x//3/H/f/8f/9/x//3/H/f//9/x//v8f/+/4//7/v///H/+f+///+n/n/v///f/f//+P///7///7///7//3///3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3//3-f+v+j9v+X/P/z/P//8/D/sPzP9/p/+v7/s/jP9+v//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x//3/H//f8f/9/x-f+v+j/1...';
      return [remixedImage];
    }
    
    // Default mock images
    const mockImage1 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAAXNSR0IArs4c6QAAAOJJREFUeJzt0EENgDAAw7Cy/8+cQIdc0NoIZ9hmBh98f5wAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgcCAFHwAAn2iA+wAAAABJRU5ErkJggg==';
    const mockImage2 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAAXNSR0IArs4c6QAAAPFJREFUeJzt0EENgDAAw7Dy90/jA114QG2EM2wzgw8+P06AgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQ+Cb4f/4cT4N/xB/9h5AswyBfoAAAAAElFTkSuQmCC';
    
    const results = [];
    for (let i = 0; i < numberOfImages; i++) {
        results.push(i % 2 === 0 ? mockImage1 : mockImage2);
    }
    return results;
  }

  async generateImageFromImageAndText(
    prompt: string,
    referenceImage: { base64: string; mimeType: string },
    aspectRatio: string,
    numberOfImages: number
  ): Promise<string[]> {
    await this.artificialDelay(3000);
    // In demo mode, this behaves the same as text-to-image
    return this.generateImage(prompt, aspectRatio, numberOfImages);
  }

  async analyzeImage(prompt: string, imageBase64: string, mimeType: string): Promise<string> {
    await this.artificialDelay(1800);
    return `
      **Mock Analysis Report**

      This is a simulated analysis based on your prompt: "${prompt}".

      **Strengths:**
      - **Clear Visual Hierarchy:** The layout effectively guides the user's eye from the main header to the primary call-to-action.
      - **Good Contrast:** The color contrast between text and background generally meets accessibility standards, making it readable.
      - **Consistent Branding:** The use of color and typography is consistent with modern design trends, creating a professional feel.

      **Areas for Improvement:**
      - **Accessibility:** Some smaller text elements could have their font size increased. Alt text for images should be verified for descriptiveness.
      - **Mobile Experience:** While responsive, the touch targets for some buttons on smaller screens could be larger to improve usability.
      - **Interactivity:** Adding subtle hover effects or micro-interactions could enhance user engagement.

      *This analysis was generated by the demo mode.*
    `;
  }

  async generatePromptForStyleTransfer(
    prompt: string,
    contentImage: { base64: string; mimeType: string },
    styleImage: { base64: string; mimeType: string }
  ): Promise<string> {
    await this.artificialDelay(1200);
    // Return a specific string that the mocked generateImage can check for.
    return 'MOCK_STYLE_TRANSFER_PROMPT';
  }
}
