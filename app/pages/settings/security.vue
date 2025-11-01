<script setup lang="ts">
import * as z from "zod";
import type { FormError } from "@nuxt/ui";

const passwordSchema = z.object({
  current: z.string().min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد"),
  new: z.string().min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد"),
});

type PasswordSchema = z.output<typeof passwordSchema>;

const password = reactive<Partial<PasswordSchema>>({
  current: undefined,
  new: undefined,
});

const validate = (state: Partial<PasswordSchema>): FormError[] => {
  const errors: FormError[] = [];
  if (state.current && state.new && state.current === state.new) {
    errors.push({
      name: "new",
      message: "رمز عبور جدید باید با رمز فعلی متفاوت باشد",
    });
  }
  return errors;
};
</script>

<template>
  <UPageCard
    title="تغییر رمز عبور"
    description="برای تنظیم رمز عبور جدید، ابتدا رمز فعلی خود را تأیید کنید."
    variant="subtle"
  >
    <UForm
      :schema="passwordSchema"
      :state="password"
      :validate="validate"
      class="flex flex-col gap-4 max-w-xs"
    >
      <UFormField name="current">
        <UInput
          v-model="password.current"
          type="password"
          placeholder="رمز عبور فعلی"
          class="w-full"
        />
      </UFormField>

      <UFormField name="new">
        <UInput
          v-model="password.new"
          type="password"
          placeholder="رمز عبور جدید"
          class="w-full"
        />
      </UFormField>

      <UButton label="به‌روزرسانی رمز عبور" class="w-fit" type="submit" />
    </UForm>
  </UPageCard>

  <UPageCard
    title="حذف حساب کاربری"
    description="دیگر نمی‌خواهید از خدمات ما استفاده کنید؟ می‌توانید حساب کاربری خود را از اینجا حذف کنید. توجه داشته باشید که این عملیات غیرقابل بازگشت است و تمام اطلاعات مرتبط با این حساب به طور دائم حذف خواهند شد."
    class="bg-gradient-to-tl from-error/10 from-5% to-default"
  >
    <template #footer>
      <UButton label="حذف حساب کاربری" color="error" />
    </template>
  </UPageCard>
</template>
