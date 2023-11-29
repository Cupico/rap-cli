import Image from "next/image";

const ArtistGameCard = ({ name, auditeurs, img, otherAudtieurs, selectedElement }) => {
  return (
    <div>
      <div className={`w-full border border-gray-200 rounded-lg shadow transition-all duration-300 ${selectedElement.name === name ? (auditeurs > otherAudtieurs ? "bg-[#10b981]" : "bg-red-400") : "bg-gray-700" }`}>
        <div className="flex justify-end px-4 pt-4"></div>
        <div className="flex flex-col items-center pb-10">
          <Image
            className="w-40 h-40 mb-3 rounded-full shadow-lg"
            src={img}
            alt="Bonnie image"
          />
          <h5 className="mb-1 text-2xl font-medium text-white">
            {name}
          </h5>
          <span className={`text-4xl  ${auditeurs > otherAudtieurs ? "text-blue-500" : "text-gray-500"}`}>
            {auditeurs && new Intl.NumberFormat().format(auditeurs)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ArtistGameCard;
