import { getApiDocs } from "@/app/_lib/swagger";
import ReactSwagger from "./react-swagger";
export default function Home() {
    return (
      <main>
        <ReactSwagger spec={getApiDocs()} />
      </main>
    );
  }
  