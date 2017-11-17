import { Assesment } from "./assesment";
import { ListCard } from "./listCard";

export class UserData {
  email: string;
  userName: string;
  photo: string;
  listaOfrecidas: ListCard[];
  listaBuscadas: ListCard[];
  assesments: Assesment[];
}
