import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { RetroCard } from '@/components/ui/retro-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { toast } from 'sonner';
import { Send, FileText, AlertCircle } from 'lucide-react';
const formSchema = z.object({
  age: z.string().min(1, "Age is required"),
  discord: z.string().min(2, "Invalid Discord username"),
  region: z.string().min(5, "Please provide your region and timezone"),
  whyJoin: z.string().min(20, "Please provide a more detailed reason (min 20 chars)"),
  playtime: z.string().min(1, "Required"),
  skills: z.string().min(10, "Tell us a bit about your skills"),
  activity: z.string().min(1, "Required"),
  rulesAccepted: z.boolean().refine(val => val === true, "You must accept the community rules")
});
type FormValues = z.infer<typeof formSchema>;
export function ApplicationSection() {
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
        let errorMsg = "Failed to submit application.";
        try {
          const errorData = await response.json();
          errorMsg = errorData.error || errorMsg;
        } catch {
          const text = await response.text();
          if (text) errorMsg = text;
        }
        throw new Error(errorMsg);
      }
      const result = await response.json();
      if (result.success) {
        toast.success("Application submitted! Check Discord for updates.");
        form.reset();
      } else {
        toast.error(result.error || "Submission failed.");
      }
    } catch (error) {
      console.error("Application submission error:", error);
      toast.error(error instanceof Error ? error.message : "Connection error. Please try again later.");
    }
  }, [form]);
  return (
    <section id="apply" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-orange-600 text-white font-bold text-xs uppercase tracking-widest shadow-hard-sm">
            <FileText className="w-4 h-4" />
            Whitelisting Open
          </div>
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight">Community Application</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Fill out the details below. Our staff reviews applications daily.
          </p>
        </div>
        <RetroCard className="p-6 md:p-10 lg:p-12">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FormField
                  control={form.control}
                  name="discord"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-black uppercase tracking-tight text-xs text-foreground flex items-center gap-2">
                        Discord Username
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="username#0000" className="border-2 border-black p-6 rounded-xl focus-visible:ring-orange-500 bg-orange-50/20" {...field} />
                      </FormControl>
                      <FormMessage />
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
                        <Input type="text" placeholder="18" className="border-2 border-black p-6 rounded-xl focus-visible:ring-orange-500 bg-orange-50/20" {...field} />
                      </FormControl>
                      <FormMessage />
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
                      <Textarea placeholder="e.g. US East / EST" className="border-2 border-black p-4 rounded-xl min-h-[100px] focus-visible:ring-orange-500 bg-orange-50/20" {...field} />
                    </FormControl>
                    <FormMessage />
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
                        <Input placeholder="e.g. 3 years" className="border-2 border-black p-6 rounded-xl focus-visible:ring-orange-500 bg-orange-50/20" {...field} />
                      </FormControl>
                      <FormMessage />
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
                        <Input placeholder="e.g. 10 hrs/week" className="border-2 border-black p-6 rounded-xl focus-visible:ring-orange-500 bg-orange-50/20" {...field} />
                      </FormControl>
                      <FormMessage />
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
                      <Textarea placeholder="Tell us why you want to be part of the community..." className="border-2 border-black p-4 rounded-xl min-h-[120px] focus-visible:ring-orange-500 bg-orange-50/20" {...field} />
                    </FormControl>
                    <FormMessage />
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
                      <Textarea placeholder="Building, Redstone, Exploration, Lore..." className="border-2 border-black p-4 rounded-xl min-h-[100px] focus-visible:ring-orange-500 bg-orange-50/20" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="rulesAccepted"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-xl border-4 border-black p-6 bg-orange-50 shadow-hard-sm">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="mt-1 border-2 border-black data-[state=checked]:bg-orange-600 data-[state=checked]:border-black h-5 w-5"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="font-bold cursor-pointer text-foreground text-sm">
                          I agree to follow the community guidelines and respect all players.
                        </FormLabel>
                        <p className="text-xs text-muted-foreground">
                          Applications without Discord presence will be automatically declined.
                        </p>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
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
                  <AlertCircle className="w-4 h-4" />
                  Staff response within 24 hours
                </div>
              </div>
            </form>
          </Form>
        </RetroCard>
      </div>
    </section>
  );
}