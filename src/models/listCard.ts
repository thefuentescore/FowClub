export class ListCard{
    code: string;
    name: string;
    attribute: string;
    state : State = State.NearMint;
    price: number = 0.0;
    rarity: Rarity =  Rarity.Default;
    brightness: Brightness = Brightness.Default;
    listType: ListType;
    constructor(){
        this.name = "";
        this.code = "";
        this.brightness = Brightness.Default;
        this.state = State.Mint;
        this.rarity = Rarity.Default;
        this.listType = ListType.OfferList;
        this.price = 0.0;
    }
}
enum Rarity{
    Default,
    Promo,
    Signed
}
enum Brightness{
    Default,
    Foil,
    FullArt,
    Uber
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
enum ListType{
    SearchList,
    OfferList
}