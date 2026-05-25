const NAV_LINKS = [
  { name: 'Home', href: '#home'},
  { name: 'About Me', href: '#about' },
  { name: 'Contact', href: '#contact' },
  { name: 'Projects', href: '#projects' },
];

const Header : React.FC = () =>  {
  return (
    <header className="hidden md:flex sticky top-0 z-50 w-full text-white font-black font-sans bg-[url(/images/folderText.webp)] bg-cover">
      <nav className="mx-auto flex max-w-7xl items-center justify-center p-4 lg:px-8">
        <div className="hidden md:flex md:gap-x-12 ">
          {NAV_LINKS.map((link) => (
            <a key={link.name}
            href={link.href}
            className="text-lg leading-6 uppercase transition-all hover:underline ">
              {link.name}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Header;