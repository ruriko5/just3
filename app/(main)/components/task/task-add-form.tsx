"use client";

import {
  descMax,
  TaskFormData,
  taskFormSchema,
} from "@/schemas/task-form-schema";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { createWanna } from "../../wannas/actions";
import { createTodo } from "../../todos/actions";

export const TaskAddForm = ({ status }: { status: "Wanna" | "Todo" }) => {
  const form = useForm<TaskFormData>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      title: "",
      description: "",
    },
    mode: "onChange",
  });

  const router = useRouter();
  const pathname = usePathname();

  type CreateTask = (values: TaskFormData) => Promise<void>;
  const createTask = (createFunc: CreateTask, values: TaskFormData) => {
    createFunc(values)
      .then(() => {
        form.reset();

        if (pathname.match(`/${status.toLowerCase()}s`)) {
          router.refresh();
        }

        toast.success(`${status} has been created`, {
          description: values.title,
        });
      })
      .catch((e) => {
        toast.error(`${e}`);
      });
  };

  const onSubmit = async (values: TaskFormData) => {
    switch (status) {
      case "Wanna":
        return createTask(createWanna, values);
      case "Todo":
        return createTask(createTodo, values);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Task</CardTitle>
      </CardHeader>

      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardContent>
          <FieldGroup>
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="flex flex-col items-start gap-3">
                    Title
                    <Input
                      {...field}
                      aria-invalid={fieldState.invalid}
                      placeholder="Login button not working on mobile"
                      autoComplete="off"
                    />
                  </FieldLabel>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="flex flex-col items-start gap-3">
                    Description
                    <InputGroup>
                      <InputGroupTextarea
                        {...field}
                        placeholder="I'm having an issue with the login button on mobile."
                        rows={6}
                        className="min-h-24 resize-none"
                        aria-invalid={fieldState.invalid}
                      />
                      <InputGroupAddon align="block-end">
                        <InputGroupText className="tabular-nums">
                          {field.value.length}/{descMax} characters
                        </InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                  </FieldLabel>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </CardContent>
        <CardFooter className="mt-6">
          <Field orientation="horizontal">
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
            >
              Reset
            </Button>
            <Button
              type="submit"
              disabled={form.formState.isSubmitting || !form.formState.isValid}
            >
              Submit
            </Button>
          </Field>
        </CardFooter>
      </form>
    </Card>
  );
};
