"use client";

import { useState } from "react";
import { z } from "zod";
import Image from "next/image";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeftIcon, ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useConfirm } from "@/components/confirm";
import { DottedSeparator } from "@/components/dotted-separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

import { ProjectResponse } from "@/types/project";
import { updateProjectSchema } from "../schema";
import { useUpdateProject } from "@/services/projectService";
import { useWorkspaceId } from "@/features/workspace/hook/use-workspace-id";
import { useProjectId } from "../hook/use-project-id";
import { useDeleteProject } from "@/services/projectService";

interface EditProjectFormProps {
  onCancel?: () => void;
  initialValues: ProjectResponse;
}

export const EditProjectForm = ({
  onCancel,
  initialValues,
}: EditProjectFormProps) => {
  const router = useRouter();
  const { mutate: updateProjectMutate, isPending: isUpdateProjectPending } =
    useUpdateProject();
  const { mutate: deleteProjectMutate, isPending: isDeleteProjectPending } =
    useDeleteProject();

  const currentProjectId = useProjectId();
  const currentWorkspaceId = useWorkspaceId();
  const [DeleteDialog, confirmDelete] = useConfirm(
    "Delete Project",
    "This action cannot be undone.",
    "destructive",
  );

  const handleDelete = async () => {
    const ok = await confirmDelete();

    if (!ok) return;
    deleteProjectMutate(
      {
        workspaceId: currentWorkspaceId,
        projectId: currentProjectId,
      },
      {
        onSuccess: () => {
          router.push(`/workspaces/${initialValues.workspaceId}`);
        },
      },
    );
  };

  const inputRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof updateProjectSchema>>({
    resolver: zodResolver(updateProjectSchema),
    defaultValues: initialValues,
  });

  const onSubmit = async (values: z.infer<typeof updateProjectSchema>) => {
    updateProjectMutate({
      workspaceId: currentWorkspaceId,
      projectId: currentProjectId,
      projectForm: { name: values.name, image: values.image },
    });
    await router.back();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    form.setValue("image", file || undefined);
  };

  return (
    <div className="flex flex-col gap-y-4">
      <DeleteDialog />

      <Card className="w-full h-full border-none shadow-none">
        <CardHeader className="flex flex-row items-center gap-x-4 p-7 space-y-0">
          <Button
            size="sm"
            variant="secondary"
            onClick={
              onCancel
                ? onCancel
                : () =>
                    router.push(
                      `/workspaces/${initialValues.workspaceId}/projects/${initialValues.id}`,
                    )
            }
          >
            <ArrowLeftIcon className="size-4 mr-2" />
            Back
          </Button>
          <CardTitle className="text-xl font-bold">
            {initialValues.name}
          </CardTitle>
        </CardHeader>
        <div className="px-7">
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
                      <FormLabel>Project Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter project name" />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <div className="flex flex-col gap-y-2">
                      <div className="flex items-center gap-x-5">
                        {field.value || initialValues.imageUrl ? (
                          <div className="size-[72px] relative rounded-md overflow-hidden">
                            <Image
                              src={
                                field.value instanceof File
                                  ? URL.createObjectURL(field.value) // Nếu là tệp mới được chọn
                                  : field.value ||
                                    initialValues.imageUrl ||
                                    "/path/to/default-image.jpg" // Nếu không có ảnh, hiển thị ảnh mặc định
                              }
                              alt="Logo"
                              fill
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <Avatar className="size-[72px]">
                            <AvatarFallback>
                              <ImageIcon className="size-[36px] text-neutral-400" />
                            </AvatarFallback>
                          </Avatar>
                        )}
                        <div className="flex flex-col">
                          <p className="text-sm">Project Icon</p>
                          <p className="text-sm text-muted-foreground">
                            JPG, PNG, SVG, JPEG, tối đa 1mb
                          </p>
                          <input
                            type="file"
                            className="hidden"
                            accept=".jpg, .png, .svg, .jpeg"
                            ref={inputRef}
                            onChange={handleImageChange}
                          />
                          {field.value ? (
                            <Button
                              type="button"
                              size="xs"
                              variant="destructive"
                              className="w-fit mt-2"
                              onClick={() => {
                                field.onChange(null);
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
                              size="xs"
                              variant="teritary"
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
                <Button
                  type="button"
                  size="lg"
                  variant="secondary"
                  onClick={onCancel}
                  //   disabled={isPending}
                  className={cn(!onCancel && "invisible")}
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  size="lg"
                  // disabled={isPending}
                >
                  Save Changes
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card className="w-full h-full border-none shadow-none">
        <CardContent className="p-7">
          <div className="flex flex-col">
            <h3 className="font-bold">Danger Zone</h3>
            <p className="text-sm text-muted-foreground">
              Deleting a project is a irreversible and will remove all
              associated data
            </p>
            <DottedSeparator className="py-7" />
            <Button
              size="sm"
              type="button"
              variant="destructive"
              className="mt-6 w-fit ml-auto"
              //   disabled={isPending || isDeletingProject}
              onClick={handleDelete}
            >
              Delete Project
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
