import './AboutMe.css';
import photo from '../../images/student.jpg';

function AboutMe() {
  return (
    <section className='student'>
      <h2 className='student__title'>Студентка</h2>
      <div className='student__info'>
        <div className='student__profile'>
          <h3 className='student__name'>Анна</h3>
          <p className='student__profession'>Фронтенд-разработчик, 33 года</p>
          <p className='student__description'>
            Я из города Петрозаводска. Закончила Петрозаводский государственный
            университет по специальности "Информационные системы и технологии".
            После этого проработала в течение пяти лет сначала Python-разработчиком,
            потом перешла на JavaScript. А потом случились 5 лет декрета, из которого
            я возвращаюсь с помощью "Яндекс Практикума". После окончания курса "Веб-разработчик"
            отправляюсь искать свою новую работу в любимой профессии.
          </p>
          <a className='student__link' href='https://github.com/AnnaZakharovaPtz' target='blank'>Github</a>
        </div>
        <img className='student__photo' src={photo} alt='Фото студентки Анны Захаровой' />
      </div>
    </section>
  );
}

export default AboutMe;
