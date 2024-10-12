"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import { useUser } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";

interface InputFormProps {
  onSubmit: (formData: FormData) => Promise<void>;
}

const formSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title is required" })
    .max(100, { message: "Title must be less than 100 characters" }),
  content: z
    .string()
    .min(1, { message: "Content is required" })
    .max(255, { message: "Content must be less than 255 characters" }),
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
    formData.append("title", values.title);
    formData.append("content", values.content);
    await onSubmit(formData);
    form.reset();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmitForm)}
        className="flex w-full max-w-2xl flex-col border px-2 py-4"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel hidden>Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="Title"
                  {...field}
                  className="border-none shadow-none placeholder:text-base placeholder:font-bold"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel hidden>Content</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="What's on your mind?"
                  {...field}
                  className="border-none text-base shadow-none placeholder:text-base"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          aria-disabled={pending || !user}
          className="mt-2 self-end rounded-full text-base"
        >
          Post {pending && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
        </Button>
      </form>
    </Form>
  );
};
