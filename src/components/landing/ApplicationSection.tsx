import React, { useState, useCallback } from 'react';
import { RetroCard } from '@/components/ui/retro-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Send, FileText, AlertCircle, BellRing, CheckCircle2, Video } from 'lucide-react';
interface FormValues {
  age: string;
  discord: string;
  region: string;
  whyJoin: string;
  playtime: string;
  skills: string;
  activity: string;
  videoLink: string;
  rulesAccepted: boolean;
}
export function ApplicationSection() {
  const [formData, setFormData] = useState<FormValues>({
    age: "",
    discord: "",
    region: "",
    whyJoin: "",
    playtime: "",
    skills: "",
    activity: "",
    videoLink: "",
    rulesAccepted: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleCheck = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, rulesAccepted: e.target.checked }));
  }, []);

  const validate = useCallback((): Record<string, string> => {
    const errs: Record<string, string> = {};
    if (!formData.age.trim()) errs.age = "Age is required";
    if (formData.discord.length < 2) errs.discord = "Invalid Discord username";
    if (formData.region.length < 5) errs.region = "Please provide your region and timezone";
    if (formData.whyJoin.length < 20) errs.whyJoin = "Please provide a more detailed reason (min 20 chars)";
    if (!formData.playtime.trim()) errs.playtime = "Required";
    if (formData.skills.length < 10) errs.skills = "Tell us a bit about your skills";
    if (!formData.activity.trim()) errs.activity = "Required";
    if (formData.videoLink && !formData.videoLink.match(/^https?:\/\/.+/)) errs.videoLink = "Please enter a valid URL";
    if (!formData.rulesAccepted) errs.rulesAccepted = "You must accept the community rules";
    return errs;
  }, [formData]);
  const onSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        const text = await response.text();
        let errorMsg = `Server error ${response.status}`;
        try {
          const data = JSON.parse(text);
          errorMsg = data.error || data.message || data.detail || errorMsg;
        } catch(e) {
          /* suppress empty block */
        }
        throw new Error(errorMsg);
      }
      const result = await response.json();
      if (result.success) {
        setFormData({
          age: "",
          discord: "",
          region: "",
          whyJoin: "",
          playtime: "",
          skills: "",
          activity: "",
          videoLink: "",
          rulesAccepted: false,
        });
        setIsSubmitted(true);
      } else {
        alert(result.error || "Submission failed.");
      }
    } catch (error) {
      console.error("Application submission error:", error);
      const msg = error instanceof Error ? error.message : 'Connection error. Please try again later.';
      alert(msg);
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, validate]);
  return (
    <section id="apply" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-orange-600 text-white font-bold text-xs uppercase tracking-widest shadow-hard-sm animate-bounce-slight">
            <FileText className="w-4 h-4" />
            Whitelisting Open
          </div>
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight">Community Application</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-medium">
            Fill out the details below. Our staff reviews applications daily.
          </p>
        </div>
        <RetroCard className="p-6 md:p-10 lg:p-12 relative min-h-[400px] overflow-hidden">
          {(
            isSubmitted ? (
              <div className="block opacity-100 scale-100 flex flex-col items-center justify-center text-center py-20 space-y-8 transition-all duration-300">
                <div className="w-24 h-24 bg-green-100 rounded-3xl border-4 border-black flex items-center justify-center shadow-hard">
                  <CheckCircle2 className="w-12 h-12 text-green-600" />
                </div>
                <div className="space-y-4">
                  <h3 className="text-4xl font-black uppercase italic tracking-tighter">Application Sent!</h3>
                  <p className="text-xl text-muted-foreground max-w-sm font-medium mx-auto">
                    The Forsaken staff team has received your request. We review applications daily.
                  </p>
                </div>
                <div className="p-6 bg-orange-50 border-4 border-black rounded-2xl shadow-hard-sm flex items-start gap-4 max-w-md mx-auto text-left">
                  <BellRing className="w-8 h-8 text-orange-600 shrink-0 mt-1" />
                  <div className="space-y-1">
                    <p className="text-sm font-black uppercase tracking-tight text-orange-600">Check Your DMs</p>
                    <p className="text-sm font-bold text-foreground leading-relaxed">
                      Make sure your Discord DMs are open! A staff member will contact you for a brief follow-up.
                    </p>
                  </div>
                </div>
                <Button
                  onClick={() => setIsSubmitted(false)}
                  variant="ghost"
                  className="font-black uppercase tracking-widest text-muted-foreground hover:text-orange-600 hover:bg-transparent transition-colors"
                >
                  Send another application
                </Button>
              </div>
            ) : (
              <div className="transition-all duration-300 opacity-100 scale-100">
                <form onSubmit={onSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="form-item">
                      <label className="font-black uppercase tracking-tight text-xs text-foreground block mb-2">Discord Username</label>
                      <Input
                        name="discord"
                        placeholder="username"
                        value={formData.discord}
                        onChange={handleChange}
                        className="border-4 border-black p-6 rounded-xl focus-visible:ring-orange-500 ring-offset-2 bg-white transition-all shadow-hard-sm"
                      />
                      {errors.discord && <p className="text-xs font-black text-destructive mt-1">{errors.discord}</p>}
                    </div>
                    <div className="form-item">
                      <label className="font-black uppercase tracking-tight text-xs text-foreground block mb-2">Your Age</label>
                      <Input
                        name="age"
                        type="text"
                        placeholder="e.g. 18+"
                        value={formData.age}
                        onChange={handleChange}
                        className="border-4 border-black p-6 rounded-xl focus-visible:ring-orange-500 ring-offset-2 bg-white transition-all shadow-hard-sm"
                      />
                      {errors.age && <p className="text-xs font-black text-destructive mt-1">{errors.age}</p>}
                    </div>
                  </div>
                  <div className="form-item">
                    <label className="font-black uppercase tracking-tight text-xs text-foreground block mb-2">Region & Timezone</label>
                    <Textarea
                      name="region"
                      placeholder="e.g. US East / EST"
                      value={formData.region}
                      onChange={handleChange}
                      className="border-4 border-black p-4 rounded-xl min-h-[100px] focus-visible:ring-orange-500 ring-offset-2 bg-white transition-all shadow-hard-sm"
                    />
                    {errors.region && <p className="text-xs font-black text-destructive mt-1">{errors.region}</p>}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="form-item">
                      <label className="font-black uppercase tracking-tight text-xs text-foreground block mb-2">Minecraft Experience</label>
                      <Input
                        name="playtime"
                        placeholder="e.g. 3 years"
                        value={formData.playtime}
                        onChange={handleChange}
                        className="border-4 border-black p-6 rounded-xl focus-visible:ring-orange-500 ring-offset-2 bg-white transition-all shadow-hard-sm"
                      />
                      {errors.playtime && <p className="text-xs font-black text-destructive mt-1">{errors.playtime}</p>}
                    </div>
                    <div className="form-item">
                      <label className="font-black uppercase tracking-tight text-xs text-foreground block mb-2">Weekly Hours</label>
                      <Input
                        name="activity"
                        placeholder="e.g. 10 hrs/week"
                        value={formData.activity}
                        onChange={handleChange}
                        className="border-4 border-black p-6 rounded-xl focus-visible:ring-orange-500 ring-offset-2 bg-white transition-all shadow-hard-sm"
                      />
                      {errors.activity && <p className="text-xs font-black text-destructive mt-1">{errors.activity}</p>}
                    </div>
                  </div>
                  <div className="form-item">
                    <label className="font-black uppercase tracking-tight text-xs text-foreground block mb-2">What brings you here?</label>
                    <Textarea
                      name="whyJoin"
                      placeholder="Tell us why you want to be part of our community..."
                      value={formData.whyJoin}
                      onChange={handleChange}
                      className="border-4 border-black p-4 rounded-xl min-h-[120px] focus-visible:ring-orange-500 ring-offset-2 bg-white transition-all shadow-hard-sm"
                    />
                    {errors.whyJoin && <p className="text-xs font-black text-destructive mt-1">{errors.whyJoin}</p>}
                  </div>
                  <div className="form-item">
                    <label className="font-black uppercase tracking-tight text-xs text-foreground block mb-2">Your Specializations</label>
                    <Textarea
                      name="skills"
                      placeholder="Building, Redstone, Technical, Lore writing..."
                      value={formData.skills}
                      onChange={handleChange}
                      className="border-4 border-black p-4 rounded-xl min-h-[100px] focus-visible:ring-orange-500 ring-offset-2 bg-white transition-all shadow-hard-sm"
                    />
                    {errors.skills && <p className="text-xs font-black text-destructive mt-1">{errors.skills}</p>}
                  </div>
                  <div className="form-item">
                    <label className="flex items-center gap-2 font-black uppercase tracking-tight text-xs text-foreground block mb-2">
                      <Video className="w-3 h-3 text-orange-600" />
                      Video Intro or Portfolio Link (Optional)
                    </label>
                    <Input
                      name="videoLink"
                      placeholder="YouTube, TikTok, or Portfolio URL..."
                      value={formData.videoLink}
                      onChange={handleChange}
                      className="border-4 border-black p-6 rounded-xl focus-visible:ring-orange-500 ring-offset-2 bg-white transition-all shadow-hard-sm"
                    />
                    {errors.videoLink && <p className="text-xs font-black text-destructive mt-1">{errors.videoLink}</p>}
                  </div>
                  <div className="flex flex-row items-start space-x-3 space-y-0 rounded-xl border-4 border-black p-6 bg-orange-50 shadow-hard-sm hover:bg-orange-100/50 transition-colors cursor-pointer">
                    <input
                      type="checkbox"
                      id="rules"
                      checked={formData.rulesAccepted}
                      onChange={handleCheck}
                      className="mt-1 border-4 border-black data-[state=checked]:bg-orange-600 data-[state=checked]:border-black h-6 w-6 transition-all"
                    />
                    <label htmlFor="rules" className="font-bold cursor-pointer text-foreground text-sm leading-none">
                      I agree to follow the community guidelines and respect all players.
                    </label>
                  </div>
                  {errors.rulesAccepted && <p className="text-xs font-black text-destructive mt-1 ml-12">{errors.rulesAccepted}</p>}
                  <div className="pt-4">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-16 text-xl font-black bg-orange-600 hover:bg-orange-700 text-white border-4 border-black shadow-hard hover:shadow-hard-lg active:translate-y-1 active:shadow-none transition-all disabled:opacity-70"
                    >
                      {isSubmitting ? "Processing Submission..." : "Submit Whitelist Application"}
                      <Send className="ml-3 h-6 w-6" />
                    </Button>
                    <div className="mt-4 flex items-center justify-center gap-2 text-muted-foreground text-xs uppercase tracking-widest font-black">
                      <AlertCircle className="w-4 h-4 text-orange-600" />
                      Average response time: 24 hours
                    </div>
                  </div>
                </form>
              </div>
            )
          )}
        </RetroCard>
      </div>
    </section>
  );
}