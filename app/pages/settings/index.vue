<script setup lang="ts">
import * as z from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";

const fileRef = ref<HTMLInputElement>();

const profileSchema = z.object({
  name: z.string().min(2, "نام باید حداقل ۲ کاراکتر باشد"),
  email: z.string().email("آدرس ایمیل نامعتبر است"),
  username: z.string().min(2, "نام کاربری باید حداقل ۲ کاراکتر باشد"),
  avatar: z.string().optional(),
  bio: z.string().optional(),
});

type ProfileSchema = z.output<typeof profileSchema>;

const profile = reactive<Partial<ProfileSchema>>({
  name: "Benjamin Canac",
  email: "ben@nuxtlabs.com",
  username: "benjamincanac",
  avatar: undefined,
  bio: undefined,
});
const toast = useToast();
async function onSubmit(event: FormSubmitEvent<ProfileSchema>) {
  toast.add({
    title: "عملیات موفق",
    description: "تنظیمات شما با موفقیت به‌روزرسانی شد.",
    icon: "i-lucide-check",
    color: "success",
  });
  console.log(event.data);
}

function onFileChange(e: Event) {
  const input = e.target as HTMLInputElement;

  if (!input.files?.length) {
    return;
  }

  profile.avatar = URL.createObjectURL(input.files[0]!);
}

function onFileClick() {
  fileRef.value?.click();
}
</script>

<template>
  <UForm
    id="settings"
    :schema="profileSchema"
    :state="profile"
    @submit="onSubmit"
  >
    <UPageCard
      title="پروفایل کاربری"
      description="این اطلاعات به صورت عمومی نمایش داده می‌شوند."
      variant="naked"
      orientation="horizontal"
      class="mb-4"
    >
      <UButton
        form="settings"
        label="ذخیره تغییرات"
        color="neutral"
        type="submit"
        class="w-fit lg:ms-auto"
      />
    </UPageCard>

    <UPageCard variant="subtle">
      <UFormField
        name="name"
        label="نام و نام خانوادگی"
        description="در رسیدها، فاکتورها و سایر ارتباطات نمایش داده می‌شود."
        required
        class="flex max-sm:flex-col justify-between items-start gap-4"
      >
        <UInput v-model="profile.name" autocomplete="off" />
      </UFormField>
      <USeparator />
      <UFormField
        name="email"
        label="آدرس ایمیل"
        description="برای ورود به سیستم، دریافت رسیدها و اطلاع‌رسانی‌ها استفاده می‌شود."
        required
        class="flex max-sm:flex-col justify-between items-start gap-4"
      >
        <UInput v-model="profile.email" type="email" autocomplete="off" />
      </UFormField>
      <USeparator />
      <UFormField
        name="username"
        label="نام کاربری"
        description="نام کاربری یکتای شما برای ورود به سیستم و آدرس پروفایل."
        required
        class="flex max-sm:flex-col justify-between items-start gap-4"
      >
        <UInput v-model="profile.username" type="username" autocomplete="off" />
      </UFormField>
      <USeparator />
      <UFormField
        name="avatar"
        label="تصویر پروفایل"
        description="فرمت‌های JPG، GIF یا PNG. حداکثر حجم: ۱ مگابایت."
        class="flex max-sm:flex-col justify-between sm:items-center gap-4"
      >
        <div class="flex flex-wrap items-center gap-3">
          <UAvatar :src="profile.avatar" :alt="profile.name" size="lg" />
          <UButton label="انتخاب فایل" color="neutral" @click="onFileClick" />
          <input
            ref="fileRef"
            type="file"
            class="hidden"
            accept=".jpg, .jpeg, .png, .gif"
            @change="onFileChange"
          />
        </div>
      </UFormField>
      <USeparator />
      <UFormField
        name="bio"
        label="درباره من"
        description="توضیحات کوتاه درباره خودتان. لینک‌ها به صورت خودکار قابل کلیک می‌شوند."
        class="flex max-sm:flex-col justify-between items-start gap-4"
        :ui="{ container: 'w-full' }"
      >
        <UTextarea v-model="profile.bio" :rows="5" autoresize class="w-full" />
      </UFormField>
    </UPageCard>
  </UForm>
</template>
