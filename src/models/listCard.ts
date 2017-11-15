import { Card } from "./card";

export class ListCard{
    card : Card;
    state : State = State.NearMint;
    price: number = 0.0;
    rarity: Rarity =  Rarity.Default;
    brightness: Brightness = Brightness.Default;

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