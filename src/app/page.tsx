import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function HomePage() {

  return (
    <main className="font-sans p-4 h-screen w-screen flex">
      <div className="flex flex-col w-1/2 justify-center items-center border">
      <Card className="w-96 mt-12 ">
        <CardHeader>
          <CardTitle className="text-2xl">Personal Twitter</CardTitle>
          <CardDescription>Say something fun!</CardDescription>
        </CardHeader>
        <CardContent className="">
          <form className="flex flex-col gap-2">
            <Input placeholder="Title" type="text" className="text-semibold" name="title" />
            <Input placeholder="Content" type="text" name="content"/>
            <Button type="submit">Submit</Button>
          </form>
        </CardContent>
      </Card>
      </div>
      <div className="flex flex-col gap-2 w-1/2 border">
        <h2 className="text-2xl font-semibold p-4">Posts</h2>
      </div>
    </main>
  );
}
