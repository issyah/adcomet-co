/**
 * The main display for the location space : offline space */
import LocationDisplay from "@/src/LocationDisplay";
import { useRouter } from "next/router";
const Offline = () => {
  const router = useRouter();
  const { id, height, width, orientation } = router.query;
  return <LocationDisplay {...router.query} />;
};

export default Offline;
