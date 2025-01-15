import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Header() {
  return (
    <header className="bg-primary/10 shadow-md text-primary-foreground py-4 px-6 flex justify-center items-center">
      <div className="container flex justify-between items-center">
        <Link href="/">
          <h1 className="text-2xl font-bold text-primary">
            How You Searchin&apos;
          </h1>
        </Link>
        <nav>
          <Button variant="link" asChild size="lg" className="text-lg">
            <Link href="/improvements">Improvements</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
