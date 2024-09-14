import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";
import {
  useForm,
  UseFormReturn,
  SubmitHandler,
  UseFormProps,
  FieldValues,
} from "react-hook-form";
import { ZodType } from "zod";

type FormProps<TFormValues extends FieldValues, Schema> = {
  onSubmit: SubmitHandler<TFormValues>;
  children: (methods: UseFormReturn<TFormValues>) => React.ReactNode;
  options?: UseFormProps<TFormValues>;
  schema?: Schema;
  className?: string;
  id?: string;
  isResetForm?: boolean;
};

export const Form = <
  TFormValues extends Record<string, unknown> = Record<string, unknown>,
  Schema extends ZodType<unknown> = ZodType<unknown>
>({
  onSubmit,
  children,
  className,
  options,
  id,
  schema,
  isResetForm = true,
}: FormProps<TFormValues, Schema>) => {
  const methods = useForm<TFormValues>({
    ...options,
    resolver: schema && zodResolver(schema),
  });
  return (
    <form
      className={className}
      onSubmit={(...a) => {
        methods.handleSubmit(async (formData: TFormValues) => {
          try {
            await onSubmit(formData);
            if (isResetForm) {
              methods.reset();
            }
          } catch (error) {
            console.error(error);
          }
        })(...a);
      }}
      id={id}
    >
      {children(methods)}
    </form>
  );
};
