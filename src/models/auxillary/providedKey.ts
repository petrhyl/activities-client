import type { InjectionKey, Ref } from "vue";
import type { WindowWidth } from "@/utils/constanses/enums";
import type { ModalState } from "./interfaces";


export const keyProvidedWindowWidth = Symbol() as InjectionKey<Ref<WindowWidth>>;
export const keyProvidedModalState = Symbol() as InjectionKey<ModalState>