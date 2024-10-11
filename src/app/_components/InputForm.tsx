"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import { useState } from 'react';

interface InputFormProps {
  onSubmit: (formData: FormData) => Promise<void>;
}

export const InputForm: React.FC<InputFormProps> = ({ onSubmit }) => {

  const { pending } = useFormStatus();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    await onSubmit(formData);
    setTitle('');
    setContent('');
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="text-2xl">Personal Twitter</CardTitle>
        <CardDescription>Say something fun!</CardDescription>
      </CardHeader>
      <CardContent className="">
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <Input placeholder="Title" type="text" className="text-semibold" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <Input placeholder="Content" type="text" name="content" value={content} onChange={(e) => setContent(e.target.value)} />
          <Button type="submit" disabled={pending}>Submit</Button>
        </form>
      </CardContent>
    </Card>
  )
}