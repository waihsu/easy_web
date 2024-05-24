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
import { createItems, updateSection } from "@/app/server/portfolio";
import { toast } from "@/components/ui/use-toast";
import { usePathname, useRouter } from "next/navigation";

const itemSchema = z.object({
  section_id: z.string(),
  image: z.string().optional(),
  description: z.string(),
  link: z.string().optional(),
  name: z.string(),
});

export default function AddItems({ section_id }: { section_id: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const [uploaded, setUploaded] = useState(false);
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof itemSchema>>({
    resolver: zodResolver(itemSchema),
    defaultValues: {
      section_id: section_id,
      description: "",
      image: "",
      link: "",
      name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof itemSchema>) {
    setOpen(false);
    const { messg } = await createItems(values);
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
          <Button>Add Item</Button>
        </DialogTrigger>
        <DialogContent className="max-h-[90%] overflow-y-scroll">
          <DialogHeader>
            <DialogTitle>New Items</DialogTitle>
            {/* <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription> */}
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Title" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
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
                      <Input placeholder="Link" {...field} />
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
                        className="max-h-40 p-0 m-0"
                        appearance={{
                          button: buttonVariants({
                            size: "sm",
                            className: "h-32",
                          }),
                        }}
                        content={{
                          allowedContent: uploaded
                            ? "image uploaded"
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
