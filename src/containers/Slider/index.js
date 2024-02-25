import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    // changement du -1 et 1 pour modifier l'ordre
    new Date(evtA.date) > new Date(evtB.date) ? 1 : -1
  );

  // On vérifie si on atteint la fin de la liste avant d'incrémenter l'index
  const nextCard = () => {
    setTimeout(() => {
      setIndex(index < (byDateDesc?.length || 0) - 1 ? index + 1 : 0);
    }, 5000);
  };
  useEffect(() => {
    nextCard();
  });

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
          <div
            key={event.title}
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div
                className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
                ))}
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc?.map((event, radioIdx) => (
                <input
                  key={event.description}
                  type="radio"
                  name="radio-button"
                  // Remplacement idx par index ,idx étant index de la boucle
                  checked={index === radioIdx}
                  //  lecture seule pour empêcher l'utilisateur de le modifier  
                  readOnly
                />
              ))}
            </div>
          </div>
    </div>
  );
};

export default Slider;
