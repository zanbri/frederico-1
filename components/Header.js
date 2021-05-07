import Link from "next/link";
function Header() {
  return (
    <header>
      <div>
        <Link href="/">
          <h1>Frederico Ramos Lopes</h1>
        </Link>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio
          labore consequuntur mollitia aspernatur pariatur, quidem ducimus
          blanditiis velit quod quis, doloremque ipsa, enim impedit provident
          nostrum ab ad adipisci natus.
        </p>
      </div>
    </header>
  );
}

export default Header;
