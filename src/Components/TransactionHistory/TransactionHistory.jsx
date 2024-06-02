import css from "./transactionHistory.module.css";
export default function TransactionHistory({ items }) {
  return (
    <div className={css.transactionTable}>
      <table className={css.table}>
        <thead className={css.tableHead}>
          <tr>
            <th className={css.tableTh}>Type</th>
            <th className={css.tableTh}>Amount</th>
            <th className={css.tableTh}> Currency</th>
          </tr>
        </thead>
        <tbody>
          {items.map(({ id, amount, type, currency }, index) => {
            return (
              <tr className={index % 2 === 0 ? css.even : css.odd} key={id}>
                <td className={css.tableTd}>{type}</td>
                <td className={css.tableTd}>{amount}</td>
                <td className={css.tableTd}>{currency}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
