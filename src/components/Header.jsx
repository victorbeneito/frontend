export default function Header() {
  return (
    <header className="p-8 flex items-center justify-between">
      {/* Logo para modo normal */}
      <img
        src="/img/logo-hogar-claro.jpg"
        alt="Logotipo Claro"
        className="h-32 ml-8 block dark:hidden"
      />
      {/* Logo para modo oscuro */}
      <img
        src="/img/logo-hogar-dark.jpg"
        alt="Logotipo Oscuro"
        className="h-32 ml-8 hidden dark:block"
      />
      <div className="flex-1 flex justify-center">
        <img
        src="/img/banner-dudas.jpg"
        alt="Banner Dudas y Consultas"
        className="h-32 rounded-lg shadow-lg object-contain"
      />
      </div>
            {/* Banner para modo normal */}
      <img
        src="/img/banner-revi-claro.jpg"
        alt="Banner Revi Claro"
        className="h-32 ml-8 block dark:hidden"
      />
      {/* Logo para modo oscuro */}
      <img
        src="/img/banner-revi.jpg"
        alt="Banner Revi Oscuro"
        className="h-32 ml-8 hidden dark:block"
      />
    </header>
  );
}

