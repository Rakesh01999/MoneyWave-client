import React, { useContext } from 'react';
import Menu from '../../Menu/Menu/Menu';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import { FaShoppingCart } from 'react-icons/fa';
// import useCart from '../../../hooks/useCart';
import useAdmin from '../../../hooks/useAdmin';

const NavBar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [isAdmin] = useAdmin();
    // const [cart] = useCart() ;
    // console.log('cart-length',cart.length);

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error))
    }

    const navOptions = <>
        <li className='hover:text-yellow-300 hover:font-bold hover:text-[15px]'><Link to="/">Home</Link></li>
        <li className='hover:text-yellow-300 hover:font-bold hover:text-[15px]'><Link to="/menu">Our Menu</Link></li>
        <li className='hover:text-yellow-300 hover:font-bold hover:text-[15px]'><Link to="/order/salad">Order Food</Link></li>

        {/* <li className='hover:text-yellow-300 hover:font-bold hover:text-[15px]'><Link to="/secret">Secret</Link></li> */}
        {
            // user ? 'true' : 'false'
            // user ? condition ? 'double true' : 'one true' : 'false'
        }
        {
            user && isAdmin && <li><Link to="/dashboard/adminHome">Dashboard</Link></li>
        }
        {
            user && !isAdmin && <li><Link to="/dashboard/userHome">Dashboard</Link></li>
        }
        <li className=''>
            <Link to="/dashboard/cart">
                <button className='btn-sm flex gap-1'>
                    <FaShoppingCart />
                    <div className='badge badge-secondary'>+{cart.length}</div>
                </button>
            </Link>
        </li>
        {
            user ? <>
                {/* <span>{user?.displayName}</span> */}
                <button onClick={handleLogOut} className='btn btn-sm '>Log Out</button>
            </> : <>
                <li><Link to="/login">Login</Link></li>
            </>
        }
    </>

    return (
        <>
            {/* <div className="navbar fixed z-10 bg-base-100"> */}
            <div className="navbar fixed z-10 bg-opacity-25 max-w-screen-xl bg-black text-white">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {navOptions}
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl">Money Wave</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navOptions}
                    </ul>
                </div>
                <div className="navbar-end">
                    <a className="btn">Button</a>
                </div>
            </div>
        </>
    );
};

export default NavBar;