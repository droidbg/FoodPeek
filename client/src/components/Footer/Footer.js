import ImageSection from "./ImageSection";
import LinkSection from "./LinkSection";
import { footerList } from "../../utils/footer-list";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="w-screen bg-black p-4 text-white ">
      <div className="flex justify-around">
        <ImageSection />
        {footerList.map((item, index) => {
          return <LinkSection key={index} data={item} />;
        })}
      </div>
      <div className="w-full text-center p-2 text-gray-50 bg-zinc-900">
        © {currentYear} All Rights Reserved Binni G.
      </div>
    </div>
  );
};
export default Footer;
