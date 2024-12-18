import { getBookedDatesByCabinId, getSettings } from "../_lib/data-service";
import DateSelector from "./DateSelector";
import ReservationForm from "./ReservationForm";

async function Reservation({ cabin }) {
  const { id, name, maxCapacity } = cabin;
  const bookings = await getBookedDatesByCabinId(id);
  const settings = await getSettings();
  return (
    <div>
      <h2 className="text-5xl font-semibold text-center mb-10 text-accent-400">
        Reserve {name} today. Pay on arrival.
      </h2>
      <div className="grid grid-cols-2 border border-primary-800 min-h-[400px]">
        <DateSelector bookings={bookings} settings={settings} cabin={cabin} />
        <ReservationForm maxCapacity={maxCapacity} />
      </div>
    </div>
  );
}

export default Reservation;
