import { BurgerIcon,  ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import headerStyles from './header.module.css';

export default function AppHeader() {
    return (
        <header className={headerStyles.header}>
            <nav>
                <ul className={`${headerStyles.list} default-list`}>
                    <li className={`${headerStyles.item} mr-7 ml-5`}>
                        <BurgerIcon type="primary"/>
                        <a href='#' className="text text_type_main-default ml-2">Конструктор</a>
                    </li>
                    <li className={`${headerStyles.item} mr-7 ml-5`}>
                        <ListIcon type="secondary" />
                        <a href='#' className="text text_type_main-default text_color_inactive ml-2">Лента заказов</a>
                    </li>
                    <li className={`${headerStyles.item} mr-5 ml-5`}>
                        <ProfileIcon type="secondary" />
                        <a href='#' className="text text_type_main-default text_color_inactive ml-2">Личный кабинет</a>
                    </li>
                </ul>
            </nav>
            <span className={headerStyles.logo}><Logo /></span>
        </header>
    )
}
