import './AboutProject.css';
import LandingUnderline from '../LandingUnderline/LandingUnderline';

function AboutProject() {
  return (
    <section className='about-project' id={'about-project'}>
      <h2 className='about-project__title'>О проекте</h2>
      <LandingUnderline />
      <div className='about-project__table'>
        <div className='about-project__table-cell'>
          <h3 className='about-project__subtitle'>Дипломный проект включал 5 этапов</h3>
          <p className='about-project__text'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </div>
        <div className='about-project__table-cell'>
          <h3 className='about-project__subtitle'>На выполнение диплома ушло 5 недель</h3>
          <p className='about-project__text'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
      </div>
      <div className='about-project__stages'>
        <p className='about-project__stage-back'>1 неделя</p>
        <p className='about-project__stage-front'>4 недели</p>
        <p className='about-project__stage-name'>Back-end</p>
        <p className='about-project__stage-name'>Front-end</p>
      </div>
    </section>
  );
}

export default AboutProject;
