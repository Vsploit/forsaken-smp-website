import React, { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { RetroCard } from '@/components/ui/retro-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from 'sonner';
import { Send, FileText, AlertCircle, BellRing, CheckCircle2, Video } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
const formSchema = z.object({
  age: z.string().min(1, "Age is required"),
  discord: z.string().min(2, "Invalid Discord username"),
  region: z.string().min(5, "Please provide your region and timezone"),
  whyJoin: z.string().min(20, "Please provide a more detailed reason (min 20 chars)"),
  playtime: z.string().min(1, "Required"),
  skills: z.string().min(10, "Tell us a bit about your skills"),
  activity: z.string().min(1, "Required"),
  videoLink: z.string().url("Please enter a valid URL").or(z.literal("")),
  rulesAccepted: z.boolean().refine(val => val === true, "You must accept the community rules")
});
type FormValues = z.infer<typeof formSchema>;
export function ApplicationSection() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      age: "",
      discord: "",
      region: "",
      whyJoin: "",
      playtime: "",
      skills: "",
      activity: "",
      videoLink: "",
      rulesAccepted: false,
    },
  });
  const onSubmit = useCallback(async (values: FormValues) => {
    try {
      const response = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (!response.ok) {
        throw new Error("Failed to submit application.");
      }
      const result = await response.json();
      if (result.success) {
        toast.success("Application received!");
        form.reset();
        setIsSubmitted(true);
      } else {
        toast.error(result.error || "Submission failed.");
      }
    } catch (error) {
      console.error("Application submission error:", error);
      toast.error("Connection error. Please try again later.");
    }
  }, [form]);
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
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.2 } }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <FormField
                        control={form.control}
                        name="discord"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-black uppercase tracking-tight text-xs text-foreground">Discord Username</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="username#0000"
                                className="border-4 border-black p-6 rounded-xl focus-visible:ring-orange-500 ring-offset-2 bg-white transition-all shadow-hard-sm"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-xs font-black text-destructive" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="age"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-black uppercase tracking-tight text-xs text-foreground">Your Age</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="e.g. 18+"
                                className="border-4 border-black p-6 rounded-xl focus-visible:ring-orange-500 ring-offset-2 bg-white transition-all shadow-hard-sm"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-xs font-black text-destructive" />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="region"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-black uppercase tracking-tight text-xs text-foreground">Region & Timezone</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="e.g. US East / EST"
                              className="border-4 border-black p-4 rounded-xl min-h-[100px] focus-visible:ring-orange-500 ring-offset-2 bg-white transition-all shadow-hard-sm"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-xs font-black text-destructive" />
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <FormField
                        control={form.control}
                        name="playtime"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-black uppercase tracking-tight text-xs text-foreground">Minecraft Experience</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="e.g. 3 years"
                                className="border-4 border-black p-6 rounded-xl focus-visible:ring-orange-500 ring-offset-2 bg-white transition-all shadow-hard-sm"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-xs font-black text-destructive" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="activity"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-black uppercase tracking-tight text-xs text-foreground">Weekly Hours</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="e.g. 10 hrs/week"
                                className="border-4 border-black p-6 rounded-xl focus-visible:ring-orange-500 ring-offset-2 bg-white transition-all shadow-hard-sm"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-xs font-black text-destructive" />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="whyJoin"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-black uppercase tracking-tight text-xs text-foreground">What brings you here?</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell us why you want to be part of our community..."
                              className="border-4 border-black p-4 rounded-xl min-h-[120px] focus-visible:ring-orange-500 ring-offset-2 bg-white transition-all shadow-hard-sm"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-xs font-black text-destructive" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="skills"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-black uppercase tracking-tight text-xs text-foreground">Your Specializations</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Building, Redstone, Technical, Lore writing..."
                              className="border-4 border-black p-4 rounded-xl min-h-[100px] focus-visible:ring-orange-500 ring-offset-2 bg-white transition-all shadow-hard-sm"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-xs font-black text-destructive" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="videoLink"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2 font-black uppercase tracking-tight text-xs text-foreground">
                            <Video className="w-3 h-3 text-orange-600" />
                            Video Application Link (Optional)
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="YouTube/TikTok link for your portfolio or introduction..."
                              className="border-4 border-black p-6 rounded-xl focus-visible:ring-orange-500 ring-offset-2 bg-white transition-all shadow-hard-sm"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-xs font-black text-destructive" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="rulesAccepted"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-xl border-4 border-black p-6 bg-orange-50 shadow-hard-sm hover:bg-orange-100/50 transition-colors cursor-pointer">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className="mt-1 border-4 border-black data-[state=checked]:bg-orange-600 data-[state=checked]:border-black h-6 w-6 transition-all"
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="font-bold cursor-pointer text-foreground text-sm">
                              I agree to follow the community guidelines and respect all players.
                            </FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                    <div className="pt-4">
                      <Button
                        type="submit"
                        disabled={form.formState.isSubmitting}
                        className="w-full h-16 text-xl font-black bg-orange-600 hover:bg-orange-700 text-white border-4 border-black shadow-hard hover:shadow-hard-lg active:translate-y-1 active:shadow-none transition-all disabled:opacity-70"
                      >
                        {form.formState.isSubmitting ? "Submitting..." : "Send Application"}
                        <Send className="ml-3 h-6 w-6" />
                      </Button>
                      <div className="mt-4 flex items-center justify-center gap-2 text-muted-foreground text-xs uppercase tracking-widest font-black">
                        <AlertCircle className="w-4 h-4 text-orange-600" />
                        Average response time: 24 hours
                      </div>
                    </div>
                  </form>
                </Form>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: "spring", damping: 15, stiffness: 200, duration: 0.3 }}
                className="flex flex-col items-center justify-center text-center py-20 space-y-8"
              >
                <motion.div
                  initial={{ rotate: -20 }}
                  animate={{ rotate: [-20, 10, -5, 0] }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="w-24 h-24 bg-green-100 rounded-3xl border-4 border-black flex items-center justify-center shadow-hard"
                >
                  <CheckCircle2 className="w-12 h-12 text-green-600" />
                </motion.div>
                <div className="space-y-4">
                  <h3 className="text-4xl font-black uppercase italic tracking-tighter">Application Sent!</h3>
                  <p className="text-xl text-muted-foreground max-w-sm font-medium mx-auto">
                    Thank you for applying to Forsaken SMP. Our team has received your request.
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
              </motion.div>
            )}
          </AnimatePresence>
        </RetroCard>
      </div>
    </section>
  );
}