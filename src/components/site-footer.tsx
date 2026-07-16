import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="border-t border-border pt-20 pb-12 mt-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          <div>
            <p
              className="text-[10px] uppercase tracking-widest mb-6"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Collection
            </p>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link to="/shop" search={{ gender: "men" }} className="hover:text-foreground">
                  Men
                </Link>
              </li>
              <li>
                <Link to="/shop" search={{ gender: "women" }} className="hover:text-foreground">
                  Women
                </Link>
              </li>
              <li>
                <Link to="/shop" search={{ gender: "accessories" }} className="hover:text-foreground">
                  Accessories
                </Link>
              </li>
              <li>
                <Link to="/brands" className="hover:text-foreground">
                  Brands
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p
              className="text-[10px] uppercase tracking-widest mb-6"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Service
            </p>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link to="/returns" className="hover:text-foreground">
                  Returns & Grading
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-foreground">
                  Privacy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-foreground">
                  Terms
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-foreground">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-span-2">
            <p
              className="text-[10px] uppercase tracking-widest mb-6"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Bukan Bulletin
            </p>
            <div className="flex border-b border-border pb-2 max-w-sm">
              <input
                type="email"
                placeholder="Email for archival drops"
                className="bg-transparent w-full text-sm outline-none placeholder:text-muted-foreground"
              />
              <button
                className="text-[10px] uppercase tracking-tighter"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                Join
              </button>
            </div>
            <p className="mt-8 text-[11px] text-muted-foreground" dir="rtl">
              مرکز آرشیو بوکان — تمامی حقوق برای بوتیک محفوظ است.
            </p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center border-t border-border pt-8">
          <p
            className="text-[10px] text-muted-foreground uppercase tracking-widest"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            © 2026 Archive Bukan · Bukan, Iran
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground text-[10px] uppercase tracking-widest"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Instagram
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground text-[10px] uppercase tracking-widest"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Telegram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
