import { Assesment } from "./assesment";
import { ListCard } from "./listCard";

export class User {
  $key: string;
  email: string;
  userName: string;
  photo: string;
  listaOfrecidas: ListCard[];
  listaBuscadas: ListCard[];
  assesments: Assesment[];

  public User(){
    this.email = "";
    this.userName = "";
    this.photo = "";
    this.listaBuscadas = [];
    this.listaOfrecidas = [];
    this.assesments = [];
  }
}
