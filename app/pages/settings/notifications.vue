<script setup lang="ts">
const state = reactive<{ [key: string]: boolean }>({
  email: true,
  desktop: false,
  product_updates: true,
  weekly_digest: false,
  important_updates: true,
});

const sections = [
  {
    title: "کانال‌های اطلاع‌رسانی",
    description: "از چه طریقی می‌خواهید اطلاع‌رسانی دریافت کنید؟",
    fields: [
      {
        name: "email",
        label: "پست الکترونیک",
        description: "دریافت خلاصه‌ای روزانه از طریق ایمیل.",
      },
      {
        name: "desktop",
        label: "اعلان مرورگر",
        description: "نمایش اعلان‌ها در محیط مرورگر.",
      },
    ],
  },
  {
    title: "به‌روزرسانی‌های حساب کاربری",
    description: "دریافت اخبار و به‌روزرسانی‌های سیستم.",
    fields: [
      {
        name: "weekly_digest",
        label: "گزارش هفتگی",
        description: "دریافت خلاصه‌ای از اخبار هر هفته.",
      },
      {
        name: "product_updates",
        label: "به‌روزرسانی‌های سیستم",
        description: "اطلاع از ویژگی‌های جدید و بهبودهای سیستم به صورت ماهانه.",
      },
      {
        name: "important_updates",
        label: "اطلاع‌رسانی‌های مهم",
        description:
          "اطلاع از به‌روزرسانی‌های حیاتی از جمله وصله‌های امنیتی و تعمیر و نگهداری.",
      },
    ],
  },
];

async function onChange() {
  // Do something with data
  console.log(state);
}
</script>

<template>
  <div v-for="(section, index) in sections" :key="index">
    <UPageCard
      :title="section.title"
      :description="section.description"
      variant="naked"
      class="mb-4"
    />

    <UPageCard variant="subtle" :ui="{ container: 'divide-y divide-default' }">
      <UFormField
        v-for="field in section.fields"
        :key="field.name"
        :name="field.name"
        :label="field.label"
        :description="field.description"
        class="flex items-center justify-between not-last:pb-4 gap-2"
      >
        <USwitch v-model="state[field.name]" @update:model-value="onChange" />
      </UFormField>
    </UPageCard>
  </div>
</template>
