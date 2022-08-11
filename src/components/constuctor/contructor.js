import { Button, ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './constructor.module.css'
import PriceContainer from "../price/price"
import ConstructorItem from "../constructor-item/constructor-item";
import PropTypes from 'prop-types';

export default function BurgerConsrtuctor({data}) {
    return (
        <section className="default-section pl-4 mt-25">
            <div className={`${styles.container} mr-4 mb-4`}>
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={`${data[0].name} (верх)`}
                    price={data[0].price}
                    thumbnail={data[0].image}
                    className={`${styles.item} ml-8`}
                />
            </div>
        
            <ul className={`${styles.list} default-list`}>
                <ConstructorItem item={data[1]} />
                <ConstructorItem item={data[1]} />
                <ConstructorItem item={data[1]} />
                <ConstructorItem item={data[1]} />
                <ConstructorItem item={data[1]} />
                <ConstructorItem item={data[1]} />
                <ConstructorItem item={data[1]} />
                <ConstructorItem item={data[1]} />
            </ul>
    
            <div className={`${styles.container} mr-4 mt-4`}>
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={`${data[0].name} (низ)`}
                    price={data[0].price}
                    thumbnail={data[0].image}
                    className={`${styles.item} ml-8`}
                />
            </div>

            <div className={`${styles.priceContainer} mt-10 mr-4`}>
                <PriceContainer total={610} />
                <Button type="primary" size="large">Оформить заказ</Button>
            </div>
        </section>
    )
}

BurgerConsrtuctor.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		type: PropTypes.string.isRequired,
		proteins: PropTypes.number.isRequired,
		fat: PropTypes.number.isRequired,
		carbohydrates: PropTypes.number.isRequired,
		calories: PropTypes.number.isRequired,
		price: PropTypes.number.isRequired,
		image: PropTypes.string.isRequired,
		image_mobile: PropTypes.string.isRequired,
		image_large: PropTypes.string.isRequired,
		__v: PropTypes.number,
	})).isRequired
}