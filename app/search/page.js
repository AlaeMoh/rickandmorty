import { Suspense } from "react";
import SearchClient from "./SearchClient";

export default function Page() {
  return (
    <Suspense fallback={<p className="text-center mt-5">Loading...</p>}>
      <SearchClient />
    </Suspense>
  );
}