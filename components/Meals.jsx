import Picture from './Picture';
import DietMark from './DietMark';
import { WhatsAppIcon } from './BrandIcons';
import { mealMessage, meals, priceMeal } from '@/data/meals';
import { formatRupees } from '@/data/menu';
import { whatsappLink } from '@/data/site';

/**
 * Ready-made meals with menu prices and a one-tap WhatsApp order: it makes
 * choosing easy for groups, and direct orders cost no app commission.
 */
export default function Meals() {
  return (
    <div className="meals">
      <header className="meals-head reveal">
        <p className="eyebrow">Can&apos;t decide?</p>
        <h3>Ready-made meals</h3>
        <p>
          Put together from our menu, at menu prices. Tap to send the order on WhatsApp, and swap anything you like in
          the message.
        </p>
      </header>

      <ul className="meals-grid">
        {meals.map((meal) => {
          const { lines, total, perPerson } = priceMeal(meal);
          return (
            <li key={meal.id} className="meal-card reveal">
              <div className="meal-photos" aria-hidden="true">
                {meal.photos.map((name) => (
                  <Picture key={name} name={name} alt="" sizes="(max-width: 740px) 38vw, 150px" />
                ))}
              </div>
              <p className="meal-for">
                <DietMark diet={meal.diet} size={14} decorative /> {meal.diet === 'veg' ? 'Veg' : 'Non-veg'}
              </p>
              <h4>{meal.title}</h4>
              <ul className="meal-lines">
                {lines.map((line) => (
                  <li key={line.slug}>
                    <span>
                      {line.qty > 1 && <b>{line.qty} × </b>}
                      {line.name}
                      {line.portion && <small> {line.portion}</small>}
                    </span>
                    <span>{formatRupees(line.total)}</span>
                  </li>
                ))}
              </ul>
              <p className="meal-total">
                <strong>{formatRupees(total)}</strong>
                <span>about {formatRupees(perPerson)} a person</span>
              </p>
              <a
                className="btn btn-whatsapp meal-cta"
                href={whatsappLink(mealMessage(meal))}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppIcon size={18} /> Order this meal
                <span className="sr-only"> ({meal.title}) on WhatsApp</span>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
