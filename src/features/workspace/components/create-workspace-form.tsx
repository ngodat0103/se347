"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createWorkspaceSchema } from "../schema";
import { z } from "zod";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { DottedSeparator } from "@/components/dotted-separator";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Avatar } from "@/components/ui/avatar";
import { createWorkspace } from "@/services/workspaceService";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { ImageIcon } from "lucide-react";
import clsx from "clsx";

interface CreateWorkspaceFormProps {
  onCancel?: () => void;
  showCancelButton?: boolean;
}

export const CreateWorkspaceForm = ({
  onCancel,
  showCancelButton = true,
}: CreateWorkspaceFormProps) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const form = useForm<z.infer<typeof createWorkspaceSchema>>({
    resolver: zodResolver(createWorkspaceSchema),
    defaultValues: {
      name: "",
      imageUrl: undefined,
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("imageUrl", file);
    } else {
      form.setValue("imageUrl", undefined);
    }
  };

  useEffect(() => {
    if (errorMessage || successMessage) {
      const timeout = setTimeout(() => {
        setErrorMessage(null);
        setSuccessMessage(null);
      }, 5000);

      return () => clearTimeout(timeout);
    }
  });

  // const onSubmit = async (value: z.infer<typeof createWorkspaceSchema>) => {
  //   try {
  //     console.log(value);
  //     // Gửi yêu cầu tạo workspace
  //     const response = await createWorkspace(value);

  //     // Nếu tạo thành công
  //     setSuccessMessage("Workspace created successfully");
  //     form.reset();
  //     setErrorMessage(null);
  //   } catch (err: any) {
  //     // Xử lý lỗi nếu có
  //     setErrorMessage(
  //       err.message || "Error creating workspace. Please try again."
  //     );
  //     setSuccessMessage(null);
  //   }
  // };
  const onSubmit = async (value: z.infer<typeof createWorkspaceSchema>) => {
    try {
      console.log(value);
      // Gửi yêu cầu tạo workspace
      const response = await createWorkspace(value);

      // Nếu tạo thành công
      setSuccessMessage("Workspace created successfully");
      form.reset();
      setErrorMessage(null);

      // Làm mới trang
      setTimeout(() => {
        window.location.reload();
      }, 1000); // Đợi 1 giây trước khi reload để người dùng thấy thông báo
    } catch (err: any) {
      // Xử lý lỗi nếu có
      let error_msg = "Error creating workspace. Please try again.";
      if (err instanceof Error) {
        error_msg = err.message;
      } else if (typeof err === "string") {
        error_msg = err;
      }
      setErrorMessage(error_msg);
      setSuccessMessage(null);
    }
  };

  return (
    <>
      <Card className="w-full h-full border-none shadow-none">
        <CardHeader className="flex p-7">
          <CardTitle className="text-xl font-bold">
            Create a new workspace
          </CardTitle>
        </CardHeader>
        <div className="p-7">
          <DottedSeparator />
        </div>
        <CardContent className="p-7">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between w-full">
                        <FormLabel className="flex-1 h-6">
                          Workspace Name
                        </FormLabel>
                      </div>

                      <FormControl>
                        <Input {...field} placeholder="Enter workspace name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <div className="flex flex-col gap-y-2">
                      <div className="flex items-center gap-x-5">
                        {field.value ? (
                          <div className="size-[72px] relative rounded-md overflow-hidden">
                            <Image
                              alt="Logo"
                              fill
                              className="object-cover"
                              src={
                                field.value instanceof File
                                  ? URL.createObjectURL(field.value)
                                  : field.value
                              }
                            />
                          </div>
                        ) : (
                          <Avatar className="w-18 h-18 pr-5 pl-4">
                            <AvatarFallback>
                              <ImageIcon className="w-9 h-9  text-neutral-400" />
                            </AvatarFallback>
                          </Avatar>
                        )}
                        <div className="flex flex-col">
                          <p className="text-sm">Workspace Icon</p>
                          <p className="text-sm text-muted-foreground">
                            JPG, PNG, SVG or JPED, max 1mb
                          </p>
                          <input
                            className="hidden"
                            type="file"
                            accept=".jpg, .png, .jpeg , .svg"
                            ref={inputRef}
                            onChange={handleImageChange}
                          />
                          {field.value ? (
                            <Button
                              type="button"
                              variant="destructive"
                              size="xs"
                              className="w-fit mt-2"
                              onClick={() => {
                                field.onChange(undefined);
                                if (inputRef.current) {
                                  inputRef.current.value = "";
                                }
                              }}
                            >
                              Remove Image
                            </Button>
                          ) : (
                            <Button
                              type="button"
                              variant="teritary"
                              size="xs"
                              className="w-fit mt-2"
                              onClick={() => inputRef.current?.click()}
                            >
                              Upload Image
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                />
              </div>
              <DottedSeparator className="py-7" />
              <div className="flex items-center justify-between">
                {showCancelButton && (
                  <Button
                    type="button"
                    size="lg"
                    variant="secondary"
                    onClick={onCancel}
                    disabled={false}
                  >
                    Cancel
                  </Button>
                )}
                <Button type="submit" size="lg" disabled={false}>
                  Create Workspace
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      {/* Thong bao */}
      <div
        className={clsx(
          "fixed bottom-5 right-5 p-4 rounded-lg shadow-md transition-all duration-500 ease-in-out",
          errorMessage || successMessage
            ? "opacity-100 visible"
            : "opacity-0 invisible",
          errorMessage ? "bg-red-500 text-white" : "bg-green-500 text-white",
        )}
      >
        {errorMessage || successMessage}
      </div>
    </>
  );
};
