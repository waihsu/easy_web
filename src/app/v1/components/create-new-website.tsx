"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
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
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPortfolio } from "@/app/server/portfolio";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import HeaderLeftSkelton from "./header-left-skelton";
import TopHeaderSkelton from "./header-top-skelton";

const formSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(3, "Name must be more than 3 letter")
    .max(6, "max is 6"),
  template: z
    .string({ required_error: "Template required" })
    .min(1, "Must be choose"),
});

export default function CreateNewWeb() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      template: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { messg, newPortfolio } = await createPortfolio(values);
    if (!newPortfolio) {
      toast({ title: messg, variant: "destructive" });
    } else {
      router.push(`/v1/admin/${newPortfolio?.id}`);
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"sm"}>Create new website</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Web</DialogTitle>
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
                    <Input placeholder="Enter Your project name" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your website display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="template"
              render={({ field }) => (
                <FormItem>
                  <h1>Choose a layout</h1>
                  <div className=" flex">
                    <div
                      className={cn(
                        " w-1/2 p-2",
                        form.watch("template") === "top"
                          ? "bg-foreground"
                          : "bg-background"
                      )}
                      onClick={() => form.setValue("template", "top")}
                    >
                      <h1>Top</h1>
                      <Card className=" ">
                        <TopHeaderSkelton />
                      </Card>
                    </div>
                    <div
                      className={cn(
                        " w-1/2 p-2",
                        form.watch("template") === "left"
                          ? "bg-foreground"
                          : "bg-background"
                      )}
                      onClick={() => form.setValue("template", "left")}
                    >
                      <h1>left</h1>
                      <Card className=" ">
                        <HeaderLeftSkelton />
                      </Card>
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
