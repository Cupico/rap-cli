import Link from "next/link";

export default function Header() {
  return (
    <div className="px-10 py-10 bg-gray-700 text-white">
      <nav className="">
        <ol className="flex">
        <li className="">
            <Link href="/">Côté Rap</Link>
          </li>
          <li className="mx-20">
            <Link href="/jeu">Jeu</Link>
          </li>
          {/* <li className="">
            <Link href="/jeu">Top artist</Link>
          </li> */}
          {/* <li className="crumb">Jump Bike 3000</li> */}
        </ol>
      </nav>
    </div>
  );
}
