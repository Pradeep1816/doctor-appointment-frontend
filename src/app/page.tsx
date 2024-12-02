import Image from "next/image";
import Link from "next/link";
export default function Home() {

  return (
    <>
      <div>
        <div className="flex flex-col justify-center items-center h-screen p-4">
          <div className="text-2xl font-bold mb-8">Schedula - Pati
            <hr className="bg-stone-900" />
          </div>
          <div className="border border-2 border-stone-900 h-[130px] w-[130px] flex items-center justify-center bg-yellow-500 shadow-xl">
            <Link href="/sign-in">Sign-up/Sign-in</Link>
          </div>
        </div>
      </div>
    </>
  );
}
