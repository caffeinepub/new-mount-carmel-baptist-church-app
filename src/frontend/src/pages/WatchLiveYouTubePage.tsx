import { useState } from 'react';
import { useGetLivestream, useSaveLivestream } from '../hooks/useQueries';
import { LivestreamType } from '../backend';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { parseEmbedInput } from '../lib/livestream/parseEmbedInput';
import { Save, Edit, Loader2, Video } from 'lucide-react';

export default function WatchLiveYouTubePage() {
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;
  
  const { data: livestream, isLoading } = useGetLivestream(LivestreamType.YouTube);
  const saveMutation = useSaveLivestream();
  
  const [isEditing, setIsEditing] = useState(false);
  const [embedInput, setEmbedInput] = useState('');

  const handleSave = async () => {
    if (!embedInput.trim()) return;
    
    const parsedEmbed = parseEmbedInput(embedInput, 'youtube');
    if (parsedEmbed) {
      await saveMutation.mutateAsync({
        type: LivestreamType.YouTube,
        embedCode: parsedEmbed,
      });
      setIsEditing(false);
      setEmbedInput('');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-red-500/10 rounded-lg p-2">
            <Video className="h-6 w-6 text-red-500" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">YouTube Live Stream</h1>
            <p className="text-muted-foreground">Watch our live worship service</p>
          </div>
        </div>
        
        {isAuthenticated && !isEditing && (
          <button
            onClick={() => {
              setIsEditing(true);
              setEmbedInput(livestream?.embedCode || '');
            }}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Edit className="h-4 w-4" />
            Edit Stream
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Update YouTube Stream</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                YouTube URL or Embed Code
              </label>
              <textarea
                value={embedInput}
                onChange={(e) => setEmbedInput(e.target.value)}
                placeholder="Paste YouTube video URL or embed code here..."
                className="w-full h-32 px-3 py-2 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              />
              <p className="text-xs text-muted-foreground mt-2">
                Example: https://www.youtube.com/watch?v=VIDEO_ID or full embed code
              </p>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={handleSave}
                disabled={saveMutation.isPending || !embedInput.trim()}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {saveMutation.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                Save
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setEmbedInput('');
                }}
                className="px-4 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : livestream?.embedCode ? (
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div
            className="relative w-full"
            style={{ paddingBottom: '56.25%' }}
            dangerouslySetInnerHTML={{ __html: livestream.embedCode }}
          />
        </div>
      ) : (
        <div className="bg-card border border-border rounded-lg p-12 text-center">
          <div className="bg-muted rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
            <Video className="h-10 w-10 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold mb-2">No Stream Configured</h3>
          <p className="text-muted-foreground mb-6">
            {isAuthenticated
              ? 'Click "Edit Stream" to add a YouTube livestream.'
              : 'Please sign in to configure the livestream.'}
          </p>
        </div>
      )}
    </div>
  );
}
