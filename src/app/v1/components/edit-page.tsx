"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPage, deletePage, updatePage } from "@/app/server/portfolio";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";
import { pages } from "@prisma/client";
import { Edit } from "lucide-react";
import DeleteDialog from "./delete-dialog";
import { usePathname, useRouter } from "next/navigation";

const formSchema = z.object({
  id: z.string(),
  title: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export function EditPage({ id, title }: { id: string; title: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: id,
      title: title,
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    const { messg } = await updatePage(values);
    setOpen(false);
    setLoading(false);
    if (messg === "error") {
      toast({ title: messg, variant: "destructive" });
      router.refresh();
    } else {
      toast({ title: messg });
      router.refresh();
    }
  }

  async function onDelete() {
    const { messg } = await deletePage(id);
    setOpen(false);

    if (messg === "error") {
      toast({ title: messg, variant: "destructive" });
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
          <Edit onClick={() => setOpen(!open)} size={14} />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Page</DialogTitle>
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
                      <Input placeholder="Page Title" {...field} />
                    </FormControl>
                    <FormDescription>This is your page name.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center justify-between">
                <Button type="submit" disabled={loading}>
                  Submit
                </Button>
                <DeleteDialog callback={onDelete} />
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
