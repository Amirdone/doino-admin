<script setup lang="ts">
withDefaults(
  defineProps<{
    count?: number;
  }>(),
  {
    count: 0,
  }
);

const open = ref(false);
const toast = useToast();

async function onSubmit() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  toast.add({
    title: "عملیات موفق",
    description: "کاربران انتخاب شده با موفقیت حذف شدند",
    color: "success",
  });
  open.value = false;
}
</script>

<template>
  <div>
    <div @click="open = true">
      <slot />
    </div>

    <UModal
      v-model:open="open"
      :title="`حذف ${count} کاربر`"
      :description="`آیا مطمئن هستید؟ این عملیات قابل بازگشت نیست.`"
    >
      <template #body>
        <div class="flex justify-end gap-2">
          <UButton
            label="انصراف"
            color="neutral"
            variant="subtle"
            @click="open = false"
          />
          <UButton
            label="حذف"
            color="error"
            variant="solid"
            loading-auto
            @click="onSubmit"
          />
        </div>
      </template>
    </UModal>
  </div>
</template>
