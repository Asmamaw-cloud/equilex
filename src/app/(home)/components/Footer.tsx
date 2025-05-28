import Link from "next/link";
import {
  Scale,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-gradient-to-b from-purple-50 to-white border-t">
      <div className="container px-4 py-12 md:px-6 md:py-16 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-5 sm:grid-cols-2">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2">
              <Scale className="h-6 w-6 text-[#7B3B99]" />
              <span className="text-xl font-bold bg-gradient-to-r from-[#7B3B99] to-[#9B4FB8] bg-clip-text text-transparent">
                EQUILEX
              </span>
            </div>
            <p className="mt-4 text-sm text-muted-foreground max-w-xs">
              Connecting clients with attorneys based on language, specialty,
              and region since 2023.
            </p>
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 text-[#7B3B99]" />
                <span>tommr2323@gmail.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 text-[#7B3B99]" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-[#7B3B99]" />
                <span>123 Legal Street, Suite 100, New York, NY 10001</span>
              </div>
            </div>
            <div className="mt-6 flex space-x-4">
              {[
                { icon: <Facebook className="h-4 w-4" />, name: "Facebook" },
                { icon: <Twitter className="h-4 w-4" />, name: "Twitter" },
                { icon: <Linkedin className="h-4 w-4" />, name: "LinkedIn" },
                { icon: <Instagram className="h-4 w-4" />, name: "Instagram" },
              ].map((social) => (
                <Link
                  key={social.name}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full border hover:bg-muted transition-colors"
                  aria-label={social.name}
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Platform</h3>
            <ul className="space-y-3 text-sm">
              {["How It Works", "Features", "Pricing", "FAQ", "Security"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-muted-foreground hover:text-[#7B3B99] transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">For Clients</h3>
            <ul className="space-y-3 text-sm">
              {[
                "Find a Lawyer",
                "Legal Resources",
                "Client Reviews",
                "Success Stories",
                "Support",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-[#7B3B99] transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">For Lawyers</h3>
            <ul className="space-y-3 text-sm">
              {[
                "Join Network",
                "Lawyer Resources",
                "Success Stories",
                "Referral Program",
                "Partner API",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-[#7B3B99] transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-muted-foreground">
              © {currentYear} EQUILEX. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
              <Link href="#" className="hover:text-[#7B3B99] transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="hover:text-[#7B3B99] transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-[#7B3B99] transition-colors">
                Cookie Policy
              </Link>
              <Link href="#" className="hover:text-[#7B3B99] transition-colors">
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
