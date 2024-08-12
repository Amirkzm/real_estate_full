import "./list.scss";
import Card from "../card/Card";
import { SingleLocationType } from "../../types/commonTypes";

type ListProps = {
  items: SingleLocationType[];
};

const List: React.FC<ListProps> = ({ items }) => {
  return (
    <div className="list">
      {items.map((item) => (
        <Card key={item.id} item={item} />
      ))}
    </div>
  );
};

export default List;
