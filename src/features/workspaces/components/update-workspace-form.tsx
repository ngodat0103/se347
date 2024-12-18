"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { updateWorkspaceSchema } from "../schema";
import { z } from "zod";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { DottedSeparator } from "@/components/dotted-separator";
import { toast, Toaster } from "sonner";
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

import { AvatarFallback } from "@radix-ui/react-avatar";
import { ArrowLeftIcon, CopyIcon, ImageIcon } from "lucide-react";
import clsx from "clsx";
import { useConfirm } from "@/components/confirm";
import { useRouter } from "next/navigation";
import { updateWorkspace, deleteWorkspace } from "@/services/workspaceService";

interface UpdateWorkspaceFormProps {
  onCancel?: () => void;
  showCancelButton?: boolean;
  initialValues: {
    name: string;
    imageUrl?: undefined | string;
  };
  workspaceId: string;
}

export const UpdateWorkspaceForm = ({
  onCancel,
  showCancelButton = true,
  initialValues,
  workspaceId,
}: UpdateWorkspaceFormProps) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const router = useRouter();

  const [DeleteDialog, confirmDelete] = useConfirm(
    "Delete Workspace",
    "Are you sure you want to delete this workspace?",
    "destructive",
  );
  const [ResetDialog, confirmReset] = useConfirm(
    "Reset invite link",
    "This will reset the invite link for this workspace. Are you sure you want to continue?",
    "destructive",
  );

  const form = useForm<z.infer<typeof updateWorkspaceSchema>>({
    resolver: zodResolver(updateWorkspaceSchema),
    defaultValues: initialValues,
  });

  const handleDelete = async () => {
    const isConfirmed = await confirmDelete(); // Chờ người dùng xác nhận
    if (!isConfirmed) return;

    try {
      await deleteWorkspace(workspaceId);
      console.log("Workspace deleted successfully");

      // Chuyển người dùng về trang dashboard
      router.push("/dashboard");
    } catch (error) {
      console.error("Failed to delete workspace:", error);
    }
  };
  const handleResetInviteCode = async () => {
    const ok = await confirmReset();
    if (!ok) return;
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    form.setValue("imageUrl", file || undefined);
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

  const onSubmit = async (value: z.infer<typeof updateWorkspaceSchema>) => {
    try {
      const response = await updateWorkspace(workspaceId, {
        ...value,
        imageUrl: value.imageUrl || undefined,
      });
      console.log(value);

      // Nếu cập nhật thành công
      setSuccessMessage("Workspace updated successfully");
      form.reset();
      setErrorMessage(null);
      onCancel?.();
    } catch (err: unknown) {
      // Xử lý lỗi nếu có
      let error_msg = "Error updating workspace. Please try again.";
      if (err instanceof Error) {
        error_msg = err.message;
      } else if (typeof err === "string") {
        error_msg = err;
      }
      setErrorMessage(error_msg);
      setSuccessMessage(null);
    }
  };
  const fullInviteLink = `${window.location.origin}/workspaces/${workspaceId}/join/random_code`;
  const handleCopyInviteLink = () => {
    navigator.clipboard
      .writeText(fullInviteLink)
      .then(() => toast.success("Invite link copied to clipboard"));
  };
  return (
    <div className="flex flex-col gap-y-4">
      <DeleteDialog />
      <ResetDialog />
      <Card className="w-full h-full border-none shadow-none">
        <CardHeader className="flex flex-row items-center gap-x-4 p-7 space-y-0">
          <Button size="sm" variant="secondary" onClick={onCancel}>
            <ArrowLeftIcon />
            Back
          </Button>
          <CardTitle className="text-xl font-bold">Update Workspace</CardTitle>
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
                          <Avatar className="w-18 h-18">
                            <AvatarFallback>
                              <ImageIcon className="w-9 h-9 text-neutral-400" />
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
                          <Button
                            type="button"
                            variant="teritary"
                            size="xs"
                            className="w-fit mt-2"
                            onClick={() => inputRef.current?.click()}
                          >
                            Upload Image
                          </Button>
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
                  >
                    Cancel
                  </Button>
                )}
                <Button type="submit" size="lg" className="ml-auto">
                  Update Workspace
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
      <Card className="w-full h-full border-none shadow-none">
        <CardContent className="p-7">
          <div className="flex flex-col">
            <h3 className="font-bold">Invite members</h3>
            <p className="text-sm text-muted-foreground">
              Use the invite link below to invite members to your workspace.
            </p>
            <div className="mt-4">
              <div className="flex items-center gap-x-2">
                <Input disabled value={fullInviteLink} />
                <Toaster />
                <Button
                  className="size-12"
                  size="sm"
                  variant="secondary"
                  type="button"
                  onClick={handleCopyInviteLink}
                >
                  <CopyIcon />
                </Button>
              </div>
            </div>
            <DottedSeparator className="py-7" />
            <Button
              className="mt-6 w-fit ml-auto="
              size="sm"
              variant="destructive"
              type="button"
              onClick={handleResetInviteCode}
            >
              Reset invite link
            </Button>
          </div>
        </CardContent>
      </Card>
      <Card className="w-full h-full border-none shadow-none">
        <CardContent className="p-7">
          <div className="flex flex-col">
            <h3 className="font-bold">Danger Zone</h3>
            <p className="text-sm text-muted-foreground">
              Deleting a workspace is irreversible and will remove all
              associated data.
            </p>
            <DottedSeparator className="py-7" />
            <Button
              className="mt-6 w-fit ml-auto"
              size="sm"
              variant="destructive"
              type="button"
              onClick={handleDelete}
            >
              Delete Workspace
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
