import RequireAuth from '../components/RequireAuth';
import { useAudioMonitor } from '../hooks/useAudioMonitor';
import { Mic, MicOff, Volume2, Loader2 } from 'lucide-react';

export default function AudioInputPage() {
  return (
    <RequireAuth>
      <AudioInputContent />
    </RequireAuth>
  );
}

function AudioInputContent() {
  const {
    devices,
    selectedDeviceId,
    isMonitoring,
    volume,
    error,
    startMonitoring,
    stopMonitoring,
    setVolume,
    setSelectedDeviceId,
  } = useAudioMonitor();

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-primary/10 rounded-lg p-2">
          <Mic className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Audio Input Monitor</h1>
          <p className="text-muted-foreground">Monitor and control your audio input</p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-6 space-y-6">
        {error && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 text-destructive">
            <p className="font-medium">Error</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium mb-2">Audio Input Device</label>
          <select
            value={selectedDeviceId}
            onChange={(e) => setSelectedDeviceId(e.target.value)}
            disabled={isMonitoring || devices.length === 0}
            className="w-full px-3 py-2 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
          >
            {devices.length === 0 ? (
              <option>No devices available</option>
            ) : (
              devices.map((device) => (
                <option key={device.deviceId} value={device.deviceId}>
                  {device.label || `Device ${device.deviceId.slice(0, 8)}`}
                </option>
              ))
            )}
          </select>
        </div>

        <div className="flex gap-3">
          {!isMonitoring ? (
            <button
              onClick={startMonitoring}
              disabled={devices.length === 0}
              className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 font-medium"
            >
              <Mic className="h-5 w-5" />
              Start Monitoring
            </button>
          ) : (
            <button
              onClick={stopMonitoring}
              className="flex items-center gap-2 px-6 py-3 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition-colors font-medium"
            >
              <MicOff className="h-5 w-5" />
              Stop Monitoring
            </button>
          )}
        </div>

        {isMonitoring && (
          <div className="pt-4 border-t border-border">
            <div className="flex items-center gap-3 mb-3">
              <Volume2 className="h-5 w-5 text-muted-foreground" />
              <label className="text-sm font-medium">Volume</label>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>0%</span>
              <span className="font-medium text-foreground">{volume}%</span>
              <span>100%</span>
            </div>
          </div>
        )}

        <div className="bg-muted/50 rounded-lg p-4 text-sm text-muted-foreground">
          <p className="font-medium text-foreground mb-2">Instructions:</p>
          <ol className="list-decimal list-inside space-y-1">
            <li>Select your audio input device from the dropdown</li>
            <li>Click "Start Monitoring" to begin listening</li>
            <li>Adjust the volume slider to control playback level</li>
            <li>Click "Stop Monitoring" when finished</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
