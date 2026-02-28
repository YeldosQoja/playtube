"use client";

import "./styles.css";
import React, {
  useActionState,
  useCallback,
  useEffect,
  useEffectEvent,
  useRef,
  useState,
} from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as Tabs from "@radix-ui/react-tabs";
import { useForm, Controller } from "react-hook-form";
import { EyeOff, Globe, Image, Lock, UploadIcon, XIcon } from "lucide-react";
import { Button, Input, Label, Select } from "@/components";
import { SelectedFileCard } from "@/components/selected-file-card";
import { useMultipartUpload, useSimpleUpload } from "@/hooks/queries/upload";
import { RadioGroup } from "@/components/radio-group";
import { UploadVideoForm } from "@/types/video";
import { Checkbox } from "@/components/checkbox";
import { ProgressBar } from "@/components/progress";
import { useCreateDraftVideo } from "@/hooks/queries/videos";
import { saveVideo } from "@/actions/videos";
import { useCategories } from "@/providers/categories";
import { usePlaylists } from "@/providers/playlists";

export const UploadDialog = () => {
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);
  const videoInputRef = useRef<HTMLInputElement | null>(null);

  const {
    mutate: createDraftVideo,
    data: key,
    isSuccess: isDraftVideoCreated,
  } = useCreateDraftVideo();

  const handleUploadFile = () => {
    setUploadDialogOpen(true);
  };

  const pickVideoFromComputer: React.ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedVideo(file);
      createDraftVideo({ title: file.name });
    }
  };

  const handleSelectVideo = () => {
    videoInputRef.current?.click();
  };

  const preventClosingDialog = useCallback((e: Event) => {
    e.preventDefault();
  }, []);

  return (
    <Dialog.Root
      open={uploadDialogOpen}
      onOpenChange={setUploadDialogOpen}>
      <Dialog.Trigger asChild>
        <Button
          title="Upload File"
          className="upload-btn"
          onClick={handleUploadFile}
        />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="upload-dialog__overlay" />
        <Dialog.Content
          className="upload-dialog__content"
          onEscapeKeyDown={preventClosingDialog}
          onPointerDownOutside={preventClosingDialog}
          onInteractOutside={preventClosingDialog}>
          <button
            className="close-btn"
            onClick={() => setUploadDialogOpen(false)}>
            <XIcon size={28} />
          </button>
          {selectedVideo === null || !isDraftVideoCreated ? (
            <>
              <Dialog.Title className="upload-dialog__title">
                Upload Video
              </Dialog.Title>
              <div className="upload-dropzone upload-dropzone__video">
                <button
                  onClick={handleSelectVideo}
                  className="upload-icon-btn">
                  <UploadIcon
                    size={48}
                    className="upload-icon"
                  />
                </button>
                <p>Select video to upload</p>
                <p className="upload-text-secondary">
                  Or drag and drop video files
                </p>
                <input
                  ref={videoInputRef}
                  id="video-upload"
                  type="file"
                  accept="video/*"
                  className="hidden"
                  onChange={pickVideoFromComputer}
                />
                <Button
                  title="Select video"
                  className="select-file-btn"
                  onClick={handleSelectVideo}
                />
              </div>
            </>
          ) : (
            <>
              <Dialog.Title className="upload-dialog__title">
                {selectedVideo.name}
              </Dialog.Title>
              <UploadForm
                file={selectedVideo}
                fileKey={key}
              />
            </>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

type UploadFormProps = {
  file: File;
  fileKey: string;
};

export const UploadForm = (props: UploadFormProps) => {
  const { fileKey, file } = props;
  const categories = useCategories();
  const playlists = usePlaylists();

  const [{ mutate: startMultipartUpload }, videoUploadProgress] =
    useMultipartUpload();
  const [{ mutate: startSimpleUpload, data: thumbnailKey }] = useSimpleUpload();

  const onOpen = useEffectEvent((payload: { file: File; fileKey: string }) => {
    startMultipartUpload({ file: payload.file, key: payload.fileKey });
  });
  useEffect(() => {
    onOpen(props);
  }, [props]);

  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const thumbnailInputRef = useRef<HTMLInputElement | null>(null);

  const [, submitAction] = useActionState(saveVideo, {
    isSubmitted: false,
    isSuccess: false,
  });

  const { register, control, handleSubmit } = useForm<UploadVideoForm>({
    defaultValues: {
      title: file.name,
      desc: "",
      playlist: "",
      category: "",
      audience: "",
      ageRestriction: "",
      allowComments: false,
      allowDownloads: false,
      tags: "",
    },
  });

  const pickThumbnailFromComputer: React.ChangeEventHandler<
    HTMLInputElement
  > = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      startSimpleUpload(file);
      setThumbnail(file);
    }
  };

  const handleSelectThumbnail = () => {
    thumbnailInputRef.current?.click();
  };

  const removeThumbnail = () => {
    setThumbnail(null);
  };

  const submitData = (values: UploadVideoForm) => {
    const formData = new FormData();

    (
      Object.entries(values) as Array<
        [keyof UploadVideoForm, UploadVideoForm[keyof UploadVideoForm]]
      >
    ).forEach(([field, value]) => {
      formData.append(field, String(value));
    });

    formData.append("key", fileKey);

    if (thumbnailKey) {
      formData.append("thumbnailKey", thumbnailKey);
    }

    submitAction(formData);
  };

  return (
    <form
      id="upload-form"
      className="upload-form"
      onSubmit={handleSubmit(submitData)}
      action={submitAction}>
      <Tabs.Root
        className="tabs"
        defaultValue="details">
        <Tabs.List className="tabs-list">
          <Tabs.Trigger
            value="details"
            className="tab-trigger">
            Details
          </Tabs.Trigger>
          <Tabs.Trigger
            value="thumbnail"
            className="tab-trigger">
            Thumbnail
          </Tabs.Trigger>
          <Tabs.Trigger
            value="settings"
            className="tab-trigger">
            Settings
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content
          value="details"
          className="details">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              {...register("title", { required: true, max: 60 })}
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              className="textarea__desc"
              placeholder="Tell viewers about your video"
              {...register("desc", { required: true, max: 1000 })}
            />
          </div>
          <div>
            <Label htmlFor="playlist">Playlist</Label>
            <Controller
              name="playlist"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={playlists.map((p) => ({
                    value: p.id.toString(),
                    label: p.title,
                  }))}
                  triggerStyle={{
                    width: "50%",
                  }}
                  placeholder="Select playlist"
                />
              )}
            />
          </div>
          <div className="flex-row">
            <div>
              <Label htmlFor="category">Category</Label>
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={categories.map((c) => ({
                      value: c.id.toString(),
                      label: c.title,
                    }))}
                    placeholder="Select category"
                  />
                )}
              />
            </div>
            <div>
              <Label htmlFor="tags">Tags</Label>
              <Input
                id="tags"
                type="text"
                placeholder="Add tags separated by commas"
                {...register("tags")}
              />
            </div>
          </div>
          <div>
            <span>Audience</span>
            <Controller
              name="audience"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  {...field}
                  items={[
                    {
                      value: "for-kids",
                      label: "Yes, it's for kids",
                    },
                    {
                      value: "not-for-kids",
                      label: "No, it's not for kids",
                    },
                  ]}
                />
              )}
            />
          </div>
          <div>
            <span>Age restriction</span>
            <Controller
              name="ageRestriction"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  {...field}
                  items={[
                    {
                      value: "age-restriction",
                      label: "Yes, restrict my video to viewers over 18",
                    },
                    {
                      value: "no-age-restriction",
                      label: "No, allow access to anyone",
                    },
                  ]}
                />
              )}
            />
          </div>
        </Tabs.Content>
        <Tabs.Content
          value="thumbnail"
          className="thumbnail">
          <h3>Upload a thumbnail</h3>
          <p className="upload-text-secondary">
            Upload a custom thumbnail that represents your video
          </p>
          {!thumbnail ? (
            <div className="upload-dropzone">
              <button
                onClick={handleSelectThumbnail}
                className="upload-icon-btn">
                <Image size={42} />
              </button>
              <input
                ref={thumbnailInputRef}
                id="thumbnail-upload"
                type="file"
                accept="image/*"
                className="hidden"
                form="upload-form"
                onChange={pickThumbnailFromComputer}
              />
              <Button
                className="select-file-btn"
                title="Select thumbnail"
                onClick={handleSelectThumbnail}
              />
            </div>
          ) : (
            <SelectedFileCard
              filename={thumbnail.name}
              size={thumbnail.size}
              renderIcon={() => <Image className="file-card__icon" />}
              style="outlined"
              iconContainerStyle="gray"
              onRemove={removeThumbnail}
            />
          )}
        </Tabs.Content>
        <Tabs.Content
          value="settings"
          className="settings flow-content">
          <div>
            <Label htmlFor="privacy">Privacy</Label>
            <Controller
              name="privacy"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={[
                    {
                      label: "Public - Anyone can watch",
                      value: "public",
                      icon: <Globe size={18} />,
                    },
                    {
                      label: "Unlisted - Only people with link",
                      value: "unlisted",
                      icon: <EyeOff size={18} />,
                    },
                    {
                      label: "Private - Only you can watch",
                      value: "private",
                      icon: <Lock size={18} />,
                    },
                  ]}
                  placeholder="Select privacy level"
                />
              )}
            />
          </div>
          <fieldset form="upload-form">
            <legend>Interaction Settings</legend>
            <Controller
              name="allowComments"
              control={control}
              render={({ field }) => (
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  form="upload-form"
                  id="allow-comments"
                  label="Allow comments"
                />
              )}
            />
            <Controller
              name="allowDownloads"
              control={control}
              render={({ field }) => (
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  form="upload-form"
                  id="allow-downloads"
                  label="Allow downloads"
                />
              )}
            />
          </fieldset>
        </Tabs.Content>
      </Tabs.Root>
      <div className="footer">
        <div className="progress">
          <ProgressBar
            max={100}
            value={videoUploadProgress}
          />
          <span>{`Uploading... ${videoUploadProgress}%`}</span>
        </div>
        <Button
          form="upload-form"
          type="submit"
          title="Save"
          className="save-btn"
        />
      </div>
    </form>
  );
};
