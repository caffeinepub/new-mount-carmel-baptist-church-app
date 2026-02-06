import { useState, useEffect, useRef } from 'react';

interface AudioDevice {
  deviceId: string;
  label: string;
}

export function useAudioMonitor() {
  const [devices, setDevices] = useState<AudioDevice[]>([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string>('');
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [volume, setVolume] = useState(50);
  const [error, setError] = useState<string | null>(null);

  const audioContextRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  useEffect(() => {
    loadDevices();
  }, []);

  useEffect(() => {
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = volume / 100;
    }
  }, [volume]);

  const loadDevices = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach(track => track.stop());

      const deviceList = await navigator.mediaDevices.enumerateDevices();
      const audioInputs = deviceList
        .filter(device => device.kind === 'audioinput')
        .map(device => ({
          deviceId: device.deviceId,
          label: device.label || `Microphone ${device.deviceId.slice(0, 8)}`,
        }));

      setDevices(audioInputs);
      if (audioInputs.length > 0 && !selectedDeviceId) {
        setSelectedDeviceId(audioInputs[0].deviceId);
      }
    } catch (err) {
      setError('Failed to access audio devices. Please grant microphone permission.');
      console.error('Error loading devices:', err);
    }
  };

  const startMonitoring = async () => {
    try {
      setError(null);

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          deviceId: selectedDeviceId ? { exact: selectedDeviceId } : undefined,
        },
      });

      streamRef.current = stream;

      const audioContext = new AudioContext();
      audioContextRef.current = audioContext;

      const source = audioContext.createMediaStreamSource(stream);
      const gainNode = audioContext.createGain();
      gainNodeRef.current = gainNode;

      gainNode.gain.value = volume / 100;

      source.connect(gainNode);
      gainNode.connect(audioContext.destination);

      setIsMonitoring(true);
    } catch (err) {
      setError('Failed to start audio monitoring. Please check your device and permissions.');
      console.error('Error starting monitoring:', err);
    }
  };

  const stopMonitoring = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }

    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }

    gainNodeRef.current = null;
    setIsMonitoring(false);
  };

  useEffect(() => {
    return () => {
      stopMonitoring();
    };
  }, []);

  return {
    devices,
    selectedDeviceId,
    isMonitoring,
    volume,
    error,
    startMonitoring,
    stopMonitoring,
    setVolume,
    setSelectedDeviceId,
  };
}
