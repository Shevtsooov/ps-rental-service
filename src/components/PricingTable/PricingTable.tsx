import { plans } from '../../helpers/plans';
import './PricingTable.scss';

export const PricingTable: React.FC = () => {

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
        <tr className="pricingTable__row">
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
