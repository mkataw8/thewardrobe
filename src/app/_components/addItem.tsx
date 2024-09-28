"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const AddItem = () => {
  const { mutateAsync: addItem } = api.item.create.useMutation();

  const formSchema = z.object({
    name: z.string().min(1),
    price: z.string().min(1),
    link: z.string().min(1),
  });

  type formSchemaValues = z.infer<typeof formSchema>;

  const form = useForm<formSchemaValues>({
    resolver: zodResolver(formSchema),
    // Ensure this is a valid ItemType
  });

  async function onSubmit(data: formSchemaValues) {
    try {
      console.log(data);
      await addItem(data);

      toast.success("successfully added item");
    } catch (error) {
      console.error("Error adding item:", error);
    }
  }

  return (
    <Form {...form}>
      <form className="text-white" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  className="text-white"
                  id="name"
                  placeholder="Enter item name"
                  {...field}
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
                  className="text-white"
                  id="name"
                  placeholder="Enter item name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input
                  className="text-white"
                  id="name"
                  placeholder="Enter item name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <button
          type="submit"
          className="mt-4 rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </Form>
  );
};
