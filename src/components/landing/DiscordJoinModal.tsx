import React, { useState, useCallback } from 'react';
import { SOCIAL_LINKS } from '@/data/server-data';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Copy, Check, MessageSquare } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
interface DiscordJoinModalProps {
  children: React.ReactNode;
}
export function DiscordJoinModal({ children }: DiscordJoinModalProps) {
  const [copied, setCopied] = useState(false);
  const discordLink = SOCIAL_LINKS.discord;
  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(discordLink);
      setCopied(true);
      toast("Invite link copied!", { type: 'success' });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast("Failed to copy link.", { type: 'error' });
      console.error("Copy failed:", err);
    }
  }, [discordLink]);
  const openDiscord = useCallback(() => {
    window.open(discordLink, '_blank', 'noopener,noreferrer');
  }, [discordLink]);
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md border-4 border-black shadow-hard p-6 bg-white z-[200] focus-visible:ring-4 focus-visible:ring-orange-500/50">
        <DialogHeader className="space-y-4">
          <div className="mx-auto w-16 h-16 bg-orange-100 rounded-2xl border-4 border-black flex items-center justify-center -rotate-3 mb-2 shadow-hard-sm">
            <MessageSquare className="w-8 h-8 text-orange-600" />
          </div>
          <DialogTitle className="text-3xl font-black uppercase tracking-tight text-center text-foreground">Join Our Discord</DialogTitle>
          <DialogDescription className="text-center text-muted-foreground font-medium">
            Connect with the community and complete your whitelisting process.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 pt-4">
          <div className="flex items-center space-x-2 bg-orange-50 p-2 border-2 border-black rounded-xl shadow-hard-sm">
            <Input
              readOnly
              value={discordLink}
              className="border-none bg-transparent focus-visible:ring-0 font-mono text-sm h-10 text-foreground"
            />
            <Button
              size="icon"
              onClick={copyToClipboard}
              className="shrink-0 bg-orange-600 hover:bg-orange-700 text-white border-2 border-black shadow-hard-sm active:translate-y-0.5 active:shadow-none transition-all"
              aria-label={copied ? "Copied" : "Copy invite link"}
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
          <div className="bg-orange-50 border-2 border-black p-4 rounded-xl shadow-hard-sm">
            <p className="text-xs font-black uppercase tracking-widest text-center text-orange-600 mb-1">
              ⚠️ Urgent Requirement
            </p>
            <p className="text-sm text-center font-bold text-foreground">
              You must remain in the Discord server for your application to be reviewed by staff!
            </p>
          </div>
          <Button
            className="w-full bg-black text-white hover:bg-gray-800 h-14 text-lg font-black rounded-xl active:translate-y-1 active:shadow-none transition-all shadow-hard border-2 border-black"
            onClick={openDiscord}
          >
            Open Discord App
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}