import Link from "next/link";
import Image from "next/image";

const ArtistCard = ({ e, pathname }) => {
  return (
      <div
        className="relative flex flex-col text-gray-700 bg-white shadow-md rounded-xl bg-clip-border"
      >
        <div className="relative min-h-56 overflow-hidden text-white shadow-lg rounded-xl bg-blue-gray-500 bg-clip-border shadow-blue-gray-500/40">
          <Image
            src={e.img}
            alt="img-blur-shadow"
            layout="fill"
            className="w-full"
          />
        </div>
        <div className="py-6 px-2 sm:px-6 sm:pt-6 sm:pb-2">
          <p className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
            {e.name}
          </p>
          <div className="max-h-[180px] overflow-hidden">
            <p className="w-[250px] sm:w-full font-sans text-base antialiased font-light leading-relaxed text-inherit">
              {e.description}
            </p>
          </div>
        </div>
        <div className="px-2 py-6 sm:px-6 sm:py-6">
          <Link
            className="select-none rounded-lg bg-pink-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            href={`${pathname}/${e.rap_genius_id}`}
          >
            Voir plus
          </Link>
        </div>
      </div>

  );
};

export default ArtistCard;