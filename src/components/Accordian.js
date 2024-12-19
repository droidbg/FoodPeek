const Accordian = (props) => {
  const { itemCards, title } = props;

  return (
    <div>
      <h2>{title}</h2>

      <ul>
        {itemCards.map((item) => {
          const { name, price } = item.card.info;
          return (
            <li key={name + price}>
              {name} - Price: Rs. {price / 100}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default Accordian;
