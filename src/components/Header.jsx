import logo from '../img/logo-hogar.jpg'

export default function Header() {
  return (
    <header className="p-4 flex items-center">
      <img src={logo} alt="Logotipo Tenda Hogar" className="h-20 mr-4" />
    </header>
  )
}
