const Accordian = (props) => {
  const { itemCards, title } = props;

  return (
    <div className="my-4 bg-pink-100 shadow p-2">
      <h2 className="font-bold">{title}</h2>

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
