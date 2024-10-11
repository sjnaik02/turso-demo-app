"use client"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod";
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import { useUser } from "@clerk/nextjs";

interface InputFormProps {
  onSubmit: (formData: FormData) => Promise<void>;
}

const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }).max(100, { message: "Title must be less than 100 characters" }),
  content: z.string().min(1, { message: "Content is required" }).max(255, { message: "Content must be less than 255 characters" }),
});

export const NewInputForm: React.FC<InputFormProps> = ({ onSubmit }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const { user } = useUser();

  const { pending } = useFormStatus();

  async function onSubmitForm(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('content', values.content);
    await onSubmit(formData);
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitForm)} className="w-full max-w-2xl flex flex-col border py-4 px-2">
        <FormField control={form.control} name="title" render={({ field }) => (
          <FormItem>
            <FormLabel hidden>Title</FormLabel>
            <FormControl>
              <Input placeholder="Title" {...field} className="border-none shadow-none placeholder:font-bold placeholder:text-sm" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="content" render={({ field }) => (
          <FormItem>
            <FormLabel hidden>Content</FormLabel>
            <FormControl>
              <Textarea placeholder="What's on your mind?" {...field} className="border-none shadow-none placeholder:text-base text-base" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <Button type="submit" disabled={pending || !user} className="self-end rounded-full mt-2 text-base">Post</Button>
      </form>
    </Form>
  )
}