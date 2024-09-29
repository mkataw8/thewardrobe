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
    img: z.string().min(1),
    type: z.enum(["hats", "jackets", "shirts", "pants", "shoes"]),
  });

  type formSchemaValues = z.infer<typeof formSchema>;

  const form = useForm<formSchemaValues>({
    resolver: zodResolver(formSchema),
  });
  async function onSubmit(data: formSchemaValues) {
    try {
      await addItem(data);
      toast.success("Successfully added item");
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
                  placeholder="Enter item link"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="img"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Img</FormLabel>
              <FormControl>
                <Input
                  className="text-white"
                  placeholder="Enter item image link"
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
                  type="number"
                  step="0.01"
                  placeholder="Enter item price"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <div className="mt-3 flex-col">Category</div>
              </FormLabel>
              <FormControl>
                <select {...field} className="text-black">
                  <option value="" disabled>
                    Select item type
                  </option>
                  {["hats", "jackets", "shirts", "pants", "shoes"].map(
                    (option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ),
                  )}
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <button
          type="submit"
          className="mt-4 rounded-lg bg-blue-500 px-4 text-white hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </Form>
  );
};
