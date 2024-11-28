import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import Username from "../features/user/Username";

function Header() {
  return (
    <header className="flex items-center justify-between border-b border-stone-200 bg-yellow-500 px-4 py-3 uppercase sm:px-6">
      <div>
        <Link to="/" className="tracking-widest">
          Fast React Pizza Co.
        </Link>
      </div>
      <div className="ml-auto flex items-center space-x-4">
        <SearchOrder />
        <Username />
      </div>
    </header>
  );
}

export default Header;
