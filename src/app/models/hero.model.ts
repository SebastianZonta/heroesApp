export class Hero{
    id: string = "";
    name: string = "";
    power: string = "";
    isAlive: boolean;

    constructor(init?: Partial<Hero>){
        this.id = init?.id!;
        this.name = init?.name!;
        this.power = init?.power!;
        this.isAlive = init?.isAlive!;
    }
}