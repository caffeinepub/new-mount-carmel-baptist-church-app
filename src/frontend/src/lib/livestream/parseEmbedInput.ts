export function parseEmbedInput(input: string, platform: 'youtube' | 'facebook'): string | null {
  const trimmed = input.trim();
  
  if (!trimmed) return null;

  if (trimmed.includes('<iframe')) {
    const iframeMatch = trimmed.match(/<iframe[^>]*src=["']([^"']+)["'][^>]*>/i);
    if (iframeMatch) {
      const src = iframeMatch[1];
      return createResponsiveIframe(src);
    }
    return createResponsiveIframe(trimmed);
  }

  if (platform === 'youtube') {
    const youtubeRegex = /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]+)/;
    const match = trimmed.match(youtubeRegex);
    
    if (match) {
      const videoId = match[1];
      const embedUrl = `https://www.youtube.com/embed/${videoId}`;
      return createResponsiveIframe(embedUrl);
    }
  }

  if (platform === 'facebook') {
    const facebookRegex = /facebook\.com\/([^/]+)\/videos\/(\d+)/;
    const match = trimmed.match(facebookRegex);
    
    if (match) {
      const embedUrl = `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(trimmed)}`;
      return createResponsiveIframe(embedUrl);
    }
  }

  if (trimmed.startsWith('http')) {
    return createResponsiveIframe(trimmed);
  }

  return null;
}

function createResponsiveIframe(src: string): string {
  const cleanSrc = src.replace(/<\/?iframe[^>]*>/gi, '').trim() || src;
  
  return `
    <iframe
      src="${cleanSrc}"
      style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  `.trim();
}
