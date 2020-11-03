import { useRouter } from "next/router";
import Link from "next/link";

const Index = () => {
  return (
    <div>
      Hello{" "}
      <Link href="/order">
        <a>GO do Mars</a>
      </Link>
      <Link href="/login">
        <a>GO do Login</a>
      </Link>
    </div>
  );
};

export default Index;
