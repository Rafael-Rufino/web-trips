import QuickSearch from "./components/quickSearch";
import RecommendedTrips from "./components/recommendedTrips";
import TripSearch from "./components/tripSearch";

export default function Home() {
  return (
    <div>
      <TripSearch />
      <QuickSearch />
      <RecommendedTrips />
    </div>
  );
}
