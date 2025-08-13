import { memo } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className="Header">
            <header className='w-[100%] h-[55px] mb-[100px] pl-[10px] pr-[10px] bg-[#303030] text-white'>
                <nav className='flex h-[55px] items-center justify-between'>
                    <div>
                        <h1>Information</h1>
                    </div>
                    <ul className='flex gap-4'>
                        <li>
                            <Link to={"/"}>country</Link>
                        </li>
                        <li>
                            <Link to={"/phone"}>phone</Link>
                        </li>
                    </ul>
                </nav>
            </header>
        </div>
    );
};

export default memo(Header);