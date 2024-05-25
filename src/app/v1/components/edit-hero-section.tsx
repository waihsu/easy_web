"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { sections } from "@prisma/client";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UploadButton, UploadDropzone } from "@/utils/uploadthings";
import { Textarea } from "@/components/ui/textarea";
import { updateSection } from "@/app/server/portfolio";
import { toast } from "@/components/ui/use-toast";
import { usePathname, useRouter } from "next/navigation";

const formSchema = z.object({
  id: z.string(),
  title: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  text: z
    .string()
    .min(10, { message: "Text must be at least more than 10 characters" }),
  link: z.string().nullish(),
  image: z.string().optional(),
});

export default function EditHeroSection({ section }: { section: sections }) {
  const pathname = usePathname();
  const router = useRouter();
  const [uploaded, setUploaded] = useState(false);
  const [open, setOpen] = useState(false);
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: section.id,
      title: section.title,
      text: section.text,
      image: section.image as string,
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { messg } = await updateSection(values);
    setOpen(false);
    if (messg === "error") {
      toast({ title: messg });
      router.refresh();
    } else {
      toast({ title: messg });
      router.refresh();
    }
  }
  return (
    <div className={pathname.startsWith("/v1") ? "inline" : "hidden"}>
      <Dialog open={open} onOpenChange={() => setOpen(!open)}>
        <DialogTrigger asChild>
          <Button>Edit</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Title" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="text"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Text</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Type your message here."
                        id="message"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="link"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Link</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Link"
                        {...field}
                        value={field.value ?? ""}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image is optional</FormLabel>
                    <FormControl className=" ">
                      <UploadDropzone
                        endpoint={"imageUploader"}
                        onClientUploadComplete={(files) => {
                          form.setValue("image", files[0].url);
                          setUploaded(true);
                        }}
                        className="max-h-40 p-0 m-0 "
                        appearance={{
                          button: buttonVariants({
                            size: "sm",
                            className: "h-32",
                          }),
                          allowedContent: "text-xl",
                        }}
                        content={{
                          allowedContent: uploaded
                            ? "image uploaded successful"
                            : "image (4MB)",
                        }}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
