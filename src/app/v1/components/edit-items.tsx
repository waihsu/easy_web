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
import { items, sections } from "@prisma/client";
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
import {
  createItems,
  updateItems,
  updateSection,
} from "@/app/server/portfolio";
import { toast } from "@/components/ui/use-toast";
import { usePathname, useRouter } from "next/navigation";
import { Edit } from "lucide-react";

const itemSchema = z.object({
  id: z.string(),
  image: z.string().nullish(),
  description: z.string().nullish(),
  link: z.string().nullish(),
  name: z.string().nullish(),
});

export default function EditItems({ item }: { item: items }) {
  const pathname = usePathname();
  const router = useRouter();
  const [uploaded, setUploaded] = useState(false);
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof itemSchema>>({
    resolver: zodResolver(itemSchema),
    defaultValues: {
      id: item.id as string,
      description: item.description as string,
      image: item.image as string,
      link: item.link as string,
      name: item.name as string,
    },
  });

  async function onSubmit(values: z.infer<typeof itemSchema>) {
    const validValues = itemSchema.safeParse(values);
    console.log(validValues);
    setOpen(false);
    const { messg } = await updateItems(values);
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
          <Button size={"icon"}>
            <Edit />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-h-[90%] overflow-y-scroll">
          <DialogHeader>
            <DialogTitle>Edit Items</DialogTitle>
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
                      <Input
                        placeholder="Name"
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
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Text</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Type your message here."
                        id="message"
                        value={field.value ?? ""}
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
                        className="max-h-40 p-0 m-0"
                        appearance={{
                          button: buttonVariants({
                            size: "sm",
                            className: "h-32",
                          }),
                          allowedContent: "text-xl",
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
