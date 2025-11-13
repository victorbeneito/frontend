export default function Navbar() {
  return (
    <nav className="flex justify-between items-center bg-secondary text-neutral px-8 py-2">
      <div className="flex space-x-6">
        <a href="/" className="hover:text-primary">Inicio</a>
        <a href="/categoria/estores-digitales">Estores Digitales</a>
        <a href="/categoria/estores-lisos">Estores Lisos</a>
        <a href="/categoria/fundas-sofa">Fundas de sofá</a>
        <a href="/categoria/cojines">Cojines</a>
        <a href="/categoria/fundas-nordicas">Fundas Nórdicas</a>
        <a href="/categoria/manteles">Manteles</a>
      </div>
      <button className="bg-primary text-neutral px-4 py-2 rounded-base" disabled>Iniciar sesión</button>
    </nav>
  )
}
