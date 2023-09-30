import type { InjectionKey, Ref } from "vue";
import type { Activity } from "../Activity";
import type { WindowWidth } from "@/utils/constanses/OtherEnums";

export const keyProvidedActivity = Symbol() as InjectionKey<Activity | null>;

export const keyProvidedWindowWidth = Symbol() as InjectionKey<Ref<WindowWidth>>;