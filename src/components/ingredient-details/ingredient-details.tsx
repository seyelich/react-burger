import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './ingredient-details.module.css';
import { useSelector, useLocation } from '../../services/hooks';

export default function IngredientDetails() {
    const { items } = useSelector(store => store.ingredients);
    const location = useLocation();
    const bg = location.state?.bg;
    const { id } = useParams<{ id: string }>();

    const [ currItem, setCurrItem ] = useState({
        image_large: '',
        calories: 0,
        proteins: 0,
        fat: 0,
        carbohydrates: 0,
        name: ''
    });
    
    const findItem = () => {
        const item = items?.find(el => el._id === id)!
        return {
            image_large: item.image_large,
            calories: item.calories ,
            proteins: item.proteins,
            fat: item.fat,
            carbohydrates: item.carbohydrates,
            name: item.name //КОСТЫЛЬ
        }
    }

    const item = items.length !== 0 ? findItem() : {
        image_large: '',
        calories: 0,
        proteins: 0,
        fat: 0,
        carbohydrates: 0,
        name: ''
    };
    
    useEffect(() => {
        setCurrItem(item);
    }, [id, item])

    return (
        <div className={styles.container} >
            { !bg && <h1 className="text text_type_main-large mt-30">Детали ингредиента</h1> }
            <img src={currItem.image_large} alt={currItem.name} />
            <p className="text text_type_main-medium mt-4 mb-8">{currItem.name}</p>
            <div className={`${styles.parContainer} mb-15`}>
                <p className={`${styles.par} text text_type_main-default text_color_inactive`}>
                    Калории,ккал
                    <span className="text text_type_digits-default text_color_inactive mt-2">{currItem.calories}</span>
                </p>
                <p className={`${styles.par} text text_type_main-default text_color_inactive`}>
                    Белки, г 
                    <span className="text text_type_digits-default text_color_inactive mt-2">{currItem.proteins}</span>
                </p>
                <p className={`${styles.par} text text_type_main-default text_color_inactive`}>
                    Жиры, г 
                    <span className="text text_type_digits-default text_color_inactive mt-2">{currItem.fat}</span>
                </p>
                <p className={`${styles.par} text text_type_main-default text_color_inactive`}>
                    Углеводы, г 
                    <span className="text text_type_digits-default text_color_inactive mt-2">{currItem.carbohydrates}</span>
                </p>
            </div>
        </div>
    )
}
