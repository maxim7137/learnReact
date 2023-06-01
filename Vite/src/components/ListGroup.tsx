import { useState } from "react";

interface ListGroupProps {
  items: string[];
  heading: string;
  onSelectItem: (item: string) => void;
}

function ListGroup({ items, heading, onSelectItem }: ListGroupProps) {
  const [activeIndex, setActiveIndex] = useState(-1);

  const handleClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <>
      <h1>{heading}</h1>
      {items.length > 0 ? (
        <ul className="list-group">
          {items.map((city, index, array) => (
            <li
              key={city}
              className={
                index === activeIndex
                  ? "list-group-item active"
                  : "list-group-item"
              }
              onClick={() => {
                handleClick(index);
                onSelectItem(city);
              }}
            >
              {city}
            </li>
          ))}
        </ul>
      ) : (
        <p>Not Found</p>
      )}
    </>
  );
}

export default ListGroup;
