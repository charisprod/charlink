import axios from "axios";
import { useMemo } from "react";
import useSWR from "swr";
import { motion } from "framer-motion";

const Online = ({ section }) => {
  const { data, isLoading } = useSWR(`/api/online`, (url) =>
    axios.get(url).then((res) => res.data)
  );

  console.log(data);
  const [status] = useMemo((): [string] => {
    if (!data) return [""];
  
    switch (data?.data?.discord_status) {
      case "online":
        return ["🟢"];
      case "idle":
        return ["🟡"];
      case "dnd":
        return ["🔴"];
      case "offline":
        return ["⚪"];
      case "streaming":
        return ["🟣"];
      default:
        return [""];
    }
  }, [data]);
  
  if (status === "") return null;

  return (
    <motion.div
      animate={{
        opacity: 0.7,
      }}
    >
          <p>{status}</p>
    </motion.div>
  );
};

export default Online;
