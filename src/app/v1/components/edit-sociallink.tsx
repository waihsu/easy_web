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
import { createSocialLink, updateSocialLink } from "@/app/server/portfolio";
import { toast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname } from "next/navigation";
import { FaFacebook, FaTiktok, FaTwitter, FaYoutube } from "react-icons/fa";
import { Edit } from "lucide-react";
import { sociallink } from "@prisma/client";
import { useState } from "react";

const formSchema = z.object({
  id: z.string(),
  icon: z.string(),
  portfolio_id: z.string(),
  link: z.string(),
});
const icons = [
  { name: "facebook", icon: <FaFacebook /> },
  { name: "twitter", icon: <FaTwitter /> },
  { name: "youtube", icon: <FaYoutube /> },
  { name: "tiktok", icon: <FaTiktok /> },
];

export function EditSociallink({ socialLink }: { socialLink: sociallink }) {
  const [open, setOpen] = useState<boolean>(false);
  const pathname = usePathname();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: socialLink.id,
      icon: socialLink.icon,
      portfolio_id: socialLink.portfolio_id,
      link: socialLink.link,
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { messg } = await updateSocialLink(values);
    setOpen(false);
    if (messg === "error") {
      toast({ title: messg, variant: "destructive" });
    } else {
      toast({ title: messg });
    }
  }
  return (
    <div className={pathname.startsWith("/v1") ? "inline" : "hidden"}>
      <Dialog open={open} onOpenChange={() => setOpen(!open)}>
        <DialogTrigger asChild>
          <Button size={"icon"} variant={"ghost"}>
            <Edit size={16} />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Link</DialogTitle>
            {/* <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription> */}
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="icon"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Icons</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="select icon" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {icons.map((item) => (
                          <SelectItem value={item.name} key={item.name}>
                            {item.icon}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

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
                    <FormDescription>This is social link..</FormDescription>
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
