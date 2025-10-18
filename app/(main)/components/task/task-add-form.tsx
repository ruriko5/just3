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
import { useRouter } from "next/navigation";
import { createTodo } from "../../todos/actions";
import { toast } from "sonner";

export const TaskAddForm = () => {
  const form = useForm<TaskFormData>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      title: "",
      description: "",
    },
    mode: "onChange",
  });

  const router = useRouter();

  const onSubmit = (values: TaskFormData) => {
    return createTodo(values)
      .then(() => {
        form.reset();
        router.refresh();
        toast.success("Todo has been created", {
          description: `${values.title}`,
        });
      })
      .catch((e) => {
        toast.error(`${e}`);
      });
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
