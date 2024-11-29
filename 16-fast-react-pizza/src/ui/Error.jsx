import { useRouteError } from "react-router-dom";
import LinkButton from "./LinkButton";

function Error() {
  const error = useRouteError();

  return (
    <div className="flex flex-col gap-4 px-4 py-6">
      <h1 className="font-semibold">Something went wrong 😢</h1>
      <p className="rounded-full bg-red-100 px-4 py-2 text-sm text-red-700">{error.data || error.message}</p>
      <LinkButton to="-1">&larr; Go back</LinkButton>
    </div>
  );
}

export default Error;
