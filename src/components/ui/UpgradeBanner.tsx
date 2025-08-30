import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Crown, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface UpgradeBannerProps {
  onFirstRequest?: () => void;
  isVisible?: boolean;
  isChatActive?: boolean;
}

const UpgradeBanner = ({ onFirstRequest, isVisible = true, isChatActive = false }: UpgradeBannerProps) => {
  const [isManuallyHidden, setIsManuallyHidden] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);

  // Check session storage on mount using useEffect
  React.useEffect(() => {
    const hasInteracted = sessionStorage.getItem('user-first-request');
    if (hasInteracted) {
      setIsManuallyHidden(true);
      setHasUserInteracted(true);
    }
  }, []);

  const handleClose = () => {
    setIsManuallyHidden(true);
  };

  const handleUpgrade = () => {
    // Navigate to settings upgrade section
    window.location.href = '/settings';
  };

  // Hide banner if user has interacted, it was manually closed, or chat is active
  if (!isVisible || hasUserInteracted || isChatActive || isManuallyHidden) {
    return null;
  }

  return (
    <div
      className={cn(
        "fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40",
        "bg-scraper-gradient-primary rounded-lg border border-scraper-border",
        "shadow-scraper-lg backdrop-blur-sm",
        "w-80 max-w-[calc(100vw-2rem)] sm:max-w-md"
      )}
    >
      {/* Close Button */}
      <button
        onClick={handleClose}
        className="absolute top-2 right-2 p-1 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
      >
        <X className="w-3 h-3 text-white" />
      </button>

      <div className="p-3 text-white relative overflow-hidden">
        <div className="relative flex items-center gap-3">
          <div className="p-1.5 bg-white/20 rounded-md">
            <Crown className="w-3.5 h-3.5" />
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-sm">Upgrade to Pro</h3>
          </div>
          
          <Button
            onClick={handleUpgrade}
            size="sm"
            className="bg-white text-scraper-accent-primary hover:bg-white/90 font-medium px-3 py-1.5 text-xs rounded-md"
          >
            Upgrade
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UpgradeBanner;