import { memo } from 'react';
import Header from '../../components/header/Header';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="Layout">
        <Header/>
        <main>
            <Outlet/>
        </main>
    </div>
  );
};

export default memo(Layout);