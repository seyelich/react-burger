import styles from './ingredient-details.module.css';
import {PropTypes} from 'prop-types'

export default function IngredientDetails({ item }) {  
    return (
        <>
            <img src={item.image_large} alt={item.title} />
            <p className="text text_type_main-medium mt-4 mb-8">{item.name}</p>
            <div className={`${styles.parContainer} mb-15`}>
                <p className={`${styles.par} text text_type_main-default text_color_inactive`}>
                    Калории,ккал
                    <span className="text text_type_digits-default text_color_inactive mt-2">{item.calories}</span>
                </p>
                <p className={`${styles.par} text text_type_main-default text_color_inactive`}>
                    Белки, г 
                    <span className="text text_type_digits-default text_color_inactive mt-2">{item.proteins}</span>
                </p>
                <p className={`${styles.par} text text_type_main-default text_color_inactive`}>
                    Жиры, г 
                    <span className="text text_type_digits-default text_color_inactive mt-2">{item.fat}</span>
                </p>
                <p className={`${styles.par} text text_type_main-default text_color_inactive`}>
                    Углеводы, г 
                    <span className="text text_type_digits-default text_color_inactive mt-2">{item.carbohydrates}</span>
                </p>
            </div>
        </>
    )
}

IngredientDetails.propTypes = {
    item: PropTypes.shape({
        _id: PropTypes.string,
        name: PropTypes.string,
        type: PropTypes.string,
        proteins: PropTypes.number,
        fat: PropTypes.number,
        carbohydrates: PropTypes.number,
        calories: PropTypes.number,
        price: PropTypes.number,
        image: PropTypes.string,
        image_mobile: PropTypes.string,
        image_large: PropTypes.string,
        __v: PropTypes.number,
    }).isRequired
}