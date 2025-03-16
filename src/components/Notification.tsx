import { Bell } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Notification = () => {
  const { data: session } = useSession();
  //@ts-ignore
  const { data } = session?.user.image.type == "client";
  useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      const res = await axios.get(
        `/api/trial/${
          //@ts-ignore
          session.user.image.type
        }`
      );
      return res.data.trials`${
        //@ts-ignore
        session.user.image.type == "client" ? "/client/" : "/lawyer/"
      }notification`;
    },
  });

  return (
    <Link
      href={`${
        //@ts-ignore
        session.user.image.type == "client" ? "/client/" : "/lawyer/"
      }notification`}
    >
      <Bell />
      {data?.length >= 1 ? (
        <span className="bg-red-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px] absolute top-0 left-7">
          {data?.length}
        </span>
      ) : (
        ""
      )}
    </Link>
  );
};

export default Notification;
