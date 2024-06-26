import { Card, Typography } from "@material-tailwind/react";
import { AddZeroes } from "../../json/commons";
 
const TABLE_HEAD = ["Name",  "ProductType", "Price", "QuantityOrdered", "Subtotal"];
 
export function ProductOrder({items}) {
  return (
    <Card className="h-full w-full overflow-scroll">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          
        <tr key={items.Product?.ProductId}>
            <td className={"p-4 border-b border-blue-gray-50"}>
                <Typography
                variant="small"
                color="blue-gray"
                className="font-normal p-4 border-b border-blue-gray-50"
                >
                {items.Product?.Name}
                </Typography>
            </td>
            <td className={"p-4 border-b border-blue-gray-50"}>
                <Typography
                variant="small"
                color="blue-gray"
                className="font-normal"
                >
                {items.Product.ProductType === 1 ? "Wheels" : "Others"}
                </Typography>
            </td>
            <td className={"p-4 border-b border-blue-gray-50"}>
                <Typography
                variant="small"
                color="blue-gray"
                className="font-normal"
                >
                {`$${AddZeroes(items.Product.Price)}`}
                </Typography>
            </td>
            <td className={"p-4 border-b border-blue-gray-50"}>
                <Typography
                variant="small"
                color="blue-gray"
                className="font-normal"
                >
                {`${AddZeroes(items?.QuantityOrdered)}`}
                </Typography>
            </td>
            <td className={"p-4 border-b border-blue-gray-50"}>
                <Typography
                variant="small"
                color="blue-gray"
                className="font-normal"
                >
                {`$${AddZeroes(items?.QuantityOrdered * items?.Product?.Price)}`}
                </Typography>
            </td>
            </tr>

        </tbody>
      </table>
    </Card>
  );
}