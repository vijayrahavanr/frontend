import Accordion from '@/components/common/Accordion';

/**
 * Thin wrapper over the shared Accordion for FAQ entries, so the FAQ
 * page doesn't repeat the question/answer prop mapping.
 *
 * @param {object} props
 * @param {{question: string, answer: string}} props.faq
 */
const FAQAccordionItem = ({ faq, className }) => (
  <Accordion title={faq.question} className={className}>
    {faq.answer}
  </Accordion>
);

export default FAQAccordionItem;
