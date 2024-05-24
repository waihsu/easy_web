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
import { useFieldArray, useForm } from "react-hook-form";
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
import { cn } from "@/lib/utils";

const formSchema = z.object({
  id: z.string(),
  title: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  text: z
    .string()
    .min(10, { message: "Text must be at least more than 10 characters" }),
  image: z.string().optional(),
  customData: z.array(
    z.object({
      key: z.string(),
      value: z.string(),
    })
  ),
});
type CustomDataItem = {
  key: string;
  value: string;
};
export default function EditAboutSection({ section }: { section: sections }) {
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
      customData: (section.customData as CustomDataItem[]) || [],
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
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

  const { fields, append, remove } = useFieldArray({
    name: "customData",
    control: form.control,
  });

  const addCustomField = () => {
    append({ key: "", value: "" });
  };

  return (
    <div className={pathname.startsWith("/v1") ? "inline" : "hidden"}>
      <Dialog open={open} onOpenChange={() => setOpen(!open)}>
        <DialogTrigger asChild>
          <Button>Edit</Button>
        </DialogTrigger>
        <DialogContent className="max-h-[90%] overflow-y-scroll">
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
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
              <div>
                {fields.map((field, index) => (
                  <div className="flex gap-2" key={field.id}>
                    <FormField
                      control={form.control}
                      name={`customData.${index}.key`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
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
                      name={`customData.${index}.value`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Type your message here."
                              id="message"
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <button type="button" onClick={() => remove(index)}>
                      Remove
                    </button>
                  </div>
                ))}
                <div className=" flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    onClick={addCustomField}
                  >
                    Add
                  </Button>
                </div>
              </div>
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
