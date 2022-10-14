import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { getIngredients } from '../utils/burger-api';
import styles from './ingredient-details.module.css';

export default function IngredientDetails() {
    const location = useLocation();
    const bg = location.state?.bg;

    const [ currItem, setCurrItem ] = useState({
        image_large: '',
        calories: '',
        proteins: '',
        fat: '',
        carbohydrates: ''
    });

    const { id } = useParams();

    useEffect(() => {
        getIngredients().then((res) => {
            const item = res.data.find(el => el._id === id);
            setCurrItem(item);
        })
    }, [id])

    return (
        <div className={styles.container} >
            { !bg && <h1 className="text text_type_main-large mt-30">Детали ингредиента</h1> }
            <img src={currItem.image_large} alt={currItem.title} />
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
