import { BurgerIcon,  ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import headerStyles from './header.module.css';

export default function AppHeader() {
    return (
        <header className={headerStyles.header}>
            <nav>
                <ul className={headerStyles.list}>
                    <li className={`${headerStyles.item} mr-7 ml-5`}>
                        <BurgerIcon type="primary"/>
                        <a className="text text_type_main-default ml-2">Конструктор</a>
                    </li>
                    <li className={`${headerStyles.item} mr-7 ml-5`}>
                        <ListIcon type="secondary" />
                        <a className="text text_type_main-default text_color_inactive ml-2">Лента заказов</a>
                    </li>
                    <li className={`${headerStyles.item} mr-5 ml-5`}>
                        <ProfileIcon type="secondary" />
                        <a className="text text_type_main-default text_color_inactive ml-2">Личный кабинет</a>
                    </li>
                </ul>
            </nav>
            <span className={headerStyles.logo}><Logo /></span> {/* пришлось обернуть в спан, т.к. класснэйм у лого не работает почему-то*/}
        </header>
    )
}
