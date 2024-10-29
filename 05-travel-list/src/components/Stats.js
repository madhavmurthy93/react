import React from "react";

export default function Stats({ items }) {
  if (!items.length) {
    return (
      <footer className="stats">
        <em>Start adding some items to your packing list 👖 🧦</em>
      </footer>
    );
  }
  const countItems = items.length;
  const countPackedItems = items.filter((item) => item.packed).length;
  const percentPacked = countItems === 0 ? 0 : Math.round((countPackedItems / countItems) * 100);

  return (
    <footer className="stats">
      <em>
        {percentPacked === 100
          ? "You got everything! Ready to go ✈️"
          : `💼 You have ${countItems} items on your list, and you are already packed ${countPackedItems} (
        ${percentPacked}%)`}
      </em>
    </footer>
  );
}
