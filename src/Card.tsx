import { CardContainer } from "./styles";
interface CardProp {
  text: string;
}
export default function Card({ text }: CardProp) {
  return <CardContainer>{text}</CardContainer>;
}
