import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="container">
          <h1 className="text text_type_main-medium mb-6">Упс! Ошибка 404</h1>
          <p className="text text_type_main-default mb-8">Данной страницы не существует</p>
          <p className="text text_type_main-default" style={{textAlign: 'center'}}>проверьте адрес либо перейдите по ссылке <Link to='/' className="link">конструктор</Link></p>
        </div>
    )
}