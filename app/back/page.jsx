"use client";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const handleClick = () => {
    router.push("/");
  };
  return (
    <>
      <button onClick={handleClick}>go back</button>
    </>
  );
};

export default Page;
