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
import { Send, FileText } from 'lucide-react';
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
        const errorInfo = {
          status: response.status,
          statusText: response.statusText,
          error: 'Unknown error',
          detail: ''
        };
        try {
          const errorData = await response.json();
          errorInfo.error = errorData.error || errorInfo.error;
          errorInfo.detail = errorData.detail || '';
        } catch {
          errorInfo.detail = await response.text();
        }
        console.error('Application submission error:', errorInfo);
        toast.error(errorInfo.error || errorInfo.detail || errorInfo.statusText);
        return;
      }

      const result = await response.json();
      if (result.success) {
        toast.success("Application submitted successfully! Our staff will review it soon.");
        form.reset();
      } else {
        const errorInfo = {
          status: response.status,
          statusText: response.statusText,
          error: result.error || "Failed to submit application.",
          detail: ''
        };
        console.error('Application submission error:', errorInfo);
        toast.error(errorInfo.error);
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
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-orange-600 text-white font-bold text-xs uppercase tracking-widest shadow-hard-sm">
            <FileText className="w-4 h-4" />
            Join the Whitelist
          </div>
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight">SMP Application</h2>
          <p className="text-xl text-muted-foreground">
            Complete the form below to become a member of the Forsaken community.
          </p>
        </div>
        <RetroCard className="p-8 md:p-12">
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
                        <Input placeholder="username#0000" className="border-2 border-black p-6 rounded-xl focus-visible:ring-orange-500 bg-secondary/30" {...field} />
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
                        <Input type="text" placeholder="18" className="border-2 border-black p-6 rounded-xl focus-visible:ring-orange-500 bg-secondary/30" {...field} />
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
                      <Textarea placeholder="e.g. Europe / GMT+1" className="border-2 border-black p-4 rounded-xl min-h-[100px] focus-visible:ring-orange-500 bg-secondary/30" {...field} />
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
                      <FormLabel className="font-black uppercase tracking-tight text-xs text-foreground">Minecraft Playtime</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. 5 years" className="border-2 border-black p-6 rounded-xl focus-visible:ring-orange-500 bg-secondary/30" {...field} />
                      </FormControl>
                      <FormDescription className="text-muted-foreground/80">How long have you been playing MC?</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="activity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-black uppercase tracking-tight text-xs text-foreground">Weekly Activity</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. 15 hours / week" className="border-2 border-black p-6 rounded-xl focus-visible:ring-orange-500 bg-secondary/30" {...field} />
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
                    <FormLabel className="font-black uppercase tracking-tight text-xs text-foreground">Why do you want to join Forsaken?</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Tell us what draws you to our community..." className="border-2 border-black p-4 rounded-xl min-h-[150px] focus-visible:ring-orange-500 bg-secondary/30" {...field} />
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
                    <FormLabel className="font-black uppercase tracking-tight text-xs text-foreground">What are your skills/contributions?</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Builder, Redstoner, Community organizer..." className="border-2 border-black p-4 rounded-xl min-h-[120px] focus-visible:ring-orange-500 bg-secondary/30" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="rulesAccepted"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-xl border-2 border-black p-4 bg-orange-50/50">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="mt-1 border-2 border-black data-[state=checked]:bg-orange-600 data-[state=checked]:border-black"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="font-bold cursor-pointer text-foreground">
                        I agree to respect the rules, staff, and decisions made by the community.
                      </FormLabel>
                      <p className="text-xs text-muted-foreground">
                        Membership can be revoked at any time for misconduct.
                      </p>
                    </div>
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="w-full h-16 text-xl font-black bg-orange-600 hover:bg-orange-700 text-white border-4 border-black shadow-hard active:translate-y-1 active:shadow-none transition-all"
              >
                {form.formState.isSubmitting ? "Processing..." : "Submit Application"}
                <Send className="ml-2 h-6 w-6" />
              </Button>
            </form>
          </Form>
        </RetroCard>
      </div>
    </section>
  );
}