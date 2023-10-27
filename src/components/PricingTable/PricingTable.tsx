import { plans } from '../../helpers/plans';
import cn from 'classnames';
import './PricingTable.scss';

type Props = {
  chosenNumber: number,
};

export const PricingTable: React.FC<Props> = ({ chosenNumber }) => {

  return (
    <table className="pricingTable">
      <tr className="pricingTable__head">
        <th className="pricingTable__head_nod">
          Кількість діб
        </th>

        <th className="pricingTable__head_price">
          Ціна за одну добу
        </th>
      </tr>

      {plans.map(plan => (
        <tr
          className={cn("pricingTable__row", {
            "pricingTable__row--active": plan.numberOfDays.includes(chosenNumber)
          })}
          key={plan.days}
        >
          <td className="pricingTable__row_nod">
            {plan.days}
          </td>

          <td className="pricingTable__row_price">
            {plan.price}
          </td>
        </tr>
      ))}
    </table>
  );
}
