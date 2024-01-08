import { type ModalInState as Mod } from '@/models/auxillary/interfaces';

export class ModalInState implements Mod{
    public id: string
    public isOpen: boolean
    public elementId: string
    
    constructor(){
        this.id = '-1'
        this.isOpen = false
        this.elementId = ''
    }
}