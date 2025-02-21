import { linkColors } from "../../utils/colors";

const LinkSection = ({ data }) => {
  return (
    <div className="pb-2">
      <div>{data.heading}</div>
      {data.links.map((item, index) => (
        <div
          key={item.name + index}
          className={`text-gray-400 text-sm p-1 hover:cursor-pointer hover:scale-95 hover:${linkColors[index]}`}
        >
          {item.name}
        </div>
      ))}
    </div>
  );
};
export default LinkSection;
