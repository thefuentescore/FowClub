import { Card } from "./card";

export class ListCard{
    code: string;
    name: string;
    attribute: string;
    state : State = State.NearMint;
    price: number = 0.0;
    rarity: Rarity =  Rarity.Default;
    brightness: Brightness = Brightness.Default;
    constructor(){
        this.name = "";
        this.code = "";
        this.brightness = Brightness.Default;
        this.state = State.Mint;
        this.rarity = Rarity.Default;
        this.price = 0.0;
    }
}
enum Rarity{
    Default,
    FullArt,
    Uber,
    Promo,
    Signed
}
enum Brightness{
    Default,
    Foil,
    SuperFoil
}

enum State{
    Mint,
    NearMint,
    Excellent,
    Good,
    LightPlayed,
    Played,
    Poor
}