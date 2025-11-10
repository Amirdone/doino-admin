<script setup lang="ts">
import type { Range } from "~/types";
const { formatJalali, parseJalali } = useJalaliDate();
const selected = defineModel<Range>({ required: true });
const ranges = [
  { label: "۷ روز اخیر", days: 7 },
  { label: "۱۴ روز اخیر", days: 14 },
  { label: "۳۰ روز اخیر", days: 30 },
  { label: "۳ ماه اخیر", months: 3 },
  { label: "۶ ماه اخیر", months: 6 },
  { label: "سال اخیر", years: 1 },
];
// Jalali calendar logic
const jalaliWeekdays = ["ش", "ی", "د", "س", "چ", "پ", "ج"];

// Initialize current month to the selected start date or today
const initializeMonth = () => {
  if (selected.value.start) {
    return parseJalali(
      formatJalali(selected.value.start, "jYYYY/jMM/jDD"),
      "jYYYY/jMM/jDD"
    ).startOf("jMonth");
  }
  return parseJalali(
    formatJalali(new Date(), "jYYYY/jMM/jDD"),
    "jYYYY/jMM/jDD"
  ).startOf("jMonth");
};

const currentMonth = ref(initializeMonth());

const getDaysInMonth = (monthMoment: any) => {
  const days = monthMoment.jDaysInMonth();
  const firstDayOfMonth = monthMoment.jDay(); // 0 = Saturday, 1 = Sunday, etc.
  const daysArray = Array.from({ length: days }, (_, i) => i + 1);
  // Add empty cells for days before the first day of month
  const emptyCells = Array.from({ length: firstDayOfMonth }, () => null);
  return [...emptyCells, ...daysArray];
};

const jalaliDays = computed(() => getDaysInMonth(currentMonth.value));

function prevMonth() {
  currentMonth.value = currentMonth.value
    .clone()
    .subtract(1, "jMonth")
    .startOf("jMonth");
}
function nextMonth() {
  currentMonth.value = currentMonth.value
    .clone()
    .add(1, "jMonth")
    .startOf("jMonth");
}

function selectJalaliDay(day: number) {
  const selectedDate = currentMonth.value.clone().jDate(day).toDate();

  if (!selected.value.start) {
    // First click - set start date
    selected.value.start = selectedDate;
    selected.value.end = selectedDate;
  } else if (
    !selected.value.end ||
    selected.value.start === selected.value.end
  ) {
    // Second click - set end date or complete the range
    if (selectedDate < selected.value.start) {
      // If selected date is before start, swap them
      selected.value.end = selected.value.start;
      selected.value.start = selectedDate;
    } else {
      selected.value.end = selectedDate;
    }
  } else {
    // Third+ click - start a new range
    selected.value.start = selectedDate;
    selected.value.end = selectedDate;
  }
}

function isSelectedJalali(day: number) {
  if (!selected.value.start) return false;

  const dayDate = currentMonth.value.clone().jDate(day).toDate();
  const startFormatted = formatJalali(selected.value.start, "jYYYY/jMM/jDD");
  const endFormatted = selected.value.end
    ? formatJalali(selected.value.end, "jYYYY/jMM/jDD")
    : startFormatted;
  const dayFormatted = formatJalali(dayDate, "jYYYY/jMM/jDD");

  // Check if day is within the range
  return (
    dayFormatted === startFormatted ||
    dayFormatted === endFormatted ||
    (dayDate > selected.value.start && dayDate < selected.value.end)
  );
}

function isRangeSelected(range: {
  days?: number;
  months?: number;
  years?: number;
}) {
  if (!selected.value.start || !selected.value.end) return false;
  const end = parseJalali(
    formatJalali(new Date(), "jYYYY/jMM/jDD"),
    "jYYYY/jMM/jDD"
  );
  let start = end.clone();
  if (range.days) start = start.subtract(range.days, "days");
  if (range.months) start = start.subtract(range.months, "jMonth");
  if (range.years) start = start.subtract(range.years, "jYear");
  return (
    formatJalali(selected.value.start, "jYYYY/jMM/jDD") ===
      formatJalali(start, "jYYYY/jMM/jDD") &&
    formatJalali(selected.value.end, "jYYYY/jMM/jDD") ===
      formatJalali(end, "jYYYY/jMM/jDD")
  );
}

function selectRange(range: {
  days?: number;
  months?: number;
  years?: number;
}) {
  const end = parseJalali(
    formatJalali(new Date(), "jYYYY/jMM/jDD"),
    "jYYYY/jMM/jDD"
  );
  let start = end.clone();
  if (range.days) start = start.subtract(range.days, "days");
  if (range.months) start = start.subtract(range.months, "jMonth");
  if (range.years) start = start.subtract(range.years, "jYear");
  selected.value = {
    start: start.toDate(),
    end: end.toDate(),
  };
}
// ...existing code...
</script>

<template>
  <UPopover :content="{ align: 'start' }" :modal="true">
    <UButton
      color="neutral"
      variant="ghost"
      icon="i-lucide-calendar"
      class="data-[state=open]:bg-elevated group"
    >
      <span class="truncate">
        <template v-if="selected.start">
          <template v-if="selected.end">
            {{ formatJalali(selected.start, "jYYYY/jMM/jDD") }} -
            {{ formatJalali(selected.end, "jYYYY/jMM/jDD") }}
          </template>
          <template v-else>
            {{ formatJalali(selected.start, "jYYYY/jMM/jDD") }}
          </template>
        </template>
        <template v-else> انتخاب تاریخ </template>
      </span>

      <template #trailing>
        <UIcon
          name="i-lucide-chevron-down"
          class="shrink-0 text-dimmed size-5 group-data-[state=open]:rotate-180 transition-transform duration-200"
        />
      </template>
    </UButton>

    <template #content>
      <div class="flex items-stretch sm:divide-x divide-default">
        <div class="hidden sm:flex flex-col justify-center">
          <UButton
            v-for="(range, index) in ranges"
            :key="index"
            :label="range.label"
            color="neutral"
            variant="ghost"
            class="rounded-none px-4"
            :class="[
              isRangeSelected(range) ? 'bg-elevated' : 'hover:bg-elevated/50',
            ]"
            truncate
            @click="() => selectRange(range)"
          />
        </div>

        <div class="p-2">
          <!-- Simple Jalali calendar grid -->
          <div class="flex items-center justify-between mb-2">
            <button @click="prevMonth" class="px-2">‹</button>
            <span>{{ currentMonth.format("jMMMM jYYYY") }}</span>
            <button @click="nextMonth" class="px-2">›</button>
          </div>
          <div class="grid grid-cols-7 gap-1 text-center text-sm">
            <span v-for="d in 7" :key="d" class="font-bold text-primary">{{
              jalaliWeekdays[d - 1]
            }}</span>
            <button
              v-for="day in jalaliDays"
              :key="`day-${day || 'empty'}`"
              :disabled="!day"
              class="rounded px-2 py-1.5 text-sm transition-colors"
              :class="{
                'bg-primary text-white font-semibold':
                  day && isSelectedJalali(day),
                'hover:bg-primary/10 cursor-pointer':
                  day && !isSelectedJalali(day),
                'cursor-not-allowed': !day,
                'opacity-0 pointer-events-none': !day,
              }"
              @click="day && selectJalaliDay(day)"
            >
              {{ day || "" }}
            </button>
          </div>
        </div>
      </div>
    </template>
  </UPopover>
</template>
