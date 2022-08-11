import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './constructor.module.css'
import PriceContainer from "../price/price"
import ConstructorItem from "../constructor-item/constructor-item";

export default function BurgerConsrtuctor({data}) {
    const total = data.reduce((acc, i) => acc + i.price * i.count, 0);

    const renderItem = (item, index) => {
        const arr = [];
        for(let i = 0; i<item.count; i++) {
            arr.push(<ConstructorItem item={item} text={item.name} key={index} />)
        }
        //console.log(arr)
        return arr
    }

    return (
        <section className={`${styles.section} pl-4 mt-25`}>
            <ul className={styles.list}>
                {data.map((el, index, arr) => {
                        if(index === 0) {
                            return <ConstructorItem item={el} text={`${el.name} (верх)`} type="top" key={index} />
                        }
                        else if(index === arr.length -1 ) {
                            return <ConstructorItem item={el} text={`${el.name} (низ)`} type="bottom" key={index} />
                        }

                        if(el.type !== 'bun') {
                            return renderItem(el, index)
                        }
                })}
            </ul>

            <div className={`${styles.priceContainer} mt-10 mr-4`}>
                <PriceContainer total={total} />
                <Button type="primary" size="large">Оформить заказ</Button>
            </div>
        </section>
    )
}
