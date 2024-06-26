import React, { useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { ProductOrder } from "./ProductOrder";

const CUSTOM_ANIMATION = {
  mount: { scale: 1 },
  unmount: { scale: 0.9 },
};

export function OrderDetailAccordion({accordionItems}) {
  const [open, setOpen] = useState(0);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  return (
    <>
      {/* Map over the accordionItems array to render dynamic accordion items */}
      {accordionItems?.map((item, index) => (
        <Accordion
          key={index}
          open={open === index + 1}
          animate={CUSTOM_ANIMATION}
          className="sm:col-span-full"
        >
          <AccordionHeader onClick={() => handleOpen(index + 1)} className="text-sm">
            {`ORDERDETAILSID-00-${item.OrderDetailId}`}
          </AccordionHeader>
          <AccordionBody>
            <ProductOrder items={item} />
          </AccordionBody>
        </Accordion>
      ))}
    </>
  );
}
