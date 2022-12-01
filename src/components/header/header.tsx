import { BurgerIcon,  ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink, useRouteMatch, Link } from 'react-router-dom'; 
import headerStyles from './header.module.css';

export default function AppHeader() {
    const isConstructor = !!useRouteMatch({ path: '/', exact: true });
    const isFeed = !!useRouteMatch('/feed');
    const isProfile = !!useRouteMatch('/profile');

    return (
        <header className={headerStyles.header}>
            <nav>
                <ul className={`${headerStyles.list} default-list`}>
                    <li value={0} className={`${headerStyles.item} mr-7 ml-5`}>
                        <BurgerIcon type={isConstructor ? 'primary' : 'secondary'}/>
                        <NavLink exact to="/" className={isActive => `${headerStyles.link} text text_type_main-default text_color_${isActive ? 'primary' : 'inactive'} ml-2`}>Конструктор</NavLink>
                    </li>
                    <li value={1} className={`${headerStyles.item} mr-7 ml-5`}>
                        <ListIcon type={isFeed ? 'primary' : 'secondary'} />
                        <NavLink to="/feed" className={isActive => `${headerStyles.link} text text_type_main-default text_color_${isActive ? 'primary' : 'inactive'} ml-2`}>Лента заказов</NavLink>
                    </li>
                    <li value={2} className={`${headerStyles.item} mr-5 ml-5`}>
                        <ProfileIcon type={isProfile ? 'primary' : 'secondary'} />
                        <NavLink to="/profile" className={isActive => `${headerStyles.link} text text_type_main-default text_color_${isActive ? 'primary' : 'inactive'} ml-2`}>Личный кабинет</NavLink>
                    </li>
                </ul>
            </nav>
            <Link to="/" className={headerStyles.logo}><Logo /></Link>
        </header>
    )
}
