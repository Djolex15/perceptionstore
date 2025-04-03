import { Body, Container, Head, Heading, Html, Preview, Section, Text, Row, Column, Hr } from "@react-email/components"

type FormData = {
  firstName: string
  lastName: string
  email: string
  phone: string
  serviceType: "startup-growth" | "a-la-carte"
  paymentOption?: "one-time" | "installments"
  selectedServices?: Array<{
    id: string
    name: string
    price: number
  }>
  totalPrice?: number
  discounts?: Array<{
    id: string
    name: string
    amount: number
  }>
  currency?: {
    code: string
    symbol: string
    exchangeRate: number
  }
}

interface BookingConfirmationEmailProps {
  formData: FormData
}

export default function BookingConfirmationEmail({ formData }: BookingConfirmationEmailProps) {
  // Format price using the currency from formData
  const formatPrice = (amount: number) => {
    // Default to AED if no currency is provided
    const currency = formData.currency || { code: "AED", symbol: "AED", exchangeRate: 1 }

    // Convert the amount using the exchange rate
    const convertedAmount = amount * currency.exchangeRate

    // Format based on currency code
    if (currency.code === "AED") {
      return `${convertedAmount} ${currency.symbol}`
    } else {
      return `${currency.symbol}${convertedAmount}`
    }
  }

  return (
    <Html>
      <Head />
      <Preview>Your booking with Perception UAE has been confirmed!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>Your Booking is Confirmed!</Heading>

          <Text style={paragraph}>
            Thank you for booking a call with us, {formData.firstName}! We&apos;re excited to speak with you soon.
          </Text>

          <Section style={bookingDetails}>
            <Heading as="h2" style={subheading}>
              Booking Details
            </Heading>

            <Row style={row}>
              <Column style={labelColumn}>Name:</Column>
              <Column style={valueColumn}>
                {formData.firstName} {formData.lastName}
              </Column>
            </Row>

            <Row style={row}>
              <Column style={labelColumn}>Email:</Column>
              <Column style={valueColumn}>{formData.email}</Column>
            </Row>

            <Row style={row}>
              <Column style={labelColumn}>Phone:</Column>
              <Column style={valueColumn}>{formData.phone}</Column>
            </Row>

            <Row style={row}>
              <Column style={labelColumn}>Service:</Column>
              <Column style={valueColumn}>
                {formData.serviceType === "startup-growth" ? "Startup Growth Package" : "A La Carte Options"}
              </Column>
            </Row>

            {formData.serviceType === "startup-growth" && (
              <Row style={row}>
                <Column style={labelColumn}>Payment Option:</Column>
                <Column style={valueColumn}>
                  {formData.paymentOption === "one-time" ? "One-time Payment" : "Installments"}
                </Column>
              </Row>
            )}

            {formData.serviceType === "a-la-carte" && formData.selectedServices && (
              <>
                <Row style={row}>
                  <Column style={labelColumn}>Selected Services:</Column>
                  <Column style={valueColumn}></Column>
                </Row>
                {formData.selectedServices.map((service) => (
                  <Row key={service.id} style={serviceRow}>
                    <Column style={serviceNameColumn}>{service.name}</Column>
                    <Column style={servicePriceColumn}>{formatPrice(service.price)}</Column>
                  </Row>
                ))}
              </>
            )}

            {formData.discounts && formData.discounts.length > 0 && (
              <>
                <Row style={row}>
                  <Column style={labelColumn}>Discounts Applied:</Column>
                  <Column style={valueColumn}></Column>
                </Row>
                {formData.discounts.map((discount) => (
                  <Row key={discount.id} style={discountRow}>
                    <Column style={serviceNameColumn}>{discount.name}</Column>
                    <Column style={discountPriceColumn}>-{formatPrice(discount.amount)}</Column>
                  </Row>
                ))}
              </>
            )}

            <Hr style={divider} />

            <Row style={totalRow}>
              <Column style={totalLabelColumn}>Total Price:</Column>
              <Column style={totalValueColumn}>
                {formData.serviceType === "startup-growth" ? formatPrice(5999) : formatPrice(formData.totalPrice || 0)}
              </Column>
            </Row>
          </Section>

          <Text style={paragraph}>
            We&apos;ll be in touch shortly to schedule your call. If you have any questions in the meantime, please
            don&apos;t hesitate to contact us at{" "}
            <a href="mailto:info@perceptionuae.com" style={link}>
              info@perceptionuae.com
            </a>
            .
          </Text>

          <Text style={footer}>© {new Date().getFullYear()} Perception Creative Agency. All rights reserved.</Text>
        </Container>
      </Body>
    </Html>
  )
}

// Styles
const main = {
  backgroundColor: "#01131F",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
  color: "#fffae5",
}

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  maxWidth: "600px",
}

const heading = {
  fontSize: "28px",
  letterSpacing: "-0.5px",
  lineHeight: "1.3",
  fontWeight: "700",
  color: "#fffae5",
  textAlign: "center" as const,
  padding: "17px 0 0",
}

const paragraph = {
  margin: "0 0 15px",
  fontSize: "16px",
  lineHeight: "1.5",
  color: "#fffae5",
  textAlign: "center" as const,
}

const bookingDetails = {
  padding: "24px",
  backgroundColor: "#01131F",
  border: "1px solid #fffae520",
  borderRadius: "8px",
  marginBottom: "24px",
}

const subheading = {
  fontSize: "20px",
  fontWeight: "600",
  lineHeight: "1.3",
  color: "#fffae5",
  marginTop: "0",
  marginBottom: "16px",
  textAlign: "center" as const,
}

const row = {
  marginBottom: "8px",
}

const labelColumn = {
  width: "40%",
  fontWeight: "500",
  color: "#fffae5",
}

const valueColumn = {
  width: "60%",
  color: "#fffae5",
}

const serviceRow = {
  marginBottom: "4px",
  paddingLeft: "20px",
}

const serviceNameColumn = {
  width: "70%",
  color: "#fffae5",
}

const servicePriceColumn = {
  width: "30%",
  textAlign: "right" as const,
  color: "#fffae5",
}

const discountRow = {
  marginBottom: "4px",
  paddingLeft: "20px",
}

const discountPriceColumn = {
  width: "30%",
  textAlign: "right" as const,
  color: "#B96944",
}

const divider = {
  borderColor: "#fffae520",
  margin: "16px 0",
}

const totalRow = {
  marginTop: "12px",
  fontWeight: "bold",
}

const totalLabelColumn = {
  width: "40%",
  fontWeight: "600",
  color: "#fffae5",
}

const totalValueColumn = {
  width: "60%",
  fontWeight: "600",
  color: "#B96944",
  textAlign: "right" as const,
}

const footer = {
  fontSize: "13px",
  lineHeight: "1.5",
  color: "#fffae5",
  marginTop: "48px",
  textAlign: "center" as const,
}

const link = {
  color: "#B96944",
  textDecoration: "none",
}

