import { useState } from 'react';
import RequireAuth from '../components/RequireAuth';
import { useGetCallerUserProfile, useSaveCallerUserProfile } from '../hooks/useQueries';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { Users, Save, Loader2, User } from 'lucide-react';

export default function MemberAreaPage() {
  return (
    <RequireAuth>
      <MemberAreaContent />
    </RequireAuth>
  );
}

function MemberAreaContent() {
  const { identity } = useInternetIdentity();
  const { data: userProfile, isLoading, isFetched } = useGetCallerUserProfile();
  const saveMutation = useSaveCallerUserProfile();
  
  const [displayName, setDisplayName] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const showProfileSetup = isFetched && userProfile === null;

  const handleSave = async () => {
    if (!displayName.trim()) return;
    
    await saveMutation.mutateAsync(displayName);
    setIsEditing(false);
    setDisplayName('');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (showProfileSetup) {
    return (
      <div className="max-w-md mx-auto mt-12">
        <div className="bg-card border border-border rounded-lg p-8">
          <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <User className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-center mb-2">Welcome!</h2>
          <p className="text-muted-foreground text-center mb-6">
            Please tell us your name to complete your profile.
          </p>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Display Name</label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-3 py-2 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            
            <button
              onClick={handleSave}
              disabled={saveMutation.isPending || !displayName.trim()}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {saveMutation.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              Save Profile
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-primary/10 rounded-lg p-2">
          <Users className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Member Area</h1>
          <p className="text-muted-foreground">Manage your profile and settings</p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-6 space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Profile Information</h3>
          
          {isEditing ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Display Name</label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full px-3 py-2 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={handleSave}
                  disabled={saveMutation.isPending || !displayName.trim()}
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
                    setDisplayName('');
                  }}
                  className="px-4 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div>
                  <p className="text-sm text-muted-foreground">Display Name</p>
                  <p className="font-medium">{userProfile?.displayName || 'Not set'}</p>
                </div>
                <button
                  onClick={() => {
                    setIsEditing(true);
                    setDisplayName(userProfile?.displayName || '');
                  }}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm"
                >
                  Edit
                </button>
              </div>
              
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">Principal ID</p>
                <p className="font-mono text-xs break-all mt-1">
                  {identity?.getPrincipal().toString()}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="pt-6 border-t border-border">
          <h3 className="text-lg font-semibold mb-4">About Member Area</h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>
              Welcome to the New Mount Carmel Baptist Church member area. Here you can manage your
              profile and access member-only features.
            </p>
            <p>
              Your identity is secured using Internet Identity, ensuring your privacy and security.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
