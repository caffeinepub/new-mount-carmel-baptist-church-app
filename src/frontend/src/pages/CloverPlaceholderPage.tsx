import { useState, useEffect } from 'react';
import { loadCloverConfig, saveCloverConfig, type CloverConfig } from '../lib/clover/cloverConfig';
import { CreditCard, Save, AlertCircle } from 'lucide-react';

export default function CloverPlaceholderPage() {
  const [config, setConfig] = useState<CloverConfig>(loadCloverConfig());
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    saveCloverConfig(config);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-primary/10 rounded-lg p-2">
          <CreditCard className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Giving & Donations</h1>
          <p className="text-muted-foreground">Clover POS Integration (Coming Soon)</p>
        </div>
      </div>

      <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 mb-6 flex gap-3">
        <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
        <div className="text-sm">
          <p className="font-medium text-yellow-900 dark:text-yellow-100 mb-1">
            Integration Not Active
          </p>
          <p className="text-yellow-800 dark:text-yellow-200">
            Clover payment processing is not yet active. The configuration below is for future use
            and will be stored locally in your browser. No transactions will be processed at this time.
          </p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-6 space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Configuration (Placeholder)</h3>
          <p className="text-sm text-muted-foreground mb-6">
            Configure your Clover integration settings. These settings are stored locally and will be
            used when the integration becomes active.
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Merchant ID</label>
              <input
                type="text"
                value={config.merchantId}
                onChange={(e) => setConfig({ ...config, merchantId: e.target.value })}
                placeholder="Enter your Clover Merchant ID"
                className="w-full px-3 py-2 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">API Base URL</label>
              <input
                type="text"
                value={config.apiBaseUrl}
                onChange={(e) => setConfig({ ...config, apiBaseUrl: e.target.value })}
                placeholder="https://api.clover.com"
                className="w-full px-3 py-2 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Environment</label>
              <select
                value={config.environment}
                onChange={(e) => setConfig({ ...config, environment: e.target.value as 'sandbox' | 'production' })}
                className="w-full px-3 py-2 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="sandbox">Sandbox (Testing)</option>
                <option value="production">Production (Live)</option>
              </select>
            </div>

            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Save className="h-4 w-4" />
              {isSaved ? 'Saved!' : 'Save Configuration'}
            </button>
          </div>
        </div>

        <div className="pt-6 border-t border-border">
          <h3 className="text-lg font-semibold mb-4">About Clover Integration</h3>
          <div className="space-y-3 text-sm text-muted-foreground">
            <p>
              Clover is a point-of-sale and payment processing platform. When this integration is
              activated, members will be able to make donations and payments directly through this
              application.
            </p>
            <p>
              <strong className="text-foreground">Security Note:</strong> Never enter API keys or
              access tokens in this form. Actual payment processing will be handled securely through
              Clover's official APIs when the integration is complete.
            </p>
            <p>
              For more information about Clover, visit{' '}
              <a
                href="https://www.clover.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                clover.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
