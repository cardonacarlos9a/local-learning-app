import Header from "../components/shared/Header";
import { Link } from 'react-router-dom';
import Style from "../styles/home/Home.module.css"
import {useState} from 'react'

const apps = [
  {
    name: 'Dictado',
    description: 'Dictados',
    route: '/dictado',
  },
  {
    name: 'App 2',
    description: 'Description of App 2',
    route: '/app2',
  }
  // Add more apps as needed
];
export default function Home(){
    const [searchQuery, setSearchQuery] = useState('');
  
    // Filter apps based on the search query
    const filteredApps = apps.filter(app =>
      app.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
      };
    

  return (
    <>
    <Header/>

    <div className={Style['app-hub']}>
      <h1 className={Style['app-hub-title']}>Apps Gallery</h1>
      <div className={Style['search-box']}>
        <input
          type="text"
          placeholder="Buscar aplicacion"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
    </div>
    <ul className={Style['ul']}>
        {filteredApps.length === 0
          ? apps.map((app, index) => (
              <li className={Style['li']} key={index}>
                <Link to={app.route}>
                  <strong>{app.name}</strong>
                </Link>
                <p>{app.description}</p>
              </li>
            ))
          : filteredApps.map((app, index) => (
              <li className={Style['li']} key={index}>
                <Link to={app.route}>
                  <strong>{app.name}</strong>
                </Link>
                <p>{app.description}</p>
              </li>
            ))}
      </ul>
    </>
  );
}