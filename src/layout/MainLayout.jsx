import { Link, Outlet, useNavigation } from 'react-router-dom';
import Loader from '../components/Loader';
import Header from '../components/Header';

export default function MainLayout() {
  const navigation = useNavigation();

  return (
    <div className="container">
      <header className="header">
        <Link to="/" className="logo">
          <Header />
        </Link>

        <nav>
          <Link to="/">Каталог</Link>
          <Link to="/favorites">Избранное</Link>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

      {navigation.state === 'loading' && <Loader />}

      <footer>
        <p>2026 GeeksOnline</p>
      </footer>
    </div>
  )
}