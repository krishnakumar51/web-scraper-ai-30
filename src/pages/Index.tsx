import { useState } from 'react';
import ChatInterface from '@/components/chat/ChatInterface';
import UpgradeBanner from '@/components/ui/UpgradeBanner';

const Index = () => {
  const [isChatActive, setIsChatActive] = useState(false);
  
  const handleChatStart = () => {
    setIsChatActive(true);
  };

  return (
    <>
      <ChatInterface onSourcesUpdate={() => {}} onChatStart={handleChatStart} />
      <UpgradeBanner isChatActive={isChatActive} />
    </>
  );
};

export default Index;
