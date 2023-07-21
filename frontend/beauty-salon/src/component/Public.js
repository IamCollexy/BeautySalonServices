import { Link } from 'react-router-dom';

const Public = () => {
  const content = (
    <section className="public">
      <header>
        <h1>
          Welcome to{' '}
          <span className="nowrap">Penelope Beauty Salon</span>
        </h1>
      </header>
      <main className="public_main">
        <p>Located in Accra</p>
        <address className="public__addr">
          Penelope Beauty Salon
          <br />
          342 Accra
          <br />
          Ogbojo,east legon extension
          <br />
          <a href="tel:+13333333333">(333) 333-3333</a>
        </address>
        <br />
        <p>Owner: Mildred Ikpeme</p>
      </main>
      <footer>
        <Link to="/login">Staff Login</Link>
      </footer>
    </section>
  );

  return content;
};

export default Public;
