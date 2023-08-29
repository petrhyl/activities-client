import type { InjectionKey } from "vue";
import type { Activity } from "../Activity";

export const keyProvidedActivity = Symbol() as InjectionKey<Activity | null>;