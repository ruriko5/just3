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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  descMax,
  TaskFormData,
  taskFormSchema,
} from "@/schemas/task-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogClose } from "@radix-ui/react-dialog";
import { Edit } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { updateTodo } from "../../todos/actions";
import { toast } from "sonner";
import { useState } from "react";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";

export const TaskEditDialogForm = ({
  props: { id, title, description, status },
}: {
  props: {
    id: number;
    title: string;
    description: string | null;
    status: "wanna" | "todo";
  };
}) => {
  const form = useForm<TaskFormData>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      title,
      description: description || "",
    },
    mode: "onChange",
  });

  const capitalizedStatus = status.charAt(0).toUpperCase() + status.slice(1);

  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  type UpdateTask = (id: number, values: TaskFormData) => Promise<void>;
  const updateTask = (updateFunc: UpdateTask, values: TaskFormData) => {
    updateFunc(id, values)
      .then(() => {
        setIsOpen(false);

        form.reset({
          title: values.title,
          description: values.description,
        });

        if (
          pathname.match(`/${status}s`) ||
          pathname.startsWith(`/${status}s/`)
        ) {
          router.refresh();
        }

        toast.success(`${capitalizedStatus} has been updated`, {
          description: values.title,
        });
      })
      .catch((e) => {
        toast.error(`${e}`);
      });
  };

  const onSubmit = (values: TaskFormData) => {
    switch (status) {
      case "todo":
        return updateTask(updateTodo, values);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(prev) => {
        setIsOpen(prev);
        if (!prev) form.reset();
      }}
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <Button size="icon" variant="ghost">
              <Edit />
              <span className="sr-only capitalize">Edit {status}</span>
            </Button>
          </DialogTrigger>
        </TooltipTrigger>

        <TooltipContent side="bottom">
          <p className="capitalize">Edit {status}</p>
        </TooltipContent>
      </Tooltip>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="capitalize">Edit {status}</DialogTitle>
          <DialogDescription>
            Make changes to {status} here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)}>
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
          <DialogFooter className="mt-6">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={
                form.formState.isSubmitting ||
                !form.formState.isValid ||
                !form.formState.isDirty
              }
            >
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
