<script setup lang="ts">
import * as z from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";

const schema = z.object({
  name: z.string().min(2, "نام باید حداقل ۲ کاراکتر باشد"),
  email: z.string().email("آدرس ایمیل نامعتبر است"),
});
const open = ref(false);

type Schema = z.output<typeof schema>;

const state = reactive<Partial<Schema>>({
  name: undefined,
  email: undefined,
});

const toast = useToast();
async function onSubmit(event: FormSubmitEvent<Schema>) {
  toast.add({
    title: "عملیات موفق",
    description: `کاربر جدید ${event.data.name} اضافه شد`,
    color: "success",
  });
  open.value = false;
}
</script>

<template>
  <div>
    <UButton label="افزودن کاربر" icon="i-lucide-plus" @click="open = true" />

    <UModal
      v-model:open="open"
      title="کاربر جدید"
      description="افزودن کاربر جدید به سیستم"
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
          <UFormField
            label="آدرس ایمیل"
            placeholder="ali@example.com"
            name="email"
          >
            <UInput v-model="state.email" class="w-full" />
          </UFormField>
          <div class="flex justify-end gap-2">
            <UButton
              label="انصراف"
              color="neutral"
              variant="subtle"
              @click="open = false"
            />
            <UButton
              label="ایجاد کاربر"
              color="primary"
              variant="solid"
              type="submit"
            />
          </div>
        </UForm>
      </template>
    </UModal>
  </div>
</template>
