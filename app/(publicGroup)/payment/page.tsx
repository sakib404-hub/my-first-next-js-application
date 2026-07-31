import PaymentCard from "./_components/PaymentCard";

const PaymentPage = () => {
  return (
    <main className="min-h-screen bg-muted/30 px-4 py-12">
      <div className="mx-auto max-w-3xl">
        {/* Page Header */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Complete Your Subscription
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Securely complete your payment to activate your subscription.
          </p>
        </div>

        {/* Client Payment Component */}
        <PaymentCard />
      </div>
    </main>
  );
};

export default PaymentPage;