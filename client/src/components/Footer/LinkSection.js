import { linkColors } from "../../utils/colors";

const LinkSection = ({ data }) => {
  return (
    <div className="pb-2">
      <div>{data.heading}</div>
      {data.links.map((item, index) => (
        <div
          key={item.name + index}
          className={`p-1 text-sm text-gray-400 hover:scale-95 hover:cursor-pointer hover:${linkColors[index]}`}
        >
          {item.name}
        </div>
      ))}
    </div>
  );
};
export default LinkSection;
