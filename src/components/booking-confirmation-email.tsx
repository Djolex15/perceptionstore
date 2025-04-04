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
      <Head>
        <style>
          {`
            @media only screen and (max-width: 600px) {
              .container {
                width: 100% !important;
                padding: 10px !important;
              }
              .heading {
                font-size: 24px !important;
              }
              .subheading {
                font-size: 18px !important;
              }
              .row {
                display: block !important;
                width: 100% !important;
              }
              .column {
                display: block !important;
                width: 100% !important;
                margin-bottom: 8px !important;
              }
              .labelColumn {
                font-weight: 600 !important;
                margin-bottom: 4px !important;
              }
              .serviceRow, .discountRow {
                padding-left: 0 !important;
              }
              .totalRow .column {
                text-align: left !important;
                margin-bottom: 0 !important;
              }
              .totalValueColumn {
                text-align: left !important;
              }
            }
            body, .body {
              background-color: #01131F !important;
              margin: 0 !important;
              padding: 0 !important;
            }
            .container, .section {
              background-color: #01131F !important;
            }
          `}
        </style>
      </Head>
      <Preview>Your booking with Perception UAE has been confirmed!</Preview>
      <Body style={{ ...main, backgroundColor: "#01131F" }}>
        <Container style={container} className="container" bgcolor="#01131F">
          <Heading style={heading} className="heading">
            Your Booking is Confirmed!
          </Heading>

          <Text style={paragraph}>
            Thank you for booking a call with us, {formData.firstName}! We&apos;re excited to speak with you soon.
          </Text>

          <Section style={bookingDetails} bgcolor="#01131F">
            <Heading as="h2" style={subheading} className="subheading">
              Booking Details
            </Heading>

            <Row style={row} className="row">
              <Column style={labelColumn} className="column labelColumn">
                Name:
              </Column>
              <Column style={valueColumn} className="column">
                {formData.firstName} {formData.lastName}
              </Column>
            </Row>

            <Row style={row} className="row">
              <Column style={labelColumn} className="column labelColumn">
                Email:
              </Column>
              <Column style={valueColumn} className="column">
                {formData.email}
              </Column>
            </Row>

            <Row style={row} className="row">
              <Column style={labelColumn} className="column labelColumn">
                Phone:
              </Column>
              <Column style={valueColumn} className="column">
                {formData.phone}
              </Column>
            </Row>

            <Row style={row} className="row">
              <Column style={labelColumn} className="column labelColumn">
                Service:
              </Column>
              <Column style={valueColumn} className="column">
                {formData.serviceType === "startup-growth" ? "Startup Growth Package" : "A La Carte Options"}
              </Column>
            </Row>

            {formData.serviceType === "startup-growth" && (
              <Row style={row} className="row">
                <Column style={labelColumn} className="column labelColumn">
                  Payment Option:
                </Column>
                <Column style={valueColumn} className="column">
                  {formData.paymentOption === "one-time" ? "One-time Payment" : "Installments"}
                </Column>
              </Row>
            )}

            {formData.serviceType === "a-la-carte" && formData.selectedServices && (
              <>
                <Row style={row} className="row">
                  <Column style={labelColumn} className="column labelColumn">
                    Selected Services:
                  </Column>
                  <Column style={valueColumn} className="column"></Column>
                </Row>
                {formData.selectedServices.map((service) => (
                  <Row key={service.id} style={serviceRow} className="row serviceRow">
                    <Column style={serviceNameColumn} className="column">
                      {service.name}
                    </Column>
                    <Column style={servicePriceColumn} className="column">
                      {formatPrice(service.price)}
                    </Column>
                  </Row>
                ))}
              </>
            )}

            {formData.discounts && formData.discounts.length > 0 && (
              <>
                <Row style={row} className="row">
                  <Column style={labelColumn} className="column labelColumn">
                    Discounts Applied:
                  </Column>
                  <Column style={valueColumn} className="column"></Column>
                </Row>
                {formData.discounts.map((discount) => (
                  <Row key={discount.id} style={discountRow} className="row discountRow">
                    <Column style={serviceNameColumn} className="column">
                      {discount.name}
                    </Column>
                    <Column style={discountPriceColumn} className="column">
                      -{formatPrice(discount.amount)}
                    </Column>
                  </Row>
                ))}
              </>
            )}

            <Hr style={divider} />

            <Row style={totalRow} className="row totalRow">
              <Column style={totalLabelColumn} className="column labelColumn">
                Total Price:
              </Column>
              <Column style={totalValueColumn} className="column totalValueColumn">
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
  margin: "0",
  padding: "0",
  width: "100%",
  WebkitTextSizeAdjust: "100%",
  MsTextSizeAdjust: "100%",
}

const container = {
  margin: "0 auto",
  padding: "20px",
  width: "100%",
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
  margin: "0 0 24px",
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
  width: "100%",
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
  display: "flex" as const,
  flexDirection: "row" as const,
  width: "100%",
}

const labelColumn = {
  width: "40%",
  fontWeight: "500",
  color: "#fffae5",
  paddingRight: "8px",
}

const valueColumn = {
  width: "60%",
  color: "#fffae5",
}

const serviceRow = {
  marginBottom: "4px",
  paddingLeft: "20px",
  display: "flex" as const,
  flexDirection: "row" as const,
  width: "100%",
}

const serviceNameColumn = {
  width: "70%",
  color: "#fffae5",
  paddingRight: "8px",
}

const servicePriceColumn = {
  width: "30%",
  textAlign: "right" as const,
  color: "#fffae5",
}

const discountRow = {
  marginBottom: "4px",
  paddingLeft: "20px",
  display: "flex" as const,
  flexDirection: "row" as const,
  width: "100%",
}

const discountPriceColumn = {
  width: "30%",
  textAlign: "right" as const,
  color: "#B96944",
}

const divider = {
  borderColor: "#fffae520",
  margin: "16px 0",
  width: "100%",
}

const totalRow = {
  marginTop: "12px",
  fontWeight: "bold",
  display: "flex" as const,
  flexDirection: "row" as const,
  width: "100%",
}

const totalLabelColumn = {
  width: "40%",
  fontWeight: "600",
  color: "#fffae5",
  paddingRight: "8px",
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

