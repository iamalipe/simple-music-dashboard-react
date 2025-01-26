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
import { Separator } from "@/components/ui/separator";
import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import apiQuery from "@/hooks/use-api-query";
import LoadingElement from "@/components/general/loading-element";
import ErrorPage from "@/components/general/error-page";
import PageNotFound from "@/components/general/page-not-found";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2).max(100),
  bio: z.string().min(2).max(1000).optional(),
  imageUrl: z.string().min(10).optional(),
});

type FormSchemaType = z.infer<typeof formSchema>;

function RouteComponent() {
  const { toast } = useToast();
  // This can come from your database or API.
  const defaultValues: Partial<FormSchemaType> = {
    name: "",
    bio: undefined,
    imageUrl: undefined,
  };
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: "onChange",
  });

  const onSubmit = async (data: FormSchemaType) => {
    await apiQuery.artist.create(data);
    toast({
      title: "Artist created",
      description: "Your artist has been created successfully.",
    });
    form.reset();
  };

  return (
    <main className="flex-1 overflow-hidden flex flex-col p-2 md:p-4 gap-2 md:gap-4">
      <div>
        <h3 className="text-lg font-medium">Artist</h3>
        <p className="text-sm text-muted-foreground">
          Create your artist profile
        </p>
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 overflow-auto scrollbar-thin max-w-xl px-1"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your full name" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name. It can be your real name or
                  a pseudonym.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image URL (Optional)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your image URL"
                    {...field}
                    onChange={(e) =>
                      field.onChange(e.target.value || undefined)
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio (Optional)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us a little bit about yourself"
                    className="resize-none"
                    {...field}
                    onChange={(e) =>
                      field.onChange(e.target.value || undefined)
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a verified email to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="m@example.com">m@example.com</SelectItem>
                    <SelectItem value="m@google.com">m@google.com</SelectItem>
                    <SelectItem value="m@support.com">m@support.com</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  You can manage verified email addresses in your{" "}
                  <Link href="/examples/forms">email settings</Link>.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          /> */}
          {/* <div>
            {fields.map((field, index) => (
              <FormField
                control={form.control}
                key={field.id}
                name={`urls.${index}.value`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={cn(index !== 0 && "sr-only")}>
                      URLs
                    </FormLabel>
                    <FormDescription className={cn(index !== 0 && "sr-only")}>
                      Add links to your website, blog, or social media profiles.
                    </FormDescription>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={() => append({ value: "" })}
            >
              Add URL
            </Button>
          </div> */}
          {form.formState.errors.root && (
            <p className="text-sm font-medium text-destructive">
              {form.formState.errors.root.message}
            </p>
          )}
          <Button type="submit">Create</Button>
        </form>
      </Form>
    </main>
  );
}

export const Route = createFileRoute("/artist/new/")({
  component: RouteComponent,
  errorComponent: ErrorPage,
  notFoundComponent: PageNotFound,
  pendingComponent: LoadingElement,
});
