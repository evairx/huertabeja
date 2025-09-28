import SimpleCheckout from '@/components/forms/payment-test';
import Payment from '@/components/forms/payment';
import * as Styles from "@/styles/pages/checkout-pay-style"

export default function Home() {
  return (
    <Styles.Container>
      <Styles.ContainerForm>
        <div></div>
        <SimpleCheckout/>
      </Styles.ContainerForm>
    </Styles.Container>
  );
}