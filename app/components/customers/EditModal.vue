<script setup lang="ts">
import * as z from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";
import type { User } from "~/types";

const props = defineProps<{
  user: User | null;
}>();

const emit = defineEmits<{
  close: [];
}>();

const schema = z.object({
  name: z.string().min(2, "نام باید حداقل ۲ کاراکتر باشد"),
  phone: z.string().min(10, "شماره تلفن باید حداقل ۱۰ رقم باشد"),
  location: z.string().min(2, "موقعیت باید حداقل ۲ کاراکتر باشد"),
  role: z.enum(["admin", "advisor", "student"]),
  status: z.enum(["subscribed", "unsubscribed", "bounced"]),
});

const open = computed({
  get: () => !!props.user,
  set: (value) => {
    if (!value) {
      emit("close");
    }
  },
});

type Schema = z.output<typeof schema>;

const state = reactive<Schema>({
  name: "",
  phone: "",
  location: "",
  role: "student",
  status: "subscribed",
});

watch(
  () => props.user,
  (newUser) => {
    if (newUser) {
      state.name = newUser.name;
      state.phone = newUser.phone;
      state.location = newUser.location;
      state.role = newUser.role;
      state.status = newUser.status;
    }
  },
  { immediate: true }
);

const toast = useToast();
async function onSubmit(event: FormSubmitEvent<Schema>) {
  toast.add({
    title: "عملیات موفق",
    description: `اطلاعات کاربر ${event.data.name} به‌روزرسانی شد`,
    color: "success",
  });
  open.value = false;
}

const roleOptions = [
  { label: "مدیر", value: "admin" },
  { label: "مشاور", value: "advisor" },
  { label: "دانشجو", value: "student" },
];

const statusOptions = [
  { label: "فعال", value: "subscribed" },
  { label: "غیرفعال", value: "unsubscribed" },
  { label: "مسدود شده", value: "bounced" },
];
</script>

<template>
  <UModal
    v-model:open="open"
    title="ویرایش کاربر"
    description="ویرایش اطلاعات کاربر"
  >
    <template #body>
      <UForm
        :schema="schema"
        :state="state"
        class="space-y-4"
        @submit="onSubmit"
      >
        <UFormField
          label="نام و نام خانوادگی"
          placeholder="علی احمدی"
          name="name"
        >
          <UInput v-model="state.name" class="w-full" />
        </UFormField>

        <UFormField label="شماره تلفن" placeholder="09123456789" name="phone">
          <UInput v-model="state.phone" class="w-full" type="tel" dir="ltr" />
        </UFormField>

        <UFormField label="موقعیت" placeholder="تهران، ایران" name="location">
          <UInput v-model="state.location" class="w-full" />
        </UFormField>

        <UFormField label="نقش کاربر" name="role">
          <USelect
            v-model="state.role"
            :items="roleOptions"
            placeholder="انتخاب نقش"
            class="w-full"
          />
        </UFormField>

        <UFormField label="وضعیت" name="status">
          <USelect
            v-model="state.status"
            :items="statusOptions"
            placeholder="انتخاب وضعیت"
            class="w-full"
          />
        </UFormField>

        <div class="flex justify-end gap-2">
          <UButton
            label="انصراف"
            color="neutral"
            variant="subtle"
            @click="open = false"
          />
          <UButton
            label="ذخیره تغییرات"
            color="primary"
            variant="solid"
            type="submit"
          />
        </div>
      </UForm>
    </template>
  </UModal>
</template>
