"use server"

import { Resend } from "resend"
import BookingConfirmationEmail from "@/components/booking-confirmation-email"
import AdminNotificationEmail from "@/components/admin-confirmation-email"

const resend = new Resend(process.env.RESEND_API_KEY)

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

export async function sendBookingConfirmationEmail(formData: FormData) {
  try {
    // Send confirmation email to the customer
    const customerData = await resend.emails.send({
      from: "Perception Creative Agency <notifications@perceptionuae.store>",
      to: formData.email,
      subject: "Your Booking Confirmation",
      react: BookingConfirmationEmail({ formData }),
    })

    // Send notification email to the admin
    const adminData = await resend.emails.send({
      from: "Perception Creative Agency <notifications@perceptionuae.store>",
      to: "info@perceptionuae.com",
      subject: `New Booking: ${formData.firstName} ${formData.lastName}`,
      react: AdminNotificationEmail({ formData }),
    })

    return { success: true, customerData, adminData }
  } catch (error) {
    console.error("Error sending email:", error)
    return { success: false, error }
  }
}

